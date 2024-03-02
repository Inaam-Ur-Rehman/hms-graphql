/*
  Warnings:

  - You are about to drop the column `bio` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnic]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_group` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnic` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnic_back` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnic_front` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MANAGER');

-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('STUDENT', 'JOB_HOLDER', 'OTHER');

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "bio",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "blood_group" TEXT NOT NULL,
ADD COLUMN     "cnic" TEXT NOT NULL,
ADD COLUMN     "cnic_back" TEXT NOT NULL,
ADD COLUMN     "cnic_front" TEXT NOT NULL,
ADD COLUMN     "emergency_contact" TEXT NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "user_type" "USER_TYPE" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cnic_key" ON "profiles"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_phone_key" ON "profiles"("phone");
