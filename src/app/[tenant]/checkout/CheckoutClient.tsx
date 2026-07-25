'use client'

import { useState } from 'react'
import { submitCheckoutForm } from './actions'

export default function CheckoutClient({ 
  agentSubdomain, 
  agentName,
  agentPhone,
  paymentDetails 
}: { 
  agentSubdomain: string, 
  agentName: string,
  agentPhone: string | null,
  paymentDetails: string 
}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    formData.append('agentSubdomain', agentSubdomain)
    
    const res = await submitCheckoutForm(formData)
    
    if (res?.error) setError(res.error)
    if (res?.success) setSuccess(true)
      
    setLoading(false)
  }

  if (success) {
    return (
      <div className="glass animate-fade-in" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Pesanan Berjaya Direkod!</h2>
        <p style={{ marginBottom: '2rem' }}>Butiran anda telah disimpan dalam sistem kami. Sila pastikan anda telah membuat pembayaran dan simpan resit transaksi anda.</p>
        
        <div style={{ background: 'rgba(255, 200, 0, 0.1)', border: '1px solid orange', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <p style={{ fontWeight: 'bold', color: 'orange', marginBottom: '0.5rem' }}>Peringatan Penting</p>
          <p style={{ fontSize: '0.9rem' }}>Sila hantar gambar resit pembayaran kepada wakil sah anda untuk proses pengaktifan.</p>
        </div>
        
        <a 
          href={`https://wa.me/${agentPhone}?text=Hai%20${agentName},%20saya%20baru%20sahaja%20membuat%20pembayaran%20untuk%20pesanan%20Eastel.%20Ini%20gambar%20resit%20saya.`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', display: 'block', fontSize: '1.1rem', textDecoration: 'none' }}
        >
          Hantar Resit Ke WhatsApp {agentName}
        </a>
      </div>
    )
  }

  return (
    <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
      <h1 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.5rem' }}>Pengesahan Tempahan</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Lengkapkan butiran untuk proses penghantaran.</p>
      
      {/* Maklumat Bank */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
          <span>🏦</span> Akaun Pembayaran Rasmi
        </h3>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '1.1rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
          {paymentDetails}
        </pre>
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', color: 'black', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>Simpan resit setelah berjaya transfer.</p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #f87171' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nama Penuh (Penerima)</label>
          <input type="text" name="name" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombor Telefon</label>
          <input type="tel" name="phone" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Alamat Penghantaran Penuh</label>
          <textarea name="address" required rows={3} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }}></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
          style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1, borderRadius: '16px' }}
        >
          {loading ? 'Menyimpan Rekod...' : 'Saya Telah Bayar & Hantar Rekod'}
        </button>
      </form>
    </div>
  )
}
