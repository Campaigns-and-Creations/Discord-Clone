import type { HomePageData } from "@/app/home-types";
import { ChannelDal } from "@/dal/channel";
import { MessagesDal } from "@/dal/messages";
import { ServerDal } from "@/dal/server";
import { ServerRolesDal } from "@/dal/serverRoles";
import { UserDal } from "@/dal/user";
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

      const roleNames = server.membershipId
        ? (await ServerRolesDal.listForMember(server.membershipId)).map((role) => role.name)
        : server.roleNames;

      return {
        id: server.id,
        name: server.name,
        picture: server.picture,
        createdAt: toIsoString(server.createdAt),
        membershipId: server.membershipId,
        roleNames,
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
