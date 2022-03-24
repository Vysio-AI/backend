-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- AlterTable
ALTER TABLE "SessionMetric" ALTER COLUMN "data" SET DATA TYPE TEXT;
