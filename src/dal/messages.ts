import { prisma } from "@/utils/prisma";
import { MessageMentionsDal } from "@/dal/messageMentions";
import type { MentionPlan } from "@/utils/mentions";
import type { Prisma } from "@/generated/prisma/client";

type CreateMessageAttachmentInput = {
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

const MESSAGE_WITH_ATTACHMENTS_SELECT = {
  id: true,
  content: true,
  createdAt: true,
  pinned: true,
  channelId: true,
  attachments: {
    select: {
      id: true,
      fileName: true,
      mimeType: true,
      sizeBytes: true,
      storagePath: true,
    },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  },
  author: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.MessagesSelect;

type MessageWithAttachments = Prisma.MessagesGetPayload<{
  select: typeof MESSAGE_WITH_ATTACHMENTS_SELECT;
}>;

export class MessagesDal {
  static async listLatestByChannelId(channelId: string, limit: number) {
    const rows = await prisma.messages.findMany({
      where: { channelId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      select: MESSAGE_WITH_ATTACHMENTS_SELECT,
    });

    const hasOlderMessages = rows.length > limit;
    const messages = (hasOlderMessages ? rows.slice(0, limit) : rows).reverse();

    return {
      messages: messages as MessageWithAttachments[],
      hasOlderMessages,
    };
  }

  static async listOlderByChannelId(channelId: string, beforeMessageId: string, limit: number) {
    const cursor = await prisma.messages.findUnique({
      where: { id: beforeMessageId },
      select: {
        id: true,
        channelId: true,
        createdAt: true,
      },
    });

    if (!cursor || cursor.channelId !== channelId) {
      return {
        messages: [] as MessageWithAttachments[],
        hasOlderMessages: false,
      };
    }

    const rows = await prisma.messages.findMany({
      where: {
        channelId,
        OR: [
          {
            createdAt: {
              lt: cursor.createdAt,
            },
          },
          {
            createdAt: cursor.createdAt,
            id: {
              lt: cursor.id,
            },
          },
        ],
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      select: MESSAGE_WITH_ATTACHMENTS_SELECT,
    });

    const hasOlderMessages = rows.length > limit;
    const messages = (hasOlderMessages ? rows.slice(0, limit) : rows).reverse();

    return {
      messages: messages as MessageWithAttachments[],
      hasOlderMessages,
    };
  }

  static async createInChannel(channelId: string, authorId: string, content: string) {
    return prisma.messages.create({
      data: {
        channelId,
        authorId,
        content,
      },
      select: MESSAGE_WITH_ATTACHMENTS_SELECT,
    }) as Promise<MessageWithAttachments>;
  }

  static async createInChannelWithMentions(
    channelId: string,
    serverId: string,
    authorId: string,
    content: string,
    mentionPlan: MentionPlan,
    attachments: CreateMessageAttachmentInput[] = [],
  ) {
    return prisma.$transaction(async (tx) => {
      const message = await tx.messages.create({
        data: {
          channelId,
          authorId,
          content,
          attachments: attachments.length > 0
            ? {
                createMany: {
                  data: attachments,
                },
              }
            : undefined,
        },
        select: MESSAGE_WITH_ATTACHMENTS_SELECT,
      });

      await MessageMentionsDal.createForMessage(tx, {
        messageId: message.id,
        serverId,
        channelId,
        mentionPlan,
      });

      return message;
    }) as Promise<MessageWithAttachments>;
  }

  static async findById(messageId: string) {
    return prisma.messages.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        channelId: true,
        authorId: true,
        pinned: true,
      },
    });
  }

  static async deleteById(messageId: string) {
    return prisma.messages.delete({
      where: { id: messageId },
      select: { id: true },
    });
  }

  static async setPinned(messageId: string, pinned: boolean) {
    return prisma.messages.update({
      where: { id: messageId },
      data: { pinned },
      select: { id: true, pinned: true },
    });
  }
}
