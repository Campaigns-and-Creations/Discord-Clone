"use client";

import {
  createServer,
  createChannel,
  deleteMessage,
  inviteMember,
  sendMessage,
  setMessagePinned,
} from "@/app/actions";
import type { HomePageData } from "@/app/home-types";
import { signOut } from "@/utils/auth-client";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Modal,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Textarea,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PlusIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

type HomeClientProps = {
  initialData: HomePageData;
};

function formatMessageTime(createdAt: string): string {
  return new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatServerBadge(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const queryClient = useQueryClient();
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [createChannelModalOpened, setCreateChannelModalOpened] = useState(false);
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");

  const createServerForm = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => {
        const trimmed = value.trim();

        if (!trimmed) {
          return "Server name is required";
        }

        if (trimmed.length > 60) {
          return "Server name must be at most 60 characters";
        }

        return null;
      },
    },
  });

  const createChannelForm = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return "Channel name is required";
        }
        if (trimmed.length > 60) {
          return "Channel name must be at most 60 characters";
        }
        return null;
      },
    },
  });

  const inviteForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => {
        const normalized = value.trim();
        if (!normalized) {
          return "Email is required";
        }
        if (!/^\S+@\S+\.\S+$/.test(normalized)) {
          return "Please enter a valid email";
        }
        return null;
      },
    },
  });

  const homeDataQuery = useQuery({
    queryKey: ["discord", "home-data"],
    queryFn: async () => {
      const response = await fetch("/api/discord/home-data", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load Discord home data.");
      }

      return (await response.json()) as HomePageData;
    },
    initialData,
  });

  const homeData = homeDataQuery.data ?? initialData;

  const [selectedServerId, setSelectedServerId] = useState<string | null>(
    initialData.servers[0]?.id ?? null,
  );

  const selectedServer = useMemo(
    () => homeData.servers.find((server) => server.id === selectedServerId) ?? null,
    [homeData.servers, selectedServerId],
  );

  const [selectedChannelByServer, setSelectedChannelByServer] = useState<Record<string, string>>(
    () => {
      return initialData.servers.reduce<Record<string, string>>((acc, server) => {
        if (server.channels[0]) {
          acc[server.id] = server.channels[0].id;
        }
        return acc;
      }, {});
    },
  );

  const createServerMutation = useMutation({
    mutationFn: async (name: string) => createServer(name),
    onSuccess: (createdServer) => {
      queryClient.setQueryData<HomePageData>(["discord", "home-data"], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          servers: [...oldData.servers, createdServer],
        };
      });

      setSelectedServerId(createdServer.id);
      setSelectedChannelByServer((current) => ({
        ...current,
        [createdServer.id]: createdServer.channels[0]?.id ?? "",
      }));

      setCreateModalOpened(false);
      createServerForm.reset();

      void queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const createChannelMutation = useMutation({
    mutationFn: async (payload: { serverId: string; name: string }) =>
      createChannel(payload.serverId, payload.name, "TEXT"),
    onSuccess: async () => {
      setCreateChannelModalOpened(false);
      createChannelForm.reset();
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const inviteMemberMutation = useMutation({
    mutationFn: async (payload: { serverId: string; email: string }) =>
      inviteMember(payload.serverId, payload.email),
    onSuccess: async () => {
      setInviteModalOpened(false);
      inviteForm.reset();
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: { serverId: string; channelId: string; content: string }) =>
      sendMessage(payload.serverId, payload.channelId, payload.content),
    onSuccess: async () => {
      setMessageDraft("");
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (payload: { serverId: string; channelId: string; messageId: string }) =>
      deleteMessage(payload.serverId, payload.channelId, payload.messageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const pinMessageMutation = useMutation({
    mutationFn: async (payload: { serverId: string; channelId: string; messageId: string; pinned: boolean }) =>
      setMessagePinned(payload.serverId, payload.channelId, payload.messageId, payload.pinned),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const selectedChannelId = selectedServer
    ? (selectedChannelByServer[selectedServer.id] ?? selectedServer.channels[0]?.id ?? null)
    : null;

  const selectedChannel = selectedServer?.channels.find((channel) => channel.id === selectedChannelId) ?? null;

  const selectedServerCapabilities = selectedServer?.capabilities;

  const userDisplayName = useMemo(() => {
    const name = homeData.currentUser.name.trim();
    if (name.length > 0) {
      return name;
    }

    const emailPrefix = homeData.currentUser.email?.split("@")[0]?.trim();
    if (emailPrefix) {
      return emailPrefix;
    }

    return "Unknown User";
  }, [homeData.currentUser.email, homeData.currentUser.name]);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
      window.location.replace("/auth/sign-in");
    }
  };

  return (
    <Box bg="#202225" mih="100svh" p={0}>
      <Modal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        title="Create A New Server"
        centered
      >
        <form
          onSubmit={createServerForm.onSubmit(async (values) => {
            await createServerMutation.mutateAsync(values.name.trim());
          })}
        >
          <Stack gap="sm">
            <TextInput
              label="Server Name"
              placeholder="for example: Design Crew"
              withAsterisk
              {...createServerForm.getInputProps("name")}
            />
            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={() => setCreateModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={createServerMutation.isPending}>
                Create Server
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={createChannelModalOpened}
        onClose={() => setCreateChannelModalOpened(false)}
        title="Create Text Channel"
        centered
      >
        <form
          onSubmit={createChannelForm.onSubmit(async (values) => {
            if (!selectedServer) {
              return;
            }

            await createChannelMutation.mutateAsync({
              serverId: selectedServer.id,
              name: values.name.trim(),
            });
          })}
        >
          <Stack gap="sm">
            <TextInput
              label="Channel Name"
              placeholder="for example: announcements"
              withAsterisk
              {...createChannelForm.getInputProps("name")}
            />
            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={() => setCreateChannelModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={createChannelMutation.isPending}>
                Create Channel
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={inviteModalOpened}
        onClose={() => setInviteModalOpened(false)}
        title="Invite Member"
        centered
      >
        <form
          onSubmit={inviteForm.onSubmit(async (values) => {
            if (!selectedServer) {
              return;
            }

            await inviteMemberMutation.mutateAsync({
              serverId: selectedServer.id,
              email: values.email.trim().toLowerCase(),
            });
          })}
        >
          <Stack gap="sm">
            <TextInput
              label="User Email"
              placeholder="name@example.com"
              withAsterisk
              {...inviteForm.getInputProps("email")}
            />
            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={() => setInviteModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={inviteMemberMutation.isPending}>
                Send Invite
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Group align="stretch" gap={0} wrap="nowrap" mih="100svh">
        <Stack w={366} h="100svh" gap={0}>
          <Group align="stretch" gap={0} wrap="nowrap" style={{ flex: 1, minHeight: 0 }}>
            <Paper w={86} bg="#1b1d22" radius={0} withBorder style={{ borderColor: "#1a1b1e" }}>
              <Stack h="100%" p="sm" gap="sm">
                <Stack align="center" gap="xs" style={{ flex: 1, minHeight: 0 }}>
                  <Text size="10px" fw={700} c="gray.4" tt="uppercase" style={{ letterSpacing: "0.2em" }}>
                    Servers
                  </Text>
                  <ScrollArea type="never" style={{ flex: 1, minHeight: 0 }}>
                    <Stack align="center" gap="xs">
                      {homeData.servers.map((server) => {
                        const isActive = server.id === selectedServerId;
                        return (
                          <ActionIcon
                            key={server.id}
                            size={48}
                            radius={isActive ? "md" : "xl"}
                            variant={isActive ? "filled" : "subtle"}
                            color={isActive ? "indigo" : "gray"}
                            onClick={() => setSelectedServerId(server.id)}
                            title={server.name}
                          >
                            <Avatar
                              radius={isActive ? "md" : "xl"}
                              src={server.picture}
                              name={server.name}
                              color="indigo"
                              size={40}
                            >
                              {formatServerBadge(server.name)}
                            </Avatar>
                          </ActionIcon>
                        );
                      })}
                    </Stack>
                  </ScrollArea>
                </Stack>

                <Tooltip
                  label="Create new server"
                  position="right"
                  withArrow
                  transitionProps={{ duration: 0 }}
                >
                  <Button
                    fullWidth
                    variant="light"
                    color="indigo"
                    onClick={() => setCreateModalOpened(true)}
                  >
                    <PlusIcon size={16} />
                  </Button>
                </Tooltip>
              </Stack>
            </Paper>

            <Paper w={280} bg="#2b2d31" radius={0} withBorder style={{ borderColor: "#1a1b1e" }}>
              <Stack h="100%" p="md" gap="sm">
                {selectedServer ? (
                  <>
                    <Box>
                      <Title order={4} c="gray.0">
                        {selectedServer.name}
                      </Title>
                      <Text size="xs" c="gray.4" mt={4}>
                        Roles: {selectedServer.roleNames.length > 0 ? selectedServer.roleNames.join(", ") : "Member"}
                      </Text>
                    </Box>

                    <Divider color="dark.4" />

                    <Text size="10px" fw={700} c="gray.4" tt="uppercase" style={{ letterSpacing: "0.15em" }}>
                      Channels
                    </Text>

                    <Group gap="xs">
                      <Tooltip
                        label={
                          selectedServerCapabilities?.canCreateChannels
                            ? "Create channel"
                            : "You do not have permission to create channels"
                        }
                        position="bottom"
                        withArrow
                      >
                        <Button
                          size="xs"
                          variant="light"
                          color="indigo"
                          disabled={!selectedServerCapabilities?.canCreateChannels}
                          onClick={() => setCreateChannelModalOpened(true)}
                        >
                          New Channel
                        </Button>
                      </Tooltip>
                      {selectedServerCapabilities?.canInviteMembers ? (
                        <Button size="xs" variant="subtle" color="gray" onClick={() => setInviteModalOpened(true)}>
                          Invite
                        </Button>
                      ) : null}
                    </Group>

                    <ScrollArea type="hover" style={{ flex: 1, minHeight: 0 }}>
                      <Stack gap={4}>
                        {selectedServer.channels.map((channel) => {
                          const isSelected = channel.id === selectedChannelId;

                          return (
                            <NavLink
                              key={channel.id}
                              active={isSelected}
                              label={`# ${channel.name}`}
                              description={channel.type}
                              onClick={() => {
                                setSelectedChannelByServer((current) => ({
                                  ...current,
                                  [selectedServer.id]: channel.id,
                                }));
                              }}
                              variant="light"
                              color="indigo"
                            />
                          );
                        })}
                      </Stack>
                    </ScrollArea>
                  </>
                ) : (
                  <Text size="sm" c="gray.4">
                    No servers available.
                  </Text>
                )}
              </Stack>
            </Paper>
          </Group>

          <Paper
            h={56}
            bg="#232428"
            radius={0}
            withBorder
            style={{ borderColor: "#1a1b1e", borderTopColor: "#1f2024" }}
          >
            <Group h="100%" px="sm" justify="space-between" wrap="nowrap">
              <Menu shadow="md" width={200} position="top-start" withinPortal={false}>
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      width: "100%",
                      minWidth: 0,
                      borderRadius: 6,
                      padding: "6px 8px",
                    }}
                  >
                    <Text fw={600} c="gray.0" size="sm" truncate="end">
                      {userDisplayName}
                    </Text>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item c="red.4" disabled={isSigningOut} onClick={() => void handleSignOut()}>
                    {isSigningOut ? "Logging out..." : "Log out"}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Paper>
        </Stack>

        <Paper flex={1} bg="#313338" radius={0} p={0}>
          <Stack h="100%" gap={0}>
            <Box p="md" style={{ borderBottom: "1px solid #232428" }}>
              <Text size="sm" fw={700} c="gray.0">
                {selectedChannel ? `# ${selectedChannel.name}` : "Select a channel"}
              </Text>
            </Box>

            <ScrollArea flex={1} p="md" type="hover">
              <Stack gap="sm">
                {homeDataQuery.isFetching ? (
                  <Text size="sm" c="gray.4">
                    Refreshing...
                  </Text>
                ) : null}

                {selectedChannel?.messages.length ? (
                  selectedChannel.messages.map((message) => (
                    <Paper key={message.id} p="sm" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#3a3d45" }}>
                      <Group align="flex-start" gap="sm" wrap="nowrap" justify="space-between">
                        <Avatar
                          src={message.author.image}
                          name={message.author.name}
                          color="indigo"
                          radius="xl"
                          size="sm"
                        />
                        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                          <Group gap="xs">
                            <Text size="sm" fw={700} c="gray.0">
                              {message.author.name}
                            </Text>
                            <Text size="xs" c="gray.5">
                              {formatMessageTime(message.createdAt)}
                            </Text>
                            {message.pinned ? (
                              <Text size="xs" c="yellow.4" fw={700}>
                                PINNED
                              </Text>
                            ) : null}
                          </Group>
                          <Text size="sm" c="gray.1">
                            {message.content}
                          </Text>
                        </Stack>

                        {selectedServer ? (
                          <Menu position="left-start" width={180} withinPortal={false}>
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray" size="sm">
                                ...
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {(selectedServer.capabilities.canPinMessages ||
                                selectedServer.capabilities.canManageMessages) && (
                                <Menu.Item
                                  onClick={() => {
                                    void pinMessageMutation.mutateAsync({
                                      serverId: selectedServer.id,
                                      channelId: message.channelId,
                                      messageId: message.id,
                                      pinned: !message.pinned,
                                    });
                                  }}
                                >
                                  {message.pinned ? "Unpin message" : "Pin message"}
                                </Menu.Item>
                              )}
                              {(message.author.id === homeData.currentUser.id ||
                                selectedServer.capabilities.canManageMessages) && (
                                <Menu.Item
                                  c="red.4"
                                  onClick={() => {
                                    void deleteMessageMutation.mutateAsync({
                                      serverId: selectedServer.id,
                                      channelId: message.channelId,
                                      messageId: message.id,
                                    });
                                  }}
                                >
                                  Delete message
                                </Menu.Item>
                              )}
                            </Menu.Dropdown>
                          </Menu>
                        ) : null}
                      </Group>
                    </Paper>
                  ))
                ) : (
                  <Paper p="xl" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#4a4e57", borderStyle: "dashed" }}>
                    <Stack align="center" gap={4}>
                      <Text fw={600} c="gray.0">
                        No messages yet
                      </Text>
                      <Text size="sm" c="gray.4">
                        This channel is ready for its first message.
                      </Text>
                    </Stack>
                  </Paper>
                )}

                {selectedServer && selectedChannel ? (
                  <Paper p="sm" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#3a3d45" }}>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        const normalized = messageDraft.trim();
                        if (!normalized) {
                          return;
                        }

                        void sendMessageMutation.mutateAsync({
                          serverId: selectedServer.id,
                          channelId: selectedChannel.id,
                          content: normalized,
                        });
                      }}
                    >
                      <Stack gap="xs">
                        <Textarea
                          placeholder={
                            selectedServer.capabilities.canSendMessages
                              ? `Message #${selectedChannel.name}`
                              : "You do not have permission to send messages"
                          }
                          minRows={2}
                          value={messageDraft}
                          onChange={(event) => setMessageDraft(event.currentTarget.value)}
                          disabled={!selectedServer.capabilities.canSendMessages || sendMessageMutation.isPending}
                        />
                        <Group justify="flex-end">
                          <Button
                            type="submit"
                            size="xs"
                            loading={sendMessageMutation.isPending}
                            disabled={!selectedServer.capabilities.canSendMessages || messageDraft.trim().length === 0}
                          >
                            Send
                          </Button>
                        </Group>
                      </Stack>
                    </form>
                  </Paper>
                ) : null}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
      </Group>
    </Box>
  );
}
