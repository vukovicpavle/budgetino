import type { NextRequest } from 'next/server';

import { updateSession } from '@budgetino/auth/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Any path containing a file extension (e.g. .ico, .txt, .xml, .svg, .png, etc.)
     */
    '/((?!_next/static|_next/image|.*\\.[^/]+$).*)',
  ],
};
