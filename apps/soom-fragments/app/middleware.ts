// Create a new file: middleware.ts in the app directory
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for API routes only
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const authHeader = request.headers.get('Authorization')
    
    // Verify the API key for external requests
    if (request.nextUrl.pathname === '/api/generate-landing-page') {
      if (!authHeader || !authHeader.startsWith('Bearer ') || 
          authHeader.split(' ')[1] !== process.env.EXTERNAL_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
