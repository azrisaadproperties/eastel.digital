'use server'

import { prisma } from '@/lib/prisma'

export async function updateAgentId(formData: FormData) {
  const subdomain = formData.get('subdomain') as string
  const phone = formData.get('phone') as string
  const officialId = formData.get('officialId') as string

  if (!subdomain || !phone || !officialId) {
    return { error: 'Sila isi semua ruangan.' }
  }

  try {
    const agent = await prisma.agent.findUnique({
      where: { subdomain }
    })

    if (!agent) {
      return { error: 'Subdomain tidak dijumpai dalam rekod kami.' }
    }

    if (agent.phone !== phone) {
      return { error: 'Pengesahan gagal: Nombor telefon tidak padan dengan pendaftaran asal.' }
    }

    await prisma.agent.update({
      where: { subdomain },
      data: { officialId }
    })

    return { success: true }
  } catch (error) {
    return { error: 'Berlaku ralat semasa mengemaskini data.' }
  }
}
