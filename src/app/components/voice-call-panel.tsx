"use client";

import {
  Alert,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import {
  Call,
  CallControls,
  ParticipantView,
  StreamCall,
  StreamTheme,
  StreamVideoParticipant,
  hasScreenShare,
  hasVideo,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import {
  ArrowsInSimpleIcon,
  ArrowsOutSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  MonitorPlayIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProfileAvatar } from "./profile-avatar";

type VoiceCallPanelProps = {
  serverId: string;
  channelId: string;
  channelName: string;
  currentUser: {
    id: string;
    name: string;
    image: string | null;
  };
};

type StreamWatcher = {
  userId: string;
  name: string;
  image: string | null;
};

type ActiveScreenshare = {
  streamerUserId: string;
  streamerName: string;
  streamerImage: string | null;
  watcherCount: number;
  watchers: StreamWatcher[];
};

type StreamStateResponse = {
  activeScreenshares: ActiveScreenshare[];
  watchingStreamerUserIds: string[];
  resolvedTargetStreamerUserId?: string;
};

const JOIN_SOUND_SRC = "/sounds/join-call.mp3";
const JOIN_SOUND_MAX_DURATION_MS = 10_000;
const CONTROLS_FOOTER_MIN_HEIGHT = 86;

function getGridCardMinWidth(participantCount: number): string {
  if (participantCount >= 12) {
    return "150px";
  }

  if (participantCount >= 8) {
    return "170px";
  }

  if (participantCount >= 5) {
    return "190px";
  }

  return "220px";
}

function getBottomRowCardBasis(participantCount: number): string {
  if (participantCount >= 12) {
    return "clamp(120px, 15vw, 150px)";
  }

  if (participantCount >= 8) {
    return "clamp(130px, 17vw, 170px)";
  }

  if (participantCount >= 5) {
    return "clamp(145px, 19vw, 185px)";
  }

  return "clamp(165px, 21vw, 210px)";
}

function buildVoiceCallId(serverId: string, channelId: string): string {
  const normalizedServerId = serverId.replace(/-/g, "").toLowerCase();
  const normalizedChannelId = channelId.replace(/-/g, "").toLowerCase();
  return `${normalizedServerId}${normalizedChannelId}`.slice(0, 64);
}

function playFallbackJoinTone() {
  if (typeof window === "undefined") {
    return;
  }

  const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) {
    return;
  }

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.22);

  oscillator.onended = () => {
    void context.close();
  };
}

function playJoinTone() {
  if (typeof window === "undefined") {
    return () => {};
  }

  const audio = new Audio(JOIN_SOUND_SRC);
  audio.preload = "auto";
  audio.volume = 0.6;
  let hasCleanedUp = false;

  const cleanup = () => {
    if (hasCleanedUp) {
      return;
    }

    hasCleanedUp = true;
    window.clearTimeout(stopTimeoutId);
    audio.pause();
    audio.currentTime = 0;
    audio.onended = null;
    audio.onerror = null;
    audio.removeAttribute("src");
    audio.load();
  };

  const stopTimeoutId = window.setTimeout(() => {
    cleanup();
  }, JOIN_SOUND_MAX_DURATION_MS);

  audio.onended = () => {
    cleanup();
  };

  audio.onerror = () => {
    cleanup();
    playFallbackJoinTone();
  };

  void audio.play().catch(() => {
    cleanup();
    playFallbackJoinTone();
  });

  return cleanup;
}

function getParticipantName(participant: StreamVideoParticipant): string {
  const candidate = participant.name?.trim();
  if (candidate) {
    return candidate;
  }

  const fallback = participant.userId?.trim();
  if (fallback) {
    return fallback;
  }

  return "Unknown User";
}

function getParticipantImage(participant: StreamVideoParticipant): string | null {
  const image = participant.image?.trim();
  if (image) {
    return image;
  }

  return null;
}

function IdentityPill({ image, name }: { image?: string | null; name: string }) {
  return (
    <Group gap={6} wrap="nowrap" style={{ minWidth: 0 }}>
      <ProfileAvatar src={image ?? null} name={name} size={22} />
      <Text size="sm" c="gray.1" fw={600} truncate="end">
        {name}
      </Text>
    </Group>
  );
}

function JoinSoundEffect() {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const previousCountRef = useRef<number | null>(null);
  const stopSoundRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const currentCount = participants.length;

    if (previousCountRef.current === null) {
      previousCountRef.current = currentCount;
      return;
    }

    if (currentCount > previousCountRef.current) {
      stopSoundRef.current?.();
      stopSoundRef.current = playJoinTone();
    }

    previousCountRef.current = currentCount;
  }, [participants.length]);

  useEffect(() => {
    return () => {
      stopSoundRef.current?.();
      stopSoundRef.current = null;
    };
  }, []);

  return null;
}

