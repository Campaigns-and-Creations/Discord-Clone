import { prisma } from "@/utils/prisma";
import type { ChannelType } from "@/generated/prisma/client";

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
        isPublic: true,
        allowedRoles: {
          select: {
            roleId: true,
          },
        },
      },
    });
  }

  static async listAccessibleByServerId(
    serverId: string,
    roleIds: string[],
    includeRestrictedBypass: boolean,
  ) {
    if (includeRestrictedBypass) {
      return this.listByServerId(serverId);
    }

    const uniqueRoleIds = Array.from(new Set(roleIds));

    return prisma.channel.findMany({
      where: {
        serverId,
        OR: [
          { isPublic: true },
          {
            allowedRoles: {
              some: {
                roleId: { in: uniqueRoleIds },
              },
            },
          },
        ],
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        serverId: true,
        isPublic: true,
        allowedRoles: {
          select: {
            roleId: true,
          },
        },
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
        isPublic: true,
        allowedRoles: {
          select: {
            roleId: true,
          },
        },
      },
    });
  }

  static async createInServer(
    serverId: string,
    name: string,
    type: ChannelType,
    options?: { isPublic: boolean; allowedRoleIds: string[] },
  ) {
    const isPublic = options?.isPublic ?? true;
    const allowedRoleIds = Array.from(new Set(options?.allowedRoleIds ?? []));

    return prisma.channel.create({
      data: {
        serverId,
        name,
        type,
        isPublic,
        allowedRoles: !isPublic
          ? {
              create: allowedRoleIds.map((roleId) => ({ roleId })),
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        serverId: true,
        isPublic: true,
        allowedRoles: {
          select: {
            roleId: true,
          },
        },
      },
    });
  }

  static async updateAccess(
    channelId: string,
    options: { isPublic: boolean; allowedRoleIds: string[] },
  ) {
    const isPublic = options.isPublic;
    const allowedRoleIds = Array.from(new Set(options.allowedRoleIds));

    return prisma.channel.update({
      where: { id: channelId },
      data: {
        isPublic,
        allowedRoles: {
          deleteMany: {},
          ...(isPublic
            ? {}
            : {
                create: allowedRoleIds.map((roleId) => ({ roleId })),
              }),
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        serverId: true,
        isPublic: true,
        allowedRoles: {
          select: {
            roleId: true,
          },
        },
      },
    });
  }

  static async deleteById(channelId: string) {
    return prisma.$transaction(async (tx) => {
      await tx.messages.deleteMany({
        where: { channelId },
      });

      return tx.channel.delete({
        where: { id: channelId },
        select: { id: true },
      });
    });
  }
}
