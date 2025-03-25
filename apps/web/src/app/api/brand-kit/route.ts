// apps/web/src/app/api/brand-kit/route.ts
import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { prisma } from '@documenso/prisma';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find shop installations associated with this user
    const shopInstallation = await prisma.shopInstallation.findFirst({
      where: { email: session.user.email },
      select: { brandKitId: true },
    });

    let brandKitId = shopInstallation?.brandKitId;

    // If no brand kit is found through shop installation, try to find any brand kit
    if (!brandKitId) {
      const anyBrandKit = await prisma.brandKit.findFirst({
        orderBy: { createdAt: 'desc' },
      });

      brandKitId = anyBrandKit?.id;
    }

    if (!brandKitId) {
      // Return default brand kit if none exists
      return NextResponse.json({
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#3b82f6',
          background: '#f9fafb',
          text: '#111827',
        },
        typography: {
          headingFont: 'Inter',
          bodyFont: 'Inter',
          baseSize: '16px',
        },
        logo: null,
        brandName: 'Your Brand',
        tone: 'Professional',
        targetAudience: 'General',
      });
    }

    // Get the complete brand kit with all related data
    const brandKit = await prisma.brandKit.findUnique({
      where: { id: brandKitId },
      include: {
        brandIdentity: true,
        visualIdentity: true,
        marketResearch: true,
        strategicRecommendations: true,
      },
    });

    if (!brandKit) {
      return NextResponse.json({ error: 'Brand kit not found' }, { status: 404 });
    }

    // Format the brand kit data for the external API
    const formattedBrandKit = {
      // Basic brand info
      brandName: brandKit.brandIdentity?.brandName || 'Your Brand',
      brandDescription: brandKit.brandIdentity?.brandDescription || '',
      brandUrl: brandKit.brandUrl,

      // Colors from visual identity
      colors: {
        primary: extractColorValue(brandKit.visualIdentity?.colorPalette, 'primary') || '#000000',
        secondary:
          extractColorValue(brandKit.visualIdentity?.colorPalette, 'secondary') || '#ffffff',
        accent: extractColorValue(brandKit.visualIdentity?.colorPalette, 'accent') || '#3b82f6',
        background:
          extractColorValue(brandKit.visualIdentity?.colorPalette, 'background') || '#f9fafb',
        text: extractColorValue(brandKit.visualIdentity?.colorPalette, 'text') || '#111827',
        // Include all colors from the palette
        palette: brandKit.visualIdentity?.colorPalette || [],
      },

      // Typography from visual identity
      typography: {
        headingFont: getTypographyValue(brandKit.visualIdentity?.typography, 'headings') || 'Inter',
        bodyFont: getTypographyValue(brandKit.visualIdentity?.typography, 'body') || 'Inter',
        baseSize: getTypographyValue(brandKit.visualIdentity?.typography, 'baseSize') || '16px',
        // Include all typography details
        details: brandKit.visualIdentity?.typography || {},
      },

      // Brand identity elements
      mission: brandKit.brandIdentity?.missionStatement || '',
      vision: brandKit.brandIdentity?.visionStatement || '',
      coreValues: brandKit.brandIdentity?.coreValues || [],

      // Tone and voice
      tone: getToneValue(brandKit.brandIdentity?.toneOfVoice) || 'Professional',
      toneOfVoice: brandKit.brandIdentity?.toneOfVoice || {},
      messagingGuidelines: brandKit.brandIdentity?.messagingGuidelines || '',

      // Market research
      targetAudience: getTargetAudienceValue(brandKit.marketResearch?.targetAudience) || 'General',
      industry: brandKit.marketResearch?.industry || '',
      marketPosition: brandKit.marketResearch?.marketPosition || {},
      competitors: brandKit.marketResearch?.competitors || [],

      // Strategic recommendations
      positioningElements: brandKit.strategicRecommendations?.positioningElements || [],
      recommendations: brandKit.strategicRecommendations?.recommendations || [],

      // Logo and imagery
      logoDescription: brandKit.visualIdentity?.logoDescription || '',
      imageryStyle: brandKit.visualIdentity?.imageryStyle || '',

      // Status and metadata
      status: brandKit.status,
      createdAt: brandKit.createdAt,
      updatedAt: brandKit.updatedAt,
    };

    return NextResponse.json(formattedBrandKit);
  } catch (error) {
    console.error('Error fetching brand kit:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

// Helper functions to extract values from JSON fields
function extractColorValue(colorPalette: any, type: string): string | null {
  if (!colorPalette) return null;

  try {
    const colors = Array.isArray(colorPalette) ? colorPalette : JSON.parse(colorPalette as string);
    const color = colors.find(
      (c: any) => c.type === type || c.name.toLowerCase() === type.toLowerCase(),
    );
    return color?.hex || null;
  } catch (e) {
    console.error('Error parsing color palette:', e);
    return null;
  }
}

function getTypographyValue(typography: any, key: string): string | null {
  if (!typography) return null;

  try {
    const typo = typeof typography === 'object' ? typography : JSON.parse(typography as string);
    return typo[key] || null;
  } catch (e) {
    console.error('Error parsing typography:', e);
    return null;
  }
}

function getToneValue(toneOfVoice: any): string | null {
  if (!toneOfVoice) return null;

  try {
    const tone = typeof toneOfVoice === 'object' ? toneOfVoice : JSON.parse(toneOfVoice as string);
    return tone.primary || null;
  } catch (e) {
    console.error('Error parsing tone of voice:', e);
    return null;
  }
}

function getTargetAudienceValue(targetAudience: any): string | null {
  if (!targetAudience) return null;

  try {
    const audience =
      typeof targetAudience === 'object' ? targetAudience : JSON.parse(targetAudience as string);
    return audience.primary || null;
  } catch (e) {
    console.error('Error parsing target audience:', e);
    return null;
  }
}
