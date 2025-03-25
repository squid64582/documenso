// packages/lib/server-only/landing-page-template/create-landing-page-template.ts
import { prisma } from '@documenso/prisma';
import type { LandingPageTemplateStatus, LandingPageTemplateType } from '@documenso/prisma/client';

export type CreateLandingPageTemplateOptions = {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  componentCode: string;
  cssCode?: string;
  previewImageUrl?: string;
  type?: LandingPageTemplateType;
  category?: string;
  tags?: string[];
  status?: LandingPageTemplateStatus;
  configSchema?: Record<string, any>;
  defaultConfig?: Record<string, any>;
  userId: number;
  teamId?: number;
  shopId?: string;
  metadata?: Record<string, any>;
};

export const createLandingPageTemplate = async (options: CreateLandingPageTemplateOptions) => {
  try {
    console.log('Creating landing page template with options:', JSON.stringify(options, null, 2));

    const {
      name,
      description,
      thumbnailUrl,
      componentCode,
      cssCode,
      previewImageUrl,
      type = 'FULL_PAGE',
      category,
      tags = [],
      status = 'DRAFT',
      configSchema,
      defaultConfig,
      userId,
      teamId,
      shopId,
      metadata,
    } = options;

    const template = await prisma.landingPageTemplate.create({
      data: {
        name,
        description,
        thumbnailUrl,
        componentCode,
        cssCode,
        previewImageUrl,
        type,
        category,
        tags,
        status,
        configSchema,
        defaultConfig,
        userId,
        teamId,
        shopId,
        metadata,
      },
    });

    return template;
  } catch (error) {
    console.error('Error in createLandingPageTemplate:', error);
    throw error;
  }
};
