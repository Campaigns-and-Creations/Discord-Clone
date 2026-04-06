"use client";

import { Alert, Box, Center, Paper, Stack, Text } from "@mantine/core";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";

type VoiceCallPanelProps = {
  serverId: string;
  channelId: string;
  channelName: string;
};

const JOIN_SOUND_SRC = "/sounds/join-call.mp3";
const JOIN_SOUND_MAX_DURATION_MS = 10_000;

function buildVoiceCallId(serverId: string, channelId: string): string {
  const normalizedServerId = serverId.replace(/-/g, "").toLowerCase();
  const normalizedChannelId = channelId.replace(/-/g, "").toLowerCase();

  // Stream call IDs must be <= 64 chars. UUIDs without hyphens are 32 chars each.
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

    // Releasing src + load helps browsers release media resources quickly.
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

export function VoiceCallPanel({ channelId, channelName, serverId }: VoiceCallPanelProps) {
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
            <Stack h="100%" gap="sm" p="sm">
              <Text size="sm" c="gray.2" fw={600}>
                Connected to voice channel #{channelName}
              </Text>
              <Box style={{ flex: 1, minHeight: 0 }}>
                <SpeakerLayout participantsBarPosition="right" />
              </Box>
              <CallControls />
            </Stack>
          </StreamTheme>
        </StreamCall>
      </Paper>
    </Box>
  );
}
