// middleware.ts at the root of your project
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Replace with specific origins in production
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  return response;
}

// Only apply this middleware to API routes
export const config = {
  matcher: '/api/:path*',
};
