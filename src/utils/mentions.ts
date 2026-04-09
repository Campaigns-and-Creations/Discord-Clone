import type { Channel, MentionType, Permission } from "@/generated/prisma/client";

type MentionableMember = {
  userId: string;
  nickname: string | null;
  user: {
    name: string;
  };
  serverRoles: Array<{
    id: string;
    name: string;
    permissions: Array<{
      permission: Permission;
    }>;
  }>;
};

type MentionableRole = {
  id: string;
  name: string;
};

type MentionRecord = {
  type: MentionType;
  token: string;
  mentionedUserId?: string;
  mentionedRoleId?: string;
};

type BuildMentionPlanInput = {
  content: string;
  authorId: string;
  canUseMassMentions: boolean;
  channel: Pick<Channel, "id" | "isPublic"> & {
    allowedRoles: Array<{
      roleId: string;
    }>;
  };
  members: MentionableMember[];
  roles: MentionableRole[];
};

type MentionPlan = {
  mentions: MentionRecord[];
  receiptUserIds: string[];
};

const MENTION_PATTERN = /(^|[\s([{])@([A-Za-z0-9._-]{1,60})\b/g;

function normalizeMentionToken(value: string): string {
  return value.trim().toLowerCase();
}

function hasRolePermission(member: MentionableMember, permission: Permission): boolean {
  for (const role of member.serverRoles) {
    for (const item of role.permissions) {
      if (item.permission === permission) {
        return true;
      }
    }
  }

  return false;
}

function canMemberAccessChannel(
  member: MentionableMember,
  channel: Pick<Channel, "isPublic"> & {
    allowedRoles: Array<{
      roleId: string;
    }>;
  },
): boolean {
  const isOwner = member.serverRoles.some((role) => role.name === "Owner");
  if (isOwner) {
    return true;
  }

  if (hasRolePermission(member, "ADMINISTRATOR")) {
    return true;
  }

  if (channel.isPublic) {
    return true;
  }

  if (!hasRolePermission(member, "VIEW_CHANNEL")) {
    return false;
  }

  const allowedRoleIds = new Set(channel.allowedRoles.map((role) => role.roleId));
  return member.serverRoles.some((role) => allowedRoleIds.has(role.id));
}

function extractMentionTokens(content: string): string[] {
  const tokens = new Set<string>();
  const normalizedContent = content;

  for (const match of normalizedContent.matchAll(MENTION_PATTERN)) {
    const token = match[2]?.trim();
    if (!token) {
      continue;
    }

    tokens.add(normalizeMentionToken(token));
  }

  return Array.from(tokens);
}

export function buildMentionPlan(input: BuildMentionPlanInput): MentionPlan {
  const tokens = extractMentionTokens(input.content);

  if (tokens.length === 0) {
    return {
      mentions: [],
      receiptUserIds: [],
    };
  }

  const accessibleMembers = input.members.filter((member) => canMemberAccessChannel(member, input.channel));
  const accessibleMemberIds = new Set(accessibleMembers.map((member) => member.userId));

  const usernameMap = new Map<string, Set<string>>();
  const nicknameMap = new Map<string, Set<string>>();
  for (const member of accessibleMembers) {
    const usernameKey = normalizeMentionToken(member.user.name);
    if (!usernameMap.has(usernameKey)) {
      usernameMap.set(usernameKey, new Set());
    }
    usernameMap.get(usernameKey)?.add(member.userId);

    const nickname = member.nickname?.trim();
    if (nickname) {
      const nicknameKey = normalizeMentionToken(nickname);
      if (!nicknameMap.has(nicknameKey)) {
        nicknameMap.set(nicknameKey, new Set());
      }
      nicknameMap.get(nicknameKey)?.add(member.userId);
    }
  }

  const roleMap = new Map(input.roles.map((role) => [normalizeMentionToken(role.name), role]));

  const mentions: MentionRecord[] = [];
  const receiptUserIds = new Set<string>();
  const seenMentionKeys = new Set<string>();

  for (const token of tokens) {
    if (token === "everyone") {
      if (!input.canUseMassMentions) {
        continue;
      }

      const key = "EVERYONE:everyone";
      if (!seenMentionKeys.has(key)) {
        mentions.push({
          type: "EVERYONE",
          token,
        });
        seenMentionKeys.add(key);
      }

      for (const member of accessibleMembers) {
        if (member.userId !== input.authorId) {
          receiptUserIds.add(member.userId);
        }
      }
      continue;
    }

    if (token === "here") {
      if (!input.canUseMassMentions) {
        continue;
      }

      const key = "HERE:here";
      if (!seenMentionKeys.has(key)) {
        mentions.push({
          type: "HERE",
          token,
        });
        seenMentionKeys.add(key);
      }

      for (const member of accessibleMembers) {
        if (member.userId !== input.authorId) {
          receiptUserIds.add(member.userId);
        }
      }
      continue;
    }

    const role = roleMap.get(token);
    if (role) {
      const mentionKey = `ROLE:${role.id}`;
      if (!seenMentionKeys.has(mentionKey)) {
        mentions.push({
          type: "ROLE",
          token,
          mentionedRoleId: role.id,
        });
        seenMentionKeys.add(mentionKey);
      }

      for (const member of accessibleMembers) {
        const hasRole = member.serverRoles.some((memberRole) => memberRole.id === role.id);
        if (hasRole && member.userId !== input.authorId) {
          receiptUserIds.add(member.userId);
        }
      }
      continue;
    }

    const matchedUserIds = new Set<string>();
    const fromUsername = usernameMap.get(token);
    if (fromUsername) {
      for (const userId of fromUsername) {
        matchedUserIds.add(userId);
      }
    }

    const fromNickname = nicknameMap.get(token);
    if (fromNickname) {
      for (const userId of fromNickname) {
        matchedUserIds.add(userId);
      }
    }

    for (const userId of matchedUserIds) {
      if (!accessibleMemberIds.has(userId)) {
        continue;
      }

      const mentionKey = `USER:${userId}`;
      if (!seenMentionKeys.has(mentionKey)) {
        mentions.push({
          type: "USER",
          token,
          mentionedUserId: userId,
        });
        seenMentionKeys.add(mentionKey);
      }

      if (userId !== input.authorId) {
        receiptUserIds.add(userId);
      }
    }
  }

  return {
    mentions,
    receiptUserIds: Array.from(receiptUserIds),
  };
}

export type { MentionPlan, MentionRecord };