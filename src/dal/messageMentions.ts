import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/utils/prisma";
import type { MentionPlan } from "@/utils/mentions";

export class MessageMentionsDal {
  static async createForMessage(
    tx: Prisma.TransactionClient,
    args: {
      messageId: string;
      serverId: string;
      channelId: string;
      mentionPlan: MentionPlan;
    },
  ) {
    const { messageId, serverId, channelId, mentionPlan } = args;

    if (mentionPlan.mentions.length > 0) {
      await tx.messageMention.createMany({
        data: mentionPlan.mentions.map((mention) => ({
          messageId,
          type: mention.type,
          mentionedUserId: mention.mentionedUserId,
          mentionedRoleId: mention.mentionedRoleId,
          token: mention.token,
        })),
      });
    }

    if (mentionPlan.receiptUserIds.length > 0) {
      await tx.messageMentionReceipt.createMany({
        data: mentionPlan.receiptUserIds.map((userId) => ({
          messageId,
          userId,
          serverId,
          channelId,
        })),
        skipDuplicates: true,
      });
    }
  }

  static async listMentionedMessageIdsForUser(userId: string, messageIds: string[]) {
    if (messageIds.length === 0) {
      return new Set<string>();
    }

    const rows = await prisma.messageMentionReceipt.findMany({
      where: {
        userId,
        messageId: {
          in: messageIds,
        },
      },
      select: {
        messageId: true,
      },
    });

    return new Set(rows.map((row) => row.messageId));
  }

  static async listUnseenMentionCountsByChannelForUser(userId: string, channelIds?: string[]) {
    const rows = await prisma.messageMentionReceipt.groupBy({
      by: ["channelId"],
      where: {
        userId,
        seenAt: null,
        ...(channelIds && channelIds.length > 0
          ? {
              channelId: {
                in: channelIds,
              },
            }
          : {}),
      },
      _count: {
        _all: true,
      },
    });

    return new Map(rows.map((row) => [row.channelId, row._count._all]));
  }

  static async markSeenInChannelUpToMessage(userId: string, channelId: string, latestVisibleMessageId: string) {
    const cursor = await prisma.messages.findUnique({
      where: {
        id: latestVisibleMessageId,
      },
      select: {
        id: true,
        channelId: true,
        createdAt: true,
      },
    });

    if (!cursor || cursor.channelId !== channelId) {
      return 0;
    }

    const result = await prisma.messageMentionReceipt.updateMany({
      where: {
        userId,
        channelId,
        seenAt: null,
        message: {
          OR: [
            {
              createdAt: {
                lt: cursor.createdAt,
              },
            },
            {
              createdAt: cursor.createdAt,
              id: {
                lte: cursor.id,
              },
            },
          ],
        },
      },
      data: {
        seenAt: new Date(),
      },
    });

    return result.count;
  }
}
