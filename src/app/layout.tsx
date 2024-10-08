import { QueryProvider } from '@/lib/providers/queryProvider'
import '@/styles/tailwind.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - Blip',
    default: 'Blip',
  },
  description: 'Real-time smart contract monitoring',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html
        lang="en"
        className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
      >
        <head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
