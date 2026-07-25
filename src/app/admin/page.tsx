import { prisma } from '@/lib/prisma'
import { addAgent, deleteAgent, updateContent } from './actions'

export default async function AdminDashboard() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } })
  const content = await prisma.content.findFirst()

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard Eastel</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Bahagian Urus Kandungan */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Tetapan Laman & BCL.my</h2>
          <form action={updateContent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="hidden" name="id" value={content?.id || ''} />
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tajuk Utama (Headline)</label>
              <input type="text" name="headline" defaultValue={content?.headline} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Sub-tajuk</label>
              <input type="text" name="subheadline" defaultValue={content?.subheadline} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Penerangan</label>
              <textarea name="description" defaultValue={content?.description} rows={4} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Maklumat Bank (Nombor Akaun)</label>
              <textarea name="paymentDetails" defaultValue={content?.paymentDetails} rows={3} placeholder="Contoh: Maybank 12345678 - Ali" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'red' }}>Pautan Webhook Google Sheets (Opsional)</label>
              <input type="url" name="webhookUrl" defaultValue={content?.webhookUrl || ''} placeholder="https://hook.make.com/..." style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Jika kosong, borang tetap berfungsi tapi data tidak dihantar ke Sheets.</p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Simpan Kandungan</button>
          </form>
        </div>

        {/* Bahagian Urus Ejen */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Senarai Ejen Affiliate</h2>
          
          <form action={addAgent} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <input type="text" name="subdomain" placeholder="Subdomain (cth: abu)" style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            <input type="text" name="name" placeholder="Nama Penuh" style={{ flex: 2, padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc' }} required />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}>Tambah</button>
          </form>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {agents.map(agent => (
              <div key={agent.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <strong>{agent.name}</strong> 
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {agent.officialId || 'Tiada ID'}
                  </span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    URL: <a href={`http://${agent.subdomain}.localhost:3005`} target="_blank" rel="noreferrer">{agent.subdomain}.eastel.digital</a>
                  </div>
                </div>
                <form action={deleteAgent.bind(null, agent.id)}>
                  <button type="submit" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>Buang</button>
                </form>
              </div>
            ))}
            {agents.length === 0 && <p>Tiada ejen didaftarkan lagi.</p>}
          </div>
        </div>

      </div>
    </div>
  )
}