export function VoiceCallPanel({ channelId, channelName, serverId, currentUser }: VoiceCallPanelProps) {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callId = useMemo(() => buildVoiceCallId(serverId, channelId), [channelId, serverId]);

  useEffect(() => {
    if (!client) {
      return;
    }

    let isCancelled = false;
    const nextCall = client.call("default", callId);

    const joinCall = async () => {
      setError(null);

      try {
        await nextCall.join({ create: true });

        // Voice channels should join with camera off by default.
        try {
          await nextCall.camera.disable();
        } catch {
          // Ignore camera disable failures and continue joining voice.
        }

        if (isCancelled) {
          await nextCall.leave();
          return;
        }

        setCall(nextCall);
      } catch (cause) {
        if (!isCancelled) {
          console.error(cause);
          setError("Could not join this voice channel.");
          setCall(null);
        }
      }
    };

    void joinCall();

    return () => {
      isCancelled = true;
      setCall(null);
      void nextCall.leave();
    };
  }, [callId, client]);

  if (!client) {
    return (
      <Center h="100%" px="md">
        <Text size="sm" c="gray.4">
          Voice chat is still connecting...
        </Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100%" px="md">
        <Alert color="red" title="Voice connection failed" variant="light">
          {error}
        </Alert>
      </Center>
    );
  }

  if (!call) {
    return (
      <Center h="100%" px="md">
        <Text size="sm" c="gray.4">
          Joining #{channelName}...
        </Text>
      </Center>
    );
  }

  return (
    <Box h="100%" p="md">
      <Paper h="100%" bg="#202225" withBorder style={{ borderColor: "#3a3d45", overflow: "hidden" }}>
        <StreamCall call={call}>
          <StreamTheme>
            <JoinSoundEffect />
            <VoiceCallContent
              serverId={serverId}
              channelId={channelId}
              channelName={channelName}
              currentUser={currentUser}
            />
          </StreamTheme>
        </StreamCall>
      </Paper>
    </Box>
  );
}

