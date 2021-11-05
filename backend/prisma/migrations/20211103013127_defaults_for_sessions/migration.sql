-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "processed" SET DEFAULT false;
