import { TimeRange } from '@/lib/types'
import { create } from 'zustand'

interface TimeRangeState {
  timeRange: TimeRange
  setTimeRange: (timeRange: TimeRange) => void
}

/**
 * Zustand store for managing the global time range state
 */
export const useTimeRangeStore = create<TimeRangeState>((set) => ({
  timeRange: TimeRange.WEEK_1,
  setTimeRange: (timeRange) => set({ timeRange }),
}))
