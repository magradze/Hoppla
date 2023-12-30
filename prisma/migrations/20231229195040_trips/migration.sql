/*
  Warnings:

  - You are about to drop the column `location` on the `stops` table. All the data in the column will be lost.
  - You are about to drop the column `passangers` on the `trips` table. All the data in the column will be lost.
  - Added the required column `name` to the `stops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengers` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stops" DROP COLUMN "location",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "passangers",
ADD COLUMN     "passengers" INTEGER NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "trip_rules" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trip_rules" ADD CONSTRAINT "trip_rules_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
