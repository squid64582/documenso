import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { prisma } from '@documenso/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('Fetching stores for user ID:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch stores from the shop_installations table where neonSystemUserId matches the userId
    const stores = await prisma.shopInstallation.findMany({
      where: {
        neonSystemUserId: userId,
      },
      orderBy: {
        installedAt: 'desc',
      },
    });

    console.log('Found stores:', stores.length, stores);

    // If no stores found, try to find by direct user ID match as fallback
    if (stores.length === 0) {
      console.log('No stores found with neonSystemUserId, trying direct userId match');
      const storesByUserId = await prisma.shopInstallation.findMany({
        where: {
          OR: [
            { neonSystemUserId: userId },
            { neonSystemUserId: null }, // In case the field is null but should be associated
          ],
        },
        orderBy: {
          installedAt: 'desc',
        },
      });

      console.log('Found stores by direct userId:', storesByUserId.length);

      return NextResponse.json({ stores: storesByUserId });
    }

    return NextResponse.json({ stores });
  } catch (error) {
    console.error('Error fetching user stores:', error);
    return NextResponse.json({ error: 'Failed to fetch user stores' }, { status: 500 });
  }
}
