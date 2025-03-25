import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    // Resolve the absolute path (be careful with security here)
    const absolutePath = path.join(process.cwd(), filePath);

    // Basic security check to prevent directory traversal
    if (!absolutePath.startsWith(process.cwd())) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read the file
    const componentCode = fs.readFileSync(absolutePath, 'utf8');

    return NextResponse.json({ componentCode });
  } catch (error) {
    console.error('Error reading component code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
