import { Badge } from '@/components/ui/badge'
import { Subheading } from '@/components/ui/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAllRecentTx, useContractRecentTx } from '@/hooks/useHistory'
import { Limit } from '@/lib/types'
import { RecentTransaction } from '@/lib/types/history'
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
 * Function to convert stroops to lumens
 */
function convertStroopsToLumens(stroops: number) {
  const lumens = stroops / 10000000 // Convert stroops to lumens
  return `${lumens.toFixed(2)} XLM`
}

/**
 * Function to convert camel case to snake case
 */
function camelToSnakeCase(str: string) {
  return str?.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

interface RecentTransactionsProps {
  contractId?: string
}

/**
 * Component to display recent transactions
 * Fetches data from the history API and displays it in a table
 */
export default function RecentTransactions({ contractId }: RecentTransactionsProps) {
  const [limit, setLimit] = useState<Limit>(Limit.LIMIT_5)
  const { data, isLoading, error } = contractId ? useContractRecentTx(contractId, limit) : useAllRecentTx(limit)
  const [transactions, setTransactions] = useState<RecentTransaction[]>([])

  useEffect(() => {
    if (data) {
      setTransactions(data as RecentTransaction[])
    }
  }, [data])

  return (
    <div className="mt-14">
      <div className="flex items-start justify-between">
        <Subheading>Recent Transactions</Subheading>
        <Link href="/dashboard/all-transactions">
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
              <TableHeader>From</TableHeader>
              <TableHeader>Contract</TableHeader>
              <TableHeader>Function</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Fee Charged</TableHeader>
              <TableHeader className="text-right">Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-500">
                  Error loading transactions
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.transactionHash}>
                  <TableCell className="font-mono">
                    <Link href={`https://stellar.expert/explorer/public/tx/${tx.transactionHash}`} target="_blank">
                      {truncateHash(tx.transactionHash)}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono">
                    <Link href={`/accounts/${tx.sourceAccount}`}>{truncateHash(tx.sourceAccount)}</Link>
                  </TableCell>
                  <TableCell>{tx.contractNickname}</TableCell>
                  <TableCell>
                    {tx.parameters?.find((param) => param.type === 'Sym')?.value ||
                      camelToSnakeCase(tx?.functionName?.replace('HostFunctionTypeHostFunctionType', ''))}
                  </TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>{convertStroopsToLumens(tx.feeCharged)}</TableCell>
                  <TableCell className="text-right">
                    <Badge color={tx.successful ? 'lime' : 'pink'}>{tx.successful ? 'Success' : 'Failed'}</Badge>
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
