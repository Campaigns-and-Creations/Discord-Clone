import { MessageMentionsDal } from "@/dal/messageMentions";
import { ChannelDal } from "@/dal/channel";
import { unauthorizedResponse } from "@/utils/api-response";
import { canAccessChannel } from "@/utils/permissions";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

type SeenMentionsBody = {
  channelId?: string;
  latestVisibleMessageId?: string;
};

export async function POST(request: Request) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return unauthorizedResponse();
  }

  const body = (await request.json().catch(() => null)) as SeenMentionsBody | null;
  const channelId = body?.channelId?.trim();
  const latestVisibleMessageId = body?.latestVisibleMessageId?.trim();

  if (!channelId || !latestVisibleMessageId) {
    return NextResponse.json(
      { message: "channelId and latestVisibleMessageId are required." },
      { status: 400 },
    );
  }

  const channel = await ChannelDal.findById(channelId);
  if (!channel) {
    return NextResponse.json({ message: "Channel not found." }, { status: 404 });
  }

  const hasAccess = await canAccessChannel(sessionUser.id, channel.serverId, channel.id);
  if (!hasAccess) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const updatedCount = await MessageMentionsDal.markSeenInChannelUpToMessage(
    sessionUser.id,
    channel.id,
    latestVisibleMessageId,
  );

  return NextResponse.json({ updatedCount });
}
