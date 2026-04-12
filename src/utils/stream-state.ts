import { getRedisClient } from "@/utils/redis";

export type StreamWatcherSummary = {
  userId: string;
  name: string;
  image: string | null;
};

export type ActiveScreenshareSummary = {
  streamerUserId: string;
  streamerName: string;
  streamerImage: string | null;
  watcherCount: number;
  watchers: StreamWatcherSummary[];
};

export type StreamChannelSnapshot = {
  activeScreenshares: ActiveScreenshareSummary[];
};

const ROOM_TTL_SECONDS = 60 * 60 * 6;

type RedisWatcherValue = {
  userId: string;
  name: string;
  image: string | null;
};

function roomStreamersKey(serverId: string, channelId: string): string {
  return `stream:room:${serverId}:${channelId}:streamers`;
}

function streamMetaKey(serverId: string, channelId: string, streamerUserId: string): string {
  return `stream:room:${serverId}:${channelId}:streamer:${streamerUserId}:meta`;
}

function streamWatchersKey(serverId: string, channelId: string, streamerUserId: string): string {
  return `stream:room:${serverId}:${channelId}:streamer:${streamerUserId}:watchers`;
}

async function touchRoomTtl(serverId: string, channelId: string, streamerUserId: string): Promise<void> {
  const redis = getRedisClient();
  await redis
    .multi()
    .expire(roomStreamersKey(serverId, channelId), ROOM_TTL_SECONDS)
    .expire(streamMetaKey(serverId, channelId, streamerUserId), ROOM_TTL_SECONDS)
    .expire(streamWatchersKey(serverId, channelId, streamerUserId), ROOM_TTL_SECONDS)
    .exec();
}

function safeParseWatcher(value: string | null): RedisWatcherValue | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as RedisWatcherValue;
    if (!parsed.userId || !parsed.name) {
      return null;
    }

    return {
      userId: parsed.userId,
      name: parsed.name,
      image: parsed.image ?? null,
    };
  } catch {
    return null;
  }
}

export async function getStreamStateSnapshot(serverId: string, channelId: string): Promise<StreamChannelSnapshot> {
  const redis = getRedisClient();
  const streamerUserIds = await redis.smembers(roomStreamersKey(serverId, channelId));

  if (streamerUserIds.length === 0) {
    return { activeScreenshares: [] };
  }

  const pipeline = redis.pipeline();

  for (const streamerUserId of streamerUserIds) {
    pipeline.hgetall(streamMetaKey(serverId, channelId, streamerUserId));
    pipeline.hgetall(streamWatchersKey(serverId, channelId, streamerUserId));
  }

  const results = await pipeline.exec();
  const activeScreenshares: ActiveScreenshareSummary[] = [];

  for (let index = 0; index < streamerUserIds.length; index += 1) {
    const streamerUserId = streamerUserIds[index];
    const metaResult = results?.[index * 2]?.[1] as Record<string, string> | undefined;
    const watchersResult = results?.[index * 2 + 1]?.[1] as Record<string, string> | undefined;

    if (!metaResult || !metaResult.streamerName) {
      await redis.srem(roomStreamersKey(serverId, channelId), streamerUserId);
      continue;
    }

    const watchers = Object.values(watchersResult ?? {})
      .map((value) => safeParseWatcher(value))
      .filter((watcher): watcher is RedisWatcherValue => watcher !== null)
      .sort((a, b) => a.name.localeCompare(b.name));

    activeScreenshares.push({
      streamerUserId,
      streamerName: metaResult.streamerName,
      streamerImage: metaResult.streamerImage || null,
      watcherCount: watchers.length,
      watchers,
    });
  }

  return {
    activeScreenshares: activeScreenshares.sort((a, b) => a.streamerName.localeCompare(b.streamerName)),
  };
}

