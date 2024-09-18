-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "subject" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "userid" INTEGER NOT NULL,
    "blogid" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "size" TEXT,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_size" (
    "id" SERIAL NOT NULL,
    "productid" INTEGER NOT NULL,
    "sizeid" INTEGER NOT NULL,

    CONSTRAINT "product_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "color" TEXT,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_color" (
    "id" SERIAL NOT NULL,
    "productid" INTEGER NOT NULL,
    "colorid" INTEGER NOT NULL,

    CONSTRAINT "product_color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userclass" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "userclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classfy" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "classfy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "name" TEXT,
    "content" TEXT,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "img" TEXT,
    "describe" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "img" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "state" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "code" TEXT,
    "company" TEXT,
    "pass" TEXT,
    "roleid" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "name" TEXT,
    "describe" TEXT,
    "content" TEXT,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" TEXT,
    "describe" TEXT,
    "content" TEXT,
    "quantity" TEXT,
    "img" TEXT[],
    "classfyid" INTEGER NOT NULL,
    "userclassid" INTEGER NOT NULL,
    "discountid" INTEGER NOT NULL,
    "countsale" INTEGER NOT NULL,
    "countview" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categori" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "categori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soicial" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "img" TEXT,
    "link" TEXT,

    CONSTRAINT "soicial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oder" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "oder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oder_product" (
    "id" SERIAL NOT NULL,
    "oderid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "quantity" TEXT,

    CONSTRAINT "oder_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_categori" (
    "blogid" INTEGER NOT NULL,
    "categorid" INTEGER NOT NULL,

    CONSTRAINT "blog_categori_pkey" PRIMARY KEY ("blogid","categorid")
);

-- CreateTable
CREATE TABLE "blog_tag" (
    "blogid" INTEGER NOT NULL,
    "tagid" INTEGER NOT NULL,

    CONSTRAINT "blog_tag_pkey" PRIMARY KEY ("blogid","tagid")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "userid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "active_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketing_sale" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "link" TEXT,
    "namesale" TEXT,
    "activeid" INTEGER NOT NULL,

    CONSTRAINT "marketing_sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketing_blog" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "link" TEXT,
    "img" TEXT,
    "activeid" INTEGER NOT NULL,

    CONSTRAINT "marketing_blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketing" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "link" TEXT,
    "nameshop" TEXT,
    "activeid" INTEGER NOT NULL,

    CONSTRAINT "marketing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_blogid_fkey" FOREIGN KEY ("blogid") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_sizeid_fkey" FOREIGN KEY ("sizeid") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_color" ADD CONSTRAINT "product_color_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_color" ADD CONSTRAINT "product_color_colorid_fkey" FOREIGN KEY ("colorid") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_classfyid_fkey" FOREIGN KEY ("classfyid") REFERENCES "classfy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_userclassid_fkey" FOREIGN KEY ("userclassid") REFERENCES "userclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_discountid_fkey" FOREIGN KEY ("discountid") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oder" ADD CONSTRAINT "oder_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oder_product" ADD CONSTRAINT "oder_product_oderid_fkey" FOREIGN KEY ("oderid") REFERENCES "oder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oder_product" ADD CONSTRAINT "oder_product_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_categori" ADD CONSTRAINT "blog_categori_blogid_fkey" FOREIGN KEY ("blogid") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_categori" ADD CONSTRAINT "blog_categori_categorid_fkey" FOREIGN KEY ("categorid") REFERENCES "categori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_blogid_fkey" FOREIGN KEY ("blogid") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_tagid_fkey" FOREIGN KEY ("tagid") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing_sale" ADD CONSTRAINT "marketing_sale_activeid_fkey" FOREIGN KEY ("activeid") REFERENCES "active"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing_blog" ADD CONSTRAINT "marketing_blog_activeid_fkey" FOREIGN KEY ("activeid") REFERENCES "active"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing" ADD CONSTRAINT "marketing_activeid_fkey" FOREIGN KEY ("activeid") REFERENCES "active"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
