import { ChannelDal } from "@/dal/channel";
import { ServerMemberDal } from "@/dal/serverMember";
import { getServerUser } from "@/utils/session";
import { NextResponse } from "next/server";

function toIsoString(value: Date): string {
  return value.toISOString();
}

type RouteContext = {
  params: Promise<{ serverId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { serverId } = await context.params;

  const isMember = await ServerMemberDal.isUserMemberOfServer(sessionUser.id, serverId);
  if (!isMember) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const channels = await ChannelDal.listByServerId(serverId);

  return NextResponse.json(
    channels.map((channel) => ({
      ...channel,
      createdAt: toIsoString(channel.createdAt),
    })),
  );
}
