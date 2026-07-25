import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AgentPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params

  // 1. Dapatkan profil ejen berdasarkan subdomain
  const agent = await prisma.agent.findUnique({
    where: { subdomain: tenant },
  })

  // Jika tiada ejen dengan subdomain ini, kembalikan 404 (Not Found)
  if (!agent) {
    notFound()
  }

  // 2. Dapatkan kandungan global
  const content = await prisma.content.findFirst()

  return (
    <main className="container animate-fade-in" style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Banner Ejen */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', borderRadius: '24px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, var(--primary), #8b5cf6)',
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 auto 1rem auto',
          boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
        }}>
          {agent.name.charAt(0).toUpperCase()}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Wakil Sah Anda</p>
        <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{agent.name}</h2>
      </div>

      {/* Kandungan Jualan */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{content?.headline || 'Pakej Hebat'}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
          {content?.subheadline}
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          {content?.description}
        </p>
      </div>

      <div style={{ position: 'sticky', bottom: '1rem', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <a 
          href="/checkout" 
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            display: 'block', 
            fontSize: '1.2rem', 
            padding: '1.2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            textDecoration: 'none'
          }}
        >
          Tempah Pakej Sekarang
        </a>
        
        <a 
          href="/daftar" 
          className="btn"
          style={{ 
            width: '100%', 
            display: 'block', 
            fontSize: '1rem', 
            padding: '1rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--text-muted)',
            textAlign: 'center',
            textDecoration: 'none'
          }}
        >
          Berminat jana income? Daftar ejen di sini.
        </a>
      </div>

    </main>
  )
}
