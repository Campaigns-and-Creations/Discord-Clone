import type { HomeChannel, HomeServer } from "@/app/home-types";
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

type HomeChatPanelProps = {
  selectedChannel: HomeChannel | null;
  selectedServer: HomeServer | null;
  currentUserId: string;
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
  isFetching,
  onTogglePin,
  onDeleteMessage,
  messageDraft,
  onChangeMessageDraft,
  onSendMessage,
  isSendingMessage,
}: HomeChatPanelProps) {
  return (
    <Paper flex={1} bg="#313338" radius={0} p={0}>
      <Stack h="100%" gap={0}>
        <Box p="md" style={{ borderBottom: "1px solid #232428" }}>
          <Group gap="xs" wrap="wrap">
            <Text size="sm" fw={700} c="gray.0">
              {selectedChannel ? `# ${selectedChannel.name}` : "Select a channel"}
            </Text>
            {selectedChannel && !selectedChannel.isPublic ? (
              <Badge size="xs" color="grape" variant="light">
                Restricted
              </Badge>
            ) : null}
          </Group>
        </Box>

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
      </Stack>
    </Paper>
  );
}