function VoiceCallContent({ channelId, channelName, serverId, currentUser }: VoiceCallPanelProps) {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const stopScreenshareTimeoutRef = useRef<number | null>(null);
  const streamStateMutationVersionRef = useRef(0);

  const [streamState, setStreamState] = useState<StreamStateResponse>({
    activeScreenshares: [],
    watchingStreamerUserIds: [],
  });
  const [watchIntentStreamerUserIds, setWatchIntentStreamerUserIds] = useState<string[]>([]);
  const [streamActionPendingByStreamer, setStreamActionPendingByStreamer] = useState<Record<string, boolean>>({});
  const [openWatcherListForStreamer, setOpenWatcherListForStreamer] = useState<string | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [fullscreenCardId, setFullscreenCardId] = useState<string | null>(null);

  const screenshareParticipants = useMemo(
    () => participants.filter((participant) => hasScreenShare(participant)),
    [participants],
  );

  const screenshareStateByStreamerId = useMemo(() => {
    return new Map(
      streamState.activeScreenshares.map((screenshare) => [screenshare.streamerUserId, screenshare]),
    );
  }, [streamState.activeScreenshares]);

  const screenshareStateByStreamerName = useMemo(() => {
    return new Map(
      streamState.activeScreenshares.map((screenshare) => [screenshare.streamerName.toLowerCase(), screenshare]),
    );
  }, [streamState.activeScreenshares]);

  const watchedStreamerIdsSet = useMemo(() => new Set(watchIntentStreamerUserIds), [watchIntentStreamerUserIds]);
  const watchedStreamerIds = useMemo(() => Array.from(watchedStreamerIdsSet), [watchedStreamerIdsSet]);

  const watchedSpotlightParticipant = useMemo(() => {
    if (watchedStreamerIds.length === 0) {
      return null;
    }

    for (const watchedStreamerId of watchedStreamerIds) {
      const match = screenshareParticipants.find((participant) => {
        const streamerName = getParticipantName(participant).toLowerCase();
        const matchedState =
          screenshareStateByStreamerId.get(participant.userId) ??
          screenshareStateByStreamerName.get(streamerName) ??
          null;
        const normalizedStreamerId = matchedState?.streamerUserId ?? participant.userId;
        return normalizedStreamerId === watchedStreamerId;
      });

      if (match) {
        return match;
      }
    }

    return null;
  }, [screenshareParticipants, screenshareStateByStreamerId, screenshareStateByStreamerName, watchedStreamerIds]);

  const hasSpotlightStream = watchedSpotlightParticipant !== null;
  const gridCardMinWidth = useMemo(() => getGridCardMinWidth(participants.length), [participants.length]);
  const bottomRowCardBasis = useMemo(() => getBottomRowCardBasis(participants.length), [participants.length]);
  const contentScrollMode = hasSpotlightStream ? "hidden" : "auto";

  const toggleCardFullscreen = useCallback(
    async (cardId: string) => {
      const targetElement = document.getElementById(cardId);
      if (!targetElement) {
        return;
      }

      if (document.fullscreenElement?.id === cardId) {
        try {
          await document.exitFullscreen();
        } catch {
          // Ignore browser fullscreen API errors.
        }
        return;
      }

      try {
        await targetElement.requestFullscreen();
      } catch {
        // Ignore browser fullscreen API errors.
      }
    },
    [],
  );

  const isLocalScreensharing = useMemo(
    () =>
      participants.some(
        (participant) =>
          hasScreenShare(participant) &&
          (participant.isLocalParticipant || participant.userId === currentUser.id),
      ),
    [currentUser.id, participants],
  );

  const selectedWatcherScreenshare = useMemo(() => {
    if (!openWatcherListForStreamer) {
      return null;
    }

    return streamState.activeScreenshares.find(
      (screenshare) => screenshare.streamerUserId === openWatcherListForStreamer,
    ) ?? null;
  }, [openWatcherListForStreamer, streamState.activeScreenshares]);

  const selectedWatcherStreamerName = useMemo(() => {
    if (!openWatcherListForStreamer) {
      return null;
    }

    const participant = participants.find((item) => item.userId === openWatcherListForStreamer);
    if (participant) {
      return getParticipantName(participant);
    }

    return selectedWatcherScreenshare?.streamerName ?? null;
  }, [openWatcherListForStreamer, participants, selectedWatcherScreenshare?.streamerName]);

  const fetchStreamState = useCallback(async () => {
    const requestVersion = streamStateMutationVersionRef.current;

    try {
      const response = await fetch(
        `/api/discord/stream-state?serverId=${encodeURIComponent(serverId)}&channelId=${encodeURIComponent(channelId)}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error("Failed to load screenshare state.");
      }

      const payload = (await response.json()) as StreamStateResponse;

      if (requestVersion !== streamStateMutationVersionRef.current) {
        return;
      }

      setStreamState(payload);
      setStreamError(null);
    } catch {
      setStreamError("Unable to refresh screenshare state.");
    }
  }, [channelId, serverId]);

  const runStreamAction = async (
    action: "watch-screenshare" | "unwatch-screenshare",
    targetStreamerUserId: string,
    options?: {
      targetStreamerName?: string;
      targetStreamerImage?: string | null;
    },
  ) => {
    streamStateMutationVersionRef.current += 1;
    const mutationVersion = streamStateMutationVersionRef.current;

    setWatchIntentStreamerUserIds((current) => {
      const next = new Set(current);

      if (action === "watch-screenshare") {
        next.add(targetStreamerUserId);
      } else {
        next.delete(targetStreamerUserId);
      }

      return Array.from(next);
    });

    setStreamActionPendingByStreamer((current) => ({ ...current, [targetStreamerUserId]: true }));
    setStreamError(null);

    try {
      let payload: StreamStateResponse | null = null;
      let lastError: (Error & { status?: number }) | null = null;
      const maxAttempts = action === "watch-screenshare" ? 2 : 1;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const response = await fetch("/api/discord/stream-state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            serverId,
            channelId,
            targetStreamerUserId,
            targetStreamerName: options?.targetStreamerName,
            targetStreamerImage: options?.targetStreamerImage,
          }),
        });

        if (response.ok) {
          payload = (await response.json()) as StreamStateResponse;
          lastError = null;
          break;
        }

        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const error = new Error(errorPayload?.message ?? "Failed to update screenshare watch state.") as Error & {
          status?: number;
        };
        error.status = response.status;
        lastError = error;

        const shouldRetry =
          action === "watch-screenshare" &&
          attempt === 0 &&
          response.status === 409;

        if (shouldRetry) {
          await fetchStreamState();
          continue;
        }

        break;
      }

      if (!payload) {
        throw (lastError ?? new Error("Failed to update screenshare watch state."));
      }

      if (mutationVersion !== streamStateMutationVersionRef.current) {
        return;
      }

      setStreamState(payload);
      const resolvedTargetStreamerUserId = payload.resolvedTargetStreamerUserId ?? targetStreamerUserId;

      setWatchIntentStreamerUserIds((current) => {
        const next = new Set(current);

        if (action === "watch-screenshare") {
          next.delete(targetStreamerUserId);
          next.add(resolvedTargetStreamerUserId);
        } else {
          next.delete(targetStreamerUserId);
          next.delete(resolvedTargetStreamerUserId);
        }

        return Array.from(next);
      });

      if (action === "unwatch-screenshare") {
        setWatchIntentStreamerUserIds((current) =>
          current.filter(
            (streamerUserId) =>
              streamerUserId !== targetStreamerUserId &&
              streamerUserId !== resolvedTargetStreamerUserId,
          ),
        );
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Failed to update screenshare watch state.";

      if (action === "unwatch-screenshare") {
        setWatchIntentStreamerUserIds((current) =>
          current.filter((streamerUserId) => streamerUserId !== targetStreamerUserId),
        );
      }

      setStreamError(message);
      void fetchStreamState();
    } finally {
      setStreamActionPendingByStreamer((current) => ({ ...current, [targetStreamerUserId]: false }));
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const refresh = async () => {
      if (isCancelled) {
        return;
      }

      await fetchStreamState();
    };

    void refresh();

    const intervalId = window.setInterval(() => {
      void refresh();
    }, 4_000);

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [fetchStreamState]);

  useEffect(() => {
    if (stopScreenshareTimeoutRef.current !== null) {
      window.clearTimeout(stopScreenshareTimeoutRef.current);
      stopScreenshareTimeoutRef.current = null;
    }

    if (isLocalScreensharing) {
      void fetch("/api/discord/stream-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync-screenshare",
          serverId,
          channelId,
        }),
      });

      return;
    }

    // Stream SDK tracks can briefly flap; delay stop to avoid false teardown.
    stopScreenshareTimeoutRef.current = window.setTimeout(() => {
      void fetch("/api/discord/stream-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "stop-screenshare",
          serverId,
          channelId,
        }),
      });
      stopScreenshareTimeoutRef.current = null;
    }, 8_000);

    return () => {
      if (stopScreenshareTimeoutRef.current !== null) {
        window.clearTimeout(stopScreenshareTimeoutRef.current);
        stopScreenshareTimeoutRef.current = null;
      }
    };
  }, [channelId, isLocalScreensharing, serverId]);

  useEffect(() => {
    if (!isLocalScreensharing) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void fetch("/api/discord/stream-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync-screenshare",
          serverId,
          channelId,
        }),
      });
    }, 12_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [channelId, isLocalScreensharing, serverId]);

  useEffect(() => {
    if (watchedStreamerIds.length === 0) {
      return;
    }

    const sendHeartbeat = async () => {
      const failedStreamerIds: string[] = [];

      for (const targetStreamerUserId of watchedStreamerIds) {
        try {
          const response = await fetch("/api/discord/stream-state", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "heartbeat-screenshare",
              serverId,
              channelId,
              targetStreamerUserId,
            }),
          });

          if (!response.ok && response.status === 409) {
            failedStreamerIds.push(targetStreamerUserId);
          }
        } catch {
          failedStreamerIds.push(targetStreamerUserId);
        }
      }

      if (failedStreamerIds.length > 0) {
        setWatchIntentStreamerUserIds((current) =>
          current.filter((streamerUserId) => !failedStreamerIds.includes(streamerUserId)),
        );
      }
    };

    void sendHeartbeat();

    const intervalId = window.setInterval(() => {
      void sendHeartbeat();
    }, 5_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [channelId, watchedStreamerIds, serverId]);

  useEffect(() => {
    return () => {
      void fetch("/api/discord/stream-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "unwatch-all",
          serverId,
          channelId,
        }),
        keepalive: true,
      });

      if (isLocalScreensharing) {
        void fetch("/api/discord/stream-state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "stop-screenshare",
            serverId,
            channelId,
          }),
          keepalive: true,
        });
      }
    };
  }, [channelId, isLocalScreensharing, serverId]);

  useEffect(() => {
    if (!openWatcherListForStreamer) {
      return;
    }

    const stillStreaming = streamState.activeScreenshares.some(
      (screenshare) => screenshare.streamerUserId === openWatcherListForStreamer,
    );

    if (!stillStreaming) {
      setOpenWatcherListForStreamer(null);
    }
  }, [openWatcherListForStreamer, streamState.activeScreenshares]);

  useEffect(() => {
    const updateFullscreenState = () => {
      const fullscreenElement = document.fullscreenElement;
      setFullscreenCardId(fullscreenElement ? fullscreenElement.id : null);
    };

    document.addEventListener("fullscreenchange", updateFullscreenState);
    updateFullscreenState();

    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreenState);
    };
  }, []);

  return (
    <Stack h="100%" gap={0} style={{ overflow: "hidden", background: "#000" }}>
      <Group
        justify="space-between"
        align="center"
        wrap="nowrap"
        px="sm"
        py={6}
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0))" }}
      >
        <Text size="sm" c="gray.1" fw={600}>
          {channelName}
        </Text>
        <Group gap={6} wrap="nowrap">
          <Badge size="sm" radius="sm" color="dark" variant="filled">
            {participants.length} in call
          </Badge>
          <Badge size="sm" radius="sm" color="red" variant="filled">
            {screenshareParticipants.length} live
          </Badge>
        </Group>
      </Group>

      {streamError && (
        <Alert color="yellow" variant="light" title="Screenshare state issue" mx="sm" mb="xs">
          {streamError}
        </Alert>
      )}

      <Box
        style={{
          padding: "8px",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {selectedWatcherScreenshare && selectedWatcherStreamerName && (
          <Paper mb="sm" bg="rgba(32,34,37,0.85)" p="xs" withBorder style={{ borderColor: "#3a3d45" }}>
            <Stack gap="xs">
              <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
                <Text size="xs" c="gray.4" fw={700} tt="uppercase">
                  Watching {selectedWatcherStreamerName}&apos;s screenshare
                </Text>
                <Button size="compact-xs" variant="subtle" onClick={() => setOpenWatcherListForStreamer(null)}>
                  Close
                </Button>
              </Group>
              {selectedWatcherScreenshare.watchers.length === 0 ? (
                <Text size="sm" c="gray.4">
                  Nobody is watching yet.
                </Text>
              ) : (
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                    gap: "8px",
                  }}
                >
                  {selectedWatcherScreenshare.watchers.map((watcher) => (
                    <Paper key={watcher.userId} bg="#1f2125" p="xs" withBorder style={{ borderColor: "#3a3d45" }}>
                      <IdentityPill name={watcher.name} image={watcher.image} />
                    </Paper>
                  ))}
                </Box>
              )}
            </Stack>
          </Paper>
        )}

        <Box
          style={{
            flex: 1,
            minHeight: 0,
            overflow: contentScrollMode,
            paddingBottom: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {hasSpotlightStream && watchedSpotlightParticipant && (() => {
            const participant = watchedSpotlightParticipant;
            const streamerUserId = participant.userId;
            const streamerName = getParticipantName(participant);
            const matchedState =
              screenshareStateByStreamerId.get(streamerUserId) ??
              screenshareStateByStreamerName.get(streamerName.toLowerCase()) ??
              null;
            const fallbackSingleActiveStreamKey =
              streamState.activeScreenshares.length === 1
                ? streamState.activeScreenshares[0].streamerUserId
                : null;
            const streamStateKey =
              matchedState?.streamerUserId ??
              fallbackSingleActiveStreamKey ??
              streamerUserId;
            const isOwnScreenshare = streamerUserId === currentUser.id || streamStateKey === currentUser.id;
            const isWatching = watchedStreamerIdsSet.has(streamStateKey);
            const canView = isOwnScreenshare || isWatching;
            const watcherCount = matchedState?.watcherCount ?? 0;
            const pending =
              streamActionPendingByStreamer[streamerUserId] ??
              streamActionPendingByStreamer[streamStateKey] ??
              false;
            const spotlightCardId = `spotlight-${participant.sessionId}`;
            const spotlightStageId = `spotlight-stage-${participant.sessionId}`;

            return (
              <Stack gap="xs" h="100%" style={{ minHeight: 0, flex: 1 }}>
                <Paper
                  id={spotlightCardId}
                  className="voice-media-card"
                  radius="md"
                  withBorder
                  bg="#111214"
                  p={0}
                  style={{
                    borderColor: "#2f3136",
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    id={spotlightStageId}
                    className="voice-media-stage voice-fullscreen-target"
                    style={{
                      flex: 1,
                      minHeight: "clamp(180px, 36vh, 520px)",
                      position: "relative",
                      background: "#0b0c0e",
                    }}
                  >
                    {canView ? (
                      <Box className="voice-media-surface voice-media-surface-screen" style={{ position: "absolute", inset: 0 }}>
                        <ParticipantView participant={participant} trackType="screenShareTrack" ParticipantViewUI={null} />
                      </Box>
                    ) : (
                      <Center
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(135deg, #221f26, #101216)",
                        }}
                      >
                        <Stack gap={4} align="center">
                          <MonitorPlayIcon size={24} color="#f08c8c" />
                          <Text size="sm" c="gray.1" fw={600}>
                            Stream hidden
                          </Text>
                        </Stack>
                      </Center>
                    )}

                    <Group
                      gap="xs"
                      wrap="nowrap"
                      style={{ position: "absolute", left: 8, bottom: 8, right: 8, justifyContent: "space-between" }}
                    >
                      <Paper bg="rgba(0,0,0,0.55)" p={4} radius="sm">
                        <IdentityPill
                          name={streamerName}
                          image={matchedState?.streamerImage ?? getParticipantImage(participant)}
                        />
                      </Paper>
                      <Group gap={6} wrap="nowrap">
                        <Badge size="xs" color="red" variant="filled" radius="sm">
                          LIVE
                        </Badge>
                        {canView && (
                          <Button
                            size="compact-xs"
                            radius="xl"
                            variant="filled"
                            color="dark"
                            onClick={() => {
                              void toggleCardFullscreen(spotlightStageId);
                            }}
                            leftSection={
                              fullscreenCardId === spotlightStageId ? (
                                <ArrowsInSimpleIcon size={13} />
                              ) : (
                                <ArrowsOutSimpleIcon size={13} />
                              )
                            }
                          >
                            {fullscreenCardId === spotlightStageId ? "Exit" : "Fullscreen"}
                          </Button>
                        )}
                      </Group>
                    </Group>
                  </Box>

                  <Group px="xs" py={8} gap={6} wrap="wrap" justify="space-between">
                    <Group gap={6} wrap="wrap">
                      {!isOwnScreenshare && (
                        <Button
                          size="compact-xs"
                          radius="xl"
                          variant={isWatching ? "default" : "light"}
                          loading={pending}
                          leftSection={isWatching ? <EyeSlashIcon size={13} /> : <EyeIcon size={13} />}
                          onClick={() => {
                            void runStreamAction(
                              isWatching ? "unwatch-screenshare" : "watch-screenshare",
                              streamStateKey,
                              {
                                targetStreamerName: streamerName,
                                targetStreamerImage: participant.image ?? null,
                              },
                            );
                          }}
                        >
                          {isWatching ? "Watching" : "Watch"}
                        </Button>
                      )}

                      {isOwnScreenshare && (
                        <Button
                          size="compact-xs"
                          radius="xl"
                          variant="subtle"
                          leftSection={<UsersThreeIcon size={13} />}
                          onClick={() => {
                            setOpenWatcherListForStreamer((current) =>
                              current === streamStateKey ? null : streamStateKey,
                            );
                          }}
                        >
                          {openWatcherListForStreamer === streamStateKey
                            ? "Hide watchers"
                            : `Watchers ${watcherCount}`}
                        </Button>
                      )}
                    </Group>

                    <Text size="xs" c="gray.4">
                      Livestream spotlight
                    </Text>
                  </Group>
                </Paper>

                <Box
                  className="voice-bottom-row"
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    overflowY: "hidden",
                    paddingBottom: 2,
                    flexShrink: 0,
                    maxHeight: "clamp(140px, 24vh, 210px)",
                  }}
                >
                  {participants.map((participant) => {
                    const participantId = participant.sessionId;
                    const isVideoOn = hasVideo(participant);
                    const name = getParticipantName(participant);
                    const image = getParticipantImage(participant);
                    const participantCardId = `participant-row-${participant.sessionId}`;
                    const participantStageId = `participant-row-stage-${participant.sessionId}`;

                    return (
                      <Paper
                        key={`row-participant-${participantId}`}
                        id={participantCardId}
                        className="voice-media-card"
                        radius="md"
                        withBorder
                        bg="#111214"
                        p={0}
                        style={{
                          borderColor: "#2f3136",
                          overflow: "hidden",
                          flex: `0 0 ${bottomRowCardBasis}`,
                          minWidth: 118,
                        }}
                      >
                        <Box style={{ height: "clamp(88px, 16vh, 130px)", position: "relative", background: "#0b0c0e" }}>
                          <Box
                            id={participantStageId}
                            className="voice-media-surface voice-fullscreen-target"
                            style={{ position: "absolute", inset: 0 }}
                          >
                            <ParticipantView participant={participant} trackType="videoTrack" ParticipantViewUI={null} />
                          </Box>
                          {!isVideoOn && (
                            <Center
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(135deg, #1a1d22, #0f1217)",
                              }}
                            >
                              <ProfileAvatar src={image} name={name} size={40} />
                            </Center>
                          )}

                          <Box style={{ position: "absolute", left: 6, bottom: 6, right: 6 }}>
                            <Paper bg="rgba(0,0,0,0.55)" p={4} radius="sm">
                              <IdentityPill name={name} image={image} />
                            </Paper>
                          </Box>
                        </Box>

                        <Group px="xs" py={6} justify="space-between" wrap="nowrap">
                          <Badge size="xs" color={isVideoOn ? "teal" : "gray"} variant="light" radius="sm">
                            {isVideoOn ? "Camera" : "No camera"}
                          </Badge>
                          {isVideoOn && (
                            <Button
                              size="compact-xs"
                              radius="xl"
                              variant="subtle"
                              onClick={() => {
                                void toggleCardFullscreen(participantStageId);
                              }}
                              leftSection={
                                fullscreenCardId === participantStageId ? (
                                  <ArrowsInSimpleIcon size={12} />
                                ) : (
                                  <ArrowsOutSimpleIcon size={12} />
                                )
                              }
                            >
                              {fullscreenCardId === participantStageId ? "Exit" : "Full"}
                            </Button>
                          )}
                        </Group>
                      </Paper>
                    );
                  })}
                </Box>
              </Stack>
            );
          })()}

          {!hasSpotlightStream && (
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(${gridCardMinWidth}, 1fr))`,
                gap: "8px",
              }}
            >
          {screenshareParticipants.map((participant) => {
            const streamerUserId = participant.userId;
            const streamerName = getParticipantName(participant);
            const matchedState =
              screenshareStateByStreamerId.get(streamerUserId) ??
              screenshareStateByStreamerName.get(streamerName.toLowerCase()) ??
              null;
            const fallbackSingleActiveStreamKey =
              streamState.activeScreenshares.length === 1
                ? streamState.activeScreenshares[0].streamerUserId
                : null;
            const streamStateKey =
              matchedState?.streamerUserId ??
              fallbackSingleActiveStreamKey ??
              streamerUserId;
            const isOwnScreenshare = streamerUserId === currentUser.id || streamStateKey === currentUser.id;
            const isWatching = watchedStreamerIdsSet.has(streamStateKey);
            const canView = isOwnScreenshare || isWatching;
            const watcherCount = matchedState?.watcherCount ?? 0;
            const pending =
              streamActionPendingByStreamer[streamerUserId] ??
              streamActionPendingByStreamer[streamStateKey] ??
              false;
            const screenshareStageId = `screenshare-stage-${participant.sessionId}`;

            return (
              <Paper
                key={`screenshare-${participant.sessionId}`}
                id={`screenshare-${participant.sessionId}`}
                className="voice-media-card"
                radius="md"
                withBorder
                bg="#111214"
                p={0}
                style={{
                  borderColor: "#2f3136",
                  minHeight: "clamp(188px, 30vh, 242px)",
                  overflow: "hidden",
                }}
              >
                <Box style={{ height: "clamp(128px, 21vh, 176px)", position: "relative", background: "#0b0c0e" }}>
                  {canView ? (
                    <Box
                      id={screenshareStageId}
                      className="voice-media-surface voice-media-surface-screen voice-fullscreen-target"
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <ParticipantView participant={participant} trackType="screenShareTrack" ParticipantViewUI={null} />
                    </Box>
                  ) : (
                    <Center
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #221f26, #101216)",
                      }}
                    >
                      <Stack gap={4} align="center">
                        <MonitorPlayIcon size={20} color="#f08c8c" />
                        <Text size="sm" c="gray.1" fw={600}>
                          Stream hidden
                        </Text>
                      </Stack>
                    </Center>
                  )}

                  <Group
                    gap="xs"
                    wrap="nowrap"
                    style={{ position: "absolute", left: 8, bottom: 8, right: 8, justifyContent: "space-between" }}
                  >
                    <Paper bg="rgba(0,0,0,0.55)" p={4} radius="sm">
                      <IdentityPill
                        name={streamerName}
                        image={matchedState?.streamerImage ?? getParticipantImage(participant)}
                      />
                    </Paper>
                    <Badge size="xs" color="red" variant="filled" radius="sm">
                      LIVE
                    </Badge>
                  </Group>
                </Box>

                <Group px="xs" py={6} gap={6} wrap="wrap">
                  {!isOwnScreenshare && (
                    <Button
                      size="compact-xs"
                      radius="xl"
                      variant={isWatching ? "default" : "light"}
                      loading={pending}
                      leftSection={isWatching ? <EyeSlashIcon size={13} /> : <EyeIcon size={13} />}
                      onClick={() => {
                        void runStreamAction(
                          isWatching ? "unwatch-screenshare" : "watch-screenshare",
                          streamStateKey,
                          {
                            targetStreamerName: streamerName,
                            targetStreamerImage: participant.image ?? null,
                          },
                        );
                      }}
                    >
                      {isWatching ? "Watching" : "Watch"}
                    </Button>
                  )}

                  {isOwnScreenshare && (
                    <Button
                      size="compact-xs"
                      radius="xl"
                      variant="subtle"
                      leftSection={<UsersThreeIcon size={13} />}
                      onClick={() => {
                        setOpenWatcherListForStreamer((current) =>
                          current === streamStateKey ? null : streamStateKey,
                        );
                      }}
                    >
                      {openWatcherListForStreamer === streamStateKey
                        ? "Hide watchers"
                        : `Watchers ${watcherCount}`}
                    </Button>
                  )}

                  {canView && (
                    <Button
                      size="compact-xs"
                      radius="xl"
                      variant="subtle"
                      onClick={() => {
                        void toggleCardFullscreen(screenshareStageId);
                      }}
                      leftSection={
                        fullscreenCardId === screenshareStageId ? (
                          <ArrowsInSimpleIcon size={13} />
                        ) : (
                          <ArrowsOutSimpleIcon size={13} />
                        )
                      }
                    >
                      {fullscreenCardId === screenshareStageId ? "Exit" : "Fullscreen"}
                    </Button>
                  )}
                </Group>
              </Paper>
            );
          })}

          {participants.map((participant) => {
            const participantId = participant.sessionId;
            const isVideoOn = hasVideo(participant);
            const name = getParticipantName(participant);
            const image = getParticipantImage(participant);
            const participantStageId = `participant-stage-${participant.sessionId}`;

            return (
              <Paper
                key={`participant-${participantId}`}
                id={`participant-${participantId}`}
                className="voice-media-card"
                radius="md"
                withBorder
                bg="#111214"
                p={0}
                style={{
                  borderColor: "#2f3136",
                  minHeight: "clamp(188px, 30vh, 242px)",
                  overflow: "hidden",
                }}
              >
                <Box style={{ height: "clamp(128px, 21vh, 176px)", position: "relative", background: "#0b0c0e" }}>
                  <Box
                    id={participantStageId}
                    className="voice-media-surface voice-fullscreen-target"
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <ParticipantView participant={participant} trackType="videoTrack" ParticipantViewUI={null} />
                  </Box>
                  {!isVideoOn && (
                    <Center
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #1a1d22, #0f1217)",
                      }}
                    >
                      <ProfileAvatar src={image} name={name} size={62} />
                    </Center>
                  )}

                  <Box style={{ position: "absolute", left: 8, bottom: 8 }}>
                    <Paper bg="rgba(0,0,0,0.55)" p={4} radius="sm">
                      <IdentityPill name={name} image={image} />
                    </Paper>
                  </Box>
                </Box>

                <Group px="xs" py={6} justify="space-between" wrap="nowrap">
                  <Text size="xs" c="gray.4">
                    Participant
                  </Text>
                  <Group gap={6} wrap="nowrap">
                    <Badge size="xs" color={isVideoOn ? "teal" : "gray"} variant="light" radius="sm">
                      {isVideoOn ? "Camera" : "No camera"}
                    </Badge>
                    {isVideoOn && (
                      <Button
                        size="compact-xs"
                        radius="xl"
                        variant="subtle"
                        onClick={() => {
                          void toggleCardFullscreen(participantStageId);
                        }}
                        leftSection={
                          fullscreenCardId === participantStageId ? (
                            <ArrowsInSimpleIcon size={13} />
                          ) : (
                            <ArrowsOutSimpleIcon size={13} />
                          )
                        }
                      >
                        {fullscreenCardId === participantStageId ? "Exit" : "Fullscreen"}
                      </Button>
                    )}
                  </Group>
                </Group>
              </Paper>
            );
          })}

          {participants.length === 0 && (
            <Paper
              radius="md"
              withBorder
              bg="#111214"
              p={0}
              style={{ borderColor: "#2f3136", minHeight: "clamp(188px, 30vh, 242px)", overflow: "hidden" }}
            >
              <Center style={{ height: "clamp(128px, 21vh, 176px)", background: "linear-gradient(135deg, #1a1d22, #0f1217)" }}>
                <ProfileAvatar src={currentUser.image} name={currentUser.name || "You"} size={62} />
              </Center>
              <Group px="xs" py={6} justify="space-between" wrap="nowrap">
                <IdentityPill name={currentUser.name || "You"} image={currentUser.image} />
                <Badge size="xs" color="gray" variant="light" radius="sm">
                  Joining...
                </Badge>
              </Group>
            </Paper>
          )}

            </Box>
          )}
        </Box>
      </Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 12,
          paddingTop: 6,
          minHeight: CONTROLS_FOOTER_MIN_HEIGHT,
          flexShrink: 0,
        }}
      >
        <Paper
          px="md"
          py="xs"
          radius="xl"
          bg="rgba(32,34,37,0.92)"
          withBorder
          style={{ borderColor: "#3a3d45", backdropFilter: "blur(8px)" }}
        >
          <CallControls />
        </Paper>
      </Box>
    </Stack>
  );
}
