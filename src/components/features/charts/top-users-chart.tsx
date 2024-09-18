import { Subheading } from '@/components/ui/heading'
import { useAllTopUsers, useContractTopUsers } from '@/hooks/useMetrics'
import { formatNumber } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { useMemo } from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'

interface TopUsersChartProps {
  limit?: number
  contractId?: string
}

/**
 * TopUsersChart component displays a treemap of top users.
 * If contractId is provided, it shows data for a specific contract.
 */
function TopUsersChart({ limit = 10, contractId }: TopUsersChartProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const {
    data: topUsersData,
    isLoading,
    error,
  } = contractId ? useContractTopUsers(contractId, timeRange, limit) : useAllTopUsers(timeRange, limit)

  const renderSkeleton = () => (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={400}>
        <Treemap />
      </ResponsiveContainer>
    </div>
  )

  const chartData = useMemo(() => {
    return (
      topUsersData?.map((user) => ({
        name: contractId ? user.user : `${user.contractNickname}: ${user.user}`,
        size: user.transactionCount,
        color: '#fcd34d', // This will be overridden by the colorScale
      })) || []
    )
  }, [topUsersData, contractId])

  const colorScale = (value: number) => {
    const minValue = Math.min(...chartData.map((item) => item.size))
    const maxValue = Math.max(...chartData.map((item) => item.size))
    const normalizedValue = (value - minValue) / (maxValue - minValue)
    const r = Math.round(252 + (217 - 252) * normalizedValue)
    const g = Math.round(211 + (119 - 211) * normalizedValue)
    const b = Math.round(77 + (6 - 77) * normalizedValue)
    return `rgb(${r},${g},${b})`
  }

  const renderChart = () => {
    return (
      <div className="mt-14">
        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={chartData}
            dataKey="size"
            stroke="#fff"
            fill="#fcd34d"
            content={<CustomizedContent colors={colorScale} />}
          >
            <Tooltip
              content={<CustomTooltip />}
              contentStyle={{ border: 'none', borderRadius: '4px', padding: '10px 12px' }}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <>
      <div className="mt-14">
        <Subheading>Top Users</Subheading>
        {isLoading ? renderSkeleton() : renderChart()}
      </div>
    </>
  )
}

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name, size } = props

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors(size),
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      )}
    </g>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded bg-white p-2 shadow">
        <p className="font-semibold">{data.name}</p>
        <p>Transactions: {formatNumber(data.size)}</p>
      </div>
    )
  }
  return null
}

export default TopUsersChart
