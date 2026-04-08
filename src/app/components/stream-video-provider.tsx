"use client";

import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type StreamTokenResponse = {
  apiKey: string;
  token: string;
};

type StreamVideoProviderProps = {
  serverId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  children: ReactNode;
};

async function fetchStreamToken(serverId: string): Promise<StreamTokenResponse> {
  const response = await fetch("/api/discord/stream-token", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serverId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Stream token");
  }

  return (await response.json()) as StreamTokenResponse;
}

export function StreamVideoProvider({ children, serverId, user }: StreamVideoProviderProps) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [retryCounter, setRetryCounter] = useState(0);

  const streamUser = useMemo(
    () => ({
      id: user.id,
      name: user.name,
      image: user.image ?? undefined,
    }),
    [user.id, user.image, user.name],
  );

  const tokenProvider = useCallback(async () => {
    const response = await fetchStreamToken(serverId);
    return response.token;
  }, [serverId]);

  useEffect(() => {
    let isCancelled = false;
    let mountedClient: StreamVideoClient | null = null;

    const initializeClient = async () => {
      setIsInitializing(true);
      setError(null);

      try {
        const { apiKey, token } = await fetchStreamToken(serverId);

        if (isCancelled) {
          return;
        }

        mountedClient = new StreamVideoClient({
          apiKey,
          user: streamUser,
          token,
          tokenProvider,
        });

        setClient(mountedClient);
      } catch (cause) {
        if (isCancelled) {
          return;
        }

        console.error(cause);
        setClient(null);
        setError("Unable to connect to voice chat right now.");
      } finally {
        if (!isCancelled) {
          setIsInitializing(false);
        }
      }
    };

    void initializeClient();

    return () => {
      isCancelled = true;
      setClient(null);

      if (mountedClient) {
        void mountedClient.disconnectUser();
      }
    };
  }, [retryCounter, serverId, streamUser, tokenProvider]);

  if (error) {
    return (
      <Paper withBorder bg="#2b2d31" p="md" style={{ borderColor: "#3a3d45" }}>
        <Stack gap="xs">
          <Text c="red.3" fw={600} size="sm">
            {error}
          </Text>
          <Group justify="flex-start">
            <Button size="xs" variant="light" onClick={() => setRetryCounter((value) => value + 1)}>
              Retry connection
            </Button>
          </Group>
        </Stack>
      </Paper>
    );
  }

  if (!client) {
    return (
      <Box>
        {isInitializing ? (
          <Text size="sm" c="gray.4">
            Connecting voice chat...
          </Text>
        ) : (
          children
        )}
      </Box>
    );
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
