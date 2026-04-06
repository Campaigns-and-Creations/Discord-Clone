import { Prisma } from "@/generated/prisma";
import { prisma } from "@/utils/prisma";

const INVITE_CODE_LENGTH = 10;
const INVITE_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

function generateInviteCode(length: number = INVITE_CODE_LENGTH): string {
  let result = "";

  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * INVITE_CODE_ALPHABET.length);
    result += INVITE_CODE_ALPHABET[randomIndex];
  }

  return result;
}

export class InviteDal {
  static async createInvite(
    serverId: string,
    creatorId: string,
    options?: {
      expiresAt?: Date | null;
      maxUses?: number | null;
    },
  ) {
    const expiresAt = options?.expiresAt ?? null;
    const maxUses = options?.maxUses ?? null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = generateInviteCode();

      try {
        return await prisma.serverInvite.create({
          data: {
            code,
            serverId,
            creatorId,
            expiresAt,
            maxUses,
          },
          select: {
            id: true,
            code: true,
            serverId: true,
            expiresAt: true,
            maxUses: true,
            currentUses: true,
            createdAt: true,
          },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          continue;
        }

        throw error;
      }
    }

    throw new Error("Could not generate a unique invite code. Please try again.");
  }

  static async getByCode(code: string) {
    return prisma.serverInvite.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        serverId: true,
        expiresAt: true,
        maxUses: true,
        currentUses: true,
        createdAt: true,
        server: {
          select: {
            id: true,
            name: true,
            picture: true,
            createdAt: true,
          },
        },
      },
    });
  }

  static async revokeInvite(inviteId: string, serverId: string) {
    return prisma.serverInvite.deleteMany({
      where: {
        id: inviteId,
        serverId,
      },
    });
  }

  static async redeemInvite(code: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const now = new Date();
      const invite = await tx.serverInvite.findUnique({
        where: { code },
        select: {
          id: true,
          code: true,
          serverId: true,
          expiresAt: true,
          maxUses: true,
          currentUses: true,
          server: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!invite) {
        throw new Error("Invite not found.");
      }

      if (invite.expiresAt && invite.expiresAt <= now) {
        throw new Error("Invite has expired.");
      }

      if (invite.maxUses !== null && invite.currentUses >= invite.maxUses) {
        throw new Error("Invite has reached the usage limit.");
      }

      const existingMembership = await tx.serverMember.findFirst({
        where: {
          userId,
          serverId: invite.serverId,
        },
        select: {
          id: true,
        },
      });

      if (existingMembership) {
        return {
          joined: false,
          alreadyMember: true,
          serverId: invite.serverId,
          serverName: invite.server.name,
          membershipId: existingMembership.id,
        };
      }

      const memberRole = await tx.serverRoles.findFirst({
        where: {
          serverId: invite.serverId,
          name: "Member",
        },
        select: {
          id: true,
        },
      });

      const membership = await tx.serverMember.create({
        data: {
          userId,
          serverId: invite.serverId,
          serverRoles: memberRole
            ? {
                connect: {
                  id: memberRole.id,
                },
              }
            : undefined,
        },
        select: {
          id: true,
        },
      });

      if (invite.maxUses !== null) {
        const updatedInvite = await tx.serverInvite.updateMany({
          where: {
            id: invite.id,
            currentUses: {
              lt: invite.maxUses,
            },
          },
          data: {
            currentUses: {
              increment: 1,
            },
          },
        });

        if (updatedInvite.count !== 1) {
          throw new Error("Invite has reached the usage limit.");
        }
      } else {
        await tx.serverInvite.update({
          where: {
            id: invite.id,
          },
          data: {
            currentUses: {
              increment: 1,
            },
          },
        });
      }

      return {
        joined: true,
        alreadyMember: false,
        serverId: invite.serverId,
        serverName: invite.server.name,
        membershipId: membership.id,
      };
    });
  }
}