export async function syncScreenshare(
  serverId: string,
  channelId: string,
  payload: {
    streamerUserId: string;
    streamerName: string;
    streamerImage: string | null;
  },
): Promise<{ ok: true }> {
  const redis = getRedisClient();

  await redis
    .multi()
    .sadd(roomStreamersKey(serverId, channelId), payload.streamerUserId)
    .hset(streamMetaKey(serverId, channelId, payload.streamerUserId), {
      streamerName: payload.streamerName,
      streamerImage: payload.streamerImage ?? "",
    })
    .exec();

  await touchRoomTtl(serverId, channelId, payload.streamerUserId);

  return { ok: true };
}

export async function stopScreenshare(
  serverId: string,
  channelId: string,
  streamerUserId: string,
): Promise<{ ok: true }> {
  const redis = getRedisClient();

  await redis
    .multi()
    .srem(roomStreamersKey(serverId, channelId), streamerUserId)
    .del(streamMetaKey(serverId, channelId, streamerUserId))
    .del(streamWatchersKey(serverId, channelId, streamerUserId))
    .exec();

  return { ok: true };
}

export async function setWatchingState(
  serverId: string,
  channelId: string,
  payload: {
    targetStreamerUserId: string;
    userId: string;
    name: string;
    image: string | null;
    watching: boolean;
  },
): Promise<{ ok: true } | { ok: false; reason: "stream-not-live" | "streamer-cannot-watch" }> {
  const redis = getRedisClient();

  const exists = await redis.sismember(
    roomStreamersKey(serverId, channelId),
    payload.targetStreamerUserId,
  );

  if (exists !== 1) {
    return { ok: false, reason: "stream-not-live" };
  }

  if (payload.targetStreamerUserId === payload.userId) {
    return { ok: false, reason: "streamer-cannot-watch" };
  }

  if (!payload.watching) {
    await redis.hdel(
      streamWatchersKey(serverId, channelId, payload.targetStreamerUserId),
      payload.userId,
    );

    await touchRoomTtl(serverId, channelId, payload.targetStreamerUserId);
    return { ok: true };
  }

  await redis.hset(
    streamWatchersKey(serverId, channelId, payload.targetStreamerUserId),
    payload.userId,
    JSON.stringify({
      userId: payload.userId,
      name: payload.name,
      image: payload.image,
    } satisfies RedisWatcherValue),
  );

  await touchRoomTtl(serverId, channelId, payload.targetStreamerUserId);
  return { ok: true };
}

export async function heartbeatWatcher(
  serverId: string,
  channelId: string,
  targetStreamerUserId: string,
  userId: string,
  name: string,
  image: string | null,
): Promise<{ ok: true } | { ok: false; reason: "stream-not-live" }> {
  const redis = getRedisClient();
  const exists = await redis.sismember(roomStreamersKey(serverId, channelId), targetStreamerUserId);

  if (exists !== 1) {
    return { ok: false, reason: "stream-not-live" };
  }

  await redis.hset(
    streamWatchersKey(serverId, channelId, targetStreamerUserId),
    userId,
    JSON.stringify({ userId, name, image } satisfies RedisWatcherValue),
  );

  await touchRoomTtl(serverId, channelId, targetStreamerUserId);

  return { ok: true };
}

export async function unwatchAllScreenshares(
  serverId: string,
  channelId: string,
  userId: string,
): Promise<{ ok: true }> {
  const redis = getRedisClient();
  const streamerUserIds = await redis.smembers(roomStreamersKey(serverId, channelId));

  if (streamerUserIds.length === 0) {
    return { ok: true };
  }

  const pipeline = redis.pipeline();

  for (const streamerUserId of streamerUserIds) {
    pipeline.hdel(streamWatchersKey(serverId, channelId, streamerUserId), userId);
    pipeline.expire(streamWatchersKey(serverId, channelId, streamerUserId), ROOM_TTL_SECONDS);
    pipeline.expire(streamMetaKey(serverId, channelId, streamerUserId), ROOM_TTL_SECONDS);
  }

  pipeline.expire(roomStreamersKey(serverId, channelId), ROOM_TTL_SECONDS);
  await pipeline.exec();

  return { ok: true };
}
