"use server";

import { ChannelDal } from "@/dal/channel";
import { InviteDal } from "@/dal/invite";
import { MessageMentionsDal } from "@/dal/messageMentions";
import { MessagesDal } from "@/dal/messages";
import { BanListDal } from "@/dal/banlist";
import { ServerMemberDal } from "@/dal/serverMember";
import { ServerRolesDal } from "@/dal/serverRoles";
import { ServerDal } from "@/dal/server";
import { ChannelType, Permission } from "@/generated/prisma/client";
import {
  canAccessChannel,
  getMembershipPermissions,
  hasServerPermission,
} from "@/utils/permissions";
import { toIsoString } from "@/utils/date";
import { resolveDisplayName } from "@/utils/display-name";
import { logger } from "@/utils/logger";
import { buildMentionPlan } from "@/utils/mentions";
import { requireUser } from "@/utils/session";
import { createStreamUserToken, getStreamConfig, getStreamServerClient } from "@/utils/stream";
import type { HomeServer } from "@/app/home-types";

const OWNER_ROLE_NAME = "Owner";

function normalizeRoleName(roleName: string) {
  return roleName.trim();
}

function normalizePermissions(permissions: Permission[]) {
  const validPermissions = new Set<Permission>(Object.values(Permission));
  const normalized = new Set<Permission>();

  for (const permission of permissions) {
    if (validPermissions.has(permission)) {
      normalized.add(permission);
    }
  }

  return Array.from(normalized);
}

async function requireCanManageServer(userId: string, serverId: string) {
  const [isMember, canManageServer, membership] = await Promise.all([
    ServerMemberDal.isUserMemberOfServer(userId, serverId),
    hasServerPermission(userId, serverId, Permission.MANAGE_SERVER),
    getMembershipPermissions(userId, serverId),
  ]);

  if (!isMember || !canManageServer || !membership) {
    throw new Error("Forbidden");
  }

  return membership;
}

async function requireServerPermission(
  userId: string,
  serverId: string,
  permission: Permission,
) {
  const [isMember, hasPermission, membership] = await Promise.all([
    ServerMemberDal.isUserMemberOfServer(userId, serverId),
    hasServerPermission(userId, serverId, permission),
    getMembershipPermissions(userId, serverId),
  ]);

  if (!isMember || !hasPermission || !membership) {
    throw new Error("Forbidden");
  }

  return membership;
}

function assertCanModerateTarget(
  actorMembership: Awaited<ReturnType<typeof getMembershipPermissions>>,
  targetMember: {
    userId: string;
    serverRoles: Array<{ name: string; position: number }>;
  },
) {
  if (!actorMembership) {
    throw new Error("Forbidden");
  }

  if (targetMember.serverRoles.some((role) => role.name === OWNER_ROLE_NAME)) {
    throw new Error("Owner member cannot be moderated.");
  }

  if (!actorMembership.isOwner) {
    const targetHighestRole = targetMember.serverRoles.reduce(
      (highest, role) => Math.max(highest, role.position),
      0,
    );

    if (targetHighestRole > actorMembership.highestRolePosition) {
      throw new Error("Cannot moderate this member due to role hierarchy.");
    }
  }
}

