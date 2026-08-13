import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'
import { PLANS } from '@/lib/plans'
import PromoHeaderBar from '@/components/PromoHeaderBar'
import FaqSection from '@/components/FaqSection'

export const metadata: Metadata = {
  title: 'Kedai Rakan Niaga Rasmi - Eastel Digital',
  description: 'Daftar pakej 5G terpantas Eastel Digital hari ini.',
  alternates: { canonical: 'https://eastel.digital' }
}

interface PageProps {
  params: Promise<{ tenant: string }>
}

export default async function AgentPage(props: PageProps) {
  try {
    const params = await props.params
    const tenant = params?.tenant?.toLowerCase() || ''

    let agent: { id: string; subdomain: string; name: string; phone: string | null; officialId: string | null } | null = null

    if (tenant) {
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
    }

    if (!agent) {
      return (
        <main className="container flex-center text-center" style={{ minHeight: '80vh', padding: '4rem 1rem' }}>
          <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏪</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Kedai Tidak Ditemui</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Maaf, kedai rakan niaga <strong>{tenant || 'subdomain'}.eastel.digital</strong> tidak wujud atau telah dipadam.
            </p>
            <Link href="https://eastel.digital" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Kembali Ke Laman Utama Eastel
            </Link>
          </div>
        </main>
      )
    }

    return (
      <>
        {/* Promo Announcement Bar */}
        <PromoHeaderBar />

        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-3" style={{ opacity: 0.5 }}></div>

        <main>
          {/* Agent Exclusive Banner */}
          <div style={{ background: 'var(--gradient-5g)', padding: '0.5rem 1rem', textAlign: 'center', color: 'white', fontWeight: 600, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            Pembelian Melalui Wakil Sah: <span style={{ fontWeight: 900 }}>{(agent.name || '').toUpperCase()} {agent.officialId ? `(${agent.officialId})` : ''}</span>
          </div>

          {/* Hero Section */}
          <section className="section container flex-col flex-center text-center animate-fade-in-up" style={{ minHeight: '50vh', padding: '4rem 1rem 2rem 1rem' }}>
            <div className="glass-card stagger-1" style={{ padding: '2rem', marginBottom: '2rem', maxWidth: '500px', width: '100%', border: '2px solid rgba(236, 72, 153, 0.3)' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', 
                background: 'var(--gradient-brand)', color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontWeight: 900, margin: '0 auto 1rem auto',
                boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)'
              }}>
                {(agent.name || 'E').charAt(0).toUpperCase()}
              </div>
              <p style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Rakan Niaga Eastel</p>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{agent.name}</h1>
              {agent.officialId && (
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                  ID: {agent.officialId}
                </div>
              )}
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>"Saya sedia membantu anda mendaftar pelan Eastel 5G hari ini."</p>
            </div>

            <h2 className="mb-4 stagger-2">Pilih Pakej <span className="text-gradient-5g">5G Terpantas</span> Anda</h2>
            <p className="mb-8 stagger-3" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Nikmati kelajuan tanpa had dan kebebasan hotspot sebenar. Semua pendaftaran diuruskan secara rasmi oleh sistem HQ.
            </p>
          </section>

          {/* Packages Section */}
          <section id="pakej" className="section container" style={{ paddingTop: '0' }}>
            <div className="grid-4 stagger-4">
              {PLANS.map((plan) => (
                <div key={plan.id} className={`glass-card ${plan.isPopular ? 'card-popular' : ''}`}>
                  {plan.badge && <div className="card-badge">{plan.badge}</div>}
                  <h3 style={{ color: plan.color }}>{plan.name}</h3>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>
                    {plan.price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{plan.period}</span>
                  </div>
                  <div style={{ 
                    background: plan.isPopular ? 'var(--gradient-brand)' : 'rgba(59, 130, 246, 0.1)', 
                    color: plan.isPopular ? 'white' : plan.color, 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    textAlign: 'center', 
                    fontWeight: 700, 
                    marginBottom: '1.5rem' 
                  }}>
                    {plan.dataQuota}
                  </div>
                  <ul className="check-list" style={{ listStyle: 'none', marginBottom: '2rem', minHeight: '150px' }}>
                    {plan.features.map((feat, i) => (
                      <li key={i}>
                        <span className="check-icon" style={{ color: plan.color }}>✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/checkout?plan=${plan.id}&ref=${agent.subdomain}`} className={plan.btnClass} style={{ width: '100%', borderRadius: '8px' }}>
                    {plan.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <FaqSection />

          {/* Footer */}
          <footer className="footer mt-8">
            <div className="container">
              <div className="flex-center flex-col">
                <Link href={`/daftar?ref=${agent.subdomain}`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem' }}>
                  Berminat jana income seperti {agent.name}? Daftar Ejen Di Sini
                </Link>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Eastel Digital. Rangkaian Dikuasakan oleh U Mobile.</p>
              </div>
            </div>
          </footer>
        </main>
      </>
    )
  } catch (error) {
    console.error('AgentPage render error:', error)
    return (
      <main className="container flex-center text-center" style={{ minHeight: '80vh', padding: '4rem 1rem' }}>
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Eastel Digital</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Sila muat semula laman ini untuk meneruskan.
          </p>
          <Link href="https://eastel.digital" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            Ke Laman Utama
          </Link>
        </div>
      </main>
    )
  }
}
