import { prisma } from "@/utils/prisma";

export class ServerMemberDal {
  static async findByUserAndServer(userId: string, serverId: string) {
    return prisma.serverMember.findFirst({
      where: {
        userId,
        serverId,
      },
      select: {
        id: true,
        userId: true,
        serverId: true,
        timeoutUntil: true,
      },
    });
  }

  static async isUserMemberOfServer(userId: string, serverId: string) {
    const membership = await this.findByUserAndServer(userId, serverId);
    return Boolean(membership);
  }

  static async isUserMemberOfChannel(userId: string, channelId: string) {
    const membership = await prisma.serverMember.findFirst({
      where: {
        userId,
        server: {
          channels: {
            some: { id: channelId },
          },
        },
      },
      select: { id: true },
    });

    return Boolean(membership);
  }

  static async setTimeoutUntil(memberId: string, timeoutUntil: Date | null) {
    return prisma.serverMember.update({
      where: { id: memberId },
      data: { timeoutUntil },
      select: {
        id: true,
        timeoutUntil: true,
      },
    });
  }
}
