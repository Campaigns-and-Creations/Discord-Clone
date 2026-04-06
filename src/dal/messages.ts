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
}
