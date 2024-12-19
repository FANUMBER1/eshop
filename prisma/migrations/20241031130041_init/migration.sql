/*
  Warnings:

  - You are about to drop the column `typerid` on the `coupon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_typerid_fkey";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "typerid";

-- CreateTable
CREATE TABLE "coupon_typer" (
    "id" SERIAL NOT NULL,
    "typerid" INTEGER NOT NULL,
    "couponid" INTEGER NOT NULL,

    CONSTRAINT "coupon_typer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coupon_typer" ADD CONSTRAINT "coupon_typer_typerid_fkey" FOREIGN KEY ("typerid") REFERENCES "typer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_typer" ADD CONSTRAINT "coupon_typer_couponid_fkey" FOREIGN KEY ("couponid") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
