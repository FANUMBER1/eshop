/*
  Warnings:

  - You are about to drop the column `countbuymax` on the `coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "countbuymax",
ALTER COLUMN "amountmax" DROP NOT NULL;
