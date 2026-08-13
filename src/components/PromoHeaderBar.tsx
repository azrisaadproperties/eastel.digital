'use client'

import { useState, useEffect } from 'react'

export default function PromoHeaderBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 2, minutes: 30, seconds: 0 } // auto-reset for perpetual urgency
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const format = (num: number) => num.toString().padStart(2, '0')

  return (
    <div 
      style={{
        background: 'linear-gradient(90deg, #F97316, #EC4899, #8B5CF6)',
        color: 'white',
        padding: '0.6rem 1rem',
        fontSize: '0.9rem',
        fontWeight: 700,
        textAlign: 'center',
        position: 'relative',
        zIndex: 101,
        boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          🔥 <span style={{ textDecoration: 'underline' }}>PROMOSI SIMPACK 5G</span>: Baki <strong style={{ background: 'white', color: '#F97316', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>12 Unit</strong> Hari Ini!
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.85rem' }}>
          ⏳ Tawaran Tamat Dalam: 
          <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#FDE047' }}>
            {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  )
}