export async function createServer(serverName: string): Promise<HomeServer> {
  const sessionUser = await requireUser();
  const normalizedName = serverName.trim();

  if (!normalizedName) {
    throw new Error("Server name is required.");
  }

  if (normalizedName.length > 60) {
    throw new Error("Server name must be at most 60 characters.");
  }

  const result = await ServerDal.createForOwner(sessionUser.id, normalizedName);

  return {
    id: result.server.id,
    name: result.server.name,
    picture: result.server.picture,
    createdAt: toIsoString(result.server.createdAt),
    membershipId: result.membershipId,
    roleNames: [result.ownerRole.name],
    permissions: [Permission.ADMINISTRATOR],
    capabilities: {
      canManageServer: true,
      canCreateChannels: true,
      canInviteMembers: true,
      canManageMessages: true,
      canPinMessages: true,
      canModerateMembers: true,
      canKickMembers: true,
      canBanMembers: true,
      canSendMessages: true,
      canMentionEveryone: true,
    },
    roles: [
      {
        id: result.ownerRole.id,
        name: result.ownerRole.name,
        position: result.ownerRole.position,
        permissions: [Permission.ADMINISTRATOR],
      },
    ],
    members: [
      {
        memberId: result.membershipId,
        userId: sessionUser.id,
        name: sessionUser.name,
        username: sessionUser.name,
        nickname: null,
        image: sessionUser.image ?? null,
        roleIds: [result.ownerRole.id],
        roleNames: [result.ownerRole.name],
      },
    ],
    bannedUsers: [],
    channels: [
      {
        id: result.generalChannel.id,
        name: result.generalChannel.name,
        type: result.generalChannel.type,
        createdAt: toIsoString(result.generalChannel.createdAt),
        serverId: result.generalChannel.serverId,
        isPublic: true,
        allowedRoleIds: [],
        messages: [],
        hasOlderMessages: false,
        unreadMentionCount: 0,
      },
    ],
    hasUnreadMentions: false,
  };
}

export async function createChannel(
  serverId: string,
  channelName: string,
  type: ChannelType = ChannelType.TEXT,
  access?: {
    isPublic?: boolean;
    allowedRoleIds?: string[];
  },
) {
  const sessionUser = await requireUser();
  const normalizedName = channelName.trim();
  const isPublic = access?.isPublic ?? true;
  const normalizedRoleIds = Array.from(new Set(access?.allowedRoleIds ?? []));

  if (!normalizedName) {
    throw new Error("Channel name is required.");
  }

  if (normalizedName.length > 60) {
    throw new Error("Channel name must be at most 60 characters.");
  }

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canManageChannels = await hasServerPermission(
    sessionUser.id,
    serverId,
    Permission.MANAGE_CHANNELS,
  );

  if (!canManageChannels) {
    throw new Error("Forbidden");
  }

  if (!isPublic) {
    if (normalizedRoleIds.length === 0) {
      throw new Error("Restricted channels must include at least one allowed role.");
    }

    const roles = await ServerRolesDal.listByIds(serverId, normalizedRoleIds);
    if (roles.length !== normalizedRoleIds.length) {
      throw new Error("Some selected roles are invalid.");
    }
  }

  const channel = await ChannelDal.createInServer(serverId, normalizedName, type, {
    isPublic,
    allowedRoleIds: normalizedRoleIds,
  });

  return {
    id: channel.id,
    name: channel.name,
    type: channel.type,
    serverId: channel.serverId,
    isPublic: channel.isPublic,
    allowedRoleIds: channel.allowedRoles.map((item) => item.roleId),
    createdAt: toIsoString(channel.createdAt),
  };
}

export async function updateChannelAccess(
  serverId: string,
  channelId: string,
  access: {
    isPublic: boolean;
    allowedRoleIds: string[];
  },
) {
  const sessionUser = await requireUser();

  const [isMember, canManageChannels, channel] = await Promise.all([
    ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId),
    hasServerPermission(sessionUser.id, serverId, Permission.MANAGE_CHANNELS),
    ChannelDal.findById(channelId),
  ]);

  if (!isMember || !canManageChannels || !channel || channel.serverId !== serverId) {
    throw new Error("Forbidden");
  }

  const normalizedRoleIds = Array.from(new Set(access.allowedRoleIds));
  if (!access.isPublic) {
    if (normalizedRoleIds.length === 0) {
      throw new Error("Restricted channels must include at least one allowed role.");
    }

    const roles = await ServerRolesDal.listByIds(serverId, normalizedRoleIds);
    if (roles.length !== normalizedRoleIds.length) {
      throw new Error("Some selected roles are invalid.");
    }
  }

  const updatedChannel = await ChannelDal.updateAccess(channelId, {
    isPublic: access.isPublic,
    allowedRoleIds: normalizedRoleIds,
  });

  return {
    id: updatedChannel.id,
    name: updatedChannel.name,
    type: updatedChannel.type,
    serverId: updatedChannel.serverId,
    isPublic: updatedChannel.isPublic,
    allowedRoleIds: updatedChannel.allowedRoles.map((item) => item.roleId),
    createdAt: toIsoString(updatedChannel.createdAt),
  };
}

