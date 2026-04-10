import type { HomePageData, HomeServer } from "@/app/home-types";
import { ProfileAvatar } from "@/app/components/profile-avatar";
import { ChannelType } from "@/generated/prisma/client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { DotsThreeIcon, PlusIcon, SpeakerHighIcon } from "@phosphor-icons/react";

type HomeSidebarProps = {
  homeData: HomePageData;
  selectedServerId: string | null;
  onSelectServer: (serverId: string) => void;
  onOpenCreateServer: () => void;
  selectedServer: HomeServer | null;
  selectedChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  onOpenCreateChannel: () => void;
  onOpenInvite: () => void;
  onOpenManageRoles: () => void;
  onOpenEditServerImage: () => void;
  onOpenEditNickname: () => void;
  onEditChannelAccess: (channelId: string) => void;
  onDeleteChannel: (channelId: string, channelName: string) => void;
  onDeleteServer: (serverId: string, serverName: string) => void;
  currentUserImage: string | null;
  userDisplayName: string;
  isSigningOut: boolean;
  onOpenEditProfileImage: () => void;
  onSignOut: () => void;
};

export function HomeSidebar({
  homeData,
  selectedServerId,
  onSelectServer,
  onOpenCreateServer,
  selectedServer,
  selectedChannelId,
  onSelectChannel,
  onOpenCreateChannel,
  onOpenInvite,
  onOpenManageRoles,
  onOpenEditServerImage,
  onOpenEditNickname,
  onEditChannelAccess,
  onDeleteChannel,
  onDeleteServer,
  currentUserImage,
  userDisplayName,
  isSigningOut,
  onOpenEditProfileImage,
  onSignOut,
}: HomeSidebarProps) {
  const selectedServerCapabilities = selectedServer?.capabilities;
  const canDeleteSelectedServer =
    Boolean(selectedServer?.membershipId) && (selectedServer?.members.length ?? 0) === 1;
  const canOpenManageRoles = Boolean(
    selectedServerCapabilities?.canManageServer
      || selectedServerCapabilities?.canKickMembers
      || selectedServerCapabilities?.canBanMembers,
  );

  return (
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
                      <Box key={server.id} pos="relative">
                        <ActionIcon
                          size={48}
                          radius={isActive ? "md" : "xl"}
                          variant={isActive ? "filled" : "subtle"}
                          color={isActive ? "indigo" : "gray"}
                          onClick={() => onSelectServer(server.id)}
                          title={server.name}
                        >
                          <ProfileAvatar
                            radius={isActive ? "md" : "xl"}
                            src={server.picture}
                            name={server.name}
                            size={40}
                          />
                        </ActionIcon>
                        {server.hasUnreadMentions && (
                          <Box
                            pos="absolute"
                            top={-2}
                            right={-1}
                            w={10}
                            h={10}
                            style={{
                              borderRadius: 999,
                              background: "#f08c00",
                              border: "2px solid #1b1d22",
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              </ScrollArea>
            </Stack>

            <Tooltip label="Create new server" position="right" withArrow transitionProps={{ duration: 0 }}>
              <Button fullWidth variant="light" color="indigo" onClick={onOpenCreateServer}>
                <PlusIcon size={16} />
              </Button>
            </Tooltip>
          </Stack>
        </Paper>

        <Paper w={280} bg="#2b2d31" radius={0} withBorder style={{ borderColor: "#1a1b1e" }}>
          <Stack h="100%" p="md" gap="sm">
            {selectedServer ? (
              <>
                <Menu position="bottom-start" width={240} withinPortal={false}>
                  <Menu.Target>
                    <UnstyledButton
                      style={{
                        width: "100%",
                        borderRadius: 6,
                        padding: "6px 8px",
                      }}
                    >
                      <Title order={4} c="gray.0">
                        {selectedServer.name}
                      </Title>
                      <Text size="xs" c="gray.4" mt={4}>
                        Roles: {selectedServer.roleNames.length > 0 ? selectedServer.roleNames.join(", ") : "Member"}
                      </Text>
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      disabled={!selectedServerCapabilities?.canCreateChannels}
                      onClick={onOpenCreateChannel}
                    >
                      Create Channel
                    </Menu.Item>
                    <Menu.Item disabled={!selectedServerCapabilities?.canInviteMembers} onClick={onOpenInvite}>
                      Invite People
                    </Menu.Item>
                    <Menu.Item disabled={!canOpenManageRoles} onClick={onOpenManageRoles}>
                      Manage Roles
                    </Menu.Item>
                    <Menu.Item
                      disabled={!selectedServerCapabilities?.canManageServer}
                      onClick={onOpenEditServerImage}
                    >
                      Edit Server Image
                    </Menu.Item>
                    <Menu.Item
                      disabled={!selectedServer?.membershipId}
                      onClick={onOpenEditNickname}
                    >
                      Edit My Nickname
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      c="red.4"
                      disabled={!canDeleteSelectedServer}
                      onClick={() => onDeleteServer(selectedServer.id, selectedServer.name)}
                    >
                      Delete Server
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Divider color="dark.4" />

                <Text size="10px" fw={700} c="gray.4" tt="uppercase" style={{ letterSpacing: "0.15em" }}>
                  Channels
                </Text>

                <ScrollArea type="hover" style={{ flex: 1, minHeight: 0 }}>
                  <Stack gap={4}>
                    {selectedServer.channels.map((channel) => {
                      const isSelected = channel.id === selectedChannelId;
                      const channelLabel =
                        channel.type === ChannelType.VOICE ? (
                          <Group gap={6} wrap="nowrap" align="center">
                            <SpeakerHighIcon size={14} />
                            <Text span size="sm" c="inherit" truncate="end">
                              {channel.name}
                            </Text>
                          </Group>
                        ) : (
                          `# ${channel.name}`
                        );

                      return (
                        <Group key={channel.id} gap={4} wrap="nowrap" align="center">
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <NavLink
                              active={isSelected}
                              label={channelLabel}
                              onClick={() => onSelectChannel(channel.id)}
                              variant="light"
                              color="indigo"
                              rightSection={
                                channel.unreadMentionCount > 0 ? (
                                  <Badge size="xs" variant="filled" color="orange">
                                    @{channel.unreadMentionCount}
                                  </Badge>
                                ) : undefined
                              }
                            />
                          </Box>
                          <Menu position="bottom-end" width={200} withinPortal={false}>
                            <Menu.Target>
                              <ActionIcon
                                variant="subtle"
                                color="gray"
                                size="sm"
                                disabled={!selectedServerCapabilities?.canCreateChannels}
                                title="Channel options"
                              >
                                <DotsThreeIcon size={14} weight="bold" />
                              </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                              <Menu.Item onClick={() => onEditChannelAccess(channel.id)}>
                                Edit Access
                              </Menu.Item>
                              <Menu.Item c="red.4" onClick={() => onDeleteChannel(channel.id, channel.name)}>
                                Delete Channel
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
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

      <Paper h={56} bg="#232428" radius={0} withBorder style={{ borderColor: "#1a1b1e", borderTopColor: "#1f2024" }}>
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
                <Group gap="sm" wrap="nowrap">
                  <ProfileAvatar src={currentUserImage} name={userDisplayName} size="sm" radius="xl" />
                  <Text fw={600} c="gray.0" size="sm" truncate="end" style={{ minWidth: 0 }}>
                    {userDisplayName}
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={onOpenEditProfileImage}>Edit Profile Image</Menu.Item>
              <Menu.Divider />
              <Menu.Item c="red.4" disabled={isSigningOut} onClick={onSignOut}>
                {isSigningOut ? "Logging out..." : "Log out"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Paper>
    </Stack>
  );
}
