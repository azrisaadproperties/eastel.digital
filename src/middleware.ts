import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Dapatkan hostname (cth: 'ali.eastel.digital', 'localhost:3000')
  const hostname = req.headers.get('host') || 'eastel.digital'

  // Abaikan jika ia bukan subdomain (hanya domain utama atau www)
  // Untuk localhost, kita benarkan test dengan ali.localhost:3000
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  const rootDomain = isLocalhost ? hostname.split(':')[0] : 'eastel.digital'
  
  let currentHost = ''
  
  if (isLocalhost) {
    currentHost = hostname.replace(`.${rootDomain}`, '').replace(`:${url.port}`, '')
  } else {
    currentHost = hostname.replace(`.${rootDomain}`, '')
  }

  // Jika currentHost sama dengan rootDomain, maksudnya tiada subdomain
  // Jika www, kita abaikan
  if (currentHost === rootDomain || currentHost === 'www' || currentHost === hostname) {
    return NextResponse.next()
  }

  // Halang akses direct ke /[tenant] melalui domain utama
  if (url.pathname.startsWith(`/${currentHost}`)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Jika ada subdomain (contoh: ali), rewrite url ke app/[tenant]/...
  // Cth: ali.eastel.digital/ akan di rewrite ke ali.eastel.digital/ali/
  return NextResponse.rewrite(new URL(`/${currentHost}${url.pathname}`, req.url))
}
