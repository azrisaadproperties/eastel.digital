'use client'

import { useState } from 'react'

export interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'Apakah rangkaian & liputan yang digunakan oleh Eastel 5G?',
    answer: 'Eastel beroperasi sepenuhnya di atas infrastruktur rangkaian U Mobile 5G & 4G di seluruh Malaysia. Anda menikmati kelajuan 5G ultra-pantas di kawasan liputan 5G serta liputan 4G LTE yang meluas di seluruh negara.'
  },
  {
    question: 'Adakah ini SIM fizikal atau eSIM?',
    answer: 'Simpack Eastel adalah SIM fizikal (Tri-cut: Standard, Micro, Nano) yang dikirimkan terus ke alamat rumah anda. Selepas mendaftar di laman checkout, simpack akan dipos menerusi kurier berdaftar.'
  },
  {
    question: 'Bolehkah saya kekalkan nombor telefon lama saya (MNP)?',
    answer: 'BOLEH! Anda boleh pilih untuk mengekalkan nombor telefon lama daripada talian prepaid/postpaid semasa (CelcomDigi, Maxis, RedONE, TuneTalk, Yoodo dll) atau mendaftar nombor baharu.'
  },
  {
    question: 'Berapa lama proses penghantaran SIMPack mengambil masa?',
    answer: 'Penghantaran mengambil masa 1 hingga 3 hari bekerja mengikut kawasan. Selepas membuat tempahan, nombor rujukan pengesahan dan nombor resit pembayaran akan diproses oleh HQ/Ejen bertugas.'
  },
  {
    question: 'Bagaimana cara menjana pendapatan sebagai Eastelpreneur?',
    answer: 'Selepas mendaftar mana-apa pelan, anda boleh mendaftar subdomain peribadi anda (cth: nama.eastel.digital). Setiap pendaftaran simpack yang berjaya menerusi pautan anda akan menghasilkan komisyen pasif yang dimasukkan terus ke eWallet/akaun bank anda!'
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // Open 1st FAQ by default

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="section container" style={{ padding: '6rem 1.5rem' }}>
      <div className="text-center mb-12">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', borderRadius: '99px', fontWeight: 700, marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          ❓ Jawapan Kepada Keraguan Anda
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Soalan Lazim <span className="text-gradient">(FAQ)</span>
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          Segala apa yang anda perlu tahu sebelum membuat tempahan simpack Eastel 5G.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div 
              key={index} 
              className="glass-card"
              style={{
                padding: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isOpen ? 'rgba(249, 115, 22, 0.05)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.question}</span>
                <span 
                  style={{
                    fontSize: '1.4rem',
                    color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    marginLeft: '1rem',
                    flexShrink: 0
                  }}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div 
                  style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    fontSize: '1.05rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.7',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
