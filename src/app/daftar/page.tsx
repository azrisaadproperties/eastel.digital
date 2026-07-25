'use client'

import { useState } from 'react'
import { registerAgent } from './actions'

export default function DaftarEjen() {
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

  // Dalam persekitaran tempatan kita guna port dinamik
  // Bila publish sebenar (production), ini patut menggunakan URL sebenar seperti eastel.digital
  const rootDomain = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? window.location.host : 'eastel.digital'
  const protocol = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://' : 'https://'
  const generatedUrl = success ? `${protocol}${success}.${rootDomain}` : ''

  return (
    <main className="container animate-fade-in" style={{ maxWidth: '600px', padding: '2rem 1rem' }}>
      <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
        
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Pendaftaran Berjaya!</h2>
            <p style={{ marginBottom: '2rem' }}>Pautan rasmi Eastel Affiliate anda telah sedia untuk digunakan. Salin pautan di bawah dan kongsikan di media sosial anda sekarang.</p>
            
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '12px', wordBreak: 'break-all', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              {generatedUrl}
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl)
                alert('Pautan berjaya disalin! Anda boleh mula promote.')
              }}
            >
              Salin Pautan
            </button>
            <a href={generatedUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Lihat Laman Web Anda</a>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>Daftar Rakan Niaga Eastel</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Cipta pautan jualan perniagaan anda sendiri secara percuma dan automatik.</p>
            
            {error && (
              <div style={{ background: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #f87171' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nama Penuh / Nama Panggilan</label>
                <input type="text" name="name" required placeholder="Contoh: Muhammad Ali" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombor Telefon (WhatsApp)</label>
                <input type="tel" name="phone" required placeholder="Contoh: 60123456789" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ID Ejen Rasmi Eastel (Opsional)</label>
                <input type="text" name="officialId" placeholder="Contoh: E-ALI99 (Biar kosong jika belum ada)" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Anda boleh kemaskini kemudian jika anda belum terima simpack fizikal.</p>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Pilih Nama Pautan Anda</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    name="subdomain" 
                    required 
                    value={subdomainValue}
                    onChange={(e) => setSubdomainValue(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    placeholder="namaanda" 
                    style={{ flex: 1, minWidth: '150px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} 
                  />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>.eastel.digital</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hanya huruf dan nombor (tanpa jarak) dibenarkan. Unik dan pantas.</p>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, borderRadius: '16px' }}
              >
                {loading ? 'Sistem Sedang Memproses...' : 'Cipta Pautan Percuma Saya'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
