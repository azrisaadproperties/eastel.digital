'use server'

import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function submitCheckoutForm(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  const agentSubdomain = formData.get('agentSubdomain') as string
  const plan = formData.get('plan') as string
  
  if (!name || !phone || !address) {
    return { error: 'Sila lengkapkan semua butiran.' }
  }

  try {
    const content = await prisma.content.findFirst()
    const agent = await prisma.agent.findUnique({ where: { subdomain: agentSubdomain } })
    
    // 1. Simpan ke dalam pangkalan data
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        plan: plan || 'unknown',
        agentSubdomain,
        agentOfficialId: agent?.officialId || null
      }
    })

    // 2. Hantar Emel ke HQ (jika ada konfigurasi)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      })

      const mailOptions = {
        from: `"Sistem Eastel" <${process.env.EMAIL_USER}>`,
        to: 'azrisaadproperties@gmail.com',
        subject: `Tempahan Baru - Pakej ${plan.toUpperCase()} dari ${name}`,
        html: `
          <h2>Ada Tempahan Baru!</h2>
          <p><strong>Pakej:</strong> ${plan.toUpperCase()}</p>
          <p><strong>Nama Pelanggan:</strong> ${name}</p>
          <p><strong>No Telefon:</strong> ${phone}</p>
          <p><strong>Alamat:</strong> ${address}</p>
          <hr />
          <p><strong>Wakil Jualan (Ejen):</strong> ${agent?.name || agentSubdomain}</p>
          <p><strong>ID Ejen:</strong> ${agent?.officialId || 'Tiada ID'}</p>
          <p><strong>Tarikh:</strong> ${new Date().toLocaleString('ms-MY')}</p>
        `
      }

      transporter.sendMail(mailOptions).catch(err => console.error("Ralat emel:", err))
    }

    // 3. Hantar data ke webhook (Google Sheets / Make.com / Zapier) jika wujud
    if (content?.webhookUrl) {
      // Kita panggil webhook secara asynchronous dan tidak menyekat (non-blocking) respons kepada pengguna
      fetch(content.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          agentSubdomain: agentSubdomain,
          agentOfficialId: agent?.officialId || 'HQ/TIADA-ID',
          agentName: agent?.name,
          plan: plan,
          name,
          phone,
          address,
          date: new Date().toISOString()
        })
      }).catch(err => console.error("Ralat webhook:", err))
    }

    return { success: true }
  } catch (error) {
    console.error("Checkout error:", error)
    return { error: 'Gagal memproses pesanan. Sila cuba lagi.' }
  }
}
