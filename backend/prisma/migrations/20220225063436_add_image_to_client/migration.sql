-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week';
