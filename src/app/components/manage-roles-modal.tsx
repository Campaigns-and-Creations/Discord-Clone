import type { HomeServer } from "@/app/home-types";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Menu,
  Modal,
  MultiSelect,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { DotsThreeIcon } from "@phosphor-icons/react";
import type { UseFormReturnType } from "@mantine/form";
import type { Dispatch, SetStateAction } from "react";

const OWNER_ROLE_NAME = "Owner";

type RoleOption = {
  value: string;
  label: string;
};

type CreateRoleFormValues = {
  name: string;
  permissions: string[];
};

type EditRoleFormValues = {
  name: string;
  permissions: string[];
};

type ManageRolesModalProps = {
  opened: boolean;
  onClose: () => void;
  selectedServer: HomeServer | null;
  editableRoles: HomeServer["roles"];
  editingRoleId: string | null;
  setEditingRoleId: (roleId: string | null) => void;
  memberRoleDrafts: Record<string, string[]>;
  setMemberRoleDrafts: Dispatch<SetStateAction<Record<string, string[]>>>;
  memberNicknameDrafts: Record<string, string>;
  setMemberNicknameDrafts: Dispatch<SetStateAction<Record<string, string>>>;
  permissionOptions: RoleOption[];
  createRoleForm: UseFormReturnType<CreateRoleFormValues>;
  editRoleForm: UseFormReturnType<EditRoleFormValues>;
  createRolePending: boolean;
  updateRolePending: boolean;
  deleteRolePending: boolean;
  setMemberRolesPending: boolean;
  setMemberNicknamePending: boolean;
  kickMemberPending: boolean;
  banMemberPending: boolean;
  unbanUserPending: boolean;
  currentUserId: string;
  canManageRoles: boolean;
  canKickMembers: boolean;
  canBanMembers: boolean;
  onBeginEditRole: (roleId: string) => void;
  onCreateRole: (values: CreateRoleFormValues) => Promise<void>;
  onUpdateRole: (roleId: string, values: EditRoleFormValues) => Promise<void>;
  onDeleteRole: (roleId: string, roleName: string) => void;
  onSaveMemberRoles: (memberId: string, roleIds: string[]) => void;
  onSaveMemberNickname: (memberId: string, nickname: string) => void;
  onKickMember: (memberId: string, memberName: string) => void;
  onBanMember: (memberId: string, memberName: string) => void;
  onUnbanUser: (userId: string, userName: string) => void;
};

