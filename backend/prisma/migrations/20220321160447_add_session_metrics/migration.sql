/*
  Warnings:

  - The values [BIWEEKLY,MONTHLY] on the enum `TimeFrame` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimeFrame_new" AS ENUM ('DAILY', 'WEEKLY');
ALTER TABLE "Plan" ALTER COLUMN "timeframe" TYPE "TimeFrame_new" USING ("timeframe"::text::"TimeFrame_new");
ALTER TYPE "TimeFrame" RENAME TO "TimeFrame_old";
ALTER TYPE "TimeFrame_new" RENAME TO "TimeFrame";
DROP TYPE "TimeFrame_old";
COMMIT;

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- CreateTable
CREATE TABLE "SessionMetric" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "planId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB NOT NULL,

    CONSTRAINT "SessionMetric_pkey" PRIMARY KEY ("id")
);
