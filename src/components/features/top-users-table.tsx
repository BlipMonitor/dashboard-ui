import { Subheading } from '@/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAllTopUsers, useContractTopUsers } from '@/hooks/useMetrics'
import { TopUser } from '@/lib/types'
import { truncateHash } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface TopUsersProps {
  contractId?: string
}

/**
 * Component to display top users
 * Fetches data from the metrics API and displays it in a table
 */
export default function TopUsers({ contractId }: TopUsersProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const [limit, setLimit] = useState<number>(5)
  const { data, isLoading, error } = contractId
    ? useContractTopUsers(contractId, timeRange, limit)
    : useAllTopUsers(timeRange, limit)

  const [topUsers, setTopUsers] = useState<TopUser[]>([])

  useEffect(() => {
    if (data) {
      setTopUsers(data as TopUser[])
    }
  }, [data])

  return (
    <div className="mt-14">
      {/* <div className="mt-14 flex items-end justify-between">
        <Subheading>Top Users</Subheading>
        <div className="flex gap-4">
          <Select
            name="timeRange"
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            value={timeRange}
          >
            <option value={TimeRange.WEEK_1}>Last week</option>
            <option value={TimeRange.WEEK_2}>Last two weeks</option>
            <option value={TimeRange.MONTH_1}>Last month</option>
            <option value={TimeRange.MONTH_3}>Last quarter</option>
          </Select>
          <Select
            name="limit"
            onChange={(e) => setLimit(Number(e.target.value))}
            value={limit}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </div>
      </div> */}
      <div className="flex items-start justify-between">
        <Subheading>Top Users</Subheading>
        <Link href="/dashboard/all-top-users">
          <Button outline className="flex items-center gap-x-3">
            <span>View more</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex-grow overflow-auto">
        <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>User</TableHeader>
              <TableHeader className="text-right">Transaction Count</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-red-500">
                  Error loading top users
                </TableCell>
              </TableRow>
            ) : topUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No top users found
                </TableCell>
              </TableRow>
            ) : (
              topUsers.map((user: TopUser) => (
                <TableRow key={`${user.contractId}.${user.user}`}>
                  <TableCell className="font-mono">{truncateHash(user.user)}</TableCell>
                  <TableCell className="text-right">{user.transactionCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