export function ManageRolesModal({
  opened,
  onClose,
  selectedServer,
  editableRoles,
  editingRoleId,
  setEditingRoleId,
  memberRoleDrafts,
  setMemberRoleDrafts,
  memberNicknameDrafts,
  setMemberNicknameDrafts,
  permissionOptions,
  createRoleForm,
  editRoleForm,
  createRolePending,
  updateRolePending,
  deleteRolePending,
  setMemberRolesPending,
  setMemberNicknamePending,
  kickMemberPending,
  banMemberPending,
  unbanUserPending,
  currentUserId,
  canManageRoles,
  canKickMembers,
  canBanMembers,
  onBeginEditRole,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  onSaveMemberRoles,
  onSaveMemberNickname,
  onKickMember,
  onBanMember,
  onUnbanUser,
}: ManageRolesModalProps) {
  const rolePositionById = new Map(editableRoles.map((role) => [role.id, role.position]));
  const currentUserMembership = selectedServer?.members.find((member) => member.userId === currentUserId) ?? null;
  const currentUserIsOwner = Boolean(currentUserMembership?.roleNames.includes(OWNER_ROLE_NAME));
  const currentUserHighestRolePosition = Math.max(
    ...(currentUserMembership?.roleIds.map((roleId) => rolePositionById.get(roleId) ?? 0) ?? [0]),
  );

  const canModerateMember = (member: HomeServer["members"][number]) => {
    if (member.userId === currentUserId || member.roleNames.includes(OWNER_ROLE_NAME)) {
      return false;
    }

    if (currentUserIsOwner) {
      return true;
    }

    const targetHighestRolePosition = Math.max(
      ...member.roleIds.map((roleId) => rolePositionById.get(roleId) ?? 0),
      0,
    );

    return targetHighestRolePosition <= currentUserHighestRolePosition;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={selectedServer ? `Manage Roles - ${selectedServer.name}` : "Manage Roles"}
      centered
      size="xl"
    >
      {selectedServer && (
        <Tabs defaultValue="members">
          <Tabs.List>
            <Tabs.Tab value="members">Members</Tabs.Tab>
            <Tabs.Tab value="roles">Roles</Tabs.Tab>
            <Tabs.Tab value="banned">Banned</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="members" pt="md">
            <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
              <Text fw={700} c="gray.0" mb={8}>
                Assign Roles To Members
              </Text>
              <Stack gap="xs">
                {selectedServer.members.map((member) => {
                  const memberIsOwner = member.roleNames.includes(OWNER_ROLE_NAME);
                  const canModerate = canModerateMember(member);

                  return (
                    <Paper key={member.memberId} p="sm" bg="#2b2d31" withBorder style={{ borderColor: "#3a3d45" }}>
                      <Stack gap="xs">
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            <Avatar src={member.image} name={member.name} size="sm" radius="xl" />
                            <Stack gap={0}>
                              <Text fw={600} c="gray.0">
                                {member.name}
                              </Text>
                              {member.nickname && member.username !== member.name && (
                                <Text size="xs" c="gray.5">
                                  @{member.username}
                                </Text>
                              )}
                            </Stack>
                            {memberIsOwner && (
                              <Badge color="indigo" variant="filled">
                                Owner
                              </Badge>
                            )}
                            {member.userId === currentUserId && (
                              <Badge color="gray" variant="light">
                                You
                              </Badge>
                            )}
                          </Group>
                          <Group gap="xs">
                            <Text size="xs" c="gray.4">
                              {member.roleNames.length > 0 ? member.roleNames.join(", ") : "No roles"}
                            </Text>
                            <Menu position="bottom-end" withArrow>
                              <Menu.Target>
                                <ActionIcon
                                  variant="subtle"
                                  color="gray"
                                  title="Member moderation"
                                  disabled={(!canKickMembers && !canBanMembers) || !canModerate}
                                >
                                  <DotsThreeIcon size={16} weight="bold" />
                                </ActionIcon>
                              </Menu.Target>

                              <Menu.Dropdown>
                                <Menu.Item
                                  color="orange"
                                  disabled={!canKickMembers || !canModerate || kickMemberPending}
                                  onClick={() => onKickMember(member.memberId, member.name)}
                                >
                                  Kick
                                </Menu.Item>
                                <Menu.Item
                                  color="red"
                                  disabled={!canBanMembers || !canModerate || banMemberPending}
                                  onClick={() => onBanMember(member.memberId, member.name)}
                                >
                                  Ban
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </Group>

                        <Group align="flex-end" wrap="nowrap">
                          <TextInput
                            style={{ flex: 1 }}
                            label="Nickname"
                            placeholder="Empty uses username"
                            value={memberNicknameDrafts[member.memberId] ?? member.nickname ?? ""}
                            onChange={(event) => {
                              const value = event.currentTarget.value;
                              setMemberNicknameDrafts((current) => ({
                                ...current,
                                [member.memberId]: value,
                              }));
                            }}
                            disabled={!canManageRoles || memberIsOwner}
                          />
                          <Button
                            size="xs"
                            variant="light"
                            loading={setMemberNicknamePending}
                            disabled={!canManageRoles || memberIsOwner}
                            onClick={() => {
                              const nickname = memberNicknameDrafts[member.memberId] ?? member.nickname ?? "";
                              onSaveMemberNickname(member.memberId, nickname);
                            }}
                          >
                            Save Nickname
                          </Button>
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
                            disabled={!canManageRoles || memberIsOwner}
                            placeholder={memberIsOwner ? "Owner cannot be edited" : "Select roles"}
                            searchable
                          />
                          <Button
                            size="xs"
                            disabled={!canManageRoles || memberIsOwner}
                            loading={setMemberRolesPending}
                            onClick={() => {
                              const roleIds = memberRoleDrafts[member.memberId] ?? member.roleIds;
                              onSaveMemberRoles(member.memberId, roleIds);
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
          </Tabs.Panel>

          <Tabs.Panel value="roles" pt="md">
            <Stack gap="md">
              <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
                <Text fw={700} c="gray.0" mb={8}>
                  Create Role
                </Text>
                {!canManageRoles ? (
                  <Text size="sm" c="gray.4">
                    You do not have permission to manage roles in this server.
                  </Text>
                ) : (
                  <form onSubmit={createRoleForm.onSubmit(onCreateRole)}>
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
                        data={permissionOptions}
                        searchable
                        {...createRoleForm.getInputProps("permissions")}
                      />
                      <Group justify="flex-end">
                        <Button size="xs" type="submit" loading={createRolePending}>
                          Create Role
                        </Button>
                      </Group>
                    </Stack>
                  </form>
                )}
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
                              {isOwnerRole && (
                                <Badge variant="filled" color="indigo">
                                  Immutable
                                </Badge>
                              )}
                            </Group>
                            <Text size="xs" c="gray.4">
                              {role.permissions.length > 0 ? role.permissions.join(", ") : "No explicit permissions"}
                            </Text>
                          </Stack>

                          <Group gap="xs">
                            <Button
                              size="xs"
                              variant="light"
                              disabled={!canManageRoles || isOwnerRole}
                              onClick={() => onBeginEditRole(role.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="xs"
                              color="red"
                              variant="light"
                              disabled={!canManageRoles || isOwnerRole || deleteRolePending}
                              onClick={() => onDeleteRole(role.id, role.name)}
                            >
                              Delete
                            </Button>
                          </Group>
                        </Group>

                        {isEditing && canManageRoles && (
                          <form
                            onSubmit={editRoleForm.onSubmit(async (values) => {
                              await onUpdateRole(role.id, values);
                            })}
                          >
                            <Stack gap="xs" mt="sm">
                              <TextInput label="Role Name" withAsterisk {...editRoleForm.getInputProps("name")} />
                              <MultiSelect
                                label="Permissions"
                                placeholder="Select permissions"
                                data={permissionOptions}
                                searchable
                                {...editRoleForm.getInputProps("permissions")}
                              />
                              <Group justify="flex-end">
                                <Button size="xs" variant="default" onClick={() => setEditingRoleId(null)}>
                                  Cancel
                                </Button>
                                <Button size="xs" type="submit" loading={updateRolePending}>
                                  Save
                                </Button>
                              </Group>
                            </Stack>
                          </form>
                        )}
                      </Paper>
                    );
                  })}
                </Stack>
              </Paper>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="banned" pt="md">
            <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
              <Text fw={700} c="gray.0" mb={8}>
                Banned Users
              </Text>
              {selectedServer.bannedUsers.length === 0 ? (
                <Text size="sm" c="gray.4">
                  No banned users.
                </Text>
              ) : (
                <Stack gap="xs">
                  {selectedServer.bannedUsers.map((bannedUser) => (
                    <Paper
                      key={bannedUser.userId}
                      p="sm"
                      bg="#2b2d31"
                      withBorder
                      style={{ borderColor: "#3a3d45" }}
                    >
                      <Group justify="space-between" align="center">
                        <Group gap="xs">
                          <Avatar src={bannedUser.image} name={bannedUser.name} size="sm" radius="xl" />
                          <Stack gap={0}>
                            <Text fw={600} c="gray.0">
                              {bannedUser.name}
                            </Text>
                            <Text size="xs" c="gray.5">
                              @{bannedUser.username}
                            </Text>
                          </Stack>
                        </Group>

                        <Button
                          size="xs"
                          color="teal"
                          variant="light"
                          loading={unbanUserPending}
                          disabled={!canBanMembers}
                          onClick={() => onUnbanUser(bannedUser.userId, bannedUser.name)}
                        >
                          Unban
                        </Button>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>
          </Tabs.Panel>
        </Tabs>
      )}
    </Modal>
  );
}
