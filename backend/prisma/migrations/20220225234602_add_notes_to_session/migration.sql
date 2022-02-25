-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "clientNotes" TEXT,
ADD COLUMN     "privatePractitionerNotes" TEXT,
ADD COLUMN     "publicPractitionerNotes" TEXT;
