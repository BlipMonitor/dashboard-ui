import { Subheading } from '@/components/ui/heading'
import { Select } from '@/components/ui/select'
import { Stat } from '@/components/ui/stat'
import {
  useAllTxFees,
  useAllTxSuccessRate,
  useAllTxVolume,
  useAllUniqueUsers,
  useContractTxFees,
  useContractTxSuccessRate,
  useContractTxVolume,
  useContractUniqueUsers,
} from '@/hooks/useMetrics'
import { TimeRange } from '@/lib/types'
import { useTimeRangeStore } from '@/store/timeRange.store'

interface OverviewStatisticsGridProps {
  contractId?: string
}

/**
 * Component to display a grid of key metrics for the overview section
 * Fetches data from the metrics API and displays it in a grid
 */
export function OverviewStatisticsGrid({ contractId }: OverviewStatisticsGridProps) {
  const { timeRange, setTimeRange } = useTimeRangeStore()

  // Conditionally use hooks based on whether contractId is provided
  const { data: txVolumeData } = contractId ? useContractTxVolume(contractId, timeRange) : useAllTxVolume(timeRange)

  const { data: uniqueUsersData } = contractId
    ? useContractUniqueUsers(contractId, timeRange)
    : useAllUniqueUsers(timeRange)

  const { data: txSuccessRateData } = contractId
    ? useContractTxSuccessRate(contractId, timeRange)
    : useAllTxSuccessRate(timeRange)

  const { data: txFeesData } = contractId ? useContractTxFees(contractId, timeRange) : useAllTxFees(timeRange)

  // Updated helper function to format large numbers
  const formatNumber = (num: number, options: { isPercentage?: boolean; isStroop?: boolean } = {}) => {
    if (options.isPercentage) {
      return `${num.toFixed(2)}%`
    }
    if (options.isStroop) {
      const lumens = num / 10000000 // Convert stroops to lumens
      return `${lumens.toFixed(2)} XLM`
    }
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num)
  }

  // Updated helper function to format percentage with sign
  const formatPercentageWithSign = (num: number | null | undefined) => {
    if (num === undefined) return '-'
    if (num === null) return '+∞'
    const sign = num >= 0 ? '+' : ''
    return `${sign}${num.toFixed(2)}%`
  }

  // Updated helper function to get stat data
  const getStat = (
    data: any,
    valuePath: string[],
    changePath: string[],
    options: { isPercentage?: boolean; isStroop?: boolean } = {}
  ) => {
    const getValue = (obj: any, path: string[]) => path.reduce((acc, key) => acc && acc[key], obj)
    return {
      value: formatNumber(getValue(data, valuePath) || 0, options),
      change: formatPercentageWithSign(getValue(data, changePath)),
    }
  }

  return (
    <>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period" onChange={(e) => setTimeRange(e.target.value as TimeRange)} value={timeRange}>
            <option value={TimeRange.WEEK_1}>Last week</option>
            <option value={TimeRange.WEEK_2}>Last two weeks</option>
            <option value={TimeRange.MONTH_1}>Last month</option>
            <option value={TimeRange.MONTH_3}>Last three months</option>
            <option value={TimeRange.MONTH_6}>Last six months</option>
            <option value={TimeRange.YEAR_1}>All time</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Transaction volume"
          {...getStat(txVolumeData, ['totalVolume'], ['comparedTotalVolume', 'percentageChange'])}
        />
        <Stat
          title="Unique users"
          {...getStat(uniqueUsersData, ['totalUniqueUsers'], ['comparedTotalUniqueUsers', 'percentageChange'])}
        />
        <Stat
          title="Success rate"
          {...getStat(txSuccessRateData, ['overallSuccessRate'], ['comparedOverallSuccessRate', 'percentageChange'], {
            isPercentage: true,
          })}
        />
        <Stat
          title="Average gas usage"
          {...getStat(txFeesData, ['overallAvgFee'], ['comparedOverallAvgFee', 'percentageChange'], { isStroop: true })}
        />
      </div>
    </>
  )
}
