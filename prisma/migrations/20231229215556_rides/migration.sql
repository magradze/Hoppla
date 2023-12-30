/*
  Warnings:

  - You are about to drop the column `trip_id` on the `stops` table. All the data in the column will be lost.
  - You are about to drop the `trip_rules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ride_id` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stops" DROP CONSTRAINT "stops_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "trip_rules" DROP CONSTRAINT "trip_rules_trip_id_fkey";

-- AlterTable
ALTER TABLE "stops" DROP COLUMN "trip_id",
ADD COLUMN     "ride_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "trip_rules";

-- CreateTable
CREATE TABLE "ride_rules" (
    "id" TEXT NOT NULL,
    "ride_id" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "ride_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "ride_id" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TripToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TripToUser_AB_unique" ON "_TripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TripToUser_B_index" ON "_TripToUser"("B");

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_rules" ADD CONSTRAINT "ride_rules_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
