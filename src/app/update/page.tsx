'use client'

import { useState } from 'react'
import { updateAgentId } from './actions'
import Link from 'next/link'

export default function UpdateIdPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const res = await updateAgentId(formData)
    
    if (res?.error) setError(res.error)
    if (res?.success) setSuccess(true)
    
    setLoading(false)
  }

  return (
    <main className="container animate-fade-in" style={{ maxWidth: '500px', padding: '2rem 1rem', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
        {success ? (
           <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
             <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>ID Berjaya Disimpan!</h2>
             <p style={{ marginBottom: '2rem' }}>Sistem kini telah merekodkan ID Rasmi anda. Semua pesanan baharu melalui pautan anda (subdomain) kini akan disertakan dengan ID ini secara automatik.</p>
             <Link href="/" className="btn btn-primary" style={{ display: 'block', width: '100%', padding: '1rem', borderRadius: '12px' }}>
               Kembali ke Laman Utama
             </Link>
           </div>
        ) : (
          <>
            <h1 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.5rem' }}>Kemaskini ID Rasmi</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Masukkan ID Referral dari App Eastel anda supaya HQ tahu siapa penjualnya.</p>
            
            {error && (
              <div style={{ background: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #f87171' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subdomain Anda</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="text" name="subdomain" required placeholder="Contoh: ali" style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>.eastel.digital</span>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombor Telefon (Untuk Pengesahan)</label>
                <input type="tel" name="phone" required placeholder="Contoh: 60123456789" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Mesti sama dengan nombor telefon semasa anda daftar.</p>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ID Ejen Rasmi Baru</label>
                <input type="text" name="officialId" required placeholder="Contoh: E-ALI123" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, borderRadius: '16px' }}
              >
                {loading ? 'Menyimpan...' : 'Kemaskini ID Saya'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
