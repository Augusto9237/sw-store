/*
  Warnings:

  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "UserTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTeam_email_key" ON "UserTeam"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTeam_password_key" ON "UserTeam"("password");
