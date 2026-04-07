import type { HomeChannel, HomeServer } from "@/app/home-types";
import { StreamVideoProvider } from "@/app/components/stream-video-provider";
import { VoiceCallPanel } from "@/app/components/voice-call-panel";
import { ChannelType, Permission } from "@/generated/prisma/client";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Menu,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { UsersThreeIcon } from "@phosphor-icons/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

type HomeChatPanelProps = {
  selectedChannel: HomeChannel | null;
  selectedServer: HomeServer | null;
  messages: HomeChannel["messages"];
  hasOlderMessages: boolean;
  isLoadingOlderMessages: boolean;
  currentUserId: string;
  currentUser: {
    id: string;
    name: string;
    image: string | null;
  };
  isFetching: boolean;
  onTogglePin: (message: HomeChannel["messages"][number]) => void;
  onDeleteMessage: (message: HomeChannel["messages"][number]) => void;
  messageDraft: string;
  onChangeMessageDraft: (value: string) => void;
  onSendMessage: () => void;
  onLoadOlderMessages: () => Promise<void>;
  isSendingMessage: boolean;
};

function formatMessageTime(createdAt: string): string {
  return new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMessageDateKey(createdAt: string): string {
  const date = new Date(createdAt);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatDateDivider(createdAt: string): string {
  return new Date(createdAt).toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function HomeChatPanel({
  selectedChannel,
  selectedServer,
  messages,
  hasOlderMessages,
  isLoadingOlderMessages,
  currentUserId,
  currentUser,
  isFetching,
  onTogglePin,
  onDeleteMessage,
  messageDraft,
  onChangeMessageDraft,
  onSendMessage,
  onLoadOlderMessages,
  isSendingMessage,
}: HomeChatPanelProps) {
  const [membersPanelExpanded, setMembersPanelExpanded] = useState(true);
  const messageViewportRef = useRef<HTMLDivElement | null>(null);
  const previousChannelIdRef = useRef<string | null>(selectedChannel?.id ?? null);
  const previousMessageCountRef = useRef<number>(messages.length);
  const loadingOlderRef = useRef(false);

  const visibleMembers = useMemo(() => {
    if (!selectedServer || !selectedChannel) {
      return [];
    }

    if (selectedChannel.isPublic) {
      return selectedServer.members;
    }

    const allowedRoleIds = new Set(selectedChannel.allowedRoleIds);
    const rolesById = new Map(selectedServer.roles.map((role) => [role.id, role]));

    return selectedServer.members.filter((member) => {
      const isOwner = member.roleNames.some((roleName) => roleName === "Owner");
      if (isOwner) {
        return true;
      }

      const memberPermissions = new Set<Permission>();
      for (const roleId of member.roleIds) {
        const role = rolesById.get(roleId);
        if (!role) {
          continue;
        }

        for (const permission of role.permissions) {
          memberPermissions.add(permission);
        }
      }

      if (memberPermissions.has(Permission.ADMINISTRATOR)) {
        return true;
      }

      if (!memberPermissions.has(Permission.VIEW_CHANNEL)) {
        return false;
      }

      return member.roleIds.some((roleId) => allowedRoleIds.has(roleId));
    });
  }, [selectedChannel, selectedServer]);

  const showMembersPanel = membersPanelExpanded && selectedServer && selectedChannel;

  useEffect(() => {
    loadingOlderRef.current = isLoadingOlderMessages;
  }, [isLoadingOlderMessages]);

  const handleScrollPositionChange = ({ y }: { x: number; y: number }) => {
    if (y > 72 || !selectedChannel || !hasOlderMessages || loadingOlderRef.current || messages.length === 0) {
      return;
    }

    const viewport = messageViewportRef.current;
    if (!viewport) {
      return;
    }

    const previousScrollHeight = viewport.scrollHeight;
    loadingOlderRef.current = true;

    void onLoadOlderMessages().finally(() => {
      requestAnimationFrame(() => {
        const nextViewport = messageViewportRef.current;
        if (!nextViewport) {
          loadingOlderRef.current = false;
          return;
        }

        const scrollHeightDelta = nextViewport.scrollHeight - previousScrollHeight;
        if (scrollHeightDelta > 0) {
          nextViewport.scrollTop += scrollHeightDelta;
        }

        loadingOlderRef.current = false;
      });
    });
  };

  useEffect(() => {
    const viewport = messageViewportRef.current;
    const currentChannelId = selectedChannel?.id ?? null;

    if (!viewport || !currentChannelId) {
      previousChannelIdRef.current = currentChannelId;
      previousMessageCountRef.current = messages.length;
      return;
    }

    const previousChannelId = previousChannelIdRef.current;
    const previousMessageCount = previousMessageCountRef.current;
    const currentMessageCount = messages.length;

    const switchedChannel = previousChannelId !== currentChannelId;
    const nearBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 120;
    const addedNewMessage = currentMessageCount > previousMessageCount;

    if (switchedChannel || (addedNewMessage && nearBottom)) {
      viewport.scrollTop = viewport.scrollHeight;
    }

    previousChannelIdRef.current = currentChannelId;
    previousMessageCountRef.current = currentMessageCount;
  }, [messages.length, selectedChannel?.id]);

  return (
    <Paper flex={1} bg="#313338" radius={0} p={0}>
      <Stack h="100%" gap={0}>
        <Box p="md" style={{ borderBottom: "1px solid #232428" }}>
          <Group justify="space-between" wrap="nowrap" gap="sm">
            <Group gap="xs" wrap="wrap" style={{ minWidth: 0, flex: 1 }}>
              <Text size="sm" fw={700} c="gray.0" truncate="end">
                {selectedChannel ? `# ${selectedChannel.name}` : "Select a channel"}
              </Text>
              {selectedChannel && !selectedChannel.isPublic ? (
                <Badge size="xs" color="grape" variant="light">
                  Restricted
                </Badge>
              ) : null}
            </Group>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setMembersPanelExpanded((current) => !current)}
              disabled={!selectedServer || !selectedChannel}
              title={membersPanelExpanded ? "Hide member list" : "Show member list"}
              aria-label={membersPanelExpanded ? "Hide member list" : "Show member list"}
            >
              <UsersThreeIcon size={18} />
            </ActionIcon>
          </Group>
        </Box>

        <Group align="stretch" gap={0} wrap="nowrap" style={{ flex: 1, minHeight: 0 }}>
          {selectedChannel?.type === ChannelType.VOICE && selectedServer ? (
            <Box flex={1} p="md">
              <StreamVideoProvider user={currentUser}>
                <VoiceCallPanel
                  serverId={selectedServer.id}
                  channelId={selectedChannel.id}
                  channelName={selectedChannel.name}
                />
              </StreamVideoProvider>
            </Box>
          ) : (
            <Stack gap={0} style={{ flex: 1, minHeight: 0 }}>
              <ScrollArea
                viewportRef={messageViewportRef}
                p="md"
                type="hover"
                style={{ flex: 1, minHeight: 0 }}
                onScrollPositionChange={handleScrollPositionChange}
              >
                <Stack gap="sm" pb="sm">
                  {isFetching ? (
                    <Text size="sm" c="gray.4">
                      Refreshing...
                    </Text>
                  ) : null}

                  {isLoadingOlderMessages ? (
                    <Text size="xs" c="gray.5" ta="center">
                      Loading older messages...
                    </Text>
                  ) : null}

                  {selectedChannel ? (
                    <Paper p="xl" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#4a4e57", borderStyle: "dashed" }}>
                      <Stack align="center" gap={4}>
                        <Text fw={700} c="gray.0">
                          Welcome to #{selectedChannel.name}
                        </Text>
                        <Text size="sm" c="gray.4">
                          This is the start of #{selectedChannel.name}.
                        </Text>
                      </Stack>
                    </Paper>
                  ) : (
                    <Paper p="xl" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#4a4e57", borderStyle: "dashed" }}>
                      <Stack align="center" gap={4}>
                        <Text fw={600} c="gray.0">
                          Select a channel
                        </Text>
                        <Text size="sm" c="gray.4">
                          Choose a channel from the sidebar to start chatting.
                        </Text>
                      </Stack>
                    </Paper>
                  )}

                  {messages.map((message, index) => {
                    const previousMessage = index > 0 ? messages[index - 1] : null;
                    const currentDateKey = getMessageDateKey(message.createdAt);
                    const previousDateKey = previousMessage ? getMessageDateKey(previousMessage.createdAt) : null;
                    const showDateDivider = previousDateKey !== currentDateKey;

                    return (
                      <Fragment key={message.id}>
                        {showDateDivider ? (
                          <Group gap="xs" wrap="nowrap" align="center" mt="xs" mb={2}>
                            <Box style={{ flex: 1, borderTop: "1px solid #3a3d45" }} />
                            <Text size="xs" fw={700} c="gray.5" tt="uppercase" style={{ letterSpacing: "0.06em" }}>
                              {formatDateDivider(message.createdAt)}
                            </Text>
                            <Box style={{ flex: 1, borderTop: "1px solid #3a3d45" }} />
                          </Group>
                        ) : null}

                        <Paper p="sm" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#3a3d45" }}>
                          <Group align="flex-start" gap="sm" wrap="nowrap" justify="space-between">
                            <Avatar src={message.author.image} name={message.author.name} color="indigo" radius="xl" size="sm" />
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
                                  {(selectedServer.capabilities.canPinMessages || selectedServer.capabilities.canManageMessages) && (
                                    <Menu.Item onClick={() => onTogglePin(message)}>
                                      {message.pinned ? "Unpin message" : "Pin message"}
                                    </Menu.Item>
                                  )}
                                  {(message.author.id === currentUserId || selectedServer.capabilities.canManageMessages) && (
                                    <Menu.Item c="red.4" onClick={() => onDeleteMessage(message)}>
                                      Delete message
                                    </Menu.Item>
                                  )}
                                </Menu.Dropdown>
                              </Menu>
                            ) : null}
                          </Group>
                        </Paper>
                      </Fragment>
                    );
                  })}
                </Stack>
              </ScrollArea>

              {selectedServer && selectedChannel ? (
                <Paper
                  p="sm"
                  bg="#313338"
                  radius={0}
                  withBorder
                  style={{ borderColor: "#232428", borderTopWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}
                >
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      onSendMessage();
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
                        maxRows={8}
                        autosize
                        value={messageDraft}
                        onChange={(event) => onChangeMessageDraft(event.currentTarget.value)}
                        disabled={!selectedServer.capabilities.canSendMessages || isSendingMessage}
                      />
                      <Group justify="flex-end">
                        <Button
                          type="submit"
                          size="xs"
                          loading={isSendingMessage}
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
          )}

          {showMembersPanel ? (
            <Paper w={240} bg="#2b2d31" radius={0} withBorder style={{ borderColor: "#232428", borderLeftWidth: 1 }}>
              <Stack h="100%" gap={0}>
                <Box px="sm" py="xs" style={{ borderBottom: "1px solid #232428" }}>
                  <Text size="xs" fw={700} c="gray.4" tt="uppercase" style={{ letterSpacing: "0.08em" }}>
                    Members - {visibleMembers.length}
                  </Text>
                </Box>
                <ScrollArea type="hover" style={{ flex: 1, minHeight: 0 }}>
                  <Stack gap={2} p="xs">
                    {visibleMembers.length > 0 ? (
                      visibleMembers.map((member) => (
                        <Group
                          key={member.memberId}
                          gap="sm"
                          wrap="nowrap"
                          px="xs"
                          py={6}
                          style={{ borderRadius: 6 }}
                        >
                          <Avatar src={member.image} name={member.name} color="indigo" radius="xl" size="sm" />
                          <Stack gap={0} style={{ minWidth: 0 }}>
                            <Text size="sm" c="gray.0" truncate="end">
                              {member.name}
                            </Text>
                            {member.roleNames[0] ? (
                              <Text size="xs" c="gray.5" truncate="end">
                                {member.roleNames[0]}
                              </Text>
                            ) : null}
                          </Stack>
                        </Group>
                      ))
                    ) : (
                      <Text size="sm" c="gray.5" px="xs" py="sm">
                        No visible members for this channel.
                      </Text>
                    )}
                  </Stack>
                </ScrollArea>
              </Stack>
            </Paper>
          ) : null}
        </Group>
      </Stack>
    </Paper>
  );
}
