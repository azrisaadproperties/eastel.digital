'use client'

import React, { useState, useEffect } from 'react'
import {
  FlaskConical,
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Zap,
  Shield,
  Layers,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { checkSupabaseConnection, SupabaseStatus } from '@/lib/supabase'
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-20 relative overflow-hidden">
      {/* Background Neon Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white">EASTEL</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  GAMIFICATION LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Isolated Experimental Feature Sandbox</p>
            </div>
          </div>

          {/* Database Connection Pill */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all ${
                dbStatus.status === 'Ready'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/50'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300 shadow-md shadow-rose-950/50'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Status:</span>
              <span className="font-extrabold flex items-center gap-1">
                {dbStatus.status === 'Ready' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ready ({dbStatus.latencyMs}ms)
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Error Fallback
                  </>
                )}
              </span>
            </div>

            <button
              onClick={verifyConnection}
              disabled={isChecking}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
              title="Ping Supabase Connection"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin text-purple-400' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1700px] mx-auto px-4 md:px-8 pt-8 relative z-10 space-y-8">
        {/* 1. Header Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Beta Sandbox (Isolated)
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Eastel Gamification Lab
              </h1>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Safe testing environment utilizing shared Supabase connection. Test high-conversion gamification mechanics (Territory War, Rank-Up FOMO Timers, Overriding Mystery Loot Boxes, and Mentor Anti-Churn Shields) in real-time before production rollout.
              </p>
            </div>

            {/* Quick System Diagnostics Widget */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 shrink-0 xl:w-96 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 font-medium">Environment Route</span>
                <span className="font-mono text-purple-300 font-bold">/gamification-lab</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 font-medium">Supabase Records Probe</span>
                <span className="font-mono text-emerald-400 font-bold">{dbStatus.sampleCount} active</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 font-medium">Overriding Multi-Levels</span>
                <span className="font-mono text-cyan-400 font-bold">Level 1, 2, & 3</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Isolated sandbox mode active. No live customer data modified.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Grid Dashboard Breakdown (2x2 Layout on wide 2K/4K screens) */}
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
      <footer className="mt-16 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-[1700px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Eastel Digital. Gamification Sandbox Module v1.0.0
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Next.js 16 (App Router)</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-400">Tailwind CSS</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Supabase DB</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
