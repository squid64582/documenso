-- CreateTable
CREATE TABLE "brand_kits" (
    "id" SERIAL NOT NULL,
    "brandUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_kits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_identity" (
    "id" SERIAL NOT NULL,
    "brandKitId" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "brandDescription" TEXT,
    "missionStatement" TEXT,
    "visionStatement" TEXT,
    "coreValues" JSONB,
    "toneOfVoice" JSONB,
    "messagingGuidelines" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visual_identity" (
    "id" SERIAL NOT NULL,
    "brandKitId" INTEGER NOT NULL,
    "colorPalette" JSONB,
    "typography" JSONB,
    "logoDescription" TEXT,
    "imageryStyle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visual_identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_research" (
    "id" SERIAL NOT NULL,
    "brandKitId" INTEGER NOT NULL,
    "industry" TEXT,
    "targetAudience" JSONB,
    "marketPosition" JSONB,
    "competitors" JSONB,
    "comparisonData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "market_research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategic_recommendations" (
    "id" SERIAL NOT NULL,
    "brandKitId" INTEGER NOT NULL,
    "positioningElements" JSONB,
    "positioningInsights" JSONB,
    "recommendations" JSONB,
    "conclusion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strategic_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_outputs" (
    "id" SERIAL NOT NULL,
    "brandKitId" INTEGER NOT NULL,
    "taskName" TEXT NOT NULL,
    "output" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_outputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_identity_brandKitId_key" ON "brand_identity"("brandKitId");

-- CreateIndex
CREATE UNIQUE INDEX "visual_identity_brandKitId_key" ON "visual_identity"("brandKitId");

-- CreateIndex
CREATE UNIQUE INDEX "market_research_brandKitId_key" ON "market_research"("brandKitId");

-- CreateIndex
CREATE UNIQUE INDEX "strategic_recommendations_brandKitId_key" ON "strategic_recommendations"("brandKitId");

-- AddForeignKey
ALTER TABLE "brand_identity" ADD CONSTRAINT "brand_identity_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visual_identity" ADD CONSTRAINT "visual_identity_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_research" ADD CONSTRAINT "market_research_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_recommendations" ADD CONSTRAINT "strategic_recommendations_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_outputs" ADD CONSTRAINT "task_outputs_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "brand_kits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
