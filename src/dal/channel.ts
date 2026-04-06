import { prisma } from "@/utils/prisma";

export class ChannelDal {
  static async listByServerId(serverId: string) {
    return prisma.channel.findMany({
      where: { serverId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        serverId: true,
      },
    });
  }

  static async findById(channelId: string) {
    return prisma.channel.findUnique({
      where: { id: channelId },
      select: {
        id: true,
        name: true,
        type: true,
        serverId: true,
      },
    });
  }

  static async createInServer(serverId: string, name: string, type: "TEXT" | "VOICE") {
    return prisma.channel.create({
      data: {
        serverId,
        name,
        type,
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        serverId: true,
      },
    });
  }
}
