"use client";

import {
  createServer,
  createChannel,
  createInviteLink,
  createServerRole,
  deleteServerRole,
  deleteMessage,
  sendMessage,
  setServerMemberRoles,
  setMessagePinned,
  updateServerRole,
} from "@/app/actions";
import type { HomePageData } from "@/app/home-types";
import { Permission } from "@/generated/prisma";
import { signOut } from "@/utils/auth-client";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Modal,
  MultiSelect,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Textarea,
  Text,
  TextInput,
  Select,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PlusIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

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

const OWNER_ROLE_NAME = "Owner";

const PERMISSION_OPTIONS = Object.values(Permission).map((permission) => ({
  value: permission,
  label: permission,
}));

export default function HomeClient({ initialData }: HomeClientProps) {
  const queryClient = useQueryClient();
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [createChannelModalOpened, setCreateChannelModalOpened] = useState(false);
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [manageRolesModalOpened, setManageRolesModalOpened] = useState(false);
  const [latestInviteLink, setLatestInviteLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [memberRoleDrafts, setMemberRoleDrafts] = useState<Record<string, string[]>>({});

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
      expirationPreset: "never",
      maxUses: "",
    },
    validate: {
      expirationPreset: (value) => {
        return value ? null : "Please select an expiration option.";
      },
      maxUses: (value) => {
        const normalized = value.trim();

        if (!normalized) {
          return null;
        }

        const parsed = Number(normalized);
        if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 100000) {
          return "Max uses must be a whole number between 1 and 100000.";
        }

        return null;
      },
    },
  });

  const createRoleForm = useForm({
    initialValues: {
      name: "",
      permissions: [Permission.VIEW_CHANNEL, Permission.SEND_MESSAGES, Permission.READ_MESSAGE_HISTORY],
    },
    validate: {
      name: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return "Role name is required";
        }
        if (trimmed.length > 60) {
          return "Role name must be at most 60 characters";
        }
        return null;
      },
    },
  });

  const editRoleForm = useForm({
    initialValues: {
      name: "",
      permissions: [] as string[],
    },
    validate: {
      name: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return "Role name is required";
        }
        if (trimmed.length > 60) {
          return "Role name must be at most 60 characters";
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

  const createInviteLinkMutation = useMutation({
    mutationFn: async (payload: { serverId: string; expiresInHours: number | null; maxUses: number | null }) =>
      createInviteLink(payload.serverId, {
        expiresInHours: payload.expiresInHours,
        maxUses: payload.maxUses,
      }),
    onSuccess: async (result) => {
      const inviteUrl = `${window.location.origin}${result.invitePath}`;
      setLatestInviteLink(inviteUrl);
      setLinkCopied(false);
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

  const createRoleMutation = useMutation({
    mutationFn: async (payload: { serverId: string; name: string; permissions: string[] }) =>
      createServerRole(payload.serverId, payload.name, payload.permissions as Permission[]),
    onSuccess: async () => {
      createRoleForm.reset();
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async (payload: { serverId: string; roleId: string; name: string; permissions: string[] }) =>
      updateServerRole(payload.serverId, payload.roleId, {
        name: payload.name,
        permissions: payload.permissions as Permission[],
      }),
    onSuccess: async () => {
      setEditingRoleId(null);
      editRoleForm.reset();
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (payload: { serverId: string; roleId: string }) =>
      deleteServerRole(payload.serverId, payload.roleId),
    onSuccess: async () => {
      setEditingRoleId(null);
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const setMemberRolesMutation = useMutation({
    mutationFn: async (payload: { serverId: string; memberId: string; roleIds: string[] }) =>
      setServerMemberRoles(payload.serverId, payload.memberId, payload.roleIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const selectedChannelId = selectedServer
    ? (selectedChannelByServer[selectedServer.id] ?? selectedServer.channels[0]?.id ?? null)
    : null;

  const selectedChannel = selectedServer?.channels.find((channel) => channel.id === selectedChannelId) ?? null;

  const selectedServerCapabilities = selectedServer?.capabilities;

  const editableRoles = selectedServer?.roles ?? [];

  useEffect(() => {
    if (!selectedServer || !manageRolesModalOpened) {
      return;
    }

    setMemberRoleDrafts(() => {
      return selectedServer.members.reduce<Record<string, string[]>>((acc, member) => {
        acc[member.memberId] = member.roleIds;
        return acc;
      }, {});
    });
  }, [manageRolesModalOpened, selectedServer]);

  const beginEditRole = (roleId: string) => {
    if (!selectedServer) {
      return;
    }

    const role = selectedServer.roles.find((item) => item.id === roleId);
    if (!role) {
      return;
    }

    setEditingRoleId(role.id);
    editRoleForm.setValues({
      name: role.name,
      permissions: role.permissions,
    });
  };

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
        onClose={() => {
          setInviteModalOpened(false);
          setLatestInviteLink(null);
          setLinkCopied(false);
        }}
        title="Create Invite Link"
        centered
      >
        <form
          onSubmit={inviteForm.onSubmit(async (values) => {
            if (!selectedServer) {
              return;
            }

            const expiresInHours =
              values.expirationPreset === "24h"
                ? 24
                : values.expirationPreset === "7d"
                  ? 24 * 7
                  : values.expirationPreset === "30d"
                    ? 24 * 30
                    : null;

            const normalizedMaxUses = values.maxUses.trim();
            const maxUses = normalizedMaxUses ? Number(normalizedMaxUses) : null;

            await createInviteLinkMutation.mutateAsync({
              serverId: selectedServer.id,
              expiresInHours,
              maxUses,
            });
          })}
        >
          <Stack gap="sm">
            <Select
              label="Expiration"
              withAsterisk
              data={[
                { value: "never", label: "Never" },
                { value: "24h", label: "24 hours" },
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
              ]}
              {...inviteForm.getInputProps("expirationPreset")}
            />
            <TextInput
              label="Max Uses"
              description="Leave empty for unlimited uses"
              placeholder="Unlimited"
              {...inviteForm.getInputProps("maxUses")}
            />

            {latestInviteLink ? (
              <Stack gap={6}>
                <Text size="xs" c="gray.4">
                  Share this link to let people join the server.
                </Text>
                <TextInput value={latestInviteLink} readOnly />
                <Group justify="flex-end">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await navigator.clipboard.writeText(latestInviteLink);
                      setLinkCopied(true);
                    }}
                  >
                    {linkCopied ? "Copied" : "Copy Link"}
                  </Button>
                </Group>
              </Stack>
            ) : null}

            <Group justify="flex-end" mt="sm">
              <Button
                variant="default"
                onClick={() => {
                  setInviteModalOpened(false);
                  setLatestInviteLink(null);
                  setLinkCopied(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" loading={createInviteLinkMutation.isPending}>
                Create Link
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={manageRolesModalOpened}
        onClose={() => {
          setManageRolesModalOpened(false);
          setEditingRoleId(null);
        }}
        title={selectedServer ? `Manage Roles - ${selectedServer.name}` : "Manage Roles"}
        centered
        size="xl"
      >
        {selectedServer ? (
          <Stack gap="md">
            <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
              <Text fw={700} c="gray.0" mb={8}>
                Create Role
              </Text>
              <form
                onSubmit={createRoleForm.onSubmit(async (values) => {
                  await createRoleMutation.mutateAsync({
                    serverId: selectedServer.id,
                    name: values.name.trim(),
                    permissions: values.permissions,
                  });
                })}
              >
                <Stack gap="xs">
                  <TextInput
                    label="Role Name"
                    placeholder="for example: Event Host"
                    withAsterisk
                    {...createRoleForm.getInputProps("name")}
                  />
                  <MultiSelect
                    label="Permissions"
                    placeholder="Select permissions"
                    data={PERMISSION_OPTIONS}
                    searchable
                    {...createRoleForm.getInputProps("permissions")}
                  />
                  <Group justify="flex-end">
                    <Button size="xs" type="submit" loading={createRoleMutation.isPending}>
                      Create Role
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Paper>

            <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
              <Text fw={700} c="gray.0" mb={8}>
                Server Roles
              </Text>
              <Stack gap="xs">
                {editableRoles.map((role) => {
                  const isOwnerRole = role.name === OWNER_ROLE_NAME;
                  const isEditing = editingRoleId === role.id;

                  return (
                    <Paper key={role.id} p="sm" bg="#2b2d31" withBorder style={{ borderColor: "#3a3d45" }}>
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                          <Group gap="xs" wrap="wrap">
                            <Text fw={600} c="gray.0">
                              {role.name}
                            </Text>
                            <Badge variant="light" color="gray">
                              Position {role.position}
                            </Badge>
                            {isOwnerRole ? (
                              <Badge variant="filled" color="indigo">
                                Immutable
                              </Badge>
                            ) : null}
                          </Group>
                          <Text size="xs" c="gray.4">
                            {role.permissions.length > 0
                              ? role.permissions.join(", ")
                              : "No explicit permissions"}
                          </Text>
                        </Stack>

                        <Group gap="xs">
                          <Button
                            size="xs"
                            variant="light"
                            disabled={isOwnerRole}
                            onClick={() => beginEditRole(role.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="xs"
                            color="red"
                            variant="light"
                            disabled={isOwnerRole || deleteRoleMutation.isPending}
                            onClick={() => {
                              if (!window.confirm(`Delete role \"${role.name}\"?`)) {
                                return;
                              }

                              void deleteRoleMutation.mutateAsync({
                                serverId: selectedServer.id,
                                roleId: role.id,
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </Group>
                      </Group>

                      {isEditing ? (
                        <form
                          onSubmit={editRoleForm.onSubmit(async (values) => {
                            await updateRoleMutation.mutateAsync({
                              serverId: selectedServer.id,
                              roleId: role.id,
                              name: values.name.trim(),
                              permissions: values.permissions,
                            });
                          })}
                        >
                          <Stack gap="xs" mt="sm">
                            <TextInput
                              label="Role Name"
                              withAsterisk
                              {...editRoleForm.getInputProps("name")}
                            />
                            <MultiSelect
                              label="Permissions"
                              placeholder="Select permissions"
                              data={PERMISSION_OPTIONS}
                              searchable
                              {...editRoleForm.getInputProps("permissions")}
                            />
                            <Group justify="flex-end">
                              <Button size="xs" variant="default" onClick={() => setEditingRoleId(null)}>
                                Cancel
                              </Button>
                              <Button size="xs" type="submit" loading={updateRoleMutation.isPending}>
                                Save
                              </Button>
                            </Group>
                          </Stack>
                        </form>
                      ) : null}
                    </Paper>
                  );
                })}
              </Stack>
            </Paper>

            <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
              <Text fw={700} c="gray.0" mb={8}>
                Assign Roles To Members
              </Text>
              <Stack gap="xs">
                {selectedServer.members.map((member) => {
                  const memberIsOwner = member.roleNames.includes(OWNER_ROLE_NAME);

                  return (
                    <Paper key={member.memberId} p="sm" bg="#2b2d31" withBorder style={{ borderColor: "#3a3d45" }}>
                      <Stack gap="xs">
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            <Avatar src={member.image} name={member.name} size="sm" radius="xl" />
                            <Text fw={600} c="gray.0">
                              {member.name}
                            </Text>
                            {memberIsOwner ? (
                              <Badge color="indigo" variant="filled">
                                Owner
                              </Badge>
                            ) : null}
                          </Group>
                          <Text size="xs" c="gray.4">
                            {member.roleNames.length > 0 ? member.roleNames.join(", ") : "No roles"}
                          </Text>
                        </Group>

                        <Group align="flex-end" wrap="nowrap">
                          <MultiSelect
                            style={{ flex: 1 }}
                            data={editableRoles
                              .filter((role) => role.name !== OWNER_ROLE_NAME)
                              .map((role) => ({ value: role.id, label: role.name }))}
                            value={memberRoleDrafts[member.memberId] ?? member.roleIds}
                            onChange={(value) => {
                              setMemberRoleDrafts((current) => ({
                                ...current,
                                [member.memberId]: value,
                              }));
                            }}
                            disabled={memberIsOwner}
                            placeholder={memberIsOwner ? "Owner cannot be edited" : "Select roles"}
                            searchable
                          />
                          <Button
                            size="xs"
                            disabled={memberIsOwner}
                            loading={setMemberRolesMutation.isPending}
                            onClick={() => {
                              const roleIds = memberRoleDrafts[member.memberId] ?? member.roleIds;
                              void setMemberRolesMutation.mutateAsync({
                                serverId: selectedServer.id,
                                memberId: member.memberId,
                                roleIds,
                              });
                            }}
                          >
                            Save
                          </Button>
                        </Group>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </Paper>
          </Stack>
        ) : null}
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
                          onClick={() => setCreateChannelModalOpened(true)}
                        >
                          Create Channel
                        </Menu.Item>
                        <Menu.Item
                          disabled={!selectedServerCapabilities?.canInviteMembers}
                          onClick={() => setInviteModalOpened(true)}
                        >
                          Invite People
                        </Menu.Item>
                        <Menu.Item
                          disabled={!selectedServerCapabilities?.canManageServer}
                          onClick={() => setManageRolesModalOpened(true)}
                        >
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
