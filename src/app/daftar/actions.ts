'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function registerAgent(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const officialId = formData.get('officialId') as string
  const referredBy = formData.get('referredBy') as string | null
  let subdomain = formData.get('subdomain') as string

  if (!name || !phone || !subdomain) {
    return { error: 'Sila isi semua ruangan yang diwajibkan (Nama, No. Telefon & Subdomain).' }
  }

  // Bersihkan subdomain (hanya huruf kecil dan nombor, tiada jarak atau simbol)
  subdomain = subdomain.toLowerCase().replace(/[^a-z0-9]/g, '')

  if (subdomain.length < 3) {
    return { error: 'Subdomain mestilah sekurang-kurangnya 3 huruf atau nombor.' }
  }

  // Semak jika larangan nama (reserved names)
  const reserved = ['admin', 'login', 'daftar', 'api', 'www', 'eastel', 'hq', 'ejen', 'checkout', 'update', 'status']
  if (reserved.includes(subdomain)) {
    return { error: 'Nama subdomain ini dikhaskan untuk sistem. Sila pilih nama yang lain.' }
  }

  try {
    // Semak jika subdomain sudah wujud
    const existing = await prisma.agent.findUnique({
      where: { subdomain },
      select: { id: true }
    })

    if (existing) {
      return { error: `Maaf, nama pautan "${subdomain}.eastel.digital" telah digunakan. Sila pilih nama lain.` }
    }

    // Cipta ejen baru dengan kolum referredBy yang sudah disokong 100% di Supabase
    await prisma.agent.create({
      data: {
        subdomain,
        name,
        phone,
        officialId: officialId || null,
        referredBy: referredBy || null,
        password: 'password123',
      }
    })

    // Revalidate paths for instant live updates
    revalidatePath('/admin')
    revalidatePath('/ejen')
    revalidatePath('/')

    return { success: true, subdomain }
  } catch (error: any) {
    console.error('Gagal mendaftar ejen:', error)
    return { error: `Gagal membuat pendaftaran: ${error?.message || 'Ralat pangkalan data'}` }
  }
}
