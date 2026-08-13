'use server'

import { prisma } from '@/lib/prisma'

export async function registerAgent(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const officialId = formData.get('officialId') as string
  const referredBy = formData.get('referredBy') as string | null
  let subdomain = formData.get('subdomain') as string

  if (!name || !phone || !subdomain) {
    return { error: 'Sila isi semua ruangan yang diwajibkan.' }
  }

  // Bersihkan subdomain (hanya huruf kecil dan nombor, tiada jarak atau simbol)
  subdomain = subdomain.toLowerCase().replace(/[^a-z0-9]/g, '')

  if (subdomain.length < 3) {
    return { error: 'Subdomain mestilah sekurang-kurangnya 3 huruf.' }
  }

  // Semak jika larangan nama (reserved names)
  const reserved = ['admin', 'login', 'daftar', 'api', 'www', 'eastel', 'hq', 'ejen']
  if (reserved.includes(subdomain)) {
    return { error: 'Nama subdomain ini tidak dibenarkan. Sila pilih yang lain.' }
  }

  try {
    // Semak jika subdomain sudah wujud
    const existing = await prisma.agent.findUnique({
      where: { subdomain }
    })

    if (existing) {
      return { error: 'Maaf, nama pautan ini telah digunakan oleh ejen lain. Sila cuba nama lain.' }
    }

    // Cipta ejen baru
    await prisma.agent.create({
      data: {
        subdomain,
        name,
        phone,
        officialId,
        referredBy: referredBy || null,
        password: 'password123',
      }
    })

    return { success: true, subdomain }
  } catch (error) {
    return { error: 'Berlaku ralat sistem. Sila cuba lagi sebentar lagi.' }
  }
}
