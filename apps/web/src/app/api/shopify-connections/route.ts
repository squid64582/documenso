// src/app/api/shopify-connections/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { z } from 'zod';

import { prisma } from '@documenso/prisma';

// Validate the incoming payload
const ShopPayloadSchema = z.object({
  shop: z.object({
    id: z.string(),
    name: z.string().nullable().optional(), // Updated to handle null
    domain: z.string(),
    myshopifyDomain: z.string(),
    email: z.string().email().nullable().optional(), // Updated to handle null
    phone: z.string().nullable().optional(), // Updated to handle null
    planName: z.string().nullable().optional(), // Updated to handle null
    countryCode: z.string().nullable().optional(), // Updated to handle null
    primaryLocale: z.string().nullable().optional(), // Updated to handle null
    timezone: z.string().nullable().optional(), // Updated to handle null
    currency: z.string().nullable().optional(), // Updated to handle null
    shopOwner: z.string().nullable().optional(), // Updated to handle null
    customerEmail: z.string().nullable().optional(), // Updated to handle null
  }),
  externalUserId: z.string().optional(),
  installationTimestamp: z.string(),
  lastUpdated: z.string(),
});

export async function POST(request: NextRequest) {
  // Authenticate the request
  const authHeader = request.headers.get('authorization');
  const expectedApiKey = process.env.SHOPIFY_INTEGRATION_API_KEY;

  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.replace('Bearer ', '') !== expectedApiKey
  ) {
    return NextResponse.json({ error: 'Unauthorized: Invalid API key' }, { status: 401 });
  }

  try {
    // Parse and validate the request body
    const body = await request.json();
    const validationResult = ShopPayloadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid payload',
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const payload = validationResult.data;

    // Use Prisma to upsert the shop installation record
    const shopInstallation = await prisma.shopInstallation.upsert({
      where: {
        shopId: payload.shop.id,
      },
      update: {
        shopName: payload.shop.name,
        shopDomain: payload.shop.domain,
        myshopifyDomain: payload.shop.myshopifyDomain,
        email: payload.shop.email,
        neonSystemUserId: payload.externalUserId,
        installedAt: new Date(payload.installationTimestamp),
        data: payload.shop,
      },
      create: {
        shopId: payload.shop.id,
        shopName: payload.shop.name,
        shopDomain: payload.shop.domain,
        myshopifyDomain: payload.shop.myshopifyDomain,
        email: payload.shop.email,
        neonSystemUserId: payload.externalUserId,
        installedAt: new Date(payload.installationTimestamp),
        data: payload.shop,
      },
    });

    // Return success with the record ID
    return NextResponse.json({
      success: true,
      id: shopInstallation.id,
      message: 'Shop connection created or updated',
    });
  } catch (error) {
    console.error('Error processing shop connection:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 },
    );
  }
}
