"use client";

import { Alert, Box, Center, Paper, Stack, Text } from "@mantine/core";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useState } from "react";

type VoiceCallPanelProps = {
  serverId: string;
  channelId: string;
  channelName: string;
};

function buildVoiceCallId(serverId: string, channelId: string): string {
  const normalizedServerId = serverId.replace(/-/g, "").toLowerCase();
  const normalizedChannelId = channelId.replace(/-/g, "").toLowerCase();

  // Stream call IDs must be <= 64 chars. UUIDs without hyphens are 32 chars each.
  return `${normalizedServerId}${normalizedChannelId}`.slice(0, 64);
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
