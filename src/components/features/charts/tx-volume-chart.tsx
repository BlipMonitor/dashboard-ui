import { Subheading } from '@/components/ui/heading'
import { useAllTxVolume, useContractTxVolume } from '@/hooks/useMetrics'
import { formatNumber, formatShortDate } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface TxVolumeChartProps {
  contractId?: string
}

/**
 * TxVolumeChart component displays a line chart of transaction volume over time.
 * If contractId is provided, it shows data for a specific contract.
 */
function TxVolumeChart({ contractId }: TxVolumeChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: txVolumeData,
    isLoading,
    error,
  } = contractId ? useContractTxVolume(contractId, timeRange) : useAllTxVolume(timeRange)

  const renderSkeleton = () => (
    <div className="mt-14">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return txVolumeData?.intervalVolumes
      .slice()
      .reverse()
      .map((item) => ({
        date: formatShortDate(item.date),
        volume: item.transactionCount,
      }))
  }, [txVolumeData])

  const renderChart = () => {
    return (
      <div className="mt-14">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
              dataKey="volume"
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: '14px' }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fafafa',
                color: '#27272a',
                border: 'none',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [formatNumber(value), 'Volume']}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Transaction Volume Analytics</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
    </>
  )
}

export default TxVolumeChart
