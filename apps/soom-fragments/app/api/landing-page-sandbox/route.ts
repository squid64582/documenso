import {
  createNextjsPreview,
  LandingPageOutput,
} from '@/lib/sandbox/nextjs-preview'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 120

export async function POST(req: NextRequest) {
  try {
    const { landingPage, userID, apiKey } = await req.json()

    // Validate the request
    if (!landingPage || !userID) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 },
      )
    }

    console.log('Creating preview for landing page:', landingPage.filePath)

    // Create the preview with the API key
    const preview = await createNextjsPreview(landingPage, apiKey)

    return NextResponse.json({
      url: preview.url,
      sbxId: preview.sbxId,
      template: preview.template,
      message: 'Landing page preview created successfully',
    })
  } catch (error: any) {
    console.error('Error creating landing page preview:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 },
    )
  }
}
