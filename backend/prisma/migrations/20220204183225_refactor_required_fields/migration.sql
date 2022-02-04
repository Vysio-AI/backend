/*
  Warnings:

  - You are about to drop the column `processed` on the `Session` table. All the data in the column will be lost.
  - Made the column `planId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clientId` to the `Flag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practitionerId` to the `Flag` table without a default value. This is not possible if the table is not empty.
  - Made the column `sessionId` on table `Flag` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Made the column `practitionerId` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionId` on table `SessionFrame` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clientId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practitionerId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_planId_fkey";

-- DropForeignKey
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionFrame" DROP CONSTRAINT "SessionFrame_sessionId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "planId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Flag" ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "practitionerId" INTEGER NOT NULL,
ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "processed",
ALTER COLUMN "practitionerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SessionFrame" ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "practitionerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SessionFrame" ADD CONSTRAINT "SessionFrame_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
