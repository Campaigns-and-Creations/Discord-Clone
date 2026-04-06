-- CreateTable
CREATE TABLE "ServerInvite" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(12) NOT NULL,
    "serverId" TEXT NOT NULL,
    "creatorId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "maxUses" INTEGER,
    "currentUses" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerInvite_code_key" ON "ServerInvite"("code");

-- CreateIndex
CREATE INDEX "ServerInvite_serverId_idx" ON "ServerInvite"("serverId");

-- CreateIndex
CREATE INDEX "ServerInvite_expiresAt_idx" ON "ServerInvite"("expiresAt");

-- AddForeignKey
ALTER TABLE "ServerInvite" ADD CONSTRAINT "ServerInvite_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerInvite" ADD CONSTRAINT "ServerInvite_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
