-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';