export async function deleteChannel(serverId: string, channelId: string) {
  const sessionUser = await requireUser();

  const [isMember, canManageChannels, channel] = await Promise.all([
    ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId),
    hasServerPermission(sessionUser.id, serverId, Permission.MANAGE_CHANNELS),
    ChannelDal.findById(channelId),
  ]);

  if (!isMember || !canManageChannels || !channel || channel.serverId !== serverId) {
    throw new Error("Forbidden");
  }

  await ChannelDal.deleteById(channelId);

  return { success: true };
}

export async function deleteServer(serverId: string) {
  const sessionUser = await requireUser();

  const result = await ServerDal.deleteIfOnlyMember(serverId, sessionUser.id);

  if (!result.deleted) {
    if (result.reason === "NOT_MEMBER") {
      throw new Error("Forbidden");
    }

    throw new Error("You can only delete a server when you are its last member.");
  }

  return { success: true };
}

export async function createInviteLink(
  serverId: string,
  options?: {
    expiresInHours?: number | null;
    maxUses?: number | null;
  },
) {
  const sessionUser = await requireUser();

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canInvite = await hasServerPermission(sessionUser.id, serverId, Permission.CREATE_INVITE);
  if (!canInvite) {
    throw new Error("Forbidden");
  }

  const expiresInHours = options?.expiresInHours ?? null;
  const maxUses = options?.maxUses ?? null;

  if (expiresInHours !== null) {
    if (!Number.isFinite(expiresInHours) || expiresInHours <= 0 || expiresInHours > 24 * 365) {
      throw new Error("expiresInHours must be between 1 and 8760.");
    }
  }

  if (maxUses !== null) {
    if (!Number.isInteger(maxUses) || maxUses <= 0 || maxUses > 100_000) {
      throw new Error("maxUses must be between 1 and 100000.");
    }
  }

  const expiresAt = expiresInHours !== null
    ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
    : null;

  const invite = await InviteDal.createInvite(serverId, sessionUser.id, {
    expiresAt,
    maxUses,
  });

  return {
    id: invite.id,
    code: invite.code,
    invitePath: `/invite/${invite.code}`,
    expiresAt: invite.expiresAt ? toIsoString(invite.expiresAt) : null,
    maxUses: invite.maxUses,
    currentUses: invite.currentUses,
    createdAt: toIsoString(invite.createdAt),
  };
}

export async function getInvitePreview(code: string) {
  const normalizedCode = code.trim();

  if (!normalizedCode) {
    throw new Error("Invite code is required.");
  }

  const invite = await InviteDal.getByCode(normalizedCode);
  if (!invite) {
    return {
      found: false,
      active: false,
      reason: "Invite not found.",
    };
  }

  const now = new Date();
  const isExpired = Boolean(invite.expiresAt && invite.expiresAt <= now);
  const isExhausted = invite.maxUses !== null && invite.currentUses >= invite.maxUses;
  const active = !isExpired && !isExhausted;

  return {
    found: true,
    active,
    reason: isExpired
      ? "Invite has expired."
      : isExhausted
        ? "Invite has reached the usage limit."
        : null,
    invite: {
      code: invite.code,
      server: {
        id: invite.server.id,
        name: invite.server.name,
        picture: invite.server.picture,
        createdAt: toIsoString(invite.server.createdAt),
      },
      expiresAt: invite.expiresAt ? toIsoString(invite.expiresAt) : null,
      maxUses: invite.maxUses,
      currentUses: invite.currentUses,
      createdAt: toIsoString(invite.createdAt),
    },
  };
}

export async function joinServerViaInvite(code: string) {
  const sessionUser = await requireUser();
  const normalizedCode = code.trim();

  if (!normalizedCode) {
    throw new Error("Invite code is required.");
  }

  return InviteDal.redeemInvite(normalizedCode, sessionUser.id);
}

