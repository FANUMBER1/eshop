/*
  Warnings:

  - You are about to drop the column `address` on the `oder` table. All the data in the column will be lost.
  - Added the required column `addressid` to the `oder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "oder" DROP COLUMN "address",
ADD COLUMN     "addressid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "oder" ADD CONSTRAINT "oder_addressid_fkey" FOREIGN KEY ("addressid") REFERENCES "user_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
