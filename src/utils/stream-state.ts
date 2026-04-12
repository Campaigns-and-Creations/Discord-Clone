type StreamWatcher = {
  userId: string;
  name: string;
  image: string | null;
  lastSeenAt: number;
};

type ActiveScreenshare = {
  streamerUserId: string;
  streamerName: string;
  streamerImage: string | null;
  lastSeenAt: number;
  watchers: Map<string, StreamWatcher>;
};

type StreamChannelState = {
  screenshares: Map<string, ActiveScreenshare>;
};

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

type GlobalStreamState = typeof globalThis & {
  __discordStreamChannelStateByKey?: Map<string, StreamChannelState>;
};

const globalStreamState = globalThis as GlobalStreamState;
const streamChannelStateByKey =
  globalStreamState.__discordStreamChannelStateByKey ?? new Map<string, StreamChannelState>();

if (!globalStreamState.__discordStreamChannelStateByKey) {
  globalStreamState.__discordStreamChannelStateByKey = streamChannelStateByKey;
}

function getKey(serverId: string, channelId: string): string {
  return `${serverId}:${channelId}`;
}

function getOrCreateChannelState(serverId: string, channelId: string): StreamChannelState {
  const key = getKey(serverId, channelId);
  const existing = streamChannelStateByKey.get(key);

  if (existing) {
    return existing;
  }

  const created: StreamChannelState = {
    screenshares: new Map(),
  };

  streamChannelStateByKey.set(key, created);
  return created;
}

function cleanupChannelState(_serverId: string, _channelId: string, _state: StreamChannelState): void {
  // Event-driven flow uses explicit start/stop/watch/unwatch mutations rather than heartbeat expiry.
}

export function getStreamStateSnapshot(serverId: string, channelId: string): StreamChannelSnapshot {
  const key = getKey(serverId, channelId);
  const state = streamChannelStateByKey.get(key);

  if (!state) {
    return { activeScreenshares: [] };
  }

  cleanupChannelState(serverId, channelId, state);

  if (state.screenshares.size === 0) {
    streamChannelStateByKey.delete(key);
    return { activeScreenshares: [] };
  }

  return {
    activeScreenshares: Array.from(state.screenshares.values())
      .map((screenshare) => ({
        streamerUserId: screenshare.streamerUserId,
        streamerName: screenshare.streamerName,
        streamerImage: screenshare.streamerImage,
        watcherCount: screenshare.watchers.size,
        watchers: Array.from(screenshare.watchers.values())
          .map((watcher) => ({
            userId: watcher.userId,
            name: watcher.name,
            image: watcher.image,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.streamerName.localeCompare(b.streamerName)),
  };
}

export function syncScreenshare(
  serverId: string,
  channelId: string,
  payload: {
    streamerUserId: string;
    streamerName: string;
    streamerImage: string | null;
  },
): { ok: true } {
  const state = getOrCreateChannelState(serverId, channelId);
  cleanupChannelState(serverId, channelId, state);

  const existing = state.screenshares.get(payload.streamerUserId);

  if (existing) {
    existing.lastSeenAt = Date.now();
    existing.streamerName = payload.streamerName;
    existing.streamerImage = payload.streamerImage;
    state.screenshares.set(payload.streamerUserId, existing);
    return { ok: true };
  }

  state.screenshares.set(payload.streamerUserId, {
    streamerUserId: payload.streamerUserId,
    streamerName: payload.streamerName,
    streamerImage: payload.streamerImage,
    lastSeenAt: Date.now(),
    watchers: new Map(),
  });

  return { ok: true };
}

export function stopScreenshare(
  serverId: string,
  channelId: string,
  streamerUserId: string,
): { ok: true } {
  const state = getOrCreateChannelState(serverId, channelId);
  cleanupChannelState(serverId, channelId, state);

  state.screenshares.delete(streamerUserId);

  if (state.screenshares.size === 0) {
    streamChannelStateByKey.delete(getKey(serverId, channelId));
  }

  return { ok: true };
}

export function setWatchingState(
  serverId: string,
  channelId: string,
  payload: {
    targetStreamerUserId: string;
    userId: string;
    name: string;
    image: string | null;
    watching: boolean;
  },
): { ok: true } | { ok: false; reason: "stream-not-live" | "streamer-cannot-watch" } {
  const state = getOrCreateChannelState(serverId, channelId);
  cleanupChannelState(serverId, channelId, state);

  const screenshare = state.screenshares.get(payload.targetStreamerUserId);

  if (!screenshare) {
    return { ok: false, reason: "stream-not-live" };
  }

  if (payload.targetStreamerUserId === payload.userId) {
    return { ok: false, reason: "streamer-cannot-watch" };
  }

  screenshare.lastSeenAt = Date.now();

  if (!payload.watching) {
    screenshare.watchers.delete(payload.userId);
    state.screenshares.set(payload.targetStreamerUserId, screenshare);
    return { ok: true };
  }

  screenshare.watchers.set(payload.userId, {
    userId: payload.userId,
    name: payload.name,
    image: payload.image,
    lastSeenAt: Date.now(),
  });

  state.screenshares.set(payload.targetStreamerUserId, screenshare);
  return { ok: true };
}

export function heartbeatWatcher(
  serverId: string,
  channelId: string,
  targetStreamerUserId: string,
  userId: string,
  name: string,
  image: string | null,
): { ok: true } | { ok: false; reason: "stream-not-live" } {
  const state = getOrCreateChannelState(serverId, channelId);
  cleanupChannelState(serverId, channelId, state);

  const screenshare = state.screenshares.get(targetStreamerUserId);

  if (!screenshare) {
    return { ok: false, reason: "stream-not-live" };
  }

  const existingWatcher = screenshare.watchers.get(userId);
  screenshare.watchers.set(userId, {
    userId,
    name,
    image,
    lastSeenAt: Date.now(),
  });

  if (existingWatcher) {
    existingWatcher.lastSeenAt = Date.now();
  }

  screenshare.lastSeenAt = Date.now();
  state.screenshares.set(targetStreamerUserId, screenshare);

  return { ok: true };
}

export function unwatchAllScreenshares(serverId: string, channelId: string, userId: string): { ok: true } {
  const state = getOrCreateChannelState(serverId, channelId);
  cleanupChannelState(serverId, channelId, state);

  for (const screenshare of state.screenshares.values()) {
    screenshare.watchers.delete(userId);
  }

  return { ok: true };
}
