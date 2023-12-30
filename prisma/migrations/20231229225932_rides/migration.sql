/*
  Warnings:

  - Made the column `places` on table `rides` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rides" ALTER COLUMN "places" SET NOT NULL;
