'use client'

import React, { useState } from 'react'
import { ShieldCheck, AlertTriangle, Send, CheckCircle2, UserCheck, Search, Filter, RefreshCw, X, ShieldAlert } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export interface DownlineMember {
  id: string
  name: string
  subdomain: string
  officialId: string
  targetReloadTier: number // RM35, RM60, RM80, RM120
  currentReload: number
  daysUntilReset: number
  riskLevel: 'High' | 'Medium' | 'Safe'
  shieldSent: boolean
}

const INITIAL_DOWNLINES: DownlineMember[] = [
  { id: 'dl-1', name: 'Ahmad Faiz', subdomain: 'faizmobile', officialId: 'EST-8821', targetReloadTier: 60, currentReload: 15, daysUntilReset: 2, riskLevel: 'High', shieldSent: false },
  { id: 'dl-2', name: 'Siti Nurhaliza', subdomain: 'siti_eastel', officialId: 'EST-4432', targetReloadTier: 35, currentReload: 35, daysUntilReset: 14, riskLevel: 'Safe', shieldSent: false },
  { id: 'dl-3', name: 'Devan Raj', subdomain: 'devan5g', officialId: 'EST-9102', targetReloadTier: 120, currentReload: 40, daysUntilReset: 3, riskLevel: 'High', shieldSent: false },
  { id: 'dl-4', name: 'Chong Wei Lun', subdomain: 'chongdigit', officialId: 'EST-1294', targetReloadTier: 80, currentReload: 50, daysUntilReset: 5, riskLevel: 'Medium', shieldSent: false },
  { id: 'dl-5', name: 'Nurul Huda', subdomain: 'huda_network', officialId: 'EST-3301', targetReloadTier: 35, currentReload: 20, daysUntilReset: 4, riskLevel: 'Medium', shieldSent: false },
];

