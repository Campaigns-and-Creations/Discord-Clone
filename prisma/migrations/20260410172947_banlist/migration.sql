-- CreateTable
CREATE TABLE "BanList" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "reason" TEXT,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BanList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BanListUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BanListUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "BanList_serverId_key" ON "BanList"("serverId");

-- CreateIndex
CREATE INDEX "_BanListUsers_B_index" ON "_BanListUsers"("B");

-- AddForeignKey
ALTER TABLE "BanList" ADD CONSTRAINT "BanList_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BanListUsers" ADD CONSTRAINT "_BanListUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "BanList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BanListUsers" ADD CONSTRAINT "_BanListUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
