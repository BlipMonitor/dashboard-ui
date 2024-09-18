import { Subheading } from '@/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAllRecentAlerts, useContractRecentAlerts } from '@/hooks/useHistory'
import { Limit } from '@/lib/types'
import { RecentAlert } from '@/lib/types/history'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface RecentAlertsProps {
  contractId?: string
}

/**
 * Component to display recent alerts
 * Fetches data from the history API and displays it in a table
 */
export default function RecentAlerts({ contractId }: RecentAlertsProps) {
  const [limit, setLimit] = useState<Limit>(Limit.LIMIT_5)
  const { data, isLoading, error } = contractId ? useContractRecentAlerts(contractId, limit) : useAllRecentAlerts(limit)
  const [alerts, setAlerts] = useState<RecentAlert[]>([])

  useEffect(() => {
    if (data) {
      setAlerts(data as RecentAlert[])
    }
  }, [data])

  return (
    <div className="mt-14">
      <div className="flex items-start justify-between">
        <Subheading>Recent Alerts</Subheading>
        <Link href="/dashboard/all-alerts">
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
              <TableHeader>Contract</TableHeader>
              <TableHeader>Alert Time</TableHeader>
              <TableHeader>Failed Tx</TableHeader>
              <TableHeader>Error Rate</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                  Error loading alerts
                </TableCell>
              </TableRow>
            ) : alerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No alerts found
                </TableCell>
              </TableRow>
            ) : (
              alerts.map((alert) => (
                <TableRow key={`${alert.contractId}.${alert.alertTime}`}>
                  <TableCell>{alert.contractNickname}</TableCell>
                  <TableCell>
                    {new Date(alert.alertTime).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>{alert.failedTransactions}</TableCell>
                  <TableCell>{alert.errorRate.toFixed(2)}%</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
