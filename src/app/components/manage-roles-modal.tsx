import type { HomeServer } from "@/app/home-types";
import {
  Avatar,
  Badge,
  Button,
  Group,
  Modal,
  MultiSelect,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
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
  permissionOptions: RoleOption[];
  createRoleForm: UseFormReturnType<CreateRoleFormValues>;
  editRoleForm: UseFormReturnType<EditRoleFormValues>;
  createRolePending: boolean;
  updateRolePending: boolean;
  deleteRolePending: boolean;
  setMemberRolesPending: boolean;
  onBeginEditRole: (roleId: string) => void;
  onCreateRole: (values: CreateRoleFormValues) => Promise<void>;
  onUpdateRole: (roleId: string, values: EditRoleFormValues) => Promise<void>;
  onDeleteRole: (roleId: string, roleName: string) => void;
  onSaveMemberRoles: (memberId: string, roleIds: string[]) => void;
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
  permissionOptions,
  createRoleForm,
  editRoleForm,
  createRolePending,
  updateRolePending,
  deleteRolePending,
  setMemberRolesPending,
  onBeginEditRole,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  onSaveMemberRoles,
}: ManageRolesModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={selectedServer ? `Manage Roles - ${selectedServer.name}` : "Manage Roles"}
      centered
      size="xl"
    >
      {selectedServer && (
        <Stack gap="md">
          <Paper p="sm" withBorder style={{ borderColor: "#3a3d45", background: "#232428" }}>
            <Text fw={700} c="gray.0" mb={8}>
              Create Role
            </Text>
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
                        <Button size="xs" variant="light" disabled={isOwnerRole} onClick={() => onBeginEditRole(role.id)}>
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          color="red"
                          variant="light"
                          disabled={isOwnerRole || deleteRolePending}
                          onClick={() => onDeleteRole(role.id, role.name)}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Group>

                    {isEditing && (
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
                          {memberIsOwner && (
                            <Badge color="indigo" variant="filled">
                              Owner
                            </Badge>
                          )}
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
        </Stack>
      )}
    </Modal>
  );
}
