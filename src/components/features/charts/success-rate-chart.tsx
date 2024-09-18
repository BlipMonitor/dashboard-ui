import { Subheading } from '@/components/ui/heading'
import { useAllTxSuccessRate, useContractTxSuccessRate } from '@/hooks/useMetrics'
import { formatNumber, formatShortDate } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface SuccessRateChartProps {
  contractId?: string
}

/**
 * SuccessRateChart component displays an area chart of transaction success rate over time.
 * If contractId is provided, it shows data for a specific contract.
 */
function SuccessRateChart({ contractId }: SuccessRateChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: successRateData,
    isLoading,
    error,
  } = contractId ? useContractTxSuccessRate(contractId, timeRange) : useAllTxSuccessRate(timeRange)

  const renderSkeleton = () => (
    <div className="mt-14">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return successRateData?.intervalSuccessRates
      .slice()
      .reverse()
      .map((item) => ({
        date: formatShortDate(item.date),
        successRate: item.intervalSuccessRate,
      }))
  }, [successRateData])

  const calculateDomainMin = useMemo(() => {
    if (!chartData || chartData.length === 0) return 0
    const minValue = Math.min(...chartData.map((item) => item.successRate))
    const floorToTens = Math.floor(minValue / 10) * 10
    return Math.min(Math.max(floorToTens, 0), 99)
  }, [chartData])

  const renderChart = () => {
    return (
      <div className="mt-14">
        <ResponsiveContainer width={'100%'} height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={true} horizontal={false} strokeDasharray="5 5" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              interval="equidistantPreserveStart"
              tickLine={false}
              tickMargin={10}
              angle={30}
              tick={{ fontSize: '14px' }}
            />
            <YAxis
              dataKey="successRate"
              tickLine={false}
              tick={{ fontSize: '14px' }}
              tickFormatter={(value) => formatNumber(value, { isPercentage: true })}
              domain={[calculateDomainMin, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fafafa',
                color: '#27272a',
                border: 'none',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [formatNumber(value, { isPercentage: true }), 'Success Rate']}
            />
            <Area
              type="monotone"
              dataKey="successRate"
              stroke="#14b8a6"
              fill="#5eead4"
              fillOpacity={0.2}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#14b8a6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Transaction Success Rate Analytics</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
    </>
  )
}

export default SuccessRateChart
