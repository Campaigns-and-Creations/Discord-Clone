import { ChannelDal } from "@/dal/channel";
import { MessagesDal } from "@/dal/messages";
import { ServerMemberDal } from "@/dal/serverMember";
import { unauthorizedResponse } from "@/utils/api-response";
import { toIsoString } from "@/utils/date";
import { resolveDisplayName } from "@/utils/display-name";
import { canAccessChannel } from "@/utils/permissions";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

function parseLimit(rawLimit: string | null): number {
  if (!rawLimit) {
    return DEFAULT_LIMIT;
  }

  const parsed = Number(rawLimit);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.floor(parsed), MAX_LIMIT);
}

export async function GET(request: Request) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return unauthorizedResponse();
  }

  const url = new URL(request.url);
  const channelId = (url.searchParams.get("channelId") ?? "").trim();
  const beforeMessageId = (url.searchParams.get("beforeMessageId") ?? "").trim();
  const limit = parseLimit(url.searchParams.get("limit"));

  if (!channelId || !beforeMessageId) {
    return NextResponse.json({ message: "channelId and beforeMessageId are required" }, { status: 400 });
  }

  const channel = await ChannelDal.findById(channelId);
  if (!channel) {
    return NextResponse.json({ message: "Channel not found" }, { status: 404 });
  }

  const canViewChannel = await canAccessChannel(sessionUser.id, channel.serverId, channel.id);
  if (!canViewChannel) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const result = await MessagesDal.listOlderByChannelId(channel.id, beforeMessageId, limit);
  const members = await ServerMemberDal.listByServerId(channel.serverId);
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

  return NextResponse.json({
    hasOlderMessages: result.hasOlderMessages,
    messages: result.messages.map((message) => {
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
  });
}
