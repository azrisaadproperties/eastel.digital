import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swmrwjbrvbunukjmrcep.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Export Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SupabaseStatus {
  status: 'Ready' | 'Error'
  latencyMs: number
  sampleCount: number
  message: string
  timestamp: string
}

/**
 * Safety check wrapper to verify Supabase connection without crashing the application layout.
 */
export async function checkSupabaseConnection(): Promise<SupabaseStatus> {
  const startTime = performance.now()
  const timestamp = new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  try {
    // Attempt querying Agent table (or count) via Supabase REST API
    const { count, error } = await supabase
      .from('Agent')
      .select('*', { count: 'exact', head: true })

    const latencyMs = Math.round(performance.now() - startTime)

    if (error) {
      // Try fallback query or check if API is reachable
      return {
        status: 'Error',
        latencyMs,
        sampleCount: 0,
        message: `Supabase query warning: ${error.message}`,
        timestamp,
      }
    }

    return {
      status: 'Ready',
      latencyMs,
      sampleCount: count ?? 12,
      message: `Connected to Supabase (${count ?? 0} Agent records fetched)`,
      timestamp,
    }
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - startTime)
    return {
      status: 'Error',
      latencyMs,
      sampleCount: 0,
      message: `Connection error: ${err?.message || 'Failed to reach Supabase'}`,
      timestamp,
    }
  }
}
