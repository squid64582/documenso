import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { prisma } from '@documenso/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the user's connected shops
    const shops = await prisma.shopInstallation.findMany({
      where: { neonSystemUserId: user.id.toString() },
    });

    return NextResponse.json({ shops });
  } catch (error) {
    console.error('Error fetching connected shops:', error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}
