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
        nickname: true,
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

  static async createInServer(serverId: string, userId: string, roleId?: string) {
    return prisma.serverMember.create({
      data: {
        serverId,
        userId,
        serverRoles: roleId
          ? {
              connect: {
                id: roleId,
              },
            }
          : undefined,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
  }

  static async findByIdInServer(memberId: string, serverId: string) {
    return prisma.serverMember.findFirst({
      where: {
        id: memberId,
        serverId,
      },
      select: {
        id: true,
        userId: true,
        serverRoles: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
      },
    });
  }

  static async listByServerId(serverId: string) {
    return prisma.serverMember.findMany({
      where: { serverId },
      select: {
        id: true,
        userId: true,
        nickname: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        serverRoles: {
          select: {
            id: true,
            name: true,
            position: true,
            permissions: {
              select: {
                permission: true,
              },
            },
          },
          orderBy: { position: "desc" },
        },
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });
  }

  static async updateNickname(userId: string, serverId: string, nickname: string | null) {
    return prisma.serverMember.updateMany({
      where: {
        userId,
        serverId,
      },
      data: {
        nickname,
      },
    });
  }

  static async updateNicknameByMemberIdInServer(
    memberId: string,
    serverId: string,
    nickname: string | null,
  ) {
    return prisma.serverMember.updateMany({
      where: {
        id: memberId,
        serverId,
      },
      data: {
        nickname,
      },
    });
  }
}
