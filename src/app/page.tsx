import Link from 'next/link'

export default function Home() {
  return (
    <main className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
      
      <div style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)', padding: '1.5rem', borderRadius: '24px', color: 'white', marginBottom: '2rem', display: 'inline-block' }}>
        <h1 style={{ color: 'white', background: 'none', WebkitTextFillColor: 'initial', fontSize: '2.5rem', margin: 0 }}>Eastel Digital HQ</h1>
      </div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Satu Rangkaian, Pelbagai Peluang.</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        Sama ada anda ingin merasai kelajuan internet tanpa batas, atau menjana pendapatan pasif tanpa henti, kami ada penyelesaiannya.
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', width: '100%', maxWidth: '900px' }}>
        
        {/* Pilihan 1: Beli Simpack */}
        <div className="glass" style={{ flex: '1 1 300px', padding: '2.5rem 2rem', borderRadius: '24px', border: '2px solid rgba(59, 130, 246, 0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Beli Pakej Simpack</h3>
          <p style={{ marginBottom: '2rem', flex: 1, color: 'var(--text-muted)' }}>Miliki rangkaian terpantas dengan pelan tanpa had yang jimat dan berbaloi. Tempah terus dari Ibu Pejabat kami sekarang.</p>
          <Link href="/checkout" className="btn btn-primary" style={{ display: 'block', width: '100%', padding: '1rem', fontSize: '1.1rem', background: '#2563eb' }}>
            Beli Simpack Sekarang
          </Link>
        </div>

        {/* Pilihan 2: Daftar Ejen */}
        <div className="glass" style={{ flex: '1 1 300px', padding: '2.5rem 2rem', borderRadius: '24px', border: '2px solid rgba(139, 92, 246, 0.3)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💸</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Jana Income Pasif</h3>
          <p style={{ marginBottom: '2rem', flex: 1, color: 'var(--text-muted)' }}>Jadilah Rakan Niaga kami. Anda hanya sebarkan pautan unik anda di TikTok, dan biarkan sistem kami yang uruskan borang jualan.</p>
          <Link href="/daftar" className="btn btn-primary" style={{ display: 'block', width: '100%', padding: '1rem', fontSize: '1.1rem', background: '#8b5cf6', borderColor: '#8b5cf6' }}>
            Daftar Subdomain Ejen
          </Link>
        </div>

      </div>

      <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', gap: '1.5rem' }}>
        <Link href="/update" style={{ textDecoration: 'none', color: 'inherit' }}>Ejen Sedia Ada? Kemaskini ID Sini</Link>
        <span>|</span>
        <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin Login</Link>
      </div>
    </main>
  )
}
