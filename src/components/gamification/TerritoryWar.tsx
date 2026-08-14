'use client'

import React, { useState } from 'react'
import { MapPin, Swords, ShieldCheck, Flame, Users, Trophy, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export interface ZoneData {
  id: string
  name: string
  code: string
  rulingPartner: string
  signupsCount: number
  targetSignups: number
  status: 'dominant' | 'contested' | 'neutral'
  color: string
}

const INITIAL_ZONES: ZoneData[] = [
  { id: '1', name: 'Selangor', code: 'SGR', rulingPartner: 'Apex Digital Hub', signupsCount: 1420, targetSignups: 1500, status: 'dominant', color: 'from-purple-600 to-indigo-600' },
  { id: '2', name: 'Perak', code: 'PRK', rulingPartner: 'Perak North Ejen Clan', signupsCount: 890, targetSignups: 1000, status: 'contested', color: 'from-cyan-600 to-blue-600' },
  { id: '3', name: 'Johor', code: 'JHR', rulingPartner: 'Southern Empire Ejen', signupsCount: 1150, targetSignups: 1200, status: 'dominant', color: 'from-amber-600 to-orange-600' },
  { id: '4', name: 'Penang', code: 'PNG', rulingPartner: 'Pearl Guild Digital', signupsCount: 780, targetSignups: 800, status: 'contested', color: 'from-pink-600 to-rose-600' },
  { id: '5', name: 'Sabah', code: 'SBH', rulingPartner: 'Borneo Vanguard HQ', signupsCount: 640, targetSignups: 700, status: 'dominant', color: 'from-emerald-600 to-teal-600' },
  { id: '6', name: 'Sarawak', code: 'SRW', rulingPartner: 'Hornbill Apex Ejen', signupsCount: 920, targetSignups: 1000, status: 'dominant', color: 'from-violet-600 to-purple-600' },
  { id: '7', name: 'Kedah', code: 'KDH', rulingPartner: 'Kedah Northern Alliance', signupsCount: 450, targetSignups: 600, status: 'contested', color: 'from-blue-600 to-cyan-600' },
  { id: '8', name: 'Pahang', code: 'PHG', rulingPartner: 'East Coast Warriors', signupsCount: 510, targetSignups: 600, status: 'neutral', color: 'from-teal-600 to-emerald-600' },
]

export default function TerritoryWar() {
  const [zones, setZones] = useState<ZoneData[]>(INITIAL_ZONES)
  const [selectedZoneId, setSelectedZoneId] = useState<string>('1')
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM INITIALIZED] Zone War Matrix synchronized with Supabase database.',
    '[Selangor] Apex Digital Hub reached 94% territory control limit.',
  ])

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0]

  const handleTakeoverSimulation = async (zoneId: string) => {
    setIsUpdating(true)
    const target = zones.find((z) => z.id === zoneId)
    if (!target) return

    const bonusSignups = Math.floor(Math.random() * 45) + 15
    const newCount = target.signupsCount + bonusSignups
    const partners = ['Apex Digital Hub', 'Eastel Vanguard HQ', 'Northern Titan Clan', 'Southern Empire Ejen', 'Cyber Cyberjaya Syndicate']
    const newPartner = newCount >= target.targetSignups ? 'Eastel Gamification Lab (Tester)' : target.rulingPartner

    const updatedZones = zones.map((z) => {
      if (z.id === zoneId) {
        return {
          ...z,
          signupsCount: newCount,
          rulingPartner: newPartner,
          status: (newCount >= target.targetSignups ? 'dominant' : 'contested') as any,
        }
      }
      return z
    })

    setZones(updatedZones)

    const timestamp = new Date().toLocaleTimeString('ms-MY')
    const logMsg = `[${timestamp}] [TAKEOVER SIMULATION] Zone ${target.name} boosted by +${bonusSignups} signups! New Total: ${newCount}. Ruling Partner: ${newPartner}`
    setLogs((prev) => [logMsg, ...prev.slice(0, 7)])

    // Log update to Supabase (safe wrapper fallback)
    try {
      await supabase.from('territory_war_logs').insert([
        {
          zone_name: target.name,
          added_signups: bonusSignups,
          total_signups: newCount,
          ruling_partner: newPartner,
          created_at: new Date().toISOString(),
        },
      ])
    } catch (e) {
      console.warn('Supabase log insert skipped (Table fallback mode active):', e)
    }

    setTimeout(() => {
      setIsUpdating(false)
    }, 400)
  }

  const totalSignups = zones.reduce((acc, curr) => acc + curr.signupsCount, 0)

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Module Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Module 1
                </span>
                <span className="text-xs text-slate-400">Live Territory Grid</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                The Territory War Simulator
              </h2>
            </div>
          </div>
          <button
            onClick={() => setZones(INITIAL_ZONES)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 border border-slate-700"
            title="Reset Map State"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              Active Zones
            </div>
            <div className="text-xl font-extrabold text-white">{zones.length} States</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Total Territory Signups
            </div>
            <div className="text-xl font-extrabold text-purple-400">{totalSignups.toLocaleString()}</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Dominant Partner
            </div>
            <div className="text-sm font-bold text-amber-300 truncate">Apex Digital Hub</div>
          </div>
        </div>

        {/* Zone Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {zones.map((zone) => {
            const isSelected = zone.id === selectedZoneId
            const pct = Math.min(100, Math.round((zone.signupsCount / zone.targetSignups) * 100))

            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/80 ring-2 ring-purple-500/30 shadow-lg shadow-purple-900/30'
                    : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                    {zone.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      zone.status === 'dominant'
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                        : zone.status === 'contested'
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                        : 'bg-slate-500'
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold text-white truncate">{zone.name}</div>
                <div className="text-xs text-purple-300 font-mono mt-0.5">{zone.signupsCount} signups</div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${zone.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Zone Focus & Takeover Panel */}
        <div className="bg-slate-950/80 border border-purple-900/50 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  Target Zone: {selectedZone.name} ({selectedZone.code})
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {selectedZone.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                Ruling Partner: <span className="text-purple-300">{selectedZone.rulingPartner}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Current Territory Power: <strong className="text-white">{selectedZone.signupsCount}</strong> /{' '}
                {selectedZone.targetSignups} Signups ({Math.round((selectedZone.signupsCount / selectedZone.targetSignups) * 100)}%)
              </p>
            </div>

            <button
              onClick={() => handleTakeoverSimulation(selectedZone.id)}
              disabled={isUpdating}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Simulating Attack...
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                  Simulate Zone Takeover
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Realtime Action Logs */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Live Activity Stream
          </span>
          <span className="text-[10px] font-mono text-slate-500">{logs.length} events logged</span>
        </div>
        <div className="font-mono text-[11px] text-slate-300 space-y-1.5 max-h-24 overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div key={index} className="text-slate-400 leading-tight">
              <span className="text-purple-400">&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
