import { getEvents } from '@/data'
import type { Metadata } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Blip',
    default: 'Blip',
  },
  description: 'Real-time smart contract monitoring',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let events = await getEvents()

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>
}
