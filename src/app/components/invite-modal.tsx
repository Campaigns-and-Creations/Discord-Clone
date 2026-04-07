import { Button, Group, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

type InviteFormValues = {
  expirationPreset: string;
  maxUses: string;
};

type InviteModalProps = {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<InviteFormValues>;
  onSubmit: (values: InviteFormValues) => Promise<void>;
  isPending: boolean;
  latestInviteLink: string | null;
  linkCopied: boolean;
  onCopyLink: () => Promise<void>;
};

export function InviteModal({
  opened,
  onClose,
  form,
  onSubmit,
  isPending,
  latestInviteLink,
  linkCopied,
  onCopyLink,
}: InviteModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Create Invite Link" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
            {...form.getInputProps("expirationPreset")}
          />
          <TextInput
            label="Max Uses"
            description="Leave empty for unlimited uses"
            placeholder="Unlimited"
            {...form.getInputProps("maxUses")}
          />

          {latestInviteLink && (
            <Stack gap={6}>
              <Text size="xs" c="gray.4">
                Share this link to let people join the server.
              </Text>
              <TextInput value={latestInviteLink} readOnly />
              <Group justify="flex-end">
                <Button size="xs" variant="light" onClick={() => void onCopyLink()}>
                  {linkCopied ? "Copied" : "Copy Link"}
                </Button>
              </Group>
            </Stack>
          )}

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Create Link
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
