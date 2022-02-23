-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 week',
    "status" "InviteStatus" NOT NULL DEFAULT E'PENDING',
    "practitionerId" INTEGER NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_clientEmail_key" ON "Invite"("clientEmail");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
