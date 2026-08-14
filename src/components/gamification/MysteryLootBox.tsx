'use client'

import React, { useState } from 'react'
import { Gift, Sparkles, Award, History, Lock, Unlock, Flame, CheckCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export interface RewardItem {
  id: string
  title: string
  description: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  icon: string
  color: string
  unboxedAt: string
}

const POSSIBLE_REWARDS = [
  { title: '+0.5% Commission Boost', description: 'Applies to Level 2 & 3 downlines for 7 days.', rarity: 'Rare', color: 'from-blue-500 to-cyan-500', icon: '⚡' },
  { title: 'Free RM10 Airtime Credit', description: 'Credited directly to agent wallet.', rarity: 'Common', color: 'from-slate-500 to-slate-400', icon: '📱' },
  { title: '2x Overriding Multiplier (24h)', description: 'Double commission on all level 2 downlines.', rarity: 'Epic', color: 'from-purple-500 to-pink-500', icon: '🔥' },
  { title: 'RM50 eCOMM Instant Bonus', description: 'Transferable to downlines or bank withdrawal.', rarity: 'Rare', color: 'from-emerald-500 to-teal-500', icon: '💰' },
  { title: 'Legendary Ambassador Crown', description: 'Permanent +1% override on all downline tiers.', rarity: 'Legendary', color: 'from-amber-400 to-orange-500', icon: '👑' },
  { title: 'Free RM35 Sim Pack Bundle', description: 'Instant top-up code generated.', rarity: 'Common', color: 'from-indigo-500 to-blue-500', icon: '🎁' },
]

export default function MysteryLootBox() {
  const [isOpening, setIsOpening] = useState<boolean>(false)
  const [lootCount, setLootCount] = useState<number>(3)
  const [latestReward, setLatestReward] = useState<RewardItem | null>(null)
  const [rewardHistory, setRewardHistory] = useState<RewardItem[]>([
    {
      id: 'h-1',
      title: '+0.5% Commission Boost',
      description: 'Level 2 & 3 downline boost active',
      rarity: 'Rare',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-500',
      unboxedAt: '10:15 AM',
    },
  ])

  const handleOpenLootBox = async () => {
    if (lootCount <= 0 || isOpening) return

    setIsOpening(true)
    setLatestReward(null)

    // Simulate 1.5s unboxing animation
    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * POSSIBLE_REWARDS.length)
      const rewardTemplate = POSSIBLE_REWARDS[randomIndex]
      const timestamp = new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })

      const newReward: RewardItem = {
        id: `loot-${Date.now()}`,
        title: rewardTemplate.title,
        description: rewardTemplate.description,
        rarity: rewardTemplate.rarity as any,
        icon: rewardTemplate.icon,
        color: rewardTemplate.color,
        unboxedAt: timestamp,
      }

      setLatestReward(newReward)
      setRewardHistory((prev) => [newReward, ...prev])
      setLootCount((prev) => prev - 1)
      setIsOpening(false)

      // Supabase safety sync
      try {
        await supabase.from('loot_box_history').insert([
          {
            reward_title: newReward.title,
            rarity: newReward.rarity,
            created_at: new Date().toISOString(),
          },
        ])
      } catch (err) {
        console.warn('Supabase loot log skipped:', err)
      }
    }, 1500)
  }

  const handleEarnMoreKeys = () => {
    setLootCount((prev) => prev + 2)
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  Module 3
                </span>
                <span className="text-xs text-slate-400">Level 2 & 3 Reload Rewards</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                Overriding Mystery Loot Box
              </h2>
            </div>
          </div>
          <button
            onClick={handleEarnMoreKeys}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 border border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            +2 Loot Boxes
          </button>
        </div>

        {/* Interactive Pulsing Loot Box Card */}
        <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-pink-500/40 rounded-3xl p-6 md:p-8 text-center mb-6 overflow-hidden group">
          <div className="absolute top-3 right-3 text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800/80 text-pink-300 border border-pink-500/30">
            Available: <span className="text-white">{lootCount}</span> Box{lootCount === 1 ? '' : 'es'}
          </div>

          {/* Center Pulsing Box Visual */}
          <div className="my-6 relative inline-block">
            <div
              className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-0.5 shadow-2xl transition-all duration-500 ${
                isOpening ? 'scale-110 rotate-6 animate-pulse shadow-pink-500/60' : 'hover:scale-105'
              }`}
            >
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                {isOpening ? (
                  <Sparkles className="w-12 h-12 text-pink-400 animate-spin" />
                ) : (
                  <Gift className="w-12 h-12 text-pink-400 group-hover:scale-110 transition" />
                )}
              </div>
            </div>

            {/* Glowing Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition" />
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenLootBox}
            disabled={lootCount <= 0 || isOpening}
            className={`w-full max-w-xs mx-auto py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
              lootCount > 0 && !isOpening
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white shadow-pink-500/30 hover:scale-105'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isOpening ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                Unboxing Reward...
              </>
            ) : lootCount > 0 ? (
              <>
                <Unlock className="w-4 h-4" />
                Open Loot Box ({lootCount} left)
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-500" />
                No Boxes Remaining
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 mt-3">
            Earned automatically when Level 2 or Level 3 downlines perform monthly reloads (RM35+).
          </p>
        </div>

        {/* Revealed Reward Banner */}
        {latestReward && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-pink-500/60 shadow-lg shadow-pink-950/40 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{latestReward.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{latestReward.title}</span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 border ${
                      latestReward.rarity === 'Legendary'
                        ? 'text-amber-400 border-amber-500/50'
                        : latestReward.rarity === 'Epic'
                        ? 'text-purple-400 border-purple-500/50'
                        : latestReward.rarity === 'Rare'
                        ? 'text-cyan-400 border-cyan-500/50'
                        : 'text-slate-300 border-slate-700'
                    }`}
                  >
                    {latestReward.rarity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{latestReward.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reward History */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-pink-400" />
            Unboxed Rewards History
          </span>
          <span className="text-[10px] text-slate-500 font-mono">{rewardHistory.length} claimed</span>
        </div>
        <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
          {rewardHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-slate-200 font-medium truncate max-w-[180px]">{item.title}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{item.unboxedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
