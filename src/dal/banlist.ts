import { prisma } from "@/utils/prisma";

export class BanListDal {
  static async isUserBanned(serverId: string, userId: string) {
    const banList = await prisma.banList.findUnique({
      where: { serverId },
      select: {
        users: {
          where: { id: userId },
          select: { id: true },
          take: 1,
        },
      },
    });

    return Boolean(banList && banList.users.length > 0);
  }

  static async banUser(serverId: string, userId: string) {
    const alreadyBanned = await this.isUserBanned(serverId, userId);
    if (alreadyBanned) {
      return { alreadyBanned: true };
    }

    await prisma.banList.upsert({
      where: { serverId },
      create: {
        serverId,
        users: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        users: {
          connect: {
            id: userId,
          },
        },
        bannedAt: new Date(),
      },
    });

    return { alreadyBanned: false };
  }

  static async unbanUser(serverId: string, userId: string) {
    const banList = await prisma.banList.findUnique({
      where: { serverId },
      select: {
        id: true,
        users: {
          where: { id: userId },
          select: { id: true },
          take: 1,
        },
      },
    });

    if (!banList || banList.users.length === 0) {
      return { wasBanned: false };
    }

    await prisma.banList.update({
      where: {
        id: banList.id,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return { wasBanned: true };
  }

  static async listBannedUsers(serverId: string) {
    const banList = await prisma.banList.findUnique({
      where: { serverId },
      select: {
        users: {
          select: {
            id: true,
            name: true,
            image: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return banList?.users ?? [];
  }
}