import type { HomePageData } from "@/app/home-types";
import { ChannelDal } from "@/dal/channel";
import { MessagesDal } from "@/dal/messages";
import { ServerDal } from "@/dal/server";
import { Permission } from "@/generated/prisma";
import { UserDal } from "@/dal/user";
import { getMembershipPermissions } from "@/utils/permissions";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

function toIsoString(value: Date): string {
  return value.toISOString();
}

export async function GET() {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [dbUser, servers] = await Promise.all([
    UserDal.getById(sessionUser.id),
    ServerDal.listForUser(sessionUser.id),
  ]);

  const serversWithChannels = await Promise.all(
    servers.map(async (server) => {
      const channels = await ChannelDal.listByServerId(server.id);

      const channelsWithMessages = await Promise.all(
        channels.map(async (channel) => {
          const messages = await MessagesDal.listByChannelId(channel.id);

          return {
            ...channel,
            createdAt: toIsoString(channel.createdAt),
            messages: messages.map((message) => ({
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
            })),
          };
        }),
      );

      const membershipPermissions = await getMembershipPermissions(sessionUser.id, server.id);
      const roleNames = server.membershipId
        ? membershipPermissions?.roleNames ?? []
        : server.roleNames;
      const permissions = membershipPermissions?.permissions ?? [];

      const hasPermission = (...required: Permission[]) =>
        required.some((permission) => permissions.includes(permission));

      return {
        id: server.id,
        name: server.name,
        picture: server.picture,
        createdAt: toIsoString(server.createdAt),
        membershipId: server.membershipId,
        roleNames,
        permissions,
        capabilities: {
          canCreateChannels: hasPermission(Permission.ADMINISTRATOR, Permission.MANAGE_CHANNELS),
          canInviteMembers: hasPermission(Permission.ADMINISTRATOR, Permission.CREATE_INVITE),
          canManageMessages: hasPermission(Permission.ADMINISTRATOR, Permission.MANAGE_MESSAGES),
          canPinMessages: hasPermission(
            Permission.ADMINISTRATOR,
            Permission.PIN_MESSAGES,
            Permission.MANAGE_MESSAGES,
          ),
          canModerateMembers: hasPermission(Permission.ADMINISTRATOR, Permission.MODERATE_MEMBERS),
          canSendMessages: hasPermission(Permission.ADMINISTRATOR, Permission.SEND_MESSAGES),
        },
        channels: channelsWithMessages,
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
