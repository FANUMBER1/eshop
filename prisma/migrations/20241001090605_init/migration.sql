-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
