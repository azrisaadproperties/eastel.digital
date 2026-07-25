'use client'

import { useState } from 'react'
import { addAgent, deleteAgent, updateContent, loginAdmin, logoutAdmin } from './actions'

type Agent = { id: string, subdomain: string, name: string, phone: string | null, officialId: string | null, createdAt: Date }
type Content = { id: string, headline: string, subheadline: string, description: string, paymentDetails: string, webhookUrl: string | null }

export default function AdminDashboardClient({ 
  isAuthenticated, 
  agents, 
  content 
}: { 
  isAuthenticated: boolean, 
  agents: Agent[], 
  content: Content | null 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const res = await loginAdmin(formData)
    if (res?.error) setError(res.error)
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="container flex-center animate-fade-in-up" style={{ minHeight: '100vh' }}>
        <div className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ marginBottom: '0.5rem' }}>HQ Access</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Sila masukkan katalaluan.</p>
          
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              name="password" 
              placeholder="Katalaluan" 
              required 
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Masuk...' : 'Log Masuk'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="bg-blob blob-2" style={{ background: 'rgba(236, 72, 153, 0.15)' }}></div>
      <div className="bg-blob blob-3" style={{ background: 'rgba(59, 130, 246, 0.15)', opacity: 0.5 }}></div>

      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'var(--gradient-5g)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Pusat Kawalan</div>
            <h1>Admin <span className="text-gradient">Dashboard</span></h1>
          </div>
          <button 
            onClick={() => logoutAdmin()} 
            className="btn btn-secondary" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            Log Keluar
          </button>
        </div>

        {/* Statistik */}
        <div className="grid-4" style={{ marginBottom: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600 }}>Jumlah Ejen</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{agents.length}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600 }}>Sistem Teras</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>Aktif</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* Ejen Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👥 Senarai Ejen
            </h2>
            
            <form action={addAgent} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input type="text" name="subdomain" placeholder="Subdomain" style={{ flex: 1, minWidth: '100px', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }} required />
              <input type="text" name="name" placeholder="Nama Ejen" style={{ flex: 2, minWidth: '150px', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }} required />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1rem' }}>Tambah</button>
            </form>

            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {agents.map(agent => (
                <div key={agent.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.1rem' }}>{agent.name}</strong> 
                      {agent.officialId && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: 'var(--primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{agent.officialId}</span>}
                    </div>
                    <form action={deleteAgent.bind(null, agent.id)}>
                      <button type="submit" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Buang</button>
                    </form>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Tel: {agent.phone || '-'} • Daftar: {new Date(agent.createdAt).toLocaleDateString('ms-MY')}
                  </div>
                  <a href={`https://${agent.subdomain}.eastel.digital`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                    {agent.subdomain}.eastel.digital ↗
                  </a>
                </div>
              ))}
              {agents.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Tiada ejen didaftarkan lagi.</p>}
            </div>
          </div>

          {/* Kandungan Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚙️ Tetapan Kedai & Kandungan
            </h2>
            <form action={updateContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input type="hidden" name="id" value={content?.id || ''} />
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Tajuk Utama (Headline)</label>
                <input type="text" name="headline" defaultValue={content?.headline} style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }} required />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sub-tajuk</label>
                <input type="text" name="subheadline" defaultValue={content?.subheadline} style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }} required />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Penerangan Pendek</label>
                <textarea name="description" defaultValue={content?.description} rows={3} style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white' }} required />
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(59, 130, 246, 0.3)' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>Maklumat Bank / Pembayaran</label>
                <textarea name="paymentDetails" defaultValue={content?.paymentDetails} rows={2} placeholder="Contoh: Maybank 12345678 - Ali" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'white' }} required />
              </div>
              
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#ef4444' }}>Pautan Webhook Pangkalan Data Luar (Jika Ada)</label>
                <input type="url" name="webhookUrl" defaultValue={content?.webhookUrl || ''} placeholder="https://hook.make.com/..." style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'white' }} />
              </div>

              <button type="submit" className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>Simpan Tetapan Kedai</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
