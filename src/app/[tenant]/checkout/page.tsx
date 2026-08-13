import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CheckoutClient from './CheckoutClient'

interface PageProps {
  params: Promise<{ tenant: string }>
  searchParams: Promise<{ plan?: string }>
}

export default async function CheckoutPage(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams

  const tenant = params?.tenant?.toLowerCase()
  const plan = searchParams?.plan

  if (!tenant) notFound()
  
  let agent = null
  try {
    agent = await prisma.agent.findUnique({
      where: { subdomain: tenant },
      select: {
        id: true,
        subdomain: true,
        name: true,
        phone: true,
        officialId: true
      }
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
