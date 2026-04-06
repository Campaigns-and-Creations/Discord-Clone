"use server";

import { ChannelDal } from "@/dal/channel";
import { InviteDal } from "@/dal/invite";
import { MessagesDal } from "@/dal/messages";
import { ServerMemberDal } from "@/dal/serverMember";
import { ServerRolesDal } from "@/dal/serverRoles";
import { ServerDal } from "@/dal/server";
import { UserDal } from "@/dal/user";
import { ChannelType, Permission } from "@/generated/prisma/client";
import {
  canAccessChannel,
  canModerateTarget,
  getMembershipPermissions,
  hasServerPermission,
} from "@/utils/permissions";
import { requireUser } from "@/utils/session";
import type { HomeServer } from "@/app/home-types";

function toIsoString(value: Date): string {
  return value.toISOString();
}

const MAX_TIMEOUT_MINUTES = 60 * 24 * 28;
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
      canSendMessages: true,
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
        image: sessionUser.image ?? null,
        roleIds: [result.ownerRole.id],
        roleNames: [result.ownerRole.name],
      },
    ],
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
      },
    ],
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

export async function inviteMember(serverId: string, email: string) {
  const sessionUser = await requireUser();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email is required.");
  }

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canInvite = await hasServerPermission(sessionUser.id, serverId, Permission.CREATE_INVITE);
  if (!canInvite) {
    throw new Error("Forbidden");
  }

  const userToInvite = await UserDal.getByEmail(normalizedEmail);
  if (!userToInvite) {
    throw new Error("User not found.");
  }

  const existingMember = await ServerMemberDal.findByUserAndServer(userToInvite.id, serverId);
  if (existingMember) {
    throw new Error("User is already a server member.");
  }

  const memberRole = await ServerRolesDal.findByName(serverId, "Member");

  return ServerMemberDal.createInServer(serverId, userToInvite.id, memberRole?.id);
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

  if (!canSendMessages) {
    throw new Error("Forbidden");
  }

  const message = await MessagesDal.createInChannel(channelId, sessionUser.id, normalizedContent);

  return {
    id: message.id,
    content: message.content,
    createdAt: toIsoString(message.createdAt),
    pinned: message.pinned,
    channelId: message.channelId,
    author: {
      id: message.author.id,
      name: message.author.name,
      image: message.author.image,
    },
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

export async function timeoutMember(serverId: string, targetUserId: string, durationMinutes: number) {
  const sessionUser = await requireUser();

  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0 || durationMinutes > MAX_TIMEOUT_MINUTES) {
    throw new Error(`durationMinutes must be between 1 and ${MAX_TIMEOUT_MINUTES}.`);
  }

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canModerate = await hasServerPermission(sessionUser.id, serverId, Permission.MODERATE_MEMBERS);
  if (!canModerate) {
    throw new Error("Forbidden");
  }

  const targetMember = await ServerMemberDal.findByUserAndServer(targetUserId, serverId);
  if (!targetMember) {
    throw new Error("Target user is not a server member.");
  }

  const canModerateTargetUser = await canModerateTarget(sessionUser.id, targetUserId, serverId);
  if (!canModerateTargetUser) {
    throw new Error("Cannot moderate this user due to role hierarchy.");
  }

  const timeoutUntil = new Date(Date.now() + durationMinutes * 60_000);
  return ServerMemberDal.setTimeoutUntil(targetMember.id, timeoutUntil);
}

export async function clearMemberTimeout(serverId: string, targetUserId: string) {
  const sessionUser = await requireUser();

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    throw new Error("Forbidden");
  }

  const canModerate = await hasServerPermission(sessionUser.id, serverId, Permission.MODERATE_MEMBERS);
  if (!canModerate) {
    throw new Error("Forbidden");
  }

  const targetMember = await ServerMemberDal.findByUserAndServer(targetUserId, serverId);
  if (!targetMember) {
    throw new Error("Target user is not a server member.");
  }

  const canModerateTargetUser = await canModerateTarget(sessionUser.id, targetUserId, serverId);
  if (!canModerateTargetUser) {
    throw new Error("Cannot moderate this user due to role hierarchy.");
  }

  return ServerMemberDal.setTimeoutUntil(targetMember.id, null);
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

  const updated = await ServerRolesDal.updateRole(role.id, serverId, normalizedName, normalizedPermissions);

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