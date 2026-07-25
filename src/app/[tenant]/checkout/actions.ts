'use server'

import { prisma } from '@/lib/prisma'

export async function submitCheckoutForm(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  const agentSubdomain = formData.get('agentSubdomain') as string
  
  if (!name || !phone || !address) {
    return { error: 'Sila lengkapkan semua butiran.' }
  }

  try {
    const content = await prisma.content.findFirst()
    const agent = await prisma.agent.findUnique({ where: { subdomain: agentSubdomain } })
    
    // Hantar data ke webhook (Google Sheets / Make.com / Zapier) jika wujud
    if (content?.webhookUrl) {
      // Kita panggil webhook secara asynchronous dan tidak menyekat (non-blocking) respons kepada pengguna
      fetch(content.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentSubdomain: agentSubdomain,
          agentOfficialId: agent?.officialId || 'HQ/TIADA-ID',
          name,
          phone,
          address,
          date: new Date().toISOString()
        })
      }).catch(err => console.error("Ralat webhook:", err))
    }

    return { success: true }
  } catch (error) {
    return { error: 'Gagal memproses pesanan. Sila cuba lagi.' }
  }
}
