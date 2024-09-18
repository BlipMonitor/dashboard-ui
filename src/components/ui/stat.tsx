'use client'

import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { TimeRange } from '@/lib/types'
import { useTimeRangeStore } from '@/store/timeRange.store'

/**
 * Maps TimeRange to a human-readable string
 */
const timeRangeToString = (timeRange: TimeRange): string => {
  switch (timeRange) {
    case TimeRange.WEEK_1:
      return 'last week'
    case TimeRange.WEEK_2:
      return 'last two weeks'
    case TimeRange.MONTH_1:
      return 'last month'
    case TimeRange.MONTH_3:
      return 'last three months'
    case TimeRange.MONTH_6:
      return 'last six months'
    default:
      return 'previous period'
  }
}

/**
 * Functional component to display a statistical value with title, value, and change.
 * @param {string} title - The title of the statistic.
 * @param {string} value - The numerical value to display.
 * @param {string} change - The change percentage compared to the previous period.
 */
export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  const timeRange = useTimeRangeStore((state) => state.timeRange || TimeRange.WEEK_1)

  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from {timeRangeToString(timeRange)}</span>
      </div>
    </div>
  )
}
