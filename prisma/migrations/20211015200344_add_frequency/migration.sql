/*
  Warnings:

  - Added the required column `completionFrequency` to the `Protocol` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('E1D', 'E2D', 'E3D', 'E4D', 'E5D', 'E6D', 'E7D', 'E14D');

-- AlterTable
ALTER TABLE "Protocol" ADD COLUMN     "completionFrequency" "Frequency" NOT NULL;
