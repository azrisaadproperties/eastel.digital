import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl

  // Dapatkan hostname (contoh: 'ali.localhost:3000' atau 'eastel.digital')
  let hostname = request.headers.get('host') || ''

  // Untuk pembangunan tempatan, buang port (:3000)
  hostname = hostname.replace(/:\d+$/, '')

  // Tentukan root domain
  // Dalam production, ini akan menjadi 'eastel.digital'
  const rootDomain = process.env.NODE_ENV === 'production' ? 'eastel.digital' : 'localhost'

  // Cari subdomain
  // Jika hostname adalah ali.localhost, subdomain = 'ali'
  // Jika hostname adalah localhost, subdomain = 'localhost' (tiada subdomain sebenar)
  let subdomain = hostname.replace(`.${rootDomain}`, '')

  // Jika tiada subdomain (hanya root domain), benarkan laluan biasa (NextResponse.next)
  if (subdomain === rootDomain) {
    return NextResponse.next()
  }

  // Jika ini adalah laluan API atau statik, abaikan
  if (url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return NextResponse.next()
  }

  // Pengecualian: benarkan laluan global walaupun berada di subdomain
  if (url.pathname === '/daftar' || url.pathname === '/update' || url.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL(url.pathname, request.url))
  }

  // Jika ia subdomain khusus (cth: 'ali'), ubah (rewrite) ia ke folder dinamik /[tenant]`
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, request.url))
}

export const config = {
  matcher: [
    // Jalankan middleware ini pada setiap path kecuali fail statik dan API
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
