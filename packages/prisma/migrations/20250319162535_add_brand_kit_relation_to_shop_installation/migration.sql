-- AlterTable
ALTER TABLE "shop_installations" ADD COLUMN     "brandKitId" INTEGER;

-- AddForeignKey
ALTER TABLE "shop_installations" ADD CONSTRAINT "shop_installations_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
