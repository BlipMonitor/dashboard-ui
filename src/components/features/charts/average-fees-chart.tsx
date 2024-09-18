import { Subheading } from '@/components/ui/heading'
import { useAllTxFees, useContractTxFees } from '@/hooks/useMetrics'
import { formatNumber, formatShortDate } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface AverageFeesChartProps {
  contractId?: string
}

function AverageFeesChart({ contractId }: AverageFeesChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: txFeesData,
    isLoading,
    error,
  } = contractId ? useContractTxFees(contractId, timeRange) : useAllTxFees(timeRange)

  const renderSkeleton = () => (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return txFeesData?.intervalFees
      .slice()
      .reverse()
      .map((item) => ({
        date: formatShortDate(item.date),
        totalFees: item.totalFees,
        avgFee: item.avgFee,
      }))
  }, [txFeesData])

  const renderChart = () => {
    return (
      <div className="mt-14">
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="5 5" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              interval="equidistantPreserveStart"
              tickLine={false}
              tickMargin={10}
              angle={30}
              tick={{ fontSize: '14px' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              interval="equidistantPreserveStart"
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: '14px' }}
              tickFormatter={(value) => formatNumber(value, { isStroop: true })}
              padding={{ top: 20 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              interval="equidistantPreserveStart"
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: '14px' }}
              tickFormatter={(value) => formatNumber(value, { isStroop: true })}
              domain={['dataMin - 5%', 'dataMax + 5%']}
              padding={{ top: 20 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fafafa',
                color: '#27272a',
                border: 'none',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'totalFees' || name === 'avgFee') {
                  return [formatNumber(value, { isStroop: true }), name === 'totalFees' ? 'Total Fees' : 'Avg Fee']
                }
                return [formatNumber(value, { isStroop: true }), name]
              }}
            />
            <Bar yAxisId="left" dataKey="totalFees" fill="#059669" radius={[4, 4, 0, 0]} name="Total Fees" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgFee"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="Avg Fee"
              activeDot={{ r: 6, fill: '#f59e0b' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Transaction Fees Analytics</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
      <style jsx global>{`
        :root {
          --tooltip-bg: #ffffff;
          --tooltip-text: #1f2937;
        }
        .dark {
          --tooltip-bg: #374151;
          --tooltip-text: #f3f4f6;
        }
      `}</style>
    </>
  )
}

export default AverageFeesChart
