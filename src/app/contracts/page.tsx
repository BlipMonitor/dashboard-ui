'use client'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getOrders } from '@/data'
import { ContractInteraction, Order } from '@/types/types'
import { useEffect, useState } from 'react'

export default function Orders() {
  const [contractInteractions, setContractInteractions] = useState<ContractInteraction[]>([])
  const [orders, setOrders] = useState<Order[]>([]) // Explicitly define the type

  useEffect(() => {
    async function fetchContractInteractions() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contract/events`)
        const data = await response.json()
        setContractInteractions(data)
      } catch (error) {
        console.error('Failed to fetch contract interactions:', error)
      }
    }

    fetchContractInteractions()
  }, [])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      {/* Recent contract interactions table */}
      <Heading>Recent Contract Interactions</Heading>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Contract</TableHeader>
            <TableHeader>Interaction</TableHeader>
            <TableHeader>Timestamp</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {contractInteractions.map((interaction) => (
            <TableRow key={interaction.id}>
              <TableCell>{interaction.id}</TableCell>
              <TableCell>{interaction.contractName}</TableCell>
              <TableCell>{interaction.interactionType}</TableCell>
              <TableCell>{new Date(interaction.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-14 flex items-end justify-between gap-4">
        <Heading>Orders</Heading>
        <Button className="-my-0.5">Create order</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
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