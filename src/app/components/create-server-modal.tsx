import { Button, FileInput, Group, Modal, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

type CreateServerFormValues = {
  name: string;
  picture: File | null;
};

type CreateServerModalProps = {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<CreateServerFormValues>;
  onSubmit: (values: CreateServerFormValues) => Promise<void>;
  isPending: boolean;
};

export function CreateServerModal({ opened, onClose, form, onSubmit, isPending }: CreateServerModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Create A New Server" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Server Name"
            placeholder="for example: Design Crew"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <FileInput
            label="Server Image"
            placeholder="Upload an image"
            accept="image/png,image/jpeg,image/webp,image/gif"
            clearable
            {...form.getInputProps("picture")}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Create Server
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
