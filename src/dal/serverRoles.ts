import { Permission } from "@/generated/prisma";
import { prisma } from "@/utils/prisma";

export class ServerRolesDal {
  static async findByName(serverId: string, name: string) {
    return prisma.serverRoles.findFirst({
      where: {
        serverId,
        name,
      },
      select: { id: true },
    });
  }

  static async listForMember(serverMemberId: string) {
    const member = await prisma.serverMember.findUnique({
      where: { id: serverMemberId },
      select: {
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
    });

    return member?.serverRoles ?? [];
  }

  static async listForUserInServer(userId: string, serverId: string) {
    const member = await prisma.serverMember.findFirst({
      where: {
        userId,
        serverId,
      },
      select: {
        id: true,
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
    });

    return member;
  }

  static async listByServerId(serverId: string) {
    return prisma.serverRoles.findMany({
      where: { serverId },
      orderBy: { position: "desc" },
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
    });
  }

  static async findById(roleId: string, serverId: string) {
    return prisma.serverRoles.findFirst({
      where: {
        id: roleId,
        serverId,
      },
      select: {
        id: true,
        name: true,
        position: true,
        serverId: true,
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }

  static async listByIds(serverId: string, roleIds: string[]) {
    return prisma.serverRoles.findMany({
      where: {
        id: { in: roleIds },
        serverId,
      },
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
    });
  }

  static async createRole(serverId: string, name: string, permissions: Permission[]) {
    const topRole = await prisma.serverRoles.findFirst({
      where: { serverId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const newPosition = Math.max((topRole?.position ?? 0) + 1, 1);

    return prisma.serverRoles.create({
      data: {
        serverId,
        name,
        position: newPosition,
        permissions: {
          create: permissions.map((permission) => ({ permission })),
        },
      },
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
    });
  }

  static async updateRole(roleId: string, _serverId: string, name: string, permissions: Permission[]) {
    return prisma.serverRoles.update({
      where: { id: roleId },
      data: {
        name,
        permissions: {
          deleteMany: {},
          create: permissions.map((permission) => ({ permission })),
        },
      },
      select: {
        id: true,
        name: true,
        position: true,
        serverId: true,
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }

  static async deleteRole(roleId: string, serverId: string) {
    return prisma.serverRoles.deleteMany({
      where: {
        id: roleId,
        serverId,
      },
    });
  }

  static async replaceMemberRoles(memberId: string, roleIds: string[]) {
    return prisma.serverMember.update({
      where: { id: memberId },
      data: {
        serverRoles: {
          set: roleIds.map((id) => ({ id })),
        },
      },
      select: {
        id: true,
      },
    });
  }
}
