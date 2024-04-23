/*
  Warnings:

  - Made the column `name` on table `UserTeam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `UserTeam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `UserTeam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserTeam" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
