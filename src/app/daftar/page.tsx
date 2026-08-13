'use client'

import { useState, Suspense } from 'react'
import { registerAgent } from './actions'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function DaftarFormContent() {
  const searchParams = useSearchParams()
  const referredBy = searchParams.get('ref') || ''

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [subdomainValue, setSubdomainValue] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const res = await registerAgent(formData)
    
    if (res?.error) {
      setError(res.error)
    } else if (res?.success) {
      setSuccess(res.subdomain || '')
    }
    setLoading(false)
  }

  const rootDomain = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? window.location.host : 'eastel.digital'
  const protocol = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://' : 'https://'
  const generatedUrl = success ? `${protocol}${success}.${rootDomain}` : ''

  return (
    <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '3rem' }}>
      {success ? (
        <div className="text-center animate-fade-in-up">
          <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🎉</div>
          <h2 className="mb-4">Tahniah Eastelpreneur!</h2>
          <p className="mb-8" style={{ fontSize: '1.1rem' }}>
            Kedai maya anda telah berjaya dicipta! Salin pautan rasmi di bawah dan kongsikan di TikTok, WhatsApp, atau mana-mana platform untuk mula menjana pendapatan pasif.
          </p>
          
          <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--primary)', padding: '1.5rem', borderRadius: '16px', wordBreak: 'break-all', fontWeight: '900', fontSize: '1.4rem', marginBottom: '2rem', color: 'var(--primary)' }}>
            {generatedUrl}
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '1.5rem', padding: '1.25rem', fontSize: '1.2rem' }}
            onClick={() => {
              navigator.clipboard.writeText(generatedUrl)
              alert('Pautan berjaya disalin! Sebarkan sekarang.')
            }}
          >
            Salin Pautan Kedai Saya
          </button>
          <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
            Buka Kedai Saya Sekarang
          </a>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div style={{ display: 'inline-block', background: 'var(--gradient-5g)', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>
              Pendaftaran Percuma
            </div>

            {referredBy && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.6rem 1rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                🤝 Rujukan Ejen Upline: <strong>{referredBy}.eastel.digital</strong>
              </div>
            )}

            <h2>Bina <span className="text-gradient">Subdomain</span> Anda</h2>
            <p>Jadilah Eastelpreneur hari ini. Cipta link jualan unik anda secara automatik dalam masa 10 saat.</p>
          </div>
          
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 600, textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '1.5rem' }}>
            <input type="hidden" name="referredBy" value={referredBy} />

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>Nama Penuh / Gelaran</label>
              <input type="text" name="name" required placeholder="Contoh: Muhammad Ali" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '1.1rem', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>Nombor Telefon (WhatsApp)</label>
              <input type="tel" name="phone" required placeholder="Contoh: 60123456789" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '1.1rem', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>ID Ejen Rasmi Eastel (Jika Ada)</label>
              <input type="text" name="officialId" placeholder="Contoh: E-ALI99 (Boleh biar kosong)" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '1.1rem', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
            </div>

            <div style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>Pilih Nama Pautan Anda (Subdomain)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  name="subdomain" 
                  required 
                  value={subdomainValue}
                  onChange={(e) => setSubdomainValue(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  placeholder="namaanda" 
                  style={{ flex: 1, minWidth: '150px', padding: '1.2rem', borderRadius: '12px', border: '2px solid var(--primary)', fontSize: '1.2rem', fontWeight: 700, background: 'var(--bg-secondary)', color: 'var(--text-main)', outline: 'none' }} 
                />
                <span style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '1.2rem' }}>.eastel.digital</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>* Huruf dan nombor sahaja. Jadikan ia unik dan senang diingati.</p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary mt-8" 
              disabled={loading}
              style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sistem Sedang Membina Pautan...' : 'Cipta Subdomain Saya Sekarang'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function DaftarEjen() {
  return (
    <>
      <div className="bg-blob blob-2" style={{ background: 'rgba(59, 130, 246, 0.2)' }}></div>
      
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span style={{ fontSize: '2rem' }}>⚡</span> Eastel
          </Link>
          <Link href="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Kembali
          </Link>
        </div>
      </nav>

      <main className="container flex-center animate-fade-in-up" style={{ minHeight: '90vh', padding: '4rem 1rem' }}>
        <Suspense fallback={<div style={{ padding: '3rem', color: 'white' }}>Memuatkan borang...</div>}>
          <DaftarFormContent />
        </Suspense>
      </main>
    </>
  )
}
