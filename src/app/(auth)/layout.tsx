import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - Blip',
    default: 'Blip',
  },
  description: 'Real-time smart contract monitoring',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">{children}</div>
      </div>
    </div>
  )
}
