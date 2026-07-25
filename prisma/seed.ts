import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.content.deleteMany()
  await prisma.agent.deleteMany() 

  const ali = await prisma.agent.create({
    data: { subdomain: 'ali', name: 'Ali Bin Abu', phone: '60123456789', officialId: 'E-ALI123', password: 'password123' },
  })

  const siti = await prisma.agent.create({
    data: { subdomain: 'siti', name: 'Siti Nurhaliza', phone: '60198765432', officialId: 'E-SITI999', password: 'password123' },
  })

  await prisma.content.create({
    data: {
      headline: 'Sertai Pasukan Eastel Hari Ini!',
      subheadline: 'Buat tempahan pakej simpack anda sekarang dan mula menjana pendapatan pasif.',
      description: 'Pakej Pendaftaran Eksklusif: Simpack VIP. Sila buat pembayaran secara pemindahan bank (transfer) ke akaun di bawah, dan isi borang untuk penghantaran.',
      paymentDetails: 'Maybank\n162200112233\nEASTEL DIGITAL SDN BHD',
      webhookUrl: 'https://eoek7h0g3j1u4t.m.pipedream.net', // Contoh URL webhook ujian
    }
  })

  console.log('Seed manual payment selesai:', { ejen1: ali.subdomain, ejen2: siti.subdomain })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
