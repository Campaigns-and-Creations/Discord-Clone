import { Button, Group, Modal, MultiSelect, SegmentedControl, Stack, Switch, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { ChannelType } from "@/generated/prisma/client";

type RoleOption = {
  value: string;
  label: string;
};

type CreateChannelFormValues = {
  name: string;
  type: ChannelType;
  isPublic: boolean;
  allowedRoleIds: string[];
};

type CreateChannelModalProps = {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<CreateChannelFormValues>;
  channelRoleOptions: RoleOption[];
  onSubmit: (values: CreateChannelFormValues) => Promise<void>;
  isPending: boolean;
};

export function CreateChannelModal({
  opened,
  onClose,
  form,
  channelRoleOptions,
  onSubmit,
  isPending,
}: CreateChannelModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Create Channel" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="sm">
          <SegmentedControl
            data={[
              { label: "Text", value: ChannelType.TEXT },
              { label: "Voice", value: ChannelType.VOICE },
            ]}
            {...form.getInputProps("type")}
          />
          <TextInput
            label="Channel Name"
            placeholder={
              form.values.type === ChannelType.VOICE
                ? "for example: standup-room"
                : "for example: announcements"
            }
            withAsterisk
            {...form.getInputProps("name")}
          />
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
              Create Channel
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
