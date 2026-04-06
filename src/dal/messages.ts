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
