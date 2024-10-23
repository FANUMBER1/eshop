/*
  Warnings:

  - Added the required column `buymin` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "buymin",
ADD COLUMN     "buymin" INTEGER NOT NULL;
