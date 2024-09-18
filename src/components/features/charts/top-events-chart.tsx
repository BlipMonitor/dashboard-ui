import { Subheading } from '@/components/ui/heading'
import { useAllTopEvents, useContractTopEvents } from '@/hooks/useMetrics'
import { formatNumber } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface TopEventsChartProps {
  limit?: number
  contractId?: string
}

/**
 * TopEventsChart component displays a horizontal bar chart of top events.
 * If contractId is provided, it shows data for a specific contract.
 */
function TopEventsChart({ limit = 10, contractId }: TopEventsChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: topEventsData,
    isLoading,
    error,
  } = contractId ? useContractTopEvents(contractId, timeRange, limit) : useAllTopEvents(timeRange, limit)

  const renderSkeleton = () => (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return (
      topEventsData?.map((event) => ({
        name: contractId ? event.eventName : `${event.contractNickname}: ${event.eventName}`,
        value: event.eventCount,
      })) || []
    )
  }, [topEventsData, contractId])

  const renderChart = () => {
    return (
      <div className="mt-14">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="5 5" horizontal={false} vertical={true} opacity={0.2} />
            <XAxis
              type="number"
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: '14px' }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              tickLine={false}
              tickMargin={20}
              tick={{ fontSize: '14px' }}
            />
            <Tooltip
              formatter={(value: number) => [formatNumber(value), 'Event Count']}
              contentStyle={{ border: 'none', borderRadius: '4px', padding: '10px 12px' }}
            />
            <Bar dataKey="value" fill="#c026d3" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Top Events</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
    </>
  )
}

export default TopEventsChart
