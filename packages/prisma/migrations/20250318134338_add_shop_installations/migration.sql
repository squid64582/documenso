-- CreateTable
CREATE TABLE "shop_installations" (
    "id" SERIAL NOT NULL,
    "shop_id" TEXT NOT NULL,
    "shop_name" TEXT,
    "shop_domain" TEXT NOT NULL,
    "myshopify_domain" TEXT NOT NULL,
    "email" TEXT,
    "neon_system_user_id" TEXT,
    "installed_at" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_installations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_installations_shop_id_key" ON "shop_installations"("shop_id");