export async function revokeInvite(serverId: string, inviteId: string) {
  const sessionUser = await requireUser();

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canManageInvites = await hasServerPermission(
    sessionUser.id,
    serverId,
    Permission.CREATE_INVITE,
  );

  if (!canManageInvites) {
    throw new Error("Forbidden");
  }

  const deleted = await InviteDal.revokeInvite(inviteId, serverId);
  if (deleted.count !== 1) {
    throw new Error("Invite not found.");
  }
}

export async function sendMessage(serverId: string, channelId: string, content: string) {
  const sessionUser = await requireUser();
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw new Error("Message content is required.");
  }

  if (normalizedContent.length > 4000) {
    throw new Error("Message must be at most 4000 characters.");
  }

  const [isMember, channel, membership, hasChannelAccess] = await Promise.all([
    ServerMemberDal.isUserMemberOfChannel(sessionUser.id, channelId),
    ChannelDal.findById(channelId),
    ServerMemberDal.findByUserAndServer(sessionUser.id, serverId),
    canAccessChannel(sessionUser.id, serverId, channelId),
  ]);

  if (!isMember || !channel || channel.serverId !== serverId || !membership || !hasChannelAccess) {
    throw new Error("Forbidden");
  }

  if (membership.timeoutUntil && membership.timeoutUntil > new Date()) {
    throw new Error("You are currently timed out in this server.");
  }

  const canSendMessages = await hasServerPermission(
    sessionUser.id,
    serverId,
    Permission.SEND_MESSAGES,
  );

  const canUseMassMentions = await hasServerPermission(
    sessionUser.id,
    serverId,
    Permission.MENTION_EVERYONE,
  );

  if (!canSendMessages) {
    throw new Error("Forbidden");
  }

  const [members, roles] = await Promise.all([
    ServerMemberDal.listByServerId(serverId),
    ServerRolesDal.listByServerId(serverId),
  ]);

  const mentionPlan = buildMentionPlan({
    content: normalizedContent,
    authorId: sessionUser.id,
    canUseMassMentions,
    channel,
    members,
    roles,
  });

  const message = await MessagesDal.createInChannelWithMentions(
    channelId,
    serverId,
    sessionUser.id,
    normalizedContent,
    mentionPlan,
  );
  const displayName = resolveDisplayName(membership.nickname, message.author.name);

  return {
    id: message.id,
    content: message.content,
    createdAt: toIsoString(message.createdAt),
    pinned: message.pinned,
    channelId: message.channelId,
    isMentionedForCurrentUser: false,
    author: {
      id: message.author.id,
      name: displayName,
      username: message.author.name,
      nickname: membership.nickname,
      image: message.author.image,
    },
  };
}

export async function updateOwnServerNickname(serverId: string, nickname: string) {
  const sessionUser = await requireUser();
  const normalizedNickname = nickname.trim();
  const nextNickname = normalizedNickname.length > 0 ? normalizedNickname : null;

  if (nextNickname && nextNickname.length > 60) {
    throw new Error("Nickname must be at most 60 characters.");
  }

  const membership = await ServerMemberDal.findByUserAndServer(sessionUser.id, serverId);
  if (!membership) {
    throw new Error("Forbidden");
  }

  const result = await ServerMemberDal.updateNickname(sessionUser.id, serverId, nextNickname);
  if (result.count !== 1) {
    throw new Error("Unable to update nickname.");
  }

  return {
    nickname: nextNickname,
    name: resolveDisplayName(nextNickname, sessionUser.name),
  };
}

