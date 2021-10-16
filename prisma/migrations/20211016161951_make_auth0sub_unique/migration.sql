/*
  Warnings:

  - A unique constraint covering the columns `[auth0Sub]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auth0Sub]` on the table `Practitioner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_auth0Sub_key" ON "Client"("auth0Sub");

-- CreateIndex
CREATE UNIQUE INDEX "Practitioner_auth0Sub_key" ON "Practitioner"("auth0Sub");
