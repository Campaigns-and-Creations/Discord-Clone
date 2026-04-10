import type { ChannelType, Permission } from "@/generated/prisma/client";

export type HomeUser = {
  id: string;
  name: string;
  image: string | null;
  email?: string;
};

export type HomeMessage = {
  id: string;
  content: string;
  createdAt: string;
  pinned: boolean;
  channelId: string;
  isMentionedForCurrentUser: boolean;
  author: {
    id: string;
    name: string;
    username: string;
    nickname: string | null;
    image: string | null;
  };
};

export type HomeChannel = {
  id: string;
  name: string;
  type: ChannelType;
  createdAt: string;
  serverId: string;
  isPublic: boolean;
  allowedRoleIds: string[];
  messages: HomeMessage[];
  hasOlderMessages: boolean;
  unreadMentionCount: number;
};

export type HomeRole = {
  id: string;
  name: string;
  position: number;
  permissions: Permission[];
};

export type HomeServerMember = {
  memberId: string;
  userId: string;
  name: string;
  username: string;
  nickname: string | null;
  image: string | null;
  roleIds: string[];
  roleNames: string[];
};

export type HomeBannedUser = {
  userId: string;
  name: string;
  username: string;
  image: string | null;
};

export type HomeServer = {
  id: string;
  name: string;
  picture: string | null;
  createdAt: string;
  membershipId: string | null;
  roleNames: string[];
  permissions: Permission[];
  capabilities: {
    canManageServer: boolean;
    canCreateChannels: boolean;
    canInviteMembers: boolean;
    canManageMessages: boolean;
    canPinMessages: boolean;
    canModerateMembers: boolean;
    canKickMembers: boolean;
    canBanMembers: boolean;
    canSendMessages: boolean;
    canMentionEveryone: boolean;
  };
  roles: HomeRole[];
  members: HomeServerMember[];
  bannedUsers: HomeBannedUser[];
  channels: HomeChannel[];
  hasUnreadMentions: boolean;
};

export type HomePageData = {
  currentUser: HomeUser;
  servers: HomeServer[];
};