export async function updateServerMemberNickname(serverId: string, memberId: string, nickname: string) {
  const sessionUser = await requireUser();
  const normalizedNickname = nickname.trim();
  const nextNickname = normalizedNickname.length > 0 ? normalizedNickname : null;

  if (nextNickname && nextNickname.length > 60) {
    throw new Error("Nickname must be at most 60 characters.");
  }

  const actorMembership = await requireCanManageServer(sessionUser.id, serverId);
  if (!actorMembership) {
    throw new Error("Forbidden");
  }

  const targetMember = await ServerMemberDal.findByIdInServer(memberId, serverId);
  if (!targetMember) {
    throw new Error("Member not found.");
  }

  const result = await ServerMemberDal.updateNicknameByMemberIdInServer(memberId, serverId, nextNickname);
  if (result.count !== 1) {
    throw new Error("Unable to update nickname.");
  }

  return {
    memberId,
    nickname: nextNickname,
  };
}

export async function deleteMessage(serverId: string, channelId: string, messageId: string) {
  const sessionUser = await requireUser();

  const [isMember, channel, message, hasChannelAccess] = await Promise.all([
    ServerMemberDal.isUserMemberOfChannel(sessionUser.id, channelId),
    ChannelDal.findById(channelId),
    MessagesDal.findById(messageId),
    canAccessChannel(sessionUser.id, serverId, channelId),
  ]);

  if (!isMember || !channel || channel.serverId !== serverId || !message || message.channelId !== channelId || !hasChannelAccess) {
    throw new Error("Forbidden");
  }

  const canManageMessages = await hasServerPermission(
    sessionUser.id,
    serverId,
    Permission.MANAGE_MESSAGES,
  );

  const isAuthor = message.authorId === sessionUser.id;
  if (!isAuthor && !canManageMessages) {
    throw new Error("Forbidden");
  }

  await MessagesDal.deleteById(messageId);
}

export async function setMessagePinned(serverId: string, channelId: string, messageId: string, pinned: boolean) {
  const sessionUser = await requireUser();

  const [isMember, channel, message, hasChannelAccess] = await Promise.all([
    ServerMemberDal.isUserMemberOfChannel(sessionUser.id, channelId),
    ChannelDal.findById(channelId),
    MessagesDal.findById(messageId),
    canAccessChannel(sessionUser.id, serverId, channelId),
  ]);

  if (!isMember || !channel || channel.serverId !== serverId || !message || message.channelId !== channelId || !hasChannelAccess) {
    throw new Error("Forbidden");
  }

  const [canPinMessages, canManageMessages] = await Promise.all([
    hasServerPermission(sessionUser.id, serverId, Permission.PIN_MESSAGES),
    hasServerPermission(sessionUser.id, serverId, Permission.MANAGE_MESSAGES),
  ]);

  if (!canPinMessages && !canManageMessages) {
    throw new Error("Forbidden");
  }

  return MessagesDal.setPinned(messageId, pinned);
}

export async function markMentionsSeen(channelId: string, latestVisibleMessageId: string) {
  const sessionUser = await requireUser();
  const normalizedChannelId = channelId.trim();
  const normalizedLatestVisibleMessageId = latestVisibleMessageId.trim();

  if (!normalizedChannelId || !normalizedLatestVisibleMessageId) {
    throw new Error("channelId and latestVisibleMessageId are required.");
  }

  const channel = await ChannelDal.findById(normalizedChannelId);
  if (!channel) {
    throw new Error("Channel not found.");
  }

  const hasAccess = await canAccessChannel(sessionUser.id, channel.serverId, channel.id);
  if (!hasAccess) {
    throw new Error("Forbidden");
  }

  const updatedCount = await MessageMentionsDal.markSeenInChannelUpToMessage(
    sessionUser.id,
    channel.id,
    normalizedLatestVisibleMessageId,
  );

  return { updatedCount };
}

export async function issueStreamToken(serverId: string) {
  const sessionUser = await requireUser();
  const normalizedServerId = serverId.trim();

  const membership = normalizedServerId
    ? await ServerMemberDal.findByUserAndServer(sessionUser.id, normalizedServerId)
    : null;

  const normalizedName = resolveDisplayName(
    membership?.nickname,
    sessionUser.name?.trim() || sessionUser.email?.trim() || sessionUser.id,
  );
  const userImage = sessionUser.image?.trim() || undefined;

  try {
    const [token, config] = await Promise.all([
      Promise.resolve(createStreamUserToken(sessionUser.id)),
      Promise.resolve(getStreamConfig()),
      getStreamServerClient().upsertUsers([
        {
          id: sessionUser.id,
          name: normalizedName,
          image: userImage,
        },
      ]),
    ]);

    return {
      apiKey: config.apiKey,
      token,
      user: {
        id: sessionUser.id,
        name: normalizedName,
        image: userImage ?? null,
      },
    };
  } catch (error) {
    logger.error({
      context: "stream_token.issue",
      message: "Failed to issue Stream user token",
      userId: sessionUser.id,
      error,
    });

    throw new Error("Failed to issue Stream token");
  }
}

export async function createServerRole(serverId: string, roleName: string, permissions: Permission[]) {
  const sessionUser = await requireUser();
  const actorMembership = await requireCanManageServer(sessionUser.id, serverId);
  const normalizedName = normalizeRoleName(roleName);

  if (!normalizedName) {
    throw new Error("Role name is required.");
  }

  if (normalizedName.length > 60) {
    throw new Error("Role name must be at most 60 characters.");
  }

  const normalizedPermissions = normalizePermissions(permissions);
  if (!actorMembership.isOwner && normalizedPermissions.includes(Permission.ADMINISTRATOR)) {
    throw new Error("Only owner can create roles with administrator permission.");
  }

  if (!actorMembership.isOwner && actorMembership.highestRolePosition <= 0) {
    throw new Error("Cannot create a role below your highest role level.");
  }

  const role = await ServerRolesDal.createRole(serverId, normalizedName, normalizedPermissions, {
    maxPositionExclusive: actorMembership.isOwner ? undefined : actorMembership.highestRolePosition,
  });

  return {
    id: role.id,
    name: role.name,
    position: role.position,
    permissions: role.permissions.map((item) => item.permission),
  };
}

export async function updateServerRole(
  serverId: string,
  roleId: string,
  payload: { name: string; permissions: Permission[] },
) {
  const sessionUser = await requireUser();
  const actorMembership = await requireCanManageServer(sessionUser.id, serverId);
  const role = await ServerRolesDal.findById(roleId, serverId);

  if (!role) {
    throw new Error("Role not found.");
  }

  if (role.name === OWNER_ROLE_NAME) {
    throw new Error("Owner role cannot be edited.");
  }

  if (!actorMembership.isOwner && role.position >= actorMembership.highestRolePosition) {
    throw new Error("Cannot edit a role at or above your highest role level.");
  }

  const normalizedName = normalizeRoleName(payload.name);
  if (!normalizedName) {
    throw new Error("Role name is required.");
  }

  if (normalizedName.length > 60) {
    throw new Error("Role name must be at most 60 characters.");
  }

  const normalizedPermissions = normalizePermissions(payload.permissions);
  if (!actorMembership.isOwner && normalizedPermissions.includes(Permission.ADMINISTRATOR)) {
    throw new Error("Only owner can grant administrator permission.");
  }

  const updated = await ServerRolesDal.updateRole(role.id, normalizedName, normalizedPermissions);

  return {
    id: updated.id,
    name: updated.name,
    position: updated.position,
    permissions: updated.permissions.map((item) => item.permission),
  };
}

export async function deleteServerRole(serverId: string, roleId: string) {
  const sessionUser = await requireUser();
  const actorMembership = await requireCanManageServer(sessionUser.id, serverId);
  const role = await ServerRolesDal.findById(roleId, serverId);

  if (!role) {
    throw new Error("Role not found.");
  }

  if (role.name === OWNER_ROLE_NAME) {
    throw new Error("Owner role cannot be deleted.");
  }

  if (!actorMembership.isOwner && role.position >= actorMembership.highestRolePosition) {
    throw new Error("Cannot delete a role at or above your highest role level.");
  }

  const deleted = await ServerRolesDal.deleteRole(role.id, serverId);
  if (deleted.count !== 1) {
    throw new Error("Role not found.");
  }

  return { success: true };
}

