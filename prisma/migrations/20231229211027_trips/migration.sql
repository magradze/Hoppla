/*
  Warnings:

  - You are about to drop the column `updated_at` on the `trip_rules` table. All the data in the column will be lost.
  - You are about to drop the column `passengers` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trip_rules" DROP COLUMN "updated_at",
ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "passengers",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "places" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3);
