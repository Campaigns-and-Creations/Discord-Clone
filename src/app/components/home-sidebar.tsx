import type { HomePageData, HomeServer } from "@/app/home-types";
import {
  ActionIcon,
  Avatar,
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
import { PlusIcon, SpeakerHighIcon } from "@phosphor-icons/react";

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
  onEditChannelAccess: (channelId: string) => void;
  userDisplayName: string;
  isSigningOut: boolean;
  onSignOut: () => void;
  formatServerBadge: (name: string) => string;
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
  onEditChannelAccess,
  userDisplayName,
  isSigningOut,
  onSignOut,
  formatServerBadge,
}: HomeSidebarProps) {
  const selectedServerCapabilities = selectedServer?.capabilities;

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
                      <ActionIcon
                        key={server.id}
                        size={48}
                        radius={isActive ? "md" : "xl"}
                        variant={isActive ? "filled" : "subtle"}
                        color={isActive ? "indigo" : "gray"}
                        onClick={() => onSelectServer(server.id)}
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
                    <Menu.Item disabled={!selectedServerCapabilities?.canManageServer} onClick={onOpenManageRoles}>
                      Manage Roles
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
                        channel.type === "VOICE" ? (
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
                            />
                          </Box>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            disabled={!selectedServerCapabilities?.canCreateChannels}
                            onClick={() => onEditChannelAccess(channel.id)}
                            title="Edit channel access"
                          >
                            ...
                          </ActionIcon>
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
                <Text fw={600} c="gray.0" size="sm" truncate="end">
                  {userDisplayName}
                </Text>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
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
