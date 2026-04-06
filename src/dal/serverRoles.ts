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
          },
          orderBy: { name: "asc" },
        },
      },
    });

    return member?.serverRoles ?? [];
  }
}
