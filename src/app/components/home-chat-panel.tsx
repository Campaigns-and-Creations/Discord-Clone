import type { HomeChannel, HomeServer } from "@/app/home-types";
import {
  MarkdownDraftInput,
  type DraftInputAttachment,
  type MentionSuggestionOption,
} from "@/app/components/markdown-draft-input";
import { MessageMarkdown } from "@/app/components/message-markdown";
import { ProfileAvatar } from "@/app/components/profile-avatar";
import { StreamVideoProvider } from "@/app/components/stream-video-provider";
import { VoiceCallPanel } from "@/app/components/voice-call-panel";
import { ChannelType, Permission } from "@/generated/prisma/client";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Menu,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { UsersThreeIcon } from "@phosphor-icons/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AppImage } from "./app-image";

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
  messageDraftAttachments: DraftInputAttachment[];
  onAddMessageAttachments: (files: File[]) => void;
  onRemoveMessageAttachment: (attachmentId: string) => void;
  isUploadingMessageAttachments: boolean;
  onLoadOlderMessages: () => Promise<void>;
  isSendingMessage: boolean;
};

type MediaPreviewState = {
  kind: "image" | "video";
  url: string;
};

function formatAttachmentSize(sizeBytes: number): string {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(1)} KB`;
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getAttachmentKind(mimeType: string): "image" | "video" | "other" {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  return "other";
}

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

async function forceDownloadAttachment(url: string, fileName: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download attachment (${response.status})`);
  }

  const fileBlob = await response.blob();
  const objectUrl = URL.createObjectURL(fileBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
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
  messageDraftAttachments,
  onAddMessageAttachments,
  onRemoveMessageAttachment,
  isUploadingMessageAttachments,
  onLoadOlderMessages,
  isSendingMessage,
}: HomeChatPanelProps) {
  const [membersPanelExpanded, setMembersPanelExpanded] = useState(true);
  const [mediaPreview, setMediaPreview] = useState<MediaPreviewState | null>(null);
  const messageViewportRef = useRef<HTMLDivElement | null>(null);
  const previousChannelIdRef = useRef<string | null>(null);
  const previousMessageCountRef = useRef<number>(0);
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

  const mentionSuggestions = useMemo<MentionSuggestionOption[]>(() => {
    if (!selectedServer || !selectedChannel) {
      return [];
    }

    const suggestions: MentionSuggestionOption[] = [];
    const seenKeys = new Set<string>();

    for (const member of visibleMembers) {
      const username = member.username.trim();
      if (username.length > 0) {
        const key = `member-username-${member.userId}-${username.toLowerCase()}`;
        if (!seenKeys.has(key)) {
          suggestions.push({
            key,
            kind: "member",
            insertText: username,
            label: member.name,
            subtitle: member.nickname ? `${member.name} (${username})` : username,
            searchTerms: [member.name, username, member.nickname ?? ""],
          });
          seenKeys.add(key);
        }
      }

      const nickname = member.nickname?.trim() ?? "";
      if (nickname.length > 0) {
        const key = `member-nickname-${member.userId}-${nickname.toLowerCase()}`;
        if (!seenKeys.has(key)) {
          suggestions.push({
            key,
            kind: "member",
            insertText: nickname,
            label: member.name,
            subtitle: `Nickname: ${nickname}`,
            searchTerms: [member.name, member.username, nickname],
          });
          seenKeys.add(key);
        }
      }
    }

    for (const role of selectedServer.roles) {
      const roleName = role.name.trim();
      if (roleName.length === 0) {
        continue;
      }

      const key = `role-${role.id}`;
      if (seenKeys.has(key)) {
        continue;
      }

      suggestions.push({
        key,
        kind: "role",
        insertText: roleName,
        label: roleName,
        subtitle: "Role mention",
        searchTerms: [roleName],
      });
      seenKeys.add(key);
    }

    if (selectedServer.capabilities.canMentionEveryone) {
      suggestions.push(
        {
          key: "special-everyone",
          kind: "special",
          insertText: "everyone",
          label: "everyone",
          subtitle: "Mention everyone in this channel",
          searchTerms: ["everyone", "all"],
        },
        {
          key: "special-here",
          kind: "special",
          insertText: "here",
          label: "here",
          subtitle: "Mention everyone in this channel",
          searchTerms: ["here", "all"],
        },
      );
    }

    return suggestions;
  }, [selectedChannel, selectedServer, visibleMembers]);

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
      requestAnimationFrame(() => {
        const nextViewport = messageViewportRef.current;
        if (!nextViewport) {
          return;
        }

        nextViewport.scrollTop = nextViewport.scrollHeight;
      });
    }

    previousChannelIdRef.current = currentChannelId;
    previousMessageCountRef.current = currentMessageCount;
  }, [messages.length, selectedChannel?.id]);

  return (
    <Paper flex={1} bg="#313338" radius={0} p={0} style={{ minHeight: 0, overflow: "hidden" }}>
      <Modal
        opened={mediaPreview !== null}
        onClose={() => setMediaPreview(null)}
        centered
        size="xl"
      >
        {mediaPreview?.kind === "image" ? (
          <AppImage
            src={mediaPreview.url}
            alt="Media preview"
            style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 8 }}
          />
        ) : mediaPreview?.kind === "video" ? (
          <video
            src={mediaPreview.url}
            controls
            autoPlay
            style={{ width: "100%", maxHeight: "70vh", borderRadius: 8 }}
          />
        ) : null}
      </Modal>

      <Stack h="100%" gap={0}>
        <Box p="md" style={{ borderBottom: "1px solid #232428" }}>
          <Group justify="space-between" wrap="nowrap" gap="sm">
            <Group gap="xs" wrap="wrap" style={{ minWidth: 0, flex: 1 }}>
              <Text size="sm" fw={700} c="gray.0" truncate="end">
                {selectedChannel ? `# ${selectedChannel.name}` : "Select a channel"}
              </Text>
              {selectedChannel && !selectedChannel.isPublic && (
                <Badge size="xs" color="grape" variant="light">
                  Restricted
                </Badge>
              )}
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
              <StreamVideoProvider serverId={selectedServer.id} user={currentUser}>
                <VoiceCallPanel
                  serverId={selectedServer.id}
                  channelId={selectedChannel.id}
                  channelName={selectedChannel.name}
                  currentUser={currentUser}
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
                  {isFetching && (
                    <Text size="sm" c="gray.4">
                      Refreshing...
                    </Text>
                  )}

                  {isLoadingOlderMessages && (
                    <Text size="xs" c="gray.5" ta="center">
                      Loading older messages...
                    </Text>
                  )}

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
                    const previousMessage = index > 0 && messages[index - 1];
                    const currentDateKey = getMessageDateKey(message.createdAt);
                    const previousDateKey = previousMessage && getMessageDateKey(previousMessage.createdAt);
                    const showDateDivider = previousDateKey !== currentDateKey;

                    return (
                      <Fragment key={message.id}>
                        {showDateDivider && (
                          <Group gap="xs" wrap="nowrap" align="center" mt="xs" mb={2}>
                            <Box style={{ flex: 1, borderTop: "1px solid #3a3d45" }} />
                            <Text size="xs" fw={700} c="gray.5" tt="uppercase" style={{ letterSpacing: "0.06em" }}>
                              {formatDateDivider(message.createdAt)}
                            </Text>
                            <Box style={{ flex: 1, borderTop: "1px solid #3a3d45" }} />
                          </Group>
                        )}

                        <Paper
                          p="sm"
                          bg={message.isMentionedForCurrentUser ? "#3a2f1f" : "#2b2d31"}
                          radius="md"
                          withBorder
                          style={{ borderColor: message.isMentionedForCurrentUser ? "#f08c00" : "#3a3d45" }}
                        >
                          <Group align="flex-start" gap="sm" wrap="nowrap" justify="space-between">
                            <ProfileAvatar src={message.author.image} name={message.author.name} radius="xl" size="sm" />
                            <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                              <Group gap="xs">
                                <Text size="sm" fw={700} c="gray.0">
                                  {message.author.name}
                                </Text>
                                <Text size="xs" c="gray.5">
                                  {formatMessageTime(message.createdAt)}
                                </Text>
                                {message.pinned && (
                                  <Text size="xs" c="yellow.4" fw={700}>
                                    PINNED
                                  </Text>
                                )}
                              </Group>
                              <MessageMarkdown content={message.content} />
                              {message.attachments.length > 0 && (
                                <Stack gap={6} mt={6}>
                                  {message.attachments.map((attachment) => {
                                    const kind = getAttachmentKind(attachment.mimeType);
                                    const hasUrl = Boolean(attachment.url);

                                    const openMediaPreview = () => {
                                      if (!attachment.url || kind === "other") {
                                        return;
                                      }

                                      setMediaPreview({
                                        kind,
                                        url: attachment.url,
                                      });
                                    };

                                    const content = (
                                      <Paper
                                        p="xs"
                                        bg="#232428"
                                        radius="sm"
                                        withBorder
                                        style={{ borderColor: "#3a3d45" }}
                                      >
                                        {kind === "image" && hasUrl && (
                                          <AppImage
                                            src={attachment.url!}
                                            alt={attachment.fileName}
                                            style={{
                                              maxWidth: 280,
                                              width: "100%",
                                              borderRadius: 6,
                                              objectFit: "cover",
                                              marginBottom: 6,
                                            }}
                                          />
                                        )}
                                        {kind === "video" && hasUrl && (
                                          <video
                                            src={attachment.url ?? undefined}
                                            muted
                                            playsInline
                                            preload="metadata"
                                            style={{
                                              maxWidth: 280,
                                              width: "100%",
                                              borderRadius: 6,
                                              objectFit: "cover",
                                              marginBottom: 6,
                                            }}
                                          />
                                        )}
                                        {kind === "other" && (
                                          <>
                                            <Text size="sm" c="gray.0" truncate="end">{attachment.fileName}</Text>
                                            <Text size="xs" c="gray.5">
                                              {attachment.mimeType} - {formatAttachmentSize(attachment.sizeBytes)}
                                            </Text>
                                          </>
                                        )}
                                      </Paper>
                                    );

                                    return (
                                      <Box key={attachment.id}>
                                        {kind === "other" && hasUrl ? (
                                          <Box
                                            component="button"
                                            type="button"
                                            onClick={() => {
                                              if (!attachment.url) {
                                                return;
                                              }

                                              void forceDownloadAttachment(attachment.url, attachment.fileName);
                                            }}
                                            style={{
                                              all: "unset",
                                              display: "block",
                                              width: "100%",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {content}
                                          </Box>
                                        ) : kind !== "other" && hasUrl ? (
                                          <Box
                                            onClick={openMediaPreview}
                                            style={{ cursor: "zoom-in" }}
                                          >
                                            {content}
                                          </Box>
                                        ) : (
                                          content
                                        )}
                                      </Box>
                                    );
                                  })}
                                </Stack>
                              )}
                            </Stack>

                            {selectedServer && (
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
                            )}
                          </Group>
                        </Paper>
                      </Fragment>
                    );
                  })}
                </Stack>
              </ScrollArea>

              {selectedServer && selectedChannel && (
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
                      <MarkdownDraftInput
                        placeholder={
                          selectedServer.capabilities.canSendMessages
                            ? `Message #${selectedChannel.name}`
                            : "You do not have permission to send messages"
                        }
                        value={messageDraft}
                        onChange={onChangeMessageDraft}
                        onSubmit={onSendMessage}
                        attachments={messageDraftAttachments}
                        onAddAttachments={onAddMessageAttachments}
                        onRemoveAttachment={onRemoveMessageAttachment}
                        disabled={!selectedServer.capabilities.canSendMessages || isSendingMessage}
                        mentionSuggestions={mentionSuggestions}
                        minRows={2}
                        maxRows={8}
                      />
                      {isUploadingMessageAttachments && (
                        <Text size="xs" c="gray.5">Uploading attachments...</Text>
                      )}
                    </Stack>
                  </form>
                </Paper>
              )}
            </Stack>
          )}

          {showMembersPanel && (
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
                          <ProfileAvatar src={member.image} name={member.name} radius="xl" size="sm" />
                          <Stack gap={0} style={{ minWidth: 0 }}>
                            <Text size="sm" c="gray.0" truncate="end">
                              {member.name}
                            </Text>
                            {member.roleNames[0] && (
                              <Text size="xs" c="gray.5" truncate="end">
                                {member.roleNames[0]}
                              </Text>
                            )}
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
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
