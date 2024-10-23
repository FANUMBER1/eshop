-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "quantity" TEXT,
    "time" TEXT,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);
