'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getEvents } from '@/data'
import type { Alert, Event } from '@/types/types'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Alerts() {
  const [events, setEvents] = useState<Event[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    async function fetchEvents() {
      let events = await getEvents()
      setEvents(events)
    }
    fetchEvents()
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
      if (message.type === 'alert') {
        const newAlert: Alert = message.data
        setAlerts((prevAlerts) => [newAlert, ...prevAlerts])
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
      {/* Recent alerts table */}
      <Heading>Recent Alerts</Heading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Details</TableHeader>
            <TableHeader>Created At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.slice(0, 10).map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.id}</TableCell>
              <TableCell>{alert.alertType}</TableCell>
              <TableCell>{alert.status}</TableCell>
              <TableCell>{JSON.stringify(alert.details)}</TableCell>
              <TableCell>{new Date(alert.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Events</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search events&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create event</Button>
      </div>
      <ul className="mt-10">
        {events.map((event, index) => (
          <>
            <li key={event.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={event.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link href={event.url} aria-hidden="true">
                      <Image
                        className="aspect-[3/2] rounded-lg shadow"
                        src={event.imgUrl}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={event.url}>{event.name}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="max-sm:hidden" color={event.status === 'On Sale' ? 'lime' : 'zinc'}>
                    {event.status}
                  </Badge>
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={event.url}>View</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}
