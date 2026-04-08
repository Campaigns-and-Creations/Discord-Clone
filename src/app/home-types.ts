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
    canSendMessages: boolean;
  };
  roles: HomeRole[];
  members: HomeServerMember[];
  channels: HomeChannel[];
};

export type HomePageData = {
  currentUser: HomeUser;
  servers: HomeServer[];
};
