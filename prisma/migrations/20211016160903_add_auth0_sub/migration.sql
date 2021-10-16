/*
  Warnings:

  - Added the required column `auth0Sub` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth0Sub` to the `Practitioner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "auth0Sub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Practitioner" ADD COLUMN     "auth0Sub" TEXT NOT NULL;
