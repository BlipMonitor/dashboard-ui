import { create } from 'zustand'
import { Limit } from '@/lib/types'

interface LimitState {
  limit: Limit
  setLimit: (limit: Limit) => void
}

/**
 * Zustand store for managing the global limit state
 */
export const useLimitStore = create<LimitState>((set) => ({
  limit: Limit.LIMIT_10,
  setLimit: (limit) => set({ limit }),
}))
