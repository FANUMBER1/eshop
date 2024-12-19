/*
  Warnings:

  - You are about to drop the column `quantity` on the `coupon_user` table. All the data in the column will be lost.
  - Added the required column `quantityuser` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typerid` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "quantityuser" INTEGER NOT NULL,
ADD COLUMN     "typerid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "coupon_user" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "typer_user" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "typerid" INTEGER NOT NULL,

    CONSTRAINT "typer_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typer" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "typer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "typer_user" ADD CONSTRAINT "typer_user_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typer_user" ADD CONSTRAINT "typer_user_typerid_fkey" FOREIGN KEY ("typerid") REFERENCES "typer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_typerid_fkey" FOREIGN KEY ("typerid") REFERENCES "typer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
