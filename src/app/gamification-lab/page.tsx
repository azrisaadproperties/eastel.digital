import React from 'react'
import { Metadata } from 'next'
import GamificationLabDashboard from '@/components/gamification/GamificationLabDashboard'

export const metadata: Metadata = {
  title: 'Eastel Gamification Lab | Beta Sandbox',
  description: 'Isolated experimental gamification testing laboratory for Eastel Digital.',
}

export default function GamificationLabPage() {
  return <GamificationLabDashboard />
}
