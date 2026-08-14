'use client'

import React, { useState, useEffect } from 'react'
import { Bell, CheckCheck, Trash2, Zap, Gift, ShieldCheck, Swords, DollarSign, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'commission' | 'loot' | 'territory' | 'shield' | 'signup'
  amount?: string
  timestamp: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Komisen Overriding Diterima! 💰',
    message: 'Level 2 downline (EST-4432) telah reload pelan EZ50. Komisen +RM12.50 dimasukkan.',
    type: 'commission',
    amount: '+RM12.50',
    timestamp: 'Baru sahaja',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Mystery Loot Box Diberikan! 🎁',
    message: 'Anda mendapat 1 Kunci Loot Box baru daripada reload Level 3.',
    type: 'loot',
    timestamp: '5 minit lalu',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Perang Wilayah: Selangor 🗺️',
    message: 'Apex Digital Hub tawan zon Selangor dengan 1,420 pendaftaran.',
    type: 'territory',
    timestamp: '25 minit lalu',
    read: true,
  },
]

export default function NotificationSystem({
  onSimulateClick,
}: {
  onSimulateClick?: () => void
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Listen to Supabase Realtime channel for live transaction alerts
  useEffect(() => {
    const channel = supabase
      .channel('realtime_transactions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transaction_alerts' },
        (payload: any) => {
          const newNotif: NotificationItem = {
            id: payload.new.id || `realtime-${Date.now()}`,
            title: payload.new.title || 'Transaksi Baru Received!',
            message: payload.new.message || 'Transaksi ejen berjaya diproses.',
            type: payload.new.type || 'commission',
            amount: payload.new.amount,
            timestamp: 'Baru sahaja',
            read: false,
          }

          setNotifications((prev) => [newNotif, ...prev])
          setActiveToast(newNotif)

          // Auto-hide toast after 5s
          setTimeout(() => {
            setActiveToast(null)
          }, 5000)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Trigger manual simulation alert for live testing
  const triggerSimulationAlert = () => {
    const alertTypes: NotificationItem['type'][] = ['commission', 'loot', 'shield', 'territory', 'signup']
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    const now = new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    let title = ''
    let message = ''
    let amount = undefined

    if (randomType === 'commission') {
      const bonus = (Math.random() * 25 + 5).toFixed(2)
      title = 'Komisen Live Overriding! 💸'
      message = `Downline Level 1 baru sahaja mendaftar pelan EZ50. Komisen +RM${bonus} dikreditkan.`
      amount = `+RM${bonus}`
    } else if (randomType === 'loot') {
      title = 'Kotak Loot Box Buka! 🎁'
      message = 'Anda mendapat 2x Overriding Multiplier untuk 24 jam!'
    } else if (randomType === 'shield') {
      title = 'Mentor Shield Diaktifkan! 🛡️'
      message = 'Kredit eCOMM RM35 berjaya dipindahkan kepada Ahmad Faiz.'
    } else if (randomType === 'territory') {
      title = 'Perak Diambil Alih! 🗺️'
      message = 'Kumpulan anda kini memegang carta tertinggi zon Perak.'
    } else {
      title = 'Ejen Baru Berdaftar! 🚀'
      message = 'Ejen siti_eastel baru mendaftar di bawah rangkaian anda.'
    }

    const simulatedNotif: NotificationItem = {
      id: `sim-${Date.now()}`,
      title,
      message,
      type: randomType,
      amount,
      timestamp: now,
      read: false,
    }

    setNotifications((prev) => [simulatedNotif, ...prev])
    setActiveToast(simulatedNotif)

    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === simulatedNotif.id ? null : curr))
    }, 5000)

    if (onSimulateClick) onSimulateClick()
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'commission':
        return <DollarSign className="w-4 h-4 text-emerald-400" />
      case 'loot':
        return <Gift className="w-4 h-4 text-pink-400" />
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-cyan-400" />
      case 'territory':
        return <Swords className="w-4 h-4 text-purple-400" />
      default:
        return <Zap className="w-4 h-4 text-amber-400" />
    }
  }

  return (
    <div className="relative inline-block">
      {/* Action Buttons Group */}
      <div className="flex items-center gap-2">
        {/* Simulate Live Transaction Trigger Button */}
        <button
          onClick={triggerSimulationAlert}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-600/30 transition transform hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950" />
          Simulasi Alert Transaksi Live
        </button>

        {/* Bell Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition active:scale-95 shadow-md"
          title="Notifikasi Transaksi Live"
        >
          <Bell className="w-4 h-4 text-slate-200" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center border-2 border-slate-950 animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">Notifikasi Transaksi</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {unreadCount} baru
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={markAllAsRead}
                className="text-slate-400 hover:text-emerald-400 transition"
                title="Tanda semua dibaca"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={clearAll}
                className="text-slate-400 hover:text-rose-400 transition"
                title="Padam semua"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Tiada notifikasi transaksi terkini.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border text-xs transition ${
                    item.read
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                      : 'bg-slate-950/90 border-emerald-500/30 shadow-md shadow-emerald-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.amount && (
                            <span className="font-mono text-emerald-400 text-[11px]">
                              {item.amount}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono text-right mt-1">
                    {item.timestamp}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Floating Realtime Toast Popup (Bottom-Right / Top-Right) */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/60 p-4 rounded-3xl shadow-2xl shadow-emerald-950/80 animate-fade-in-up flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 shrink-0">
            {getIcon(activeToast.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">{activeToast.title}</span>
              <button
                onClick={() => setActiveToast(null)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeToast.message}</p>
            <div className="text-[10px] text-emerald-400 font-mono font-bold mt-2">
              ⚡ LIVE SUPABASE TRANSACTION ALERT
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
