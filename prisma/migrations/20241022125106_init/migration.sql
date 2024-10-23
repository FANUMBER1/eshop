/*
  Warnings:

  - You are about to drop the column `amountmax` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `amountmin` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `countbuymin` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `coupon_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "amountmax",
DROP COLUMN "amountmin",
DROP COLUMN "countbuymin",
DROP COLUMN "discount",
ADD COLUMN     "discountpercent" TEXT,
ADD COLUMN     "discountprice" TEXT;

-- AlterTable
ALTER TABLE "coupon_user" ADD COLUMN     "quantity" INTEGER NOT NULL;
