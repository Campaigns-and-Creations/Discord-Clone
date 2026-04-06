import { ChannelDal } from "@/dal/channel";
import { MessagesDal } from "@/dal/messages";
import { ServerMemberDal } from "@/dal/serverMember";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

function toIsoString(value: Date): string {
  return value.toISOString();
}

type RouteContext = {
  params: Promise<{ serverId: string; channelId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { serverId, channelId } = await context.params;

  const [isMember, channel] = await Promise.all([
    ServerMemberDal.isUserMemberOfChannel(sessionUser.id, channelId),
    ChannelDal.findById(channelId),
  ]);

  if (!isMember || !channel || channel.serverId !== serverId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const messages = await MessagesDal.listByChannelId(channelId);

  return NextResponse.json(
    messages.map((message) => ({
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
  );
}
