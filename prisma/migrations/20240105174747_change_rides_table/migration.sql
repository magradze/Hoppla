/*
  Warnings:

  - You are about to drop the column `places` on the `rides` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `seats` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED', 'COMPLETED');

-- AlterTable
ALTER TABLE "rides" DROP COLUMN "places",
ADD COLUMN     "seats" INTEGER NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "RideStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
