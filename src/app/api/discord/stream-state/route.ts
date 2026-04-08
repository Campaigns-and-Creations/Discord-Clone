import { ChannelDal } from "@/dal/channel";
import { ChannelType } from "@/generated/prisma/client";
import { logger } from "@/utils/logger";
import { canAccessChannel } from "@/utils/permissions";
import { getServerUser } from "@/utils/session";
import {
  getStreamStateSnapshot,
  heartbeatWatcher,
  setWatchingState,
  stopScreenshare,
  syncScreenshare,
  unwatchAllScreenshares,
} from "@/utils/stream-state";
import { NextResponse } from "next/server";

type StreamAction =
  | "sync-screenshare"
  | "stop-screenshare"
  | "watch-screenshare"
  | "unwatch-screenshare"
  | "heartbeat-screenshare"
  | "unwatch-all";

type RequestBody = {
  serverId?: string;
  channelId?: string;
  action?: StreamAction;
  targetStreamerUserId?: string;
  targetStreamerName?: string;
  targetStreamerImage?: string | null;
};

function validateIds(serverId: string | undefined, channelId: string | undefined) {
  if (!serverId || !channelId) {
    return NextResponse.json({ message: "serverId and channelId are required." }, { status: 400 });
  }

  return null;
}

async function ensureVoiceChannelAccess(userId: string, serverId: string, channelId: string) {
  const [hasAccess, channel] = await Promise.all([
    canAccessChannel(userId, serverId, channelId),
    ChannelDal.findById(channelId),
  ]);

  if (!hasAccess || !channel || channel.serverId !== serverId) {
    return NextResponse.json({ message: "Channel not found." }, { status: 404 });
  }

  if (channel.type !== ChannelType.VOICE) {
    return NextResponse.json({ message: "Stream state is only available for voice channels." }, { status: 400 });
  }

  return null;
}

function resolveTargetStreamerUserId(
  serverId: string,
  channelId: string,
  targetStreamerUserId: string,
  targetStreamerName?: string,
): string | null {
  const snapshot = getStreamStateSnapshot(serverId, channelId);

  const exactIdMatch = snapshot.activeScreenshares.find(
    (screenshare) => screenshare.streamerUserId === targetStreamerUserId,
  );
  if (exactIdMatch) {
    return exactIdMatch.streamerUserId;
  }

  const normalizedTargetName = targetStreamerName?.trim().toLowerCase();
  if (normalizedTargetName) {
    const nameMatch = snapshot.activeScreenshares.find(
      (screenshare) => screenshare.streamerName.trim().toLowerCase() === normalizedTargetName,
    );

    if (nameMatch) {
      return nameMatch.streamerUserId;
    }
  }

  if (snapshot.activeScreenshares.length === 1) {
    return snapshot.activeScreenshares[0].streamerUserId;
  }

  return null;
}

function snapshotResponse(
  serverId: string,
  channelId: string,
  sessionUserId: string,
  options?: {
    message?: string;
    resolvedTargetStreamerUserId?: string | null;
  },
) {
  const snapshot = getStreamStateSnapshot(serverId, channelId);
  const watchingStreamerUserIds = snapshot.activeScreenshares
    .filter((screenshare) =>
      screenshare.watchers.some((watcher) => watcher.userId === sessionUserId),
    )
    .map((screenshare) => screenshare.streamerUserId);

  return NextResponse.json({
    ...snapshot,
    watchingStreamerUserIds,
    resolvedTargetStreamerUserId: options?.resolvedTargetStreamerUserId ?? undefined,
    message: options?.message,
  });
}

export async function GET(request: Request) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const serverId = url.searchParams.get("serverId") ?? undefined;
  const channelId = url.searchParams.get("channelId") ?? undefined;

  const validationError = validateIds(serverId, channelId);
  if (validationError) {
    return validationError;
  }

  const resolvedServerId = serverId as string;
  const resolvedChannelId = channelId as string;

  const accessError = await ensureVoiceChannelAccess(sessionUser.id, resolvedServerId, resolvedChannelId);
  if (accessError) {
    return accessError;
  }

  const snapshot = getStreamStateSnapshot(resolvedServerId, resolvedChannelId);
  const watchingStreamerUserIds = snapshot.activeScreenshares
    .filter((screenshare) =>
      screenshare.watchers.some((watcher) => watcher.userId === sessionUser.id),
    )
    .map((screenshare) => screenshare.streamerUserId);

  return NextResponse.json({
    ...snapshot,
    watchingStreamerUserIds,
  });
}

