/*
  Warnings:

  - Changed the type of `room_number` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "room_number",
ADD COLUMN     "room_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_room_number_key" ON "rooms"("room_number");
