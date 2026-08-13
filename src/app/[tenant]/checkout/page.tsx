import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ tenant: string }>,
  searchParams: Promise<{ plan?: string }>
}) {
  const { tenant } = await params
  const { plan } = await searchParams
  
  const agent = await prisma.agent.findFirst({
    where: { subdomain: { equals: tenant, mode: 'insensitive' } }
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
        plan={plan || 'unknown'} 
      />
    </main>
  )
}
