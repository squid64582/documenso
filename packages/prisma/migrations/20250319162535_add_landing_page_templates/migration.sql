-- CreateEnum
CREATE TYPE "LandingPageTemplateStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LandingPageTemplateType" AS ENUM ('COMPONENT', 'FULL_PAGE');

-- CreateTable
CREATE TABLE "LandingPageTemplate" (
  "id" SERIAL NOT NULL,
  "externalId" TEXT,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "thumbnailUrl" TEXT,
  "componentCode" TEXT NOT NULL,
  "cssCode" TEXT,
  "previewImageUrl" TEXT,
  "type" "LandingPageTemplateType" NOT NULL DEFAULT 'FULL_PAGE',
  "category" TEXT,
  "tags" TEXT[],
  "status" "LandingPageTemplateStatus" NOT NULL DEFAULT 'DRAFT',
  "configSchema" JSONB,
  "defaultConfig" JSONB,
  "userId" INTEGER NOT NULL,
  "teamId" INTEGER,
  "shopId" TEXT,
  "metadata" JSONB,
  "version" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "LandingPageTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LandingPageTemplate_userId_idx" ON "LandingPageTemplate"("userId");

-- CreateIndex
CREATE INDEX "LandingPageTemplate_teamId_idx" ON "LandingPageTemplate"("teamId");

-- CreateIndex
CREATE INDEX "LandingPageTemplate_status_idx" ON "LandingPageTemplate"("status");

-- CreateIndex
CREATE INDEX "LandingPageTemplate_category_idx" ON "LandingPageTemplate"("category");

-- AddForeignKey
ALTER TABLE "LandingPageTemplate" ADD CONSTRAINT "LandingPageTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPageTemplate" ADD CONSTRAINT "LandingPageTemplate_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
