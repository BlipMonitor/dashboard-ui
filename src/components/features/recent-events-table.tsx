import { Badge } from '@/components/ui/badge'
import { Subheading } from '@/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Text } from '@/components/ui/text'
import { useAllRecentEvents, useContractRecentEvents } from '@/hooks/useHistory'
import { Limit } from '@/lib/types'
import { RecentEvent } from '@/lib/types/history'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

/**
 * Function to truncate the transaction hash
 */
function truncateHash(hash: string) {
  if (hash.length <= 12) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`
}

/**
 * Function to render topics
 */
function renderTopics(event: RecentEvent) {
  const relevantTopics = event.topics.filter((topic) => topic.type === 'Sym')

  return (
    <div className="flex flex-col">
      {relevantTopics.map((topic, index) => (
        <Text className={topic.value.length >= 64 ? 'font-mono' : ''}>{topic.value}</Text>
      ))}
    </div>
  )
}

interface RecentEventsProps {
  contractId?: string
}

/**
 * Component to display recent events
 * Fetches data from the history API and displays it in a table
 */
export default function RecentEvents({ contractId }: RecentEventsProps) {
  const [limit, setLimit] = useState<Limit>(Limit.LIMIT_5)
  const { data, isLoading, error } = contractId ? useContractRecentEvents(contractId, limit) : useAllRecentEvents(limit)
  const [events, setEvents] = useState<RecentEvent[]>([])

  useEffect(() => {
    if (data) {
      setEvents(data as RecentEvent[])
    }
  }, [data])

  return (
    <div className="mt-14">
      <div className="flex items-start justify-between">
        <Subheading>Recent Events</Subheading>
        <Link href="/dashboard/all-events">
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
              <TableHeader>Transaction Hash</TableHeader>
              <TableHeader>Contract</TableHeader>
              <TableHeader>Event</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader className="text-right">Tx Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500">
                  Error loading events
                </TableCell>
              </TableRow>
            ) : events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow
                  key={`${event.transactionHash}.${event.eventType}.${event.topics.map((topic) => topic.value).join('.')}`}
                >
                  <TableCell className="font-mono">
                    <Link href={`https://stellar.expert/explorer/public/tx/${event.transactionHash}`} target="_blank">
                      {truncateHash(event.transactionHash)}
                    </Link>
                  </TableCell>
                  <TableCell>{event.contractNickname}</TableCell>
                  <TableCell>{renderTopics(event)}</TableCell>
                  <TableCell>
                    {new Date(event.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge color={event.inSuccessfulContractCall ? 'lime' : 'pink'}>
                      {event.inSuccessfulContractCall ? 'Success' : 'Failed'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
