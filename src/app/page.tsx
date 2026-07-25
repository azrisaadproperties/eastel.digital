import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span style={{ fontSize: '1.8rem' }}>⚡</span> Eastel Digital
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/checkout" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Beli Simpack
            </Link>
            <Link href="/daftar" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Daftar Ejen
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="section container flex-col flex-center animate-fade-in-up text-center" style={{ minHeight: '80vh' }}>
          <div className="stagger-1" style={{ display: 'inline-block', padding: '0.5rem 1.25rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '99px', fontWeight: 600, marginBottom: '2rem' }}>
            🚀 Rangkaian Terpantas Pilihan Ramai
          </div>
          <h1 className="mb-6 stagger-2">
            Internet <span className="text-gradient">Tanpa Had.</span><br />
            Peluang <span className="text-gradient">Tanpa Batas.</span>
          </h1>
          <p className="mb-8 stagger-3" style={{ maxWidth: '650px', fontSize: '1.25rem' }}>
            Sama ada anda perlukan kelajuan internet maksimum tanpa kuota tersembunyi, atau ingin membina pendapatan pasif setiap bulan. Kami ada penyelesaiannya untuk anda.
          </p>
          
          <div className="stagger-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="#pakej" className="btn btn-primary">
              Lihat Pakej Internet 🛒
            </Link>
            <Link href="#ejen" className="btn btn-secondary">
              Macam Mana Nak Buat Duit? 💸
            </Link>
          </div>
        </section>

        {/* Simpack Packages Section */}
        <section id="pakej" className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="text-center mb-12" style={{ marginBottom: '4rem' }}>
              <h2>Pakej Simpack <span className="text-gradient">Jimat Berbaloi</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>Tiada kontrak mengarut. Kelajuan penuh 5G/4G tanpa sekatan hotspot. Pilih pelan yang sesuai untuk anda sekarang.</p>
            </div>

            <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {/* Package 1 */}
              <div className="glass-card">
                <div className="icon-box">📱</div>
                <h3>Pelan Basic 35</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  RM35 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ bulan</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>✅ Data Unlimited (3 Mbps)</li>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>✅ Unlimited Calls (Semua Rangkaian)</li>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>✅ 3GB Hotspot</li>
                </ul>
                <Link href="/checkout" className="btn btn-secondary" style={{ width: '100%' }}>Beli Sekarang</Link>
              </div>

              {/* Package 2 */}
              <div className="glass-card card-popular" style={{ border: '2px solid var(--primary)' }}>
                <div className="icon-box" style={{ background: 'var(--primary)', color: 'white' }}>🚀</div>
                <h3>Pelan Pro 50</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  RM50 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ bulan</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>🔥 Data Unlimited (Kelajuan Tanpa Had)</li>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>✅ Unlimited Calls (Semua Rangkaian)</li>
                  <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>✅ 10GB Hotspot</li>
                </ul>
                <Link href="/checkout" className="btn btn-success" style={{ width: '100%' }}>Pilih Paling Laris</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Promotion Section */}
        <section id="ejen" className="section container">
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(139, 92, 246, 0.1))', padding: '4rem 2rem', textAlign: 'center' }}>
            <h2 className="mb-4">Tidur Pun Duit Masuk? 💸</h2>
            <p className="mb-8" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              Jadilah **Rakan Niaga** Eastel Digital hari ini. Anda akan dapat *subdomain* peribadi (contoh: `ali.eastel.digital`). Hanya kongsikan link tersebut di TikTok/WhatsApp. Setiap kali orang beli simpack melalui link anda, komisyen terus masuk ke poket anda secara automatik!
            </p>

            <div className="grid-3 mb-8 text-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>1️⃣</div>
                <h4>Daftar Subdomain</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Pilih nama kedai online anda.</p>
              </div>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>2️⃣</div>
                <h4>Share & Promosi</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Post di media sosial atau grup WhatsApp.</p>
              </div>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>3️⃣</div>
                <h4>Terima Komisyen</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Sistem auto-tracking, komisyen masuk.</p>
              </div>
            </div>

            <Link href="/daftar" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem' }}>
              Daftar Sebagai Ejen Sekarang
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer container">
        <div className="footer-links">
          <Link href="/update">Ejen: Kemaskini ID</Link>
          <Link href="/admin">Admin Portal</Link>
          <a href="#">Terma & Syarat</a>
          <a href="#">Hubungi Kami</a>
        </div>
        <p style={{ fontSize: '0.9rem' }}>© {new Date().getFullYear()} Eastel Digital HQ. Hakcipta Terpelihara.</p>
      </footer>
    </>
  )
}