export default function MentorsShield() {
  const [downlines, setDownlines] = useState<DownlineMember[]>(INITIAL_DOWNLINES)
  const [filterRisk, setFilterRisk] = useState<'All' | 'High' | 'Medium' | 'Safe'>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Shield Transfer Modal State
  const [selectedDownline, setSelectedDownline] = useState<DownlineMember | null>(null)
  const [transferAmount, setTransferAmount] = useState<number>(20)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const filteredDownlines = downlines.filter((member) => {
    const matchesRisk = filterRisk === 'All' || member.riskLevel === filterRisk
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.officialId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRisk && matchesSearch
  })

  const handleOpenShieldModal = (member: DownlineMember) => {
    setSelectedDownline(member)
    const gap = Math.max(10, member.targetReloadTier - member.currentReload)
    setTransferAmount(gap)
  }

  const handleExecuteShieldTransfer = async () => {
    if (!selectedDownline) return

    setIsProcessing(true)
    const targetId = selectedDownline.id

    setTimeout(async () => {
      setDownlines((prev) =>
        prev.map((item) => {
          if (item.id === targetId) {
            const updatedReload = item.currentReload + transferAmount
            const isNowSafe = updatedReload >= item.targetReloadTier
            return {
              ...item,
              currentReload: updatedReload,
              riskLevel: isNowSafe ? 'Safe' : 'Medium',
              shieldSent: true,
            }
          }
          return item
        })
      )

      const successMsg = `🛡️ Shield Activated! Transferred RM${transferAmount} eCOMM to ${selectedDownline.name} (${selectedDownline.officialId}).`
      setToastMessage(successMsg)

      // Supabase safety event log
      try {
        await supabase.from('churn_shield_actions').insert([
          {
            agent_id: selectedDownline.officialId,
            agent_name: selectedDownline.name,
            ecomm_amount: transferAmount,
            created_at: new Date().toISOString(),
          },
        ])
      } catch (err) {
        console.warn('Supabase churn shield action log skipped:', err)
      }

      setIsProcessing(false)
      setSelectedDownline(null)

      setTimeout(() => {
        setToastMessage(null)
      }, 5000)
    }, 1000)
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Module 4
                </span>
                <span className="text-xs text-slate-400">Anti-Churn Watcher</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                Mentor's Shield
              </h2>
            </div>
          </div>
          <button
            onClick={() => setDownlines(INITIAL_DOWNLINES)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 border border-slate-700"
          >
            Reset Downlines
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-950/80 animate-fade-in-up">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search downline name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Risk Filter Tabs */}
          <div className="flex gap-1.5 bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs">
            {(['All', 'High', 'Medium', 'Safe'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRisk(r)}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  filterRisk === r
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Downlines List View */}
        <div className="space-y-3 mb-6 max-h-[380px] overflow-y-auto pr-1">
          {filteredDownlines.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs bg-slate-950/40 rounded-2xl border border-slate-800">
              No downline members match the filter criteria.
            </div>
          ) : (
            filteredDownlines.map((member) => {
              const gap = Math.max(0, member.targetReloadTier - member.currentReload)
              const reloadPct = Math.min(100, Math.round((member.currentReload / member.targetReloadTier) * 100))

              return (
                <div
                  key={member.id}
                  className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                        member.riskLevel === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : member.riskLevel === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {member.riskLevel === 'High' ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <UserCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{member.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {member.officialId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Target Tier: <span className="text-white font-medium">RM{member.targetReloadTier}</span> | Subdomain: <span className="text-emerald-400 font-mono">{member.subdomain}.eastel.digital</span>
                      </div>

                      {/* Reload status bar */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              member.riskLevel === 'High'
                                ? 'bg-rose-500'
                                : member.riskLevel === 'Medium'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${reloadPct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-300">
                          RM{member.currentReload} / RM{member.targetReloadTier} ({reloadPct}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="text-right">
                      <div
                        className={`text-xs font-bold ${
                          member.riskLevel === 'High'
                            ? 'text-rose-400'
                            : member.riskLevel === 'Medium'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {member.riskLevel === 'High'
                          ? `At Risk (${member.daysUntilReset} days left)`
                          : member.riskLevel === 'Medium'
                          ? `Warning (${member.daysUntilReset} days left)`
                          : 'Safe Criteria'}
                      </div>
                      {gap > 0 && <div className="text-[10px] text-slate-500">Short RM{gap} for override</div>}
                    </div>

                    <button
                      onClick={() => handleOpenShieldModal(member)}
                      disabled={member.riskLevel === 'Safe'}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow ${
                        member.riskLevel === 'Safe'
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-95'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      {member.shieldSent ? 'Top-Up Shield' : 'Send Shield / eCOMM'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal Dialog for Shield / eCOMM Transfer */}
      {selectedDownline && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                Send Anti-Churn Mentor's Shield
              </div>
              <button
                onClick={() => setSelectedDownline(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Transfer eCOMM credit to assist <strong>{selectedDownline.name}</strong> ({selectedDownline.officialId}) in maintaining their minimum monthly reload target (RM{selectedDownline.targetReloadTier}).
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Current Reload:</span>
                <span className="text-white font-mono">RM{selectedDownline.currentReload}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Target Requirement:</span>
                <span className="text-emerald-400 font-mono font-bold">RM{selectedDownline.targetReloadTier}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Recommended Transfer:</span>
                <span className="text-amber-400 font-mono font-bold">RM{Math.max(10, selectedDownline.targetReloadTier - selectedDownline.currentReload)}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs text-slate-400 block mb-1">Enter eCOMM Transfer Amount (RM):</label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(Number(e.target.value))}
                min={5}
                max={200}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDownline(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteShieldTransfer}
                disabled={isProcessing}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Confirm & Send Shield
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          Anti-Churn Watcher active for 5 downlines in Level 1.
        </span>
        <span className="text-[10px] text-slate-500">Auto-Alert System v2.4</span>
      </div>
    </div>
  )
}
