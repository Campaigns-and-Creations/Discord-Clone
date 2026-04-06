import { logger } from "@/utils/logger";
import { getServerUser } from "@/utils/session";
import { createStreamUserToken, getStreamConfig, getStreamServerClient } from "@/utils/stream";
import { NextResponse } from "next/server";

export async function POST() {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const normalizedName = sessionUser.name?.trim() || sessionUser.email?.trim() || sessionUser.id;
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
