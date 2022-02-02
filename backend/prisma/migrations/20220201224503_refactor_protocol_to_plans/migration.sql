/*
  Warnings:

  - You are about to drop the column `protocolId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Practitioner` table. All the data in the column will be lost.
  - You are about to drop the column `protocolId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `ClientNotificationSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PractitionerNotificationSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Protocol` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `planId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimeFrame" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY');

-- DropForeignKey
ALTER TABLE "ClientNotificationSettings" DROP CONSTRAINT "ClientNotificationSettings_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_protocolId_fkey";

-- DropForeignKey
ALTER TABLE "Practitioner" DROP CONSTRAINT "Practitioner_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "PractitionerNotificationSettings" DROP CONSTRAINT "PractitionerNotificationSettings_practitionerId_fkey";

-- DropForeignKey
ALTER TABLE "Protocol" DROP CONSTRAINT "Protocol_clientId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "protocolId",
ADD COLUMN     "planId" INTEGER;

-- AlterTable
ALTER TABLE "Practitioner" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "protocolId",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ClientNotificationSettings";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "PractitionerNotificationSettings";

-- DropTable
DROP TABLE "Protocol";

-- DropEnum
DROP TYPE "Frequency";

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "activatedAt" TIMESTAMP(3),
    "deactivatedAt" TIMESTAMP(3),
    "repetitions" INTEGER NOT NULL,
    "timeframe" "TimeFrame" NOT NULL,
    "practitionerId" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClientToPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToPlan_AB_unique" ON "_ClientToPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToPlan_B_index" ON "_ClientToPlan"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToPlan" ADD FOREIGN KEY ("A") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToPlan" ADD FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
