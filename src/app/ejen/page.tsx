import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Direktori Eastelpreneur - Eastel Digital',
  description: 'Senarai penuh rakan niaga & subdomain rasmi Eastelpreneur di seluruh Malaysia.',
  alternates: {
    canonical: 'https://eastel.digital/ejen'
  }
}

export default async function EjenDirectoryPage() {
  const agents = await prisma.agent.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      subdomain: true,
      name: true,
      officialId: true,
      createdAt: true
    }
  })

  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span style={{ fontSize: '2rem' }}>⚡</span> Eastel
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              Laman Utama
            </Link>
            <Link href="/daftar" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', borderRadius: '8px' }}>
              Mula Ejen
            </Link>
          </div>
        </div>
      </nav>

      <main className="container animate-fade-in-up" style={{ padding: '4rem 1.5rem 8rem' }}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)', borderRadius: '99px', fontWeight: 700, marginBottom: '1.5rem', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
            🚀 Komuniti Rakan Niaga Rasmi
          </div>
          
          <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>
            Direktori <span className="text-gradient">Eastelpreneur</span>
          </h1>

          <p style={{ maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            Temui senarai rakan niaga berdaftar yang memiliki subdomain peribadi di bawah ekosistem Eastel Digital.
          </p>

          <div style={{ display: 'inline-flex', gap: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.2rem 2.5rem', borderRadius: '20px', boxShadow: 'var(--glass-shadow)' }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{agents.length}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.3rem' }}>Subdomain Berdaftar</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10B981', lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.3rem' }}>Pengesahan HQ</div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        {agents.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h3>Belum Ada Subdomain Berdaftar</h3>
            <p style={{ marginBottom: '2rem' }}>Jadilah orang pertama yang mendaftarkan subdomain Eastelpreneur anda hari ini!</p>
            <Link href="/daftar" className="btn btn-primary">Daftar Sekarang 🚀</Link>
          </div>
        ) : (
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {agents.map((agent) => {
              const fullSubdomain = `${agent.subdomain}.eastel.digital`
              const dateStr = new Date(agent.createdAt).toLocaleDateString('ms-MY', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })

              return (
                <div key={agent.id} className="glass-card" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem' }}>
                        {agent.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.3rem 0.7rem', borderRadius: '99px', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        🟢 ACTIVE
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>{agent.name}</h3>
                    
                    {agent.officialId && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                        ID Rasmi: <strong>{agent.officialId}</strong>
                      </div>
                    )}

                    <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '0.6rem 0.8rem', borderRadius: '10px', marginBottom: '1.2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pautan Subdomain:</div>
                      <code style={{ fontSize: '0.95rem', fontWeight: 700, color: '#3B82F6' }}>{fullSubdomain}</code>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Menyertai: {dateStr}
                    </div>

                    <a
                      href={`https://${fullSubdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ width: '100%', borderRadius: '10px', fontSize: '0.95rem', padding: '0.7rem 1rem' }}
                    >
                      Lawat Kedai Ejen 🔗
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Eastel Digital. Rangkaian Dikuasakan oleh U Mobile.</p>
        </div>
      </footer>
    </>
  )
}
