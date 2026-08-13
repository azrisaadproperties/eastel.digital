import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Dapatkan hostname (contoh: 'ali.localhost:3000' atau 'azrisaad.eastel.digital')
  let hostname = request.headers.get('host') || ''

  // Untuk pembangunan tempatan, buang port (:3000)
  hostname = hostname.replace(/:\d+$/, '')

  // Tentukan root domain
  const rootDomain = process.env.NODE_ENV === 'production' 
    ? (hostname.includes('vercel.app') ? hostname : 'eastel.digital') 
    : 'localhost'

  // Cari subdomain
  let subdomain = hostname.replace(`.${rootDomain}`, '').toLowerCase()

  // Jika tiada subdomain (hanya root domain), benarkan laluan biasa (NextResponse.next)
  if (subdomain === rootDomain || subdomain === 'eastel.digital' || subdomain === 'www') {
    return NextResponse.next()
  }

  // Jika ini adalah laluan API atau statik, abaikan
  if (url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return NextResponse.next()
  }

  // Pengecualian: benarkan laluan global walaupun berada di subdomain
  if (url.pathname === '/daftar' || url.pathname === '/update' || url.pathname === '/ejen' || url.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL(url.pathname, request.url))
  }

  // Elakkan infinite rewrite loop jika pathname sudah bermula dengan /[subdomain]
  if (url.pathname.startsWith(`/${subdomain}`)) {
    return NextResponse.next()
  }

  // Jika ia subdomain khusus (cth: 'ali'), ubah (rewrite) ia ke folder dinamik /[tenant]
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, request.url))
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
