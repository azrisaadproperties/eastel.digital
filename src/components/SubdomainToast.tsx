'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export interface ToastAgent {
  subdomain: string
  name: string
  createdAt: string
}

export default function SubdomainToast({ agents }: { agents: ToastAgent[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!agents || agents.length === 0 || dismissed) return

    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % agents.length)
        setVisible(true)
      }, 400) // smooth fade out/in transition
    }, 4500)

    return () => clearInterval(interval)
  }, [agents, dismissed])

  if (!agents || agents.length === 0 || dismissed) return null

  const currentAgent = agents[currentIndex]

  return (
    <div 
      className={`subdomain-toast ${visible ? 'toast-show' : 'toast-hide'}`}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9999,
        maxWidth: '360px',
        width: 'calc(100% - 3rem)'
      }}
    >
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(249, 115, 22, 0.4)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(249, 115, 22, 0.2)',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          color: 'white',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          style={{
            position: 'absolute',
            top: '0.6rem',
            right: '0.8rem',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
          aria-label="Tutup Notifikasi"
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎉 Subdomain Baru Berdaftar
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC' }}>
              {currentAgent.name}
            </div>
            <a 
              href={`https://${currentAgent.subdomain}.eastel.digital`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', color: '#60A5FA', textDecoration: 'underline', fontWeight: 600 }}
            >
              {currentAgent.subdomain}.eastel.digital 🔗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
