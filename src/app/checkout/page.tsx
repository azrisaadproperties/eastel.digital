import { prisma } from '@/lib/prisma'
import CheckoutClient from '@/app/[tenant]/checkout/CheckoutClient'

export default async function HQCheckoutPage({ 
  searchParams
}: { 
  searchParams: Promise<{ plan?: string }>
}) {
  const { plan } = await searchParams
  const content = await prisma.content.findFirst()
  const paymentDetails = content?.paymentDetails || 'Sila hubungi HQ untuk maklumat pembayaran.'

  return (
    <main className="container animate-fade-in" style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--primary)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>🛍️ Anda sedang menempah terus dari Ibu Pejabat (HQ)</p>
      </div>
      <CheckoutClient 
        agentSubdomain="hq_pusat"
        agentName="HQ Eastel Digital"
        agentPhone="60199999999" 
        paymentDetails={paymentDetails}
        plan={plan || 'unknown'} 
      />
    </main>
  )
}
