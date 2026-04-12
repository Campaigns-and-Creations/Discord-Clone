import "server-only";

import { createHmac } from "node:crypto";
import { getSupabaseServerClient } from "@/utils/supabase";
import { logger } from "@/utils/logger";
import { STREAM_STATE_BROADCAST_EVENT, type StreamStatePayload } from "@/utils/stream-realtime-shared";

const STREAM_CHANNEL_PREFIX = "stream-state";
const SUBSCRIBE_TIMEOUT_MS = 2_000;

function getChannelSecret(): string {
  const explicit = process.env.STREAM_REALTIME_SECRET?.trim();
  if (explicit && explicit.length > 0) {
    return explicit;
  }

  const authSecret = process.env.BETTER_AUTH_SECRET?.trim();
  if (authSecret && authSecret.length > 0) {
    return authSecret;
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (serviceRoleKey && serviceRoleKey.length > 0) {
    return serviceRoleKey;
  }

  throw new Error("Missing realtime channel secret. Set STREAM_REALTIME_SECRET or BETTER_AUTH_SECRET.");
}

export function buildStreamRealtimeChannel(serverId: string, channelId: string): string {
  const seed = `${serverId}:${channelId}`;
  const signature = createHmac("sha256", getChannelSecret()).update(seed).digest("hex").slice(0, 16);
  return `${STREAM_CHANNEL_PREFIX}:${serverId}:${channelId}:${signature}`;
}

function waitForSubscription(channel: ReturnType<ReturnType<typeof getSupabaseServerClient>["channel"]>) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timed out subscribing to realtime channel."));
    }, SUBSCRIBE_TIMEOUT_MS);

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        clearTimeout(timeoutId);
        resolve();
        return;
      }

      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        clearTimeout(timeoutId);
        reject(new Error(`Realtime channel subscription failed with status ${status}.`));
      }
    });
  });
}

export async function publishStreamStateUpdate(payload: StreamStatePayload): Promise<void> {
  const supabase = getSupabaseServerClient();
  const channel = supabase.channel(payload.realtimeChannel, {
    config: {
      broadcast: {
        self: false,
        ack: true,
      },
    },
  });

  try {
    await waitForSubscription(channel);

    const sendResult = await channel.send({
      type: "broadcast",
      event: STREAM_STATE_BROADCAST_EVENT,
      payload,
    });

    if (sendResult !== "ok") {
      throw new Error(`Supabase realtime send failed with result: ${sendResult}`);
    }
  } catch (error) {
    logger.warn({
      context: "stream_state.realtime_publish_failed",
      channel: payload.realtimeChannel,
      cause: error instanceof Error ? error.message : String(error),
    });
  } finally {
    await supabase.removeChannel(channel);
  }
}
