// apps/web/src/app/api/landing-page-templates/route.ts
import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { createLandingPageTemplate } from '@documenso/lib/server-only/landing-page-template/create-landing-page-template';
import { prisma } from '@documenso/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from the database using the email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();

    const template = await createLandingPageTemplate({
      ...body,
      userId: user.id,
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error creating landing page template:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const templates = await prisma.landingPageTemplate.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        thumbnailUrl: true,
        type: true,
        category: true,
        tags: true,
        status: true,
      },
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching landing page templates:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
