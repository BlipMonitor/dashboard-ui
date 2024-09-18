'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * QueryProvider component to provide a QueryClient to the application.
 * This ensures that all components within the application can use React Query.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the QueryClient.
 * @returns {JSX.Element} - The QueryClientProvider component.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Initialize the QueryClient with default options
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, // Retry failed requests twice before throwing an error
        refetchOnWindowFocus: false, // Disable refetching on window focus
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      },
    },
  }))
  
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}