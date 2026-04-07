import { prisma } from "@/utils/prisma";

export class MessagesDal {
  static async listByChannelId(channelId: string) {
    return prisma.messages.findMany({
      where: { channelId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
        pinned: true,
        channelId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }

  static async listLatestByChannelId(channelId: string, limit: number) {
    const rows = await prisma.messages.findMany({
      where: { channelId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      select: {
        id: true,
        content: true,
        createdAt: true,
        pinned: true,
        channelId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const hasOlderMessages = rows.length > limit;
    const messages = (hasOlderMessages ? rows.slice(0, limit) : rows).reverse();

    return {
      messages,
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
        messages: [],
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
      select: {
        id: true,
        content: true,
        createdAt: true,
        pinned: true,
        channelId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const hasOlderMessages = rows.length > limit;
    const messages = (hasOlderMessages ? rows.slice(0, limit) : rows).reverse();

    return {
      messages,
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
      select: {
        id: true,
        content: true,
        createdAt: true,
        pinned: true,
        channelId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
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
