import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

// Basic認証の設定
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'admin';
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'password';
const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === 'true';

function checkBasicAuth(request: NextRequest): boolean {
  if (!BASIC_AUTH_ENABLED) return true;

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  return username === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD;
}

export async function middleware(request: NextRequest) {
  // 特定のパス（例：/admin）のみにBasic認証を適用
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminPath && !checkBasicAuth(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
