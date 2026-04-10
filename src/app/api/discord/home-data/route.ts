import type { HomePageData } from "@/app/home-types";
import { BanListDal } from "@/dal/banlist";
import { ChannelDal } from "@/dal/channel";
import { MessageMentionsDal } from "@/dal/messageMentions";
import { MessagesDal } from "@/dal/messages";
import { ServerDal } from "@/dal/server";
import { ServerMemberDal } from "@/dal/serverMember";
import { ServerRolesDal } from "@/dal/serverRoles";
import { Permission } from "@/generated/prisma/client";
import { UserDal } from "@/dal/user";
import { unauthorizedResponse } from "@/utils/api-response";
import { toIsoString } from "@/utils/date";
import { resolveDisplayName } from "@/utils/display-name";
import { getMembershipPermissions } from "@/utils/permissions";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

const INITIAL_CHANNEL_MESSAGES_LIMIT = 50;

export async function GET() {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return unauthorizedResponse();
  }

  const [dbUser, servers] = await Promise.all([
    UserDal.getById(sessionUser.id),
    ServerDal.listForUser(sessionUser.id),
  ]);

  const serversWithChannels = await Promise.all(
    servers.map(async (server) => {
      const [membershipPermissions, membership] = await Promise.all([
        getMembershipPermissions(sessionUser.id, server.id),
        ServerRolesDal.listForUserInServer(sessionUser.id, server.id),
      ]);

      const memberRoleIds = membership?.serverRoles.map((role) => role.id) ?? [];
      const includeRestrictedBypass =
        membershipPermissions?.isOwner === true ||
        (membershipPermissions?.permissions ?? []).includes(Permission.ADMINISTRATOR);

      const channels = await ChannelDal.listAccessibleByServerId(
        server.id,
        memberRoleIds,
        includeRestrictedBypass,
      );

      const [roles, members, bannedUsers] = await Promise.all([
        ServerRolesDal.listByServerId(server.id),
        ServerMemberDal.listByServerId(server.id),
        BanListDal.listBannedUsers(server.id),
      ]);

      const displayNameByUserId = new Map(
        members.map((member) => [
          member.userId,
          {
            nickname: member.nickname,
            username: member.user.name,
            displayName: resolveDisplayName(member.nickname, member.user.name),
          },
        ]),
      );

      const channelsWithMessages = await Promise.all(
        channels.map(async (channel) => {
          const channelMessages = await MessagesDal.listLatestByChannelId(
            channel.id,
            INITIAL_CHANNEL_MESSAGES_LIMIT,
          );

          return {
            ...channel,
            createdAt: toIsoString(channel.createdAt),
            allowedRoleIds: channel.allowedRoles.map((item) => item.roleId),
            messages: channelMessages.messages.map((message) => {
              const authorIdentity = displayNameByUserId.get(message.author.id);

              return {
                id: message.id,
                content: message.content,
                createdAt: toIsoString(message.createdAt),
                pinned: message.pinned,
                channelId: message.channelId,
                author: {
                  id: message.author.id,
                  name: authorIdentity?.displayName ?? message.author.name,
                  username: authorIdentity?.username ?? message.author.name,
                  nickname: authorIdentity?.nickname ?? null,
                  image: message.author.image,
                },
              };
            }),
            hasOlderMessages: channelMessages.hasOlderMessages,
          };
        }),
      );

      const channelIds = channelsWithMessages.map((channel) => channel.id);
      const messageIds = channelsWithMessages.flatMap((channel) =>
        channel.messages.map((message) => message.id),
      );

      const [mentionedMessageIds, unseenMentionCountsByChannel] = await Promise.all([
        MessageMentionsDal.listMentionedMessageIdsForUser(sessionUser.id, messageIds),
        MessageMentionsDal.listUnseenMentionCountsByChannelForUser(sessionUser.id, channelIds),
      ]);

      const roleNames = server.membershipId
        ? membershipPermissions?.roleNames ?? []
        : server.roleNames;
      const permissions = membershipPermissions?.permissions ?? [];

      const hasPermission = (...required: Permission[]) =>
        required.some((permission) => permissions.includes(permission));

      const hydratedChannels = channelsWithMessages.map((channel) => ({
        ...channel,
        unreadMentionCount: unseenMentionCountsByChannel.get(channel.id) ?? 0,
        messages: channel.messages.map((message) => {
          return {
            id: message.id,
            content: message.content,
            createdAt: message.createdAt,
            pinned: message.pinned,
            channelId: message.channelId,
            isMentionedForCurrentUser: mentionedMessageIds.has(message.id),
            author: message.author,
          };
        }),
      }));

      return {
        id: server.id,
        name: server.name,
        picture: server.picture,
        createdAt: toIsoString(server.createdAt),
        membershipId: server.membershipId,
        roleNames,
        permissions,
        capabilities: {
          canManageServer: hasPermission(Permission.ADMINISTRATOR, Permission.MANAGE_SERVER),
          canCreateChannels: hasPermission(Permission.ADMINISTRATOR, Permission.MANAGE_CHANNELS),
          canInviteMembers: hasPermission(Permission.ADMINISTRATOR, Permission.CREATE_INVITE),
          canManageMessages: hasPermission(Permission.ADMINISTRATOR, Permission.MANAGE_MESSAGES),
          canPinMessages: hasPermission(
            Permission.ADMINISTRATOR,
            Permission.PIN_MESSAGES,
            Permission.MANAGE_MESSAGES,
          ),
          canModerateMembers: hasPermission(Permission.ADMINISTRATOR, Permission.MODERATE_MEMBERS),
          canKickMembers: hasPermission(Permission.ADMINISTRATOR, Permission.KICK_MEMBERS),
          canBanMembers: hasPermission(Permission.ADMINISTRATOR, Permission.BAN_MEMBERS),
          canSendMessages: hasPermission(Permission.ADMINISTRATOR, Permission.SEND_MESSAGES),
          canMentionEveryone: hasPermission(Permission.ADMINISTRATOR, Permission.MENTION_EVERYONE),
        },
        roles: roles.map((role) => ({
          id: role.id,
          name: role.name,
          position: role.position,
          permissions: role.permissions.map((item) => item.permission),
        })),
        members: members
          .map((member) => ({
            memberId: member.id,
            userId: member.userId,
            name: resolveDisplayName(member.nickname, member.user.name),
            username: member.user.name,
            nickname: member.nickname,
            image: member.user.image,
            roleIds: member.serverRoles.map((role) => role.id),
            roleNames: member.serverRoles.map((role) => role.name),
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
        bannedUsers: bannedUsers.map((bannedUser) => ({
          userId: bannedUser.id,
          name: bannedUser.name,
          username: bannedUser.name,
          image: bannedUser.image,
        })),
        channels: hydratedChannels,
        hasUnreadMentions: hydratedChannels.some((channel) => channel.unreadMentionCount > 0),
      };
    }),
  );

  const payload: HomePageData = {
    currentUser: {
      id: sessionUser.id,
      name: dbUser?.name ?? sessionUser.name,
      image: dbUser?.image ?? (sessionUser.image ?? null),
      email: dbUser?.email ?? sessionUser.email,
    },
    servers: serversWithChannels,
  };

  return NextResponse.json(payload);
}
