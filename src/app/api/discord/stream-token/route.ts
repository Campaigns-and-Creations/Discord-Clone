import { ServerMemberDal } from "@/dal/serverMember";
import { unauthorizedResponse } from "@/utils/api-response";
import { resolveDisplayName } from "@/utils/display-name";
import { logger } from "@/utils/logger";
import { getServerUser } from "@/utils/session";
import { createStreamUserToken, getStreamConfig, getStreamServerClient } from "@/utils/stream";
import { NextResponse } from "next/server";

type RequestBody = {
  serverId?: string;
};

export async function POST(request: Request) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return unauthorizedResponse();
  }

  const body = (await request.json().catch(() => null)) as RequestBody | null;
  const serverId = body?.serverId?.trim();
  const membership = serverId
    ? await ServerMemberDal.findByUserAndServer(sessionUser.id, serverId)
    : null;

  const normalizedName = resolveDisplayName(
    membership?.nickname,
    sessionUser.name?.trim() || sessionUser.email?.trim() || sessionUser.id,
  );
  const userImage = sessionUser.image?.trim() || undefined;

  try {
    const [token, config] = await Promise.all([
      Promise.resolve(createStreamUserToken(sessionUser.id)),
      Promise.resolve(getStreamConfig()),
      getStreamServerClient().upsertUsers([
        {
          id: sessionUser.id,
          name: normalizedName,
          image: userImage,
        },
      ]),
    ]);

    return NextResponse.json({
      apiKey: config.apiKey,
      token,
      user: {
        id: sessionUser.id,
        name: normalizedName,
        image: userImage ?? null,
      },
    });
  } catch (error) {
    logger.error({
      context: "stream_token.issue",
      message: "Failed to issue Stream user token",
      userId: sessionUser.id,
      error,
    });

    return NextResponse.json({ message: "Failed to issue Stream token" }, { status: 500 });
  }
}
