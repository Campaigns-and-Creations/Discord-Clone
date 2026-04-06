-- AlterTable
ALTER TABLE "Channel"
ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ChannelRoleAccess" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "ChannelRoleAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChannelRoleAccess_channelId_roleId_key" ON "ChannelRoleAccess"("channelId", "roleId");

-- CreateIndex
CREATE INDEX "ChannelRoleAccess_roleId_idx" ON "ChannelRoleAccess"("roleId");

-- AddForeignKey
ALTER TABLE "ChannelRoleAccess" ADD CONSTRAINT "ChannelRoleAccess_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelRoleAccess" ADD CONSTRAINT "ChannelRoleAccess_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ServerRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Align with Prisma @updatedAt behavior (no SQL default)
ALTER TABLE "Channel" ALTER COLUMN "updatedAt" DROP DEFAULT;
