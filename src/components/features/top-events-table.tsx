import { Subheading } from '@/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAllTopEvents, useContractTopEvents } from '@/hooks/useMetrics'
import { TopEvent } from '@/lib/types'
import { truncateHash } from '@/lib/utils/formatters'
import { useTimeRangeStore } from '@/store/timeRange.store'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface TopEventsProps {
  contractId?: string
}

/**
 * Component to display top events
 * Fetches data from the metrics API and displays it in a table
 */
export default function TopEvents({ contractId }: TopEventsProps) {
  const timeRange = useTimeRangeStore((state) => state.timeRange)
  const [limit, setLimit] = useState<number>(5)
  const { data, isLoading, error } = contractId
    ? useContractTopEvents(contractId, timeRange, limit)
    : useAllTopEvents(timeRange, limit)
  const [topEvents, setTopEvents] = useState<TopEvent[]>([])

  useEffect(() => {
    if (data) {
      setTopEvents(data as TopEvent[])
    }
  }, [data])

  return (
    <div className="mt-14">
      {/* <div className="mt-14 flex items-end justify-between">
        <Subheading>Top Events</Subheading>
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
        <Subheading>Top Events</Subheading>
        <Link href="/dashboard/all-top-events">
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
              <TableHeader>Event Name</TableHeader>
              <TableHeader className="text-right">Event Count</TableHeader>
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
                  Error loading top events
                </TableCell>
              </TableRow>
            ) : topEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No top events found
                </TableCell>
              </TableRow>
            ) : (
              topEvents.map((event: TopEvent) => (
                <TableRow key={`${event.contractId}.${event.eventName}`}>
                  <TableCell
                    className={event?.eventName?.length === 56 || event?.eventName?.length === 64 ? 'font-mono' : ''}
                  >
                    {event?.eventName?.length === 56 || event?.eventName?.length === 64
                      ? truncateHash(event?.eventName)
                      : event?.eventName}
                  </TableCell>
                  <TableCell className="text-right">{event.eventCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
