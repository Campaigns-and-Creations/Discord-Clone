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

export type StreamStatePayload = {
  activeScreenshares: ActiveScreenshareSummary[];
  watchingStreamerUserIds: string[];
  realtimeChannel: string;
  resolvedTargetStreamerUserId?: string;
  message?: string;
};

export const STREAM_STATE_BROADCAST_EVENT = "stream-state";
