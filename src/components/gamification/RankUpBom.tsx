'use client'

import React, { useState, useEffect } from 'react'
import { Timer, Zap, ArrowUpRight, ShieldAlert, Award, CheckCircle2, PlusCircle, AlertCircle } from 'lucide-react'

export type TierLevel = 'Member' | 'Ambassador' | 'Territory Partner'

interface TierCriteria {
  requiredSignups: number
  requiredReloadAmount: number
  unlockedOverridingLevels: number
  commissionBonusPct: number
}

const TIER_REQUIREMENTS: Record<TierLevel, TierCriteria> = {
  Member: { requiredSignups: 5, requiredReloadAmount: 35, unlockedOverridingLevels: 1, commissionBonusPct: 3.0 },
  Ambassador: { requiredSignups: 25, requiredReloadAmount: 60, unlockedOverridingLevels: 2, commissionBonusPct: 5.5 },
  'Territory Partner': { requiredSignups: 100, requiredReloadAmount: 120, unlockedOverridingLevels: 3, commissionBonusPct: 8.0 },
}

export default function RankUpBom() {
  const [currentTier, setCurrentTier] = useState<TierLevel>('Member')
  const [targetTier, setTargetTier] = useState<TierLevel>('Ambassador')
  const [currentSignups, setCurrentSignups] = useState<number>(14)
  const [currentReloadAmount, setCurrentReloadAmount] = useState<number>(35)
  const [selectedReloadTier, setSelectedReloadTier] = useState<number>(60)
  
  // Timer state (seconds remaining in the current FOMO window)
  const [secondsLeft, setSecondsLeft] = useState<number>(14 * 3600 + 42 * 60 + 19)
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [fomoAlert, setFomoAlert] = useState<string>('')

  // Ticking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Calculate missing gaps
  const reqSignups = TIER_REQUIREMENTS[targetTier].requiredSignups
  const reqReload = TIER_REQUIREMENTS[targetTier].requiredReloadAmount
  const missingSignups = Math.max(0, reqSignups - currentSignups)
  const missingReload = Math.max(0, reqReload - currentReloadAmount)
  const isTargetAchieved = missingSignups === 0 && missingReload === 0

  useEffect(() => {
    if (isTargetAchieved) {
      setFomoAlert(`🎉 UNLOCKED! You qualified for ${targetTier} rank! Level 1-3 overriding activated!`)
    } else {
      setFomoAlert(
        `🚨 FOMO ALERT: Only ${missingSignups} more signup${missingSignups === 1 ? '' : 's'} & RM${missingReload} reload required to unlock Level ${TIER_REQUIREMENTS[targetTier].unlockedOverridingLevels} overriding commission!`
      )
    }
  }, [missingSignups, missingReload, targetTier, isTargetAchieved])

  const hours = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60

  const handleSimulateSignup = () => {
    setIsSimulating(true)
    setCurrentSignups((prev) => prev + 1)
    setTimeout(() => setIsSimulating(false), 300)
  }

  const handleSimulateReload = (amount: number) => {
    setIsSimulating(true)
    setCurrentReloadAmount((prev) => Math.min(200, prev + amount))
    setTimeout(() => setIsSimulating(false), 300)
  }

  const handleResetTimer = () => {
    setSecondsLeft(24 * 3600)
  }

  const progressSignupsPct = Math.min(100, Math.round((currentSignups / reqSignups) * 100))
  const progressReloadPct = Math.min(100, Math.round((currentReloadAmount / reqReload) * 100))

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background Neon Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Module 2
                </span>
                <span className="text-xs text-slate-400">FOMO Timer Engine</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                Rank-Up Bom (FOMO Timer)
              </h2>
            </div>
          </div>
          <button
            onClick={handleResetTimer}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 border border-slate-700"
          >
            Reset 24h Window
          </button>
        </div>

        {/* Dynamic Countdown Display */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 mb-6 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-cyan-400 animate-pulse" />
              CYCLE EXPIRATION WINDOW
            </span>
            <span className="text-xs text-slate-400 font-mono">Tier Advancement Deadline</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-3xl md:text-4xl font-black text-cyan-400 font-mono">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Hours</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-3xl md:text-4xl font-black text-white font-mono">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Minutes</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-3xl md:text-4xl font-black text-amber-400 font-mono">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Seconds</div>
            </div>
          </div>
        </div>

        {/* Target Rank Selector & Criteria */}
        <div className="mb-6">
          <label className="text-xs text-slate-400 mb-2 block font-medium">Select Target Advancement Tier:</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Member', 'Ambassador', 'Territory Partner'] as TierLevel[]).map((tier) => {
              const active = targetTier === tier
              return (
                <button
                  key={tier}
                  onClick={() => setTargetTier(tier)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {tier}
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress & Missing Requirements */}
        <div className="space-y-4 mb-6">
          {/* Signups requirement */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Downline Signups Progress</span>
              <span className="font-bold text-cyan-400 font-mono">
                {currentSignups} / {reqSignups} ({progressSignupsPct}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progressSignupsPct}%` }}
              />
            </div>
          </div>

          {/* Reload requirement */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Monthly Reload Target (Min. Tier: RM{selectedReloadTier})</span>
              <span className="font-bold text-amber-400 font-mono">
                RM{currentReloadAmount} / RM{reqReload} ({progressReloadPct}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${progressReloadPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Action Triggers */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleSimulateSignup}
            disabled={isSimulating}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            Simulate +1 Signup
          </button>
          <button
            onClick={() => handleSimulateReload(25)}
            disabled={isSimulating}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 active:scale-95"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Simulate +RM25 Reload
          </button>
        </div>
      </div>

      {/* Dynamic FOMO Alert Banner */}
      <div
        className={`p-4 rounded-2xl border text-xs font-semibold flex items-start gap-3 transition-all ${
          isTargetAchieved
            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950/50'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-950/30'
        }`}
      >
        {isTargetAchieved ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
        )}
        <div className="leading-relaxed">{fomoAlert}</div>
      </div>
    </div>
  )
}
