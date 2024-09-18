import { Heading, Subheading } from '@/components/ui/heading'
import { useUser } from '@clerk/nextjs'
import { Suspense, useEffect, useMemo, useState } from 'react'

// Component to display the greeting message
function GreetingContent() {
  const { user, isLoaded } = useUser()
  const [greeting, setGreeting] = useState<string>('')

  useEffect(() => {
    // Function to determine the appropriate greeting based on the current time
    const getGreeting = (): string => {
      const hour = new Date().getHours()
      const name = isLoaded && user ? user.firstName || 'Developer' : 'Developer'
      if (hour < 12) return `Good morning, ${name}!`
      if (hour < 18) return `Good afternoon, ${name}!`
      return `Good evening, ${name}!`
    }

    setGreeting(getGreeting())
  }, [isLoaded, user])

  // Memoize the greeting to avoid unnecessary re-renders
  const memoizedGreeting = useMemo(() => greeting, [greeting])

  return <Heading>{memoizedGreeting}</Heading>
}

// Main Greeting component that fetches user profile and displays the greeting
export default function Greeting() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <Subheading>Hello!</Subheading>
  }

  if (!isSignedIn) {
    return <Subheading>Welcome, guest!</Subheading>
  }

  return (
    <Suspense fallback={<Subheading>Hello!</Subheading>}>
      <GreetingContent />
    </Suspense>
  )
}
