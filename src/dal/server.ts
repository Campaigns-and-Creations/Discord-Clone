import { prisma } from "@/utils/prisma";
import { ChannelType } from "@/generated/prisma/client";
import { DEFAULT_SERVER_ROLES } from "@/utils/default-role-permissions";

export class ServerDal {
  static async listForUser(userId: string) {
    const servers = await prisma.server.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        picture: true,
        createdAt: true,
        members: {
          where: { userId },
          select: {
            id: true,
            serverRoles: {
              select: {
                id: true,
                name: true,
                position: true,
              },
              orderBy: { position: "desc" },
            },
          },
          take: 1,
        },
      },
    });

    return servers.map((server) => {
      const membership = server.members[0] ?? null;
      const roleNames = membership?.serverRoles.map((role) => role.name) ?? [];

      return {
        id: server.id,
        name: server.name,
        picture: server.picture,
        createdAt: server.createdAt,
        membershipId: membership?.id ?? null,
        roleNames,
      };
    });
  }

  static async createForOwner(userId: string, name: string, picture: string | null = null) {
    return prisma.$transaction(async (tx) => {
      const server = await tx.server.create({
        data: {
          name,
          picture,
        },
      });

      const member = await tx.serverMember.create({
        data: {
          userId,
          serverId: server.id,
        },
      });

      const createdRoles = await Promise.all(
        DEFAULT_SERVER_ROLES.map((roleSeed) =>
          tx.serverRoles.create({
            data: {
              name: roleSeed.name,
              position: roleSeed.position,
              serverId: server.id,
              permissions: {
                create: roleSeed.permissions.map((permission) => ({ permission })),
              },
            },
          }),
        ),
      );

      const ownerRole = createdRoles.find((role) => role.name === "Owner");
      if (!ownerRole) {
        throw new Error("Failed to create owner role for server.");
      }

      await tx.serverMember.update({
        where: {
          id: member.id,
        },
        data: {
          serverRoles: {
            connect: {
              id: ownerRole.id,
            },
          },
        },
      });

      const generalChannel = await tx.channel.create({
        data: {
          name: "general",
          serverId: server.id,
          type: ChannelType.TEXT,
        },
      });

      return {
        server,
        membershipId: member.id,
        ownerRole,
        generalChannel,
      };
    });
  }

  static async getById(serverId: string) {
    return prisma.server.findUnique({
      where: { id: serverId },
      select: {
        id: true,
        picture: true,
      },
    });
  }

  static async updatePicture(serverId: string, picture: string | null) {
    return prisma.server.update({
      where: { id: serverId },
      data: { picture },
      select: {
        id: true,
        picture: true,
      },
    });
  }

  static async deleteIfOnlyMember(serverId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const actorMembership = await tx.serverMember.findFirst({
        where: {
          serverId,
          userId,
        },
        select: { id: true },
      });

      if (!actorMembership) {
        return { deleted: false, reason: "NOT_MEMBER" as const };
      }

      const memberCount = await tx.serverMember.count({
        where: { serverId },
      });

      if (memberCount !== 1) {
        return { deleted: false, reason: "NOT_LAST_MEMBER" as const };
      }

      await tx.messages.deleteMany({
        where: {
          channel: {
            serverId,
          },
        },
      });

      await tx.channel.deleteMany({
        where: { serverId },
      });

      await tx.serverInvite.deleteMany({
        where: { serverId },
      });

      await tx.serverMember.deleteMany({
        where: { serverId },
      });

      await tx.serverRoles.deleteMany({
        where: { serverId },
      });

      await tx.server.delete({
        where: { id: serverId },
      });

      return { deleted: true as const };
    });
  }
}
