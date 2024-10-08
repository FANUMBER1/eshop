-- CreateTable
CREATE TABLE "user_address" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "address" TEXT,
    "active" INTEGER NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("id")
);
