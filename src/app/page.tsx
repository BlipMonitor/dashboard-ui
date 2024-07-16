'use client'

import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Stat } from '@/components/stat'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'
import { LedgerRecord, Order } from '@/types/types'
import { useEffect, useState } from 'react'

/**
 * Functional component representing the Home page.
 */
export default function Home() {
  const [orders, setOrders] = useState<Order[]>([])
  const [ledgerData, setLedgerData] = useState<LedgerRecord[]>([])

  useEffect(() => {
    async function fetchOrders() {
      let orders = await getRecentOrders()
      setOrders(orders)
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!websocketUrl) {
      console.error('WebSocket URL is not defined')
      return
    }

    const ws = new WebSocket(websocketUrl)

    ws.onopen = () => {
      console.log('WebSocket connection established')
    }

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data)
      const message = JSON.parse(event.data)
      if (message.type === 'ledger') {
        const updatedLedger = message.data
        setLedgerData((prevLedgers) => {
          const existingLedgerIndex = prevLedgers.findIndex((ledger) => ledger.id === updatedLedger.id)
          if (existingLedgerIndex !== -1) {
            const updatedLedgers = [...prevLedgers]
            updatedLedgers[existingLedgerIndex] = updatedLedger
            return updatedLedgers
          } else {
            return [updatedLedger, ...prevLedgers]
          }
        })
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <Heading>Good afternoon, Bhaven</Heading>

      {/* Overview section with select dropdown */}
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>

      {/* Statistics grid */}
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>

      {/* Recent ledger data table */}
      <Subheading className="mt-14">Recent ledger data</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Hash</TableHeader>
            <TableHeader>Previous Hash</TableHeader>
            <TableHeader>Sequence</TableHeader>
            <TableHeader>Successful Transactions</TableHeader>
            <TableHeader>Failed Transactions</TableHeader>
            <TableHeader>Operation Count</TableHeader>
            <TableHeader>TX Set Operation Count</TableHeader>
            <TableHeader>Closed At</TableHeader>
            <TableHeader>Total Coins</TableHeader>
            <TableHeader>Fee Pool</TableHeader>
            <TableHeader>Base Fee (Stroops)</TableHeader>
            <TableHeader>Base Reserve (Stroops)</TableHeader>
            <TableHeader>Max TX Set Size</TableHeader>
            <TableHeader>Protocol Version</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {ledgerData.slice(0, 10).map((ledger) => (
            <TableRow key={ledger.id} href={ledger.paging_token} title={`Ledger #${ledger.id}`}>
              <TableCell>{ledger.id}</TableCell>
              <TableCell>{ledger.hash}</TableCell>
              <TableCell>{ledger.prev_hash}</TableCell>
              <TableCell>{ledger.sequence}</TableCell>
              <TableCell>{ledger.successful_transaction_count}</TableCell>
              <TableCell>{ledger.failed_transaction_count}</TableCell>
              <TableCell>{ledger.operation_count}</TableCell>
              <TableCell>{ledger.tx_set_operation_count}</TableCell>
              <TableCell>{new Date(ledger.closed_at).toLocaleString()}</TableCell>
              <TableCell>{ledger.total_coins}</TableCell>
              <TableCell>{ledger.fee_pool}</TableCell>
              <TableCell>{ledger.base_fee_in_stroops}</TableCell>
              <TableCell>{ledger.base_reserve_in_stroops}</TableCell>
              <TableCell>{ledger.max_tx_set_size}</TableCell>
              <TableCell>{ledger.protocol_version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
