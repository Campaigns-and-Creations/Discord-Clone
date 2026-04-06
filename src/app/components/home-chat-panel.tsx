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
import { useMemo, useState } from "react";

type HomeChatPanelProps = {
  selectedChannel: HomeChannel | null;
  selectedServer: HomeServer | null;
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
  isSendingMessage: boolean;
};

function formatMessageTime(createdAt: string): string {
  return new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HomeChatPanel({
  selectedChannel,
  selectedServer,
  currentUserId,
  currentUser,
  isFetching,
  onTogglePin,
  onDeleteMessage,
  messageDraft,
  onChangeMessageDraft,
  onSendMessage,
  isSendingMessage,
}: HomeChatPanelProps) {
  const [membersPanelExpanded, setMembersPanelExpanded] = useState(true);

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
            <ScrollArea flex={1} p="md" type="hover">
              <Stack gap="sm">
                {isFetching ? (
                  <Text size="sm" c="gray.4">
                    Refreshing...
                  </Text>
                ) : null}

                {selectedChannel?.messages.length ? (
                  selectedChannel.messages.map((message) => (
                    <Paper key={message.id} p="sm" bg="#2b2d31" radius="md" withBorder style={{ borderColor: "#3a3d45" }}>
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
            </ScrollArea>
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
