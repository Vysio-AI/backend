/*
  Warnings:

  - The values [PENDING,CANCELLED] on the enum `InviteStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `clientFirstName` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientLastName` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InviteStatus_new" AS ENUM ('QUEUED', 'SENT', 'FAILED', 'COMPLETED', 'EXPIRED');
ALTER TABLE "Invite" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invite" ALTER COLUMN "status" TYPE "InviteStatus_new" USING ("status"::text::"InviteStatus_new");
ALTER TYPE "InviteStatus" RENAME TO "InviteStatus_old";
ALTER TYPE "InviteStatus_new" RENAME TO "InviteStatus";
DROP TYPE "InviteStatus_old";
ALTER TABLE "Invite" ALTER COLUMN "status" SET DEFAULT 'QUEUED';
COMMIT;

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "clientFirstName" TEXT NOT NULL,
ADD COLUMN     "clientLastName" TEXT NOT NULL,
ALTER COLUMN "expiry" SET DEFAULT NOW() + interval '1 week',
ALTER COLUMN "status" SET DEFAULT E'QUEUED';
