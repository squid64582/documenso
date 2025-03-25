// apps/web/src/app/api/v1/landing-page-templates/[id]/code/route.ts
import { NextResponse } from 'next/server';

import { getLandingPageTemplateById } from '@documenso/lib/server-only/landing-page-template/get-landing-page-template';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    // Get API key from request header
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || apiKey !== process.env.LANDING_PAGE_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const template = await getLandingPageTemplateById({ id });
    
    return NextResponse.json({
      id: template.id,
      name: template.name,
      componentCode: template.componentCode,
      cssCode: template.cssCode,
      configSchema: template.configSchema,
      defaultConfig: template.defaultConfig,
    });
  } catch (error) {
    console.error('Error fetching landing page template code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
