'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  FlaskConical,
  Database,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Zap,
  ShieldCheck,
  Swords,
  Gift,
} from 'lucide-react'
import { checkSupabaseConnection, SupabaseStatus } from '@/lib/supabase'
import NotificationSystem from '@/components/notifications/NotificationSystem'
import TerritoryWar from './TerritoryWar'
import RankUpBom from './RankUpBom'
import MysteryLootBox from './MysteryLootBox'
import MentorsShield from './MentorsShield'

export default function GamificationLabDashboard() {
  const [dbStatus, setDbStatus] = useState<SupabaseStatus>({
    status: 'Ready',
    latencyMs: 42,
    sampleCount: 12,
    message: 'Initializing Supabase connection wrapper...',
    timestamp: '--:--',
  })
  const [isChecking, setIsChecking] = useState<boolean>(false)

  const verifyConnection = async () => {
    setIsChecking(true)
    try {
      const res = await checkSupabaseConnection()
      setDbStatus(res)
    } catch (e: any) {
      setDbStatus({
        status: 'Error',
        latencyMs: 0,
        sampleCount: 0,
        message: e?.message || 'Connection error',
        timestamp: new Date().toLocaleTimeString('ms-MY'),
      })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    verifyConnection()
  }, [])

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen pb-20 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-cyan-600/15 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="fixed bottom-10 left-1/3 w-[650px] h-[650px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none -z-0" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-2xl border-b border-slate-800/80">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white">EASTEL</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 tracking-wide uppercase">
                  GAMIFICATION LAB
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Isolated Experimental Feature Sandbox v1.0</p>
            </div>
          </div>

          {/* Database & Notification Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Realtime In-App Notification System */}
            <NotificationSystem />

            {/* Supabase Status Pill */}
            <div
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all ${
                dbStatus.status === 'Ready'
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-rose-950/80 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Supabase:</span>
              <span className="font-extrabold flex items-center gap-1.5">
                {dbStatus.status === 'Ready' ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    Ready ({dbStatus.latencyMs}ms)
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    Error Fallback
                  </>
                )}
              </span>
            </div>

            <button
              onClick={verifyConnection}
              disabled={isChecking}
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 transition active:scale-95 shadow-md"
              title="Ping Supabase Connection"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin text-purple-400' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1700px] mx-auto px-4 md:px-8 pt-8 relative z-10 space-y-8">
        {/* 1. Futuristic Hero Banner with Graphic Asset */}
        <section className="relative rounded-3xl overflow-hidden border border-purple-900/40 shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10 relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Beta Sandbox Module (Isolated)
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Eastel Gamification Lab
              </h1>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Safe testing environment utilizing shared Supabase connection. Test high-conversion gamification mechanics (Territory War, Rank-Up FOMO Timers, Overriding Mystery Loot Boxes, and Mentor Anti-Churn Shields) in real-time.
              </p>

              {/* Module Feature Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                  <Swords className="w-3.5 h-3.5 text-purple-400" />
                  1. Territory War Grid
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  2. FOMO Timer Engine
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold">
                  <Gift className="w-3.5 h-3.5 text-pink-400" />
                  3. Mystery Loot Box
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  4. Anti-Churn Shield
                </div>
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl group">
              <Image
                src="/gamification_hero.jpg"
                alt="Gamification Lab UI Graphic"
                width={800}
                height={450}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Live Preview Graphic Rendered
                </span>
                <span className="text-purple-400 font-mono text-[10px]">SUPABASE REALTIME NOTIFICATIONS ACTIVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Grid Dashboard Breakdown (2x2 Layout on wide screens) */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          {/* Module 1: The Territory War Simulator */}
          <div className="min-h-[580px]">
            <TerritoryWar />
          </div>

          {/* Module 2: Rank-Up Bom (FOMO Timer) */}
          <div className="min-h-[580px]">
            <RankUpBom />
          </div>

          {/* Module 3: Overriding Mystery Loot Box */}
          <div className="min-h-[580px]">
            <MysteryLootBox />
          </div>

          {/* Module 4: Mentor's Shield (Anti-Churn Watcher) */}
          <div className="min-h-[580px]">
            <MentorsShield />
          </div>
        </section>
      </main>

      {/* Footer Info Bar */}
      <footer className="mt-16 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-[1700px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Eastel Digital. Gamification Sandbox Module v1.0.0
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Next.js 16 (App Router)</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-400 font-bold">Tailwind CSS</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">Supabase Realtime</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