export async function setServerMemberRoles(serverId: string, memberId: string, roleIds: string[]) {
  const sessionUser = await requireUser();
  const actorMembership = await requireCanManageServer(sessionUser.id, serverId);

  const targetMember = await ServerMemberDal.findByIdInServer(memberId, serverId);

  if (!targetMember) {
    throw new Error("Member not found.");
  }

  if (targetMember.serverRoles.some((role) => role.name === OWNER_ROLE_NAME)) {
    throw new Error("Owner member cannot be edited.");
  }

  if (!actorMembership.isOwner) {
    const targetHighestRole = targetMember.serverRoles.reduce(
      (highest, role) => Math.max(highest, role.position),
      0,
    );

    if (targetHighestRole > actorMembership.highestRolePosition) {
      throw new Error("Cannot edit this member due to role hierarchy.");
    }
  }

  const normalizedRoleIds = Array.from(new Set(roleIds));
  const roles = await ServerRolesDal.listByIds(serverId, normalizedRoleIds);

  if (roles.length !== normalizedRoleIds.length) {
    throw new Error("Some selected roles are invalid.");
  }

  if (roles.some((role) => role.name === OWNER_ROLE_NAME)) {
    throw new Error("Owner role cannot be assigned through role management.");
  }

  if (!actorMembership.isOwner) {
    const hasUnmanageableRole = roles.some(
      (role) => role.position > actorMembership.highestRolePosition,
    );

    if (hasUnmanageableRole) {
      throw new Error("Cannot assign roles above your highest role level.");
    }

    if (
      roles.some((role) => role.permissions.some((permission) => permission.permission === Permission.ADMINISTRATOR))
    ) {
      throw new Error("Only owner can assign administrator roles.");
    }
  }

  await ServerRolesDal.replaceMemberRoles(targetMember.id, normalizedRoleIds);

  return { success: true };
}

export async function kickServerMember(serverId: string, memberId: string) {
  const sessionUser = await requireUser();
  const actorMembership = await requireServerPermission(
    sessionUser.id,
    serverId,
    Permission.KICK_MEMBERS,
  );

  const targetMember = await ServerMemberDal.findByIdInServer(memberId, serverId);

  if (!targetMember) {
    throw new Error("Member not found.");
  }

  if (targetMember.userId === sessionUser.id) {
    throw new Error("You cannot kick yourself.");
  }

  assertCanModerateTarget(actorMembership, targetMember);

  const deleted = await ServerMemberDal.deleteByMemberIdInServer(memberId, serverId);
  if (deleted.count !== 1) {
    throw new Error("Unable to kick member.");
  }

  return {
    success: true,
    memberId,
  };
}

export async function banServerMember(serverId: string, memberId: string) {
  const sessionUser = await requireUser();
  const actorMembership = await requireServerPermission(
    sessionUser.id,
    serverId,
    Permission.BAN_MEMBERS,
  );

  const targetMember = await ServerMemberDal.findByIdInServer(memberId, serverId);
  if (!targetMember) {
    throw new Error("Member not found.");
  }

  if (targetMember.userId === sessionUser.id) {
    throw new Error("You cannot ban yourself.");
  }

  assertCanModerateTarget(actorMembership, targetMember);

  await BanListDal.banUser(serverId, targetMember.userId);

  const deleted = await ServerMemberDal.deleteByMemberIdInServer(memberId, serverId);
  if (deleted.count !== 1) {
    throw new Error("Unable to ban member.");
  }

  return {
    success: true,
    memberId,
    userId: targetMember.userId,
  };
}

export async function unbanServerUser(serverId: string, userId: string) {
  const sessionUser = await requireUser();

  await requireServerPermission(sessionUser.id, serverId, Permission.BAN_MEMBERS);

  if (userId === sessionUser.id) {
    throw new Error("You cannot unban yourself.");
  }

  const result = await BanListDal.unbanUser(serverId, userId);

  return {
    success: true,
    userId,
    wasBanned: result.wasBanned,
  };
}