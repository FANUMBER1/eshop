-- CreateTable
CREATE TABLE "discount_code" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "amount" TEXT,
    "discount" TEXT NOT NULL,

    CONSTRAINT "discount_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_product" (
    "id" SERIAL NOT NULL,
    "productid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "like_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "like_product" ADD CONSTRAINT "like_product_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_product" ADD CONSTRAINT "like_product_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
