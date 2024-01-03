/*
  Warnings:

  - Changed the type of `duration` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rides" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;
