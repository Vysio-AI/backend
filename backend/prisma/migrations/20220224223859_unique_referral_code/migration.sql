/*
  Warnings:

  - A unique constraint covering the columns `[referralCode]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- CreateIndex
CREATE UNIQUE INDEX "Invite_referralCode_key" ON "Invite"("referralCode");
