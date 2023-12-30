/*
  Warnings:

  - You are about to drop the column `created_at` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `end_location` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `places` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `start_location` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ride_id` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_ride_id_fkey";

-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "ride_rules" DROP CONSTRAINT "ride_rules_ride_id_fkey";

-- DropForeignKey
ALTER TABLE "stops" DROP CONSTRAINT "stops_ride_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_user_id_fkey";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "distance",
DROP COLUMN "duration",
DROP COLUMN "end_location",
DROP COLUMN "name",
DROP COLUMN "places",
DROP COLUMN "price",
DROP COLUMN "start_date",
DROP COLUMN "start_location",
DROP COLUMN "user_id",
ADD COLUMN     "ride_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Trip";

-- CreateTable
CREATE TABLE "rides" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_location" TEXT NOT NULL,
    "end_location" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "places" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride_rules" ADD CONSTRAINT "ride_rules_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
