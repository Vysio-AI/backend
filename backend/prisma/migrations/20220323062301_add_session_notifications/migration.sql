/*
  Warnings:

  - You are about to drop the `Flag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('QUEUED', 'SENT', 'FAILED');

-- DropForeignKey
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_sessionId_fkey";

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- DropTable
DROP TABLE "Flag";

-- CreateTable
CREATE TABLE "SessionNotification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT E'QUEUED',
    "sessionId" INTEGER NOT NULL,
    "practitionerId" INTEGER NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SessionNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionNotification_sessionId_key" ON "SessionNotification"("sessionId");

-- AddForeignKey
ALTER TABLE "SessionNotification" ADD CONSTRAINT "SessionNotification_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
