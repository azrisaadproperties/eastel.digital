import Link from 'next/link'
import { PLANS } from '@/lib/plans'
import { prisma } from '@/lib/prisma'
import SubdomainToast from '@/components/SubdomainToast'
import PromoHeaderBar from '@/components/PromoHeaderBar'
import FaqSection from '@/components/FaqSection'

export default async function Home() {
  // Query 10 latest registered agents for live notification toast
  const recentAgents = await prisma.agent.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      subdomain: true,
      name: true,
      createdAt: true
    }
  })

  const agentCount = await prisma.agent.count()

  // Format dates as strings for Client Component
  const toastAgents = recentAgents.map(a => ({
    subdomain: a.subdomain,
    name: a.name,
    createdAt: a.createdAt.toISOString()
  }))

  return (
    <>
      {/* Top Announcement Bar for Urgency */}
      <PromoHeaderBar />

      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      {/* Floating Subdomain Toast Notification */}
      <SubdomainToast agents={toastAgents} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span style={{ fontSize: '2rem' }}>⚡</span> Eastel
          </Link>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/ejen" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              👥 Direktori Ejen ({agentCount})
            </Link>
            <Link href="#pakej" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              Beli Simpack
            </Link>
            <Link href="/daftar" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              Eastelpreneur
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="section container flex-col flex-center text-center animate-fade-in-up" style={{ minHeight: '85vh' }}>
          <div className="stagger-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', borderRadius: '99px', fontWeight: 700, marginBottom: '2rem', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
            <span style={{ width: '8px', height: '8px', background: '#EC4899', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #EC4899' }}></span>
            Dikuasakan oleh U Mobile 5G & 4G
          </div>
          
          <h1 className="mb-6 stagger-2" style={{ maxWidth: '900px' }}>
            Revolusi 5G Terpantas.<br />
            Peluang <span className="text-gradient-5g">Pendapatan Tanpa Batas.</span>
          </h1>
          
          <p className="mb-8 stagger-3" style={{ maxWidth: '650px', fontSize: '1.25rem' }}>
            Miliki data gergasi sehingga 700GB dengan kelajuan 5G sebenar. Sertai komuniti Eastelpreneur hari ini dan jana pendapatan pasif berterusan dari setiap pendaftaran ejen anda.
          </p>
          
          <div className="stagger-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="#pakej" className="btn btn-5g">
              Lihat Pelan EZ Series
            </Link>
            <Link href="/ejen" className="btn btn-secondary">
              👥 Lihat {agentCount} Ejen Berdaftar
            </Link>
          </div>
        </section>

        {/* Simpack Packages Section (EZ Series) */}
        <section id="pakej" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="text-center mb-12" style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem' }}>Pilihan Pelan <span className="text-gradient">EZ Series</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>Nikmati data gergasi, panggilan tanpa had, dan sokongan hotspot sebenar. Pilih pelan yang padan dengan gaya hidup digital anda.</p>
            </div>

            <div className="grid-4">
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
                  <Link href={`/checkout?plan=${plan.id}`} className={plan.btnClass} style={{ width: '100%', borderRadius: '8px' }}>
                    {plan.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eastelpreneur (Referral) Section */}
        <section id="ejen" className="section container">
          <div className="text-center mb-12">
            <h2>Jana Pendapatan Pasif Sebagai <span className="text-gradient">Eastelpreneur</span></h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              Guna sendiri jimat, kongsikan kepada orang lain dapat duit. Ekosistem Eastel membolehkan anda menjana komisyen lumayan terus ke dalam Eastel Wallet anda.
            </p>
          </div>

          <div className="grid-3" style={{ margin: '4rem 0' }}>
            {/* Step 1 */}
            <div className="step-card step-connector">
              <div className="step-number">1</div>
              <h3 style={{ fontSize: '1.4rem' }}>Guna & Daftar</h3>
              <p style={{ fontSize: '1rem' }}>Miliki mana-apa simpack Eastel, dan daftarkan subdomain peribadi anda (contoh: <code>nama.eastel.digital</code>) di sistem kami.</p>
            </div>

            {/* Step 2 */}
            <div className="step-card step-connector">
              <div className="step-number" style={{ background: 'var(--gradient-5g)' }}>2</div>
              <h3 style={{ fontSize: '1.4rem' }}>Kongsi Link</h3>
              <p style={{ fontSize: '1rem' }}>Sebarkan link promosi anda di TikTok, WhatsApp, atau Facebook. Sistem kami akan uruskan proses jualan sepenuhnya.</p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number" style={{ background: 'var(--secondary)' }}>3</div>
              <h3 style={{ fontSize: '1.4rem' }}>Jana Komisyen</h3>
              <p style={{ fontSize: '1rem' }}>Setiap langganan simpack yang berjaya melalui link anda, komisyen akan direkod dan dimasukkan terus ke eWallet anda!</p>
            </div>
          </div>

          <div className="flex-center mt-8" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/daftar" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem', borderRadius: '12px' }}>
              Mula Sebagai Eastelpreneur Sekarang 🚀
            </Link>
            <Link href="/ejen" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              👥 Lihat Direktori Subdomain ({agentCount})
            </Link>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <Link href="/ejen">Direktori Ejen ({agentCount})</Link>
            <Link href="/update">Kemaskini Profil Ejen</Link>
            <Link href="/admin">Admin Portal</Link>
            <a href="#">Terma & Syarat</a>
            <a href="#">Polisi Privasi</a>
            <a href="#">Hubungi Sokongan</a>
          </div>
          <p style={{ fontSize: '0.9rem' }}>© {new Date().getFullYear()} Eastel Digital. Rangkaian Dikuasakan oleh U Mobile.</p>
        </div>
      </footer>
    </>
  )
}
