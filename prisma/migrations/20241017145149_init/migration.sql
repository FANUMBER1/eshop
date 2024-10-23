/*
  Warnings:

  - You are about to drop the column `time` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `action` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountmax` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "time",
ADD COLUMN     "action" INTEGER NOT NULL,
ADD COLUMN     "amountmax" TEXT NOT NULL,
ADD COLUMN     "amountmin" TEXT,
ADD COLUMN     "countbuymax" TEXT,
ADD COLUMN     "countbuymin" TEXT,
ADD COLUMN     "discount" TEXT,
ADD COLUMN     "pricemin" TEXT;

-- CreateTable
CREATE TABLE "coupon_classfy" (
    "id" SERIAL NOT NULL,
    "classfyid" INTEGER NOT NULL,
    "couponid" INTEGER NOT NULL,

    CONSTRAINT "coupon_classfy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon_user" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "couponid" INTEGER NOT NULL,

    CONSTRAINT "coupon_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coupon_classfy" ADD CONSTRAINT "coupon_classfy_classfyid_fkey" FOREIGN KEY ("classfyid") REFERENCES "classfy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_classfy" ADD CONSTRAINT "coupon_classfy_couponid_fkey" FOREIGN KEY ("couponid") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_user" ADD CONSTRAINT "coupon_user_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_user" ADD CONSTRAINT "coupon_user_couponid_fkey" FOREIGN KEY ("couponid") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
