import { prisma } from "@/utils/prisma";

export class ServerRolesDal {
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
}
