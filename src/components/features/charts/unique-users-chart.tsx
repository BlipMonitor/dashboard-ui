import { Subheading } from '@/components/ui/heading'
import { useAllUniqueUsers, useContractUniqueUsers } from '@/hooks/useMetrics'
import { formatNumber, formatShortDate } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface UniqueUsersChartProps {
  contractId?: string
}

/**
 * UniqueUsersChart component displays a bar chart of unique users over time.
 * If contractId is provided, it shows data for a specific contract.
 */
function UniqueUsersChart({ contractId }: UniqueUsersChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: uniqueUsersData,
    isLoading,
    error,
  } = contractId ? useContractUniqueUsers(contractId, timeRange) : useAllUniqueUsers(timeRange)

  const renderSkeleton = () => (
    <div className="mt-14">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return uniqueUsersData?.intervalUniqueUsers
      .slice()
      .reverse()
      .map((item) => ({
        date: formatShortDate(item.date),
        users: item.uniqueUsers,
      }))
  }, [uniqueUsersData])

  const renderChart = () => {
    return (
      <div className="mt-12">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} horizontal={true} strokeDasharray="5 5" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              interval="equidistantPreserveStart"
              tickLine={false}
              tickMargin={10}
              angle={30}
              tick={{ fontSize: '14px' }}
            />
            <YAxis
              dataKey="users"
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
              formatter={(value: number) => [formatNumber(value), 'Unique Users']}
            />
            <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Unique Users Analytics</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
    </>
  )
}

export default UniqueUsersChart
