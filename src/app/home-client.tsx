"use client";

import {
  createChannel,
  createInviteLink,
  createServer,
  createServerRole,
  deleteChannel,
  deleteMessage,
  deleteServer,
  deleteServerRole,
  sendMessage,
  setMessagePinned,
  setServerMemberRoles,
  updateServerMemberNickname,
  updateOwnServerNickname,
  updateChannelAccess,
  updateServerRole,
} from "@/app/actions";
import { ChannelAccessModal } from "@/app/components/channel-access-modal";
import { CreateChannelModal } from "@/app/components/create-channel-modal";
import { CreateServerModal } from "@/app/components/create-server-modal";
import { HomeChatPanel } from "@/app/components/home-chat-panel";
import { HomeSidebar } from "@/app/components/home-sidebar";
import { InviteModal } from "@/app/components/invite-modal";
import { ManageRolesModal } from "@/app/components/manage-roles-modal";
import type { HomeMessage, HomePageData } from "@/app/home-types";
import { ChannelType, Permission } from "@/generated/prisma/client";
import { signOut } from "@/utils/auth-client";
import { Box, Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

type HomeClientProps = {
  initialData: HomePageData;
};

function formatServerBadge(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const PERMISSION_OPTIONS = (Object.values(Permission) as Permission[]).map((permission) => ({
  value: permission,
  label: permission,
}));

const MESSAGE_PAGE_SIZE = 50;

type ChannelMessageState = {
  messages: HomeMessage[];
  hasOlderMessages: boolean;
  isLoadingOlder: boolean;
};

function compareMessages(a: HomeMessage, b: HomeMessage): number {
  const createdAtDelta = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  if (createdAtDelta !== 0) {
    return createdAtDelta;
  }

  return a.id.localeCompare(b.id);
}

function mergeMessages(existing: HomeMessage[], incoming: HomeMessage[]): HomeMessage[] {
  const byId = new Map<string, HomeMessage>();

  for (const message of existing) {
    byId.set(message.id, message);
  }

  for (const message of incoming) {
    byId.set(message.id, message);
  }

  return Array.from(byId.values()).sort(compareMessages);
}

function buildInitialChannelMessageState(data: HomePageData): Record<string, ChannelMessageState> {
  const state: Record<string, ChannelMessageState> = {};

  for (const server of data.servers) {
    for (const channel of server.channels) {
      state[channel.id] = {
        messages: channel.messages,
        hasOlderMessages: channel.hasOlderMessages,
        isLoadingOlder: false,
      };
    }
  }

  return state;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const queryClient = useQueryClient();
  const mentionSeenCursorByChannelRef = useRef<Record<string, string>>({});
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [createChannelModalOpened, setCreateChannelModalOpened] = useState(false);
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [manageRolesModalOpened, setManageRolesModalOpened] = useState(false);
  const [nicknameModalOpened, setNicknameModalOpened] = useState(false);
  const [channelAccessModalOpened, setChannelAccessModalOpened] = useState(false);
  const [latestInviteLink, setLatestInviteLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [editingChannelId, setEditingChannelId] = useState<string | null>(null);
  const [memberRoleDrafts, setMemberRoleDrafts] = useState<Record<string, string[]>>({});
  const [memberNicknameDrafts, setMemberNicknameDrafts] = useState<Record<string, string>>({});

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
      type: ChannelType.TEXT as ChannelType,
      isPublic: true,
      allowedRoleIds: [] as string[],
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
      allowedRoleIds: (value, values) => {
        if (!values.isPublic && value.length === 0) {
          return "Select at least one role for restricted channels";
        }

        return null;
      },
    },
  });

  const editChannelAccessForm = useForm({
    initialValues: {
      isPublic: true,
      allowedRoleIds: [] as string[],
    },
    validate: {
      allowedRoleIds: (value, values) => {
        if (!values.isPublic && value.length === 0) {
          return "Select at least one role for restricted channels";
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

  const createRoleForm = useForm<{ name: string; permissions: string[] }>({
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

  const nicknameForm = useForm({
    initialValues: {
      nickname: "",
    },
    validate: {
      nickname: (value) => {
        if (value.trim().length > 60) {
          return "Nickname must be at most 60 characters";
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

  const [selectedChannelByServer, setSelectedChannelByServer] = useState<Record<string, string>>(() => {
    return initialData.servers.reduce<Record<string, string>>((acc, server) => {
      if (server.channels[0]) {
        acc[server.id] = server.channels[0].id;
      }
      return acc;
    }, {});
  });

  const [channelMessagesById, setChannelMessagesById] = useState<Record<string, ChannelMessageState>>(
    () => buildInitialChannelMessageState(initialData),
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
    mutationFn: async (payload: {
      serverId: string;
      name: string;
      type: ChannelType;
      isPublic: boolean;
      allowedRoleIds: string[];
    }) =>
      createChannel(payload.serverId, payload.name, payload.type, {
        isPublic: payload.isPublic,
        allowedRoleIds: payload.allowedRoleIds,
      }),
    onSuccess: async () => {
      setCreateChannelModalOpened(false);
      createChannelForm.reset();
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const updateChannelAccessMutation = useMutation({
    mutationFn: async (payload: {
      serverId: string;
      channelId: string;
      isPublic: boolean;
      allowedRoleIds: string[];
    }) =>
      updateChannelAccess(payload.serverId, payload.channelId, {
        isPublic: payload.isPublic,
        allowedRoleIds: payload.allowedRoleIds,
      }),
    onSuccess: async () => {
      setChannelAccessModalOpened(false);
      setEditingChannelId(null);
      editChannelAccessForm.reset();
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

  const markMentionsSeenMutation = useMutation({
    mutationFn: async (payload: { channelId: string; latestVisibleMessageId: string }) => {
      const response = await fetch("/api/discord/mentions/seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to mark mentions as seen.");
      }
    },
    onSuccess: async () => {
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

  const deleteChannelMutation = useMutation({
    mutationFn: async (payload: { serverId: string; channelId: string }) =>
      deleteChannel(payload.serverId, payload.channelId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const deleteServerMutation = useMutation({
    mutationFn: async (serverId: string) => deleteServer(serverId),
    onSuccess: async (_, deletedServerId) => {
      queryClient.setQueryData<HomePageData>(["discord", "home-data"], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        const remainingServers = oldData.servers.filter((server) => server.id !== deletedServerId);
        setSelectedServerId((current) => {
          if (current !== deletedServerId) {
            return current;
          }

          return remainingServers[0]?.id ?? null;
        });

        setSelectedChannelByServer((current) => {
          const nextState = { ...current };
          delete nextState[deletedServerId];
          return nextState;
        });

        return {
          ...oldData,
          servers: remainingServers,
        };
      });

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

  const setMemberNicknameMutation = useMutation({
    mutationFn: async (payload: { serverId: string; memberId: string; nickname: string }) =>
      updateServerMemberNickname(payload.serverId, payload.memberId, payload.nickname),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const updateNicknameMutation = useMutation({
    mutationFn: async (payload: { serverId: string; nickname: string }) =>
      updateOwnServerNickname(payload.serverId, payload.nickname),
    onSuccess: async () => {
      setNicknameModalOpened(false);
      await queryClient.invalidateQueries({ queryKey: ["discord", "home-data"] });
    },
  });

  const selectedChannelId = selectedServer
    && (selectedChannelByServer[selectedServer.id] ?? selectedServer.channels[0]?.id ?? null);

  const selectedChannel = selectedServer?.channels.find((channel) => channel.id === selectedChannelId) ?? null;
  const currentServerMember = selectedServer?.members.find(
    (member) => member.userId === homeData.currentUser.id,
  ) ?? null;

  const selectedChannelMessageState = selectedChannel
    && (channelMessagesById[selectedChannel.id] ?? {
        messages: selectedChannel.messages,
        hasOlderMessages: selectedChannel.hasOlderMessages,
        isLoadingOlder: false,
      });

  const selectedChannelMessages = selectedChannelMessageState?.messages ?? [];
  const selectedChannelLatestMessageId =
    selectedChannelMessages.length > 0
      ? selectedChannelMessages[selectedChannelMessages.length - 1].id
      : null;
  const selectedChannelHasOlderMessages = selectedChannelMessageState?.hasOlderMessages ?? false;
  const selectedChannelIsLoadingOlderMessages = selectedChannelMessageState?.isLoadingOlder ?? false;

  const editableRoles = selectedServer?.roles ?? [];
  const channelRoleOptions = editableRoles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

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

    setMemberNicknameDrafts(() => {
      return selectedServer.members.reduce<Record<string, string>>((acc, member) => {
        acc[member.memberId] = member.nickname ?? "";
        return acc;
      }, {});
    });
  }, [manageRolesModalOpened, selectedServer]);

  useEffect(() => {
    if (!selectedServer) {
      return;
    }

    const selectedId = selectedChannelByServer[selectedServer.id];
    if (!selectedId) {
      return;
    }

    const channelStillVisible = selectedServer.channels.some((channel) => channel.id === selectedId);
    if (channelStillVisible) {
      return;
    }

    setSelectedChannelByServer((current) => ({
      ...current,
      [selectedServer.id]: selectedServer.channels[0]?.id ?? "",
    }));
  }, [selectedChannelByServer, selectedServer]);

  useEffect(() => {
    setChannelMessagesById((current) => {
      const next: Record<string, ChannelMessageState> = {};

      for (const server of homeData.servers) {
        for (const channel of server.channels) {
          const existing = current[channel.id];

          if (existing) {
            next[channel.id] = {
              messages: mergeMessages(existing.messages, channel.messages),
              hasOlderMessages: existing.hasOlderMessages && channel.hasOlderMessages,
              isLoadingOlder: existing.isLoadingOlder,
            };
            continue;
          }

          next[channel.id] = {
            messages: channel.messages,
            hasOlderMessages: channel.hasOlderMessages,
            isLoadingOlder: false,
          };
        }
      }

      return next;
    });
  }, [homeData.servers]);

  useEffect(() => {
    if (!selectedChannel || !selectedChannelLatestMessageId) {
      return;
    }

    if (selectedChannel.unreadMentionCount <= 0) {
      return;
    }

    if (markMentionsSeenMutation.isPending) {
      return;
    }

    const previousCursor = mentionSeenCursorByChannelRef.current[selectedChannel.id];
    if (previousCursor === selectedChannelLatestMessageId) {
      return;
    }

    mentionSeenCursorByChannelRef.current[selectedChannel.id] = selectedChannelLatestMessageId;

    void markMentionsSeenMutation
      .mutateAsync({
        channelId: selectedChannel.id,
        latestVisibleMessageId: selectedChannelLatestMessageId,
      })
      .catch(() => {
        delete mentionSeenCursorByChannelRef.current[selectedChannel.id];
      });
  }, [
    selectedChannel,
    selectedChannelLatestMessageId,
    markMentionsSeenMutation,
  ]);

  const beginEditChannelAccess = (channelId: string) => {
    if (!selectedServer) {
      return;
    }

    const channel = selectedServer.channels.find((item) => item.id === channelId);
    if (!channel) {
      return;
    }

    setEditingChannelId(channel.id);
    editChannelAccessForm.setValues({
      isPublic: channel.isPublic,
      allowedRoleIds: channel.allowedRoleIds,
    });
    setChannelAccessModalOpened(true);
  };

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
    const selectedServerName = currentServerMember?.name?.trim();
    if (selectedServerName) {
      return selectedServerName;
    }

    const name = homeData.currentUser.name.trim();
    if (name.length > 0) {
      return name;
    }

    const emailPrefix = homeData.currentUser.email?.split("@")[0]?.trim();
    if (emailPrefix) {
      return emailPrefix;
    }

    return "Unknown User";
  }, [currentServerMember?.name, homeData.currentUser.email, homeData.currentUser.name]);

  const currentServerDisplayName = currentServerMember?.name ?? homeData.currentUser.name;

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

  const handleLoadOlderMessages = async () => {
    if (!selectedChannel) {
      return;
    }

    const channelId = selectedChannel.id;
    const currentState = channelMessagesById[channelId];
    if (!currentState || currentState.isLoadingOlder || !currentState.hasOlderMessages) {
      return;
    }

    const oldestMessage = currentState.messages[0];
    if (!oldestMessage) {
      return;
    }

    setChannelMessagesById((current) => {
      const existing = current[channelId];
      if (!existing || existing.isLoadingOlder) {
        return current;
      }

      return {
        ...current,
        [channelId]: {
          ...existing,
          isLoadingOlder: true,
        },
      };
    });

    try {
      const response = await fetch(
        `/api/discord/channel-messages?channelId=${encodeURIComponent(channelId)}&beforeMessageId=${encodeURIComponent(oldestMessage.id)}&limit=${MESSAGE_PAGE_SIZE}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error("Failed to load older messages.");
      }

      const payload = (await response.json()) as {
        hasOlderMessages: boolean;
        messages: HomeMessage[];
      };

      setChannelMessagesById((current) => {
        const existing = current[channelId];
        if (!existing) {
          return current;
        }

        return {
          ...current,
          [channelId]: {
            messages: mergeMessages(payload.messages, existing.messages),
            hasOlderMessages: payload.hasOlderMessages,
            isLoadingOlder: false,
          },
        };
      });
    } catch {
      setChannelMessagesById((current) => {
        const existing = current[channelId];
        if (!existing) {
          return current;
        }

        return {
          ...current,
          [channelId]: {
            ...existing,
            isLoadingOlder: false,
          },
        };
      });
    }
  };

  return (
    <Box bg="#202225" h="100svh" p={0} style={{ overflow: "hidden" }}>
      <CreateServerModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        form={createServerForm}
        onSubmit={async (values) => {
          await createServerMutation.mutateAsync(values.name.trim());
        }}
        isPending={createServerMutation.isPending}
      />

      <CreateChannelModal
        opened={createChannelModalOpened}
        onClose={() => {
          setCreateChannelModalOpened(false);
          createChannelForm.reset();
        }}
        form={createChannelForm}
        channelRoleOptions={channelRoleOptions}
        onSubmit={async (values) => {
          if (!selectedServer) {
            return;
          }

          await createChannelMutation.mutateAsync({
            serverId: selectedServer.id,
            name: values.name.trim(),
            type: values.type,
            isPublic: values.isPublic,
            allowedRoleIds: values.isPublic ? [] : values.allowedRoleIds,
          });
        }}
        isPending={createChannelMutation.isPending}
      />

      <ChannelAccessModal
        opened={channelAccessModalOpened}
        onClose={() => {
          setChannelAccessModalOpened(false);
          setEditingChannelId(null);
          editChannelAccessForm.reset();
        }}
        form={editChannelAccessForm}
        channelRoleOptions={channelRoleOptions}
        onSubmit={async (values) => {
          if (!selectedServer || !editingChannelId) {
            return;
          }

          await updateChannelAccessMutation.mutateAsync({
            serverId: selectedServer.id,
            channelId: editingChannelId,
            isPublic: values.isPublic,
            allowedRoleIds: values.isPublic ? [] : values.allowedRoleIds,
          });
        }}
        isPending={updateChannelAccessMutation.isPending}
      />

      <InviteModal
        opened={inviteModalOpened}
        onClose={() => {
          setInviteModalOpened(false);
          setLatestInviteLink(null);
          setLinkCopied(false);
        }}
        form={inviteForm}
        onSubmit={async (values) => {
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
        }}
        isPending={createInviteLinkMutation.isPending}
        latestInviteLink={latestInviteLink}
        linkCopied={linkCopied}
        onCopyLink={async () => {
          if (!latestInviteLink) {
            return;
          }
          await navigator.clipboard.writeText(latestInviteLink);
          setLinkCopied(true);
        }}
      />

      <ManageRolesModal
        opened={manageRolesModalOpened}
        onClose={() => {
          setManageRolesModalOpened(false);
          setEditingRoleId(null);
        }}
        selectedServer={selectedServer}
        editableRoles={editableRoles}
        editingRoleId={editingRoleId}
        setEditingRoleId={setEditingRoleId}
        memberRoleDrafts={memberRoleDrafts}
        setMemberRoleDrafts={setMemberRoleDrafts}
        memberNicknameDrafts={memberNicknameDrafts}
        setMemberNicknameDrafts={setMemberNicknameDrafts}
        permissionOptions={PERMISSION_OPTIONS}
        createRoleForm={createRoleForm}
        editRoleForm={editRoleForm}
        createRolePending={createRoleMutation.isPending}
        updateRolePending={updateRoleMutation.isPending}
        deleteRolePending={deleteRoleMutation.isPending}
        setMemberRolesPending={setMemberRolesMutation.isPending}
        setMemberNicknamePending={setMemberNicknameMutation.isPending}
        onBeginEditRole={beginEditRole}
        onCreateRole={async (values) => {
          if (!selectedServer) {
            return;
          }

          await createRoleMutation.mutateAsync({
            serverId: selectedServer.id,
            name: values.name.trim(),
            permissions: values.permissions,
          });
        }}
        onUpdateRole={async (roleId, values) => {
          if (!selectedServer) {
            return;
          }

          await updateRoleMutation.mutateAsync({
            serverId: selectedServer.id,
            roleId,
            name: values.name.trim(),
            permissions: values.permissions,
          });
        }}
        onDeleteRole={(roleId, roleName) => {
          if (!selectedServer) {
            return;
          }

          modals.openConfirmModal({
            title: "Delete role",
            children: `Delete role \"${roleName}\"?`,
            labels: { cancel: "Cancel", confirm: "Delete" },
            confirmProps: { color: "red" },
            onConfirm: () => {
              void deleteRoleMutation.mutateAsync({
                serverId: selectedServer.id,
                roleId,
              });
            },
          });
        }}
        onSaveMemberRoles={(memberId, roleIds) => {
          if (!selectedServer) {
            return;
          }

          void setMemberRolesMutation.mutateAsync({
            serverId: selectedServer.id,
            memberId,
            roleIds,
          });
        }}
        onSaveMemberNickname={(memberId, nickname) => {
          if (!selectedServer) {
            return;
          }

          void setMemberNicknameMutation.mutateAsync({
            serverId: selectedServer.id,
            memberId,
            nickname,
          });
        }}
      />

      <Modal
        opened={nicknameModalOpened}
        onClose={() => setNicknameModalOpened(false)}
        title={selectedServer ? `Edit Nickname - ${selectedServer.name}` : "Edit Nickname"}
        centered
      >
        <form
          onSubmit={nicknameForm.onSubmit(async (values) => {
            if (!selectedServer) {
              return;
            }

            await updateNicknameMutation.mutateAsync({
              serverId: selectedServer.id,
              nickname: values.nickname,
            });
          })}
        >
          <Stack gap="sm">
            <TextInput
              label="Server nickname"
              placeholder="Leave empty to use your username"
              {...nicknameForm.getInputProps("nickname")}
            />
            <Group justify="flex-end">
              <Button type="submit" loading={updateNicknameMutation.isPending}>
                {updateNicknameMutation.isPending ? "Saving..." : "Save nickname"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Group align="stretch" gap={0} wrap="nowrap" h="100%" style={{ overflow: "hidden" }}>
        <HomeSidebar
          homeData={homeData}
          selectedServerId={selectedServerId}
          onSelectServer={setSelectedServerId}
          onOpenCreateServer={() => setCreateModalOpened(true)}
          selectedServer={selectedServer}
          selectedChannelId={selectedChannelId}
          onSelectChannel={(channelId) => {
            if (!selectedServer) {
              return;
            }

            setSelectedChannelByServer((current) => ({
              ...current,
              [selectedServer.id]: channelId,
            }));
          }}
          onOpenCreateChannel={() => setCreateChannelModalOpened(true)}
          onOpenInvite={() => setInviteModalOpened(true)}
          onOpenManageRoles={() => setManageRolesModalOpened(true)}
          onOpenEditNickname={() => {
            nicknameForm.setValues({
              nickname: currentServerMember?.nickname ?? "",
            });
            setNicknameModalOpened(true);
          }}
          onEditChannelAccess={beginEditChannelAccess}
          onDeleteChannel={(channelId, channelName) => {
            if (!selectedServer) {
              return;
            }

            modals.openConfirmModal({
              title: "Delete channel",
              children: `Delete channel \"${channelName}\"?`,
              labels: { cancel: "Cancel", confirm: "Delete" },
              confirmProps: { color: "red" },
              onConfirm: () => {
                void deleteChannelMutation.mutateAsync({
                  serverId: selectedServer.id,
                  channelId,
                });
              },
            });
          }}
          onDeleteServer={(serverId, serverName) => {
            modals.openConfirmModal({
              title: "Delete server",
              children: `Delete server \"${serverName}\"? This action cannot be undone.`,
              labels: { cancel: "Cancel", confirm: "Delete" },
              confirmProps: { color: "red" },
              onConfirm: () => {
                void deleteServerMutation.mutateAsync(serverId);
              },
            });
          }}
          userDisplayName={userDisplayName}
          isSigningOut={isSigningOut}
          onSignOut={() => {
            void handleSignOut();
          }}
          formatServerBadge={formatServerBadge}
        />

        <HomeChatPanel
          selectedChannel={selectedChannel}
          selectedServer={selectedServer}
          messages={selectedChannelMessages}
          hasOlderMessages={selectedChannelHasOlderMessages}
          isLoadingOlderMessages={selectedChannelIsLoadingOlderMessages}
          currentUserId={homeData.currentUser.id}
          currentUser={{
            id: homeData.currentUser.id,
            name: currentServerDisplayName,
            image: homeData.currentUser.image,
          }}
          isFetching={homeDataQuery.isFetching}
          onTogglePin={(message) => {
            if (!selectedServer) {
              return;
            }

            void pinMessageMutation.mutateAsync({
              serverId: selectedServer.id,
              channelId: message.channelId,
              messageId: message.id,
              pinned: !message.pinned,
            });
          }}
          onDeleteMessage={(message) => {
            if (!selectedServer) {
              return;
            }

            void deleteMessageMutation.mutateAsync({
              serverId: selectedServer.id,
              channelId: message.channelId,
              messageId: message.id,
            });
          }}
          messageDraft={messageDraft}
          onChangeMessageDraft={setMessageDraft}
          onSendMessage={() => {
            if (!selectedServer || !selectedChannel) {
              return;
            }

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
          onLoadOlderMessages={handleLoadOlderMessages}
          isSendingMessage={sendMessageMutation.isPending}
        />
      </Group>
    </Box>
  );
}
