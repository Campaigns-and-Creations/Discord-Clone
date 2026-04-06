import { Button, Group, Modal, MultiSelect, Stack, Switch } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

type RoleOption = {
  value: string;
  label: string;
};

type ChannelAccessFormValues = {
  isPublic: boolean;
  allowedRoleIds: string[];
};

type ChannelAccessModalProps = {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<ChannelAccessFormValues>;
  channelRoleOptions: RoleOption[];
  onSubmit: (values: ChannelAccessFormValues) => Promise<void>;
  isPending: boolean;
};

export function ChannelAccessModal({
  opened,
  onClose,
  form,
  channelRoleOptions,
  onSubmit,
  isPending,
}: ChannelAccessModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Channel Access" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="sm">
          <Switch
            label="Public channel"
            description="If off, only selected roles can access this channel."
            checked={form.values.isPublic}
            onChange={(event) => {
              const checked = event.currentTarget.checked;
              form.setFieldValue("isPublic", checked);
              if (checked) {
                form.setFieldValue("allowedRoleIds", []);
              }
            }}
          />
          <MultiSelect
            label="Allowed Roles"
            placeholder="Select roles that can access this channel"
            data={channelRoleOptions}
            searchable
            disabled={form.values.isPublic}
            {...form.getInputProps("allowedRoleIds")}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Save Access
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
