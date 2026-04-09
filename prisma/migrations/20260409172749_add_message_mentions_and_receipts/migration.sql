-- CreateEnum
CREATE TYPE "MentionType" AS ENUM ('USER', 'ROLE', 'EVERYONE', 'HERE');

-- CreateTable
CREATE TABLE "MessageMention" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "type" "MentionType" NOT NULL,
    "mentionedUserId" TEXT,
    "mentionedRoleId" TEXT,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageMention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageMentionReceipt" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenAt" TIMESTAMP(3),

    CONSTRAINT "MessageMentionReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MessageMention_messageId_idx" ON "MessageMention"("messageId");

-- CreateIndex
CREATE INDEX "MessageMention_mentionedUserId_idx" ON "MessageMention"("mentionedUserId");

-- CreateIndex
CREATE INDEX "MessageMention_mentionedRoleId_idx" ON "MessageMention"("mentionedRoleId");

-- CreateIndex
CREATE INDEX "MessageMentionReceipt_userId_seenAt_idx" ON "MessageMentionReceipt"("userId", "seenAt");

-- CreateIndex
CREATE INDEX "MessageMentionReceipt_userId_serverId_seenAt_idx" ON "MessageMentionReceipt"("userId", "serverId", "seenAt");

-- CreateIndex
CREATE INDEX "MessageMentionReceipt_userId_channelId_seenAt_idx" ON "MessageMentionReceipt"("userId", "channelId", "seenAt");

-- CreateIndex
CREATE UNIQUE INDEX "MessageMentionReceipt_messageId_userId_key" ON "MessageMentionReceipt"("messageId", "userId");

-- AddForeignKey
ALTER TABLE "MessageMention" ADD CONSTRAINT "MessageMention_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMention" ADD CONSTRAINT "MessageMention_mentionedUserId_fkey" FOREIGN KEY ("mentionedUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMention" ADD CONSTRAINT "MessageMention_mentionedRoleId_fkey" FOREIGN KEY ("mentionedRoleId") REFERENCES "ServerRoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMentionReceipt" ADD CONSTRAINT "MessageMentionReceipt_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMentionReceipt" ADD CONSTRAINT "MessageMentionReceipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
