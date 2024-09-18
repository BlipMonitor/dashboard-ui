import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  } else {
    redirect('/sign-in')
  }

  // This return statement will never be reached, but it's needed to satisfy TypeScript
  return null
}
