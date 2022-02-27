-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'PROCESSED');

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT E'IN_PROGRESS';
