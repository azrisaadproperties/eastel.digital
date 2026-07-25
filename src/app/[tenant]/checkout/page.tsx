import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params
  
  const agent = await prisma.agent.findUnique({
    where: { subdomain: tenant }
  })

  if (!agent) notFound()

  const content = await prisma.content.findFirst()
  const paymentDetails = content?.paymentDetails || 'Sila hubungi ejen untuk maklumat pembayaran.'

  return (
    <main className="container animate-fade-in" style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <CheckoutClient 
        agentSubdomain={agent.subdomain}
        agentName={agent.name}
        agentPhone={agent.phone}
        paymentDetails={paymentDetails} 
      />
    </main>
  )
}
