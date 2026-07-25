import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AgentPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params

  // 1. Dapatkan profil ejen berdasarkan subdomain
  const agent = await prisma.agent.findUnique({
    where: { subdomain: tenant },
  })

  if (!agent) {
    notFound()
  }

  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-3" style={{ opacity: 0.5 }}></div>

      <main>
        {/* Agent Exclusive Banner */}
        <div style={{ background: 'var(--gradient-5g)', padding: '0.5rem 1rem', textAlign: 'center', color: 'white', fontWeight: 600, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          Pembelian Melalui Wakil Sah: <span style={{ fontWeight: 900 }}>{agent.name.toUpperCase()}</span>
        </div>

        {/* Hero Section */}
        <section className="section container flex-col flex-center text-center animate-fade-in-up" style={{ minHeight: '60vh', padding: '6rem 1rem 4rem 1rem' }}>
          
          <div className="glass-card stagger-1" style={{ padding: '2rem', marginBottom: '3rem', maxWidth: '500px', width: '100%', border: '2px solid rgba(236, 72, 153, 0.3)' }}>
            <div style={{ 
              width: '100px', height: '100px', borderRadius: '50%', 
              background: 'var(--gradient-brand)', color: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem', fontWeight: 900, margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)'
            }}>
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <p style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Rakan Niaga Eastel</p>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{agent.name}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>"Saya sedia membantu anda mendaftar pelan Eastel 5G hari ini."</p>
          </div>
          
          <h2 className="mb-4 stagger-2">Pilih Pakej <span className="text-gradient-5g">5G Terpantas</span> Anda</h2>
          <p className="mb-8 stagger-3" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
            Nikmati kelajuan tanpa had dan kebebasan hotspot sebenar. Semua pendaftaran diuruskan secara rasmi oleh sistem HQ.
          </p>
        </section>

        {/* Packages Section (Duplicated from main but tracking agent) */}
        <section id="pakej" className="section container" style={{ paddingTop: '0' }}>
          <div className="grid-4 stagger-4">
            
            {/* EZ15 */}
            <div className="glass-card">
              <h3 style={{ color: 'var(--text-muted)' }}>EZ15</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>
                RM15 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 15 Hari</span>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>30GB Data</div>
              <ul className="check-list" style={{ listStyle: 'none', marginBottom: '2rem', minHeight: '150px' }}>
                <li><span className="check-icon">✓</span> Hotspot Penuh</li>
                <li><span className="check-icon">✓</span> Panggilan Tanpa Had</li>
              </ul>
              <Link href={`/checkout?plan=ez15&ref=${tenant}`} className="btn btn-secondary" style={{ width: '100%', borderRadius: '8px' }}>Beli EZ15</Link>
            </div>

            {/* EZ35 */}
            <div className="glass-card">
              <h3 style={{ color: 'var(--text-muted)' }}>EZ35</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>
                RM35 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ Bulan</span>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>200GB Data</div>
              <ul className="check-list" style={{ listStyle: 'none', marginBottom: '2rem', minHeight: '150px' }}>
                <li><span className="check-icon">✓</span> 100GB Hotspot</li>
                <li><span className="check-icon">✓</span> Panggilan Tanpa Had</li>
                <li><span className="check-icon">✓</span> Carry Forward</li>
              </ul>
              <Link href={`/checkout?plan=ez35&ref=${tenant}`} className="btn btn-secondary" style={{ width: '100%', borderRadius: '8px' }}>Beli EZ35</Link>
            </div>

            {/* EZ50 */}
            <div className="glass-card card-popular">
              <div className="card-badge">Pilihan Ramai</div>
              <h3 style={{ color: 'var(--primary)' }}>EZ50</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>
                RM50 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ Bulan</span>
              </div>
              <div style={{ background: 'var(--gradient-brand)', color: 'white', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>500GB Data 5G</div>
              <ul className="check-list" style={{ listStyle: 'none', marginBottom: '2rem', minHeight: '150px' }}>
                <li><span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span> Hotspot Penuh</li>
                <li><span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span> Panggilan Tanpa Had</li>
                <li><span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span> 3GB Roaming</li>
              </ul>
              <Link href={`/checkout?plan=ez50&ref=${tenant}`} className="btn btn-primary" style={{ width: '100%', borderRadius: '8px' }}>Beli EZ50</Link>
            </div>

            {/* EZ68 */}
            <div className="glass-card">
              <h3 style={{ color: 'var(--text-muted)' }}>EZ68</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1 }}>
                RM68 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ Bulan</span>
              </div>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>700GB Data 5G</div>
              <ul className="check-list" style={{ listStyle: 'none', marginBottom: '2rem', minHeight: '150px' }}>
                <li><span className="check-icon" style={{ color: '#8B5CF6' }}>✓</span> Hotspot Penuh</li>
                <li><span className="check-icon" style={{ color: '#8B5CF6' }}>✓</span> Panggilan Tanpa Had</li>
                <li><span className="check-icon" style={{ color: '#8B5CF6' }}>✓</span> 5GB Roaming</li>
              </ul>
              <Link href={`/checkout?plan=ez68&ref=${tenant}`} className="btn btn-secondary" style={{ width: '100%', borderRadius: '8px' }}>Beli EZ68</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer mt-8">
          <div className="container">
            <div className="flex-center flex-col">
              <Link href="/daftar" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem' }}>
                Berminat jana income seperti {agent.name}? Daftar Ejen Di Sini
              </Link>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Eastel Digital. Rangkaian Dikuasakan oleh U Mobile.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