export async function POST(request: Request) {
  const sessionUser = await getServerUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as RequestBody | null;
  const serverId = body?.serverId;
  const channelId = body?.channelId;
  const action = body?.action;
  const targetStreamerUserId = body?.targetStreamerUserId;
  const targetStreamerName = body?.targetStreamerName;
  const targetStreamerImage = body?.targetStreamerImage;

  const validationError = validateIds(serverId, channelId);
  if (validationError) {
    return validationError;
  }

  const resolvedServerId = serverId as string;
  const resolvedChannelId = channelId as string;

  if (!action) {
    return NextResponse.json({ message: "action is required." }, { status: 400 });
  }

  const accessError = await ensureVoiceChannelAccess(sessionUser.id, resolvedServerId, resolvedChannelId);
  if (accessError) {
    return accessError;
  }

  const normalizedName = sessionUser.name?.trim() || sessionUser.email?.trim() || sessionUser.id;
  const normalizedImage = sessionUser.image?.trim() || null;
  let resolvedTargetStreamerUserIdForResponse: string | null = null;

  if (action === "sync-screenshare") {
    syncScreenshare(resolvedServerId, resolvedChannelId, {
      streamerUserId: sessionUser.id,
      streamerName: normalizedName,
      streamerImage: normalizedImage,
    });
  }

  if (action === "stop-screenshare") {
    stopScreenshare(resolvedServerId, resolvedChannelId, sessionUser.id);
  }

  if (action === "watch-screenshare") {
    if (!targetStreamerUserId) {
      return NextResponse.json({ message: "targetStreamerUserId is required." }, { status: 400 });
    }

    const snapshotBeforeWatch = getStreamStateSnapshot(resolvedServerId, resolvedChannelId);

    let resolvedTargetStreamerUserId = resolveTargetStreamerUserId(
      resolvedServerId,
      resolvedChannelId,
      targetStreamerUserId,
      targetStreamerName,
    );

    logger.debug({
      context: "stream_state.watch.request",
      serverId: resolvedServerId,
      channelId: resolvedChannelId,
      watcherUserId: sessionUser.id,
      requestedTargetStreamerUserId: targetStreamerUserId,
      requestedTargetStreamerName: targetStreamerName,
      resolvedTargetStreamerUserId,
      activeScreenshareIds: snapshotBeforeWatch.activeScreenshares.map((item) => item.streamerUserId),
      activeScreenshareNames: snapshotBeforeWatch.activeScreenshares.map((item) => item.streamerName),
    });

    let usedBootstrapSync = false;

    if (!resolvedTargetStreamerUserId) {
      const fallbackName = targetStreamerName?.trim() || targetStreamerUserId;
      const fallbackImage = targetStreamerImage?.trim() || null;

      logger.warn({
        context: "stream_state.watch.bootstrap_missing_stream",
        serverId: resolvedServerId,
        channelId: resolvedChannelId,
        watcherUserId: sessionUser.id,
        requestedTargetStreamerUserId: targetStreamerUserId,
        requestedTargetStreamerName: targetStreamerName,
      });

      syncScreenshare(resolvedServerId, resolvedChannelId, {
        streamerUserId: targetStreamerUserId,
        streamerName: fallbackName,
        streamerImage: fallbackImage,
      });

      usedBootstrapSync = true;
      // Use the explicit target key we just synced to avoid a second resolution race.
      resolvedTargetStreamerUserId = targetStreamerUserId;
    }

    if (!resolvedTargetStreamerUserId) {
      logger.warn({
        context: "stream_state.watch.resolve_failed",
        serverId: resolvedServerId,
        channelId: resolvedChannelId,
        watcherUserId: sessionUser.id,
        requestedTargetStreamerUserId: targetStreamerUserId,
        requestedTargetStreamerName: targetStreamerName,
      });

      return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
        message: "This screenshare is not active anymore.",
      });
    }

    resolvedTargetStreamerUserIdForResponse = resolvedTargetStreamerUserId;

    let result = setWatchingState(resolvedServerId, resolvedChannelId, {
      targetStreamerUserId: resolvedTargetStreamerUserId,
      userId: sessionUser.id,
      name: normalizedName,
      image: normalizedImage,
      watching: true,
    });

    if (!result.ok && result.reason === "stream-not-live") {
      const retryName = targetStreamerName?.trim() || resolvedTargetStreamerUserId;
      const retryImage = targetStreamerImage?.trim() || null;

      logger.warn({
        context: "stream_state.watch.retry_after_stream_not_live",
        serverId: resolvedServerId,
        channelId: resolvedChannelId,
        watcherUserId: sessionUser.id,
        requestedTargetStreamerUserId: targetStreamerUserId,
        resolvedTargetStreamerUserId,
        usedBootstrapSync,
      });

      syncScreenshare(resolvedServerId, resolvedChannelId, {
        streamerUserId: resolvedTargetStreamerUserId,
        streamerName: retryName,
        streamerImage: retryImage,
      });

      result = setWatchingState(resolvedServerId, resolvedChannelId, {
        targetStreamerUserId: resolvedTargetStreamerUserId,
        userId: sessionUser.id,
        name: normalizedName,
        image: normalizedImage,
        watching: true,
      });
    }

    if (!result.ok) {
      logger.warn({
        context: "stream_state.watch.set_failed",
        serverId: resolvedServerId,
        channelId: resolvedChannelId,
        watcherUserId: sessionUser.id,
        requestedTargetStreamerUserId: targetStreamerUserId,
        resolvedTargetStreamerUserId,
        reason: result.reason,
      });

      if (result.reason === "stream-not-live") {
        return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
          message: "This screenshare is not active anymore.",
          resolvedTargetStreamerUserId: resolvedTargetStreamerUserIdForResponse,
        });
      }

      return NextResponse.json({ message: "Streamer cannot watch their own screenshare." }, { status: 400 });
    }

    const snapshotAfterWatch = getStreamStateSnapshot(resolvedServerId, resolvedChannelId);
    const targetScreenshare = snapshotAfterWatch.activeScreenshares.find(
      (item) => item.streamerUserId === resolvedTargetStreamerUserId,
    );

    logger.info({
      context: "stream_state.watch.success",
      serverId: resolvedServerId,
      channelId: resolvedChannelId,
      watcherUserId: sessionUser.id,
      requestedTargetStreamerUserId: targetStreamerUserId,
      resolvedTargetStreamerUserId,
      watcherCountForTarget: targetScreenshare?.watcherCount ?? 0,
      watcherIdsForTarget: targetScreenshare?.watchers.map((watcher) => watcher.userId) ?? [],
    });
  }

  if (action === "unwatch-screenshare") {
    if (!targetStreamerUserId) {
      return NextResponse.json({ message: "targetStreamerUserId is required." }, { status: 400 });
    }

    const resolvedTargetStreamerUserId = resolveTargetStreamerUserId(
      resolvedServerId,
      resolvedChannelId,
      targetStreamerUserId,
      targetStreamerName,
    );

    if (!resolvedTargetStreamerUserId) {
      return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
        message: "This screenshare is not active anymore.",
      });
    }

    resolvedTargetStreamerUserIdForResponse = resolvedTargetStreamerUserId;

    const result = setWatchingState(resolvedServerId, resolvedChannelId, {
      targetStreamerUserId: resolvedTargetStreamerUserId,
      userId: sessionUser.id,
      name: normalizedName,
      image: normalizedImage,
      watching: false,
    });

    if (!result.ok && result.reason === "stream-not-live") {
      return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
        message: "This screenshare is not active anymore.",
        resolvedTargetStreamerUserId: resolvedTargetStreamerUserIdForResponse,
      });
    }
  }

  if (action === "heartbeat-screenshare") {
    if (!targetStreamerUserId) {
      return NextResponse.json({ message: "targetStreamerUserId is required." }, { status: 400 });
    }

    const resolvedTargetStreamerUserId = resolveTargetStreamerUserId(
      resolvedServerId,
      resolvedChannelId,
      targetStreamerUserId,
      targetStreamerName,
    );

    if (!resolvedTargetStreamerUserId) {
      return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
        message: "This screenshare is not active anymore.",
      });
    }

    resolvedTargetStreamerUserIdForResponse = resolvedTargetStreamerUserId;

    const result = heartbeatWatcher(
      resolvedServerId,
      resolvedChannelId,
      resolvedTargetStreamerUserId,
      sessionUser.id,
      normalizedName,
      normalizedImage,
    );

    if (!result.ok && result.reason === "stream-not-live") {
      return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
        message: "This screenshare is not active anymore.",
        resolvedTargetStreamerUserId: resolvedTargetStreamerUserIdForResponse,
      });
    }
  }

  if (action === "unwatch-all") {
    unwatchAllScreenshares(resolvedServerId, resolvedChannelId, sessionUser.id);
  }

  return snapshotResponse(resolvedServerId, resolvedChannelId, sessionUser.id, {
    resolvedTargetStreamerUserId: resolvedTargetStreamerUserIdForResponse,
  });
}
