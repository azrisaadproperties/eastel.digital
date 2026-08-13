import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ tenant?: string }> | { tenant?: string },
  searchParams: Promise<{ plan?: string }> | { plan?: string }
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const tenant = resolvedParams?.tenant
  const plan = resolvedSearchParams?.plan

  if (!tenant) notFound()
  
  let agent = null
  try {
    agent = await prisma.agent.findFirst({
      where: { subdomain: { equals: tenant.toLowerCase(), mode: 'insensitive' } }
    })
  } catch (error) {
    console.error('Database query error:', error)
  }

  if (!agent) notFound()

  const content = await prisma.content.findFirst().catch(() => null)
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
