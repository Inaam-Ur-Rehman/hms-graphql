/*
  Warnings:

  - Added the required column `month` to the `fees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fees" ADD COLUMN     "month" TEXT NOT NULL;
