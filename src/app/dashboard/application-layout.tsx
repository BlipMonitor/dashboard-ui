'use client'

import SavedContracts from '@/components/features/saved-contracts'
import { SidebarLayout } from '@/components/layout/sidebar-layout'
import { Avatar } from '@/components/ui/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/ui/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/ui/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/ui/sidebar'
import { getEvents } from '@/data'
import { useUserProfile } from '@/hooks/useProfile'
import { useUserTokenStore } from '@/store/profile.store'
import { useAuth, useClerk, useUser } from '@clerk/nextjs'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  ArrowTrendingUpIcon,
  BellAlertIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  TableCellsIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Assuming you have access to the environment variable
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@blip.watch'

const supportMailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent('Support Request: Feature Inquiry')}&body=${encodeURIComponent("Hello Blip Team,\n\nI need assistance with a particular feature. Specifically, I'm looking for help with...\n\nThank you for your time and support!")}`

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  const { signOut } = useClerk()

  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={() => signOut()}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Extract contractId from the URL if present
  const contractIdMatch = pathname.match(/\/dashboard\/contract\/([^\/]+)/)
  const contractId = contractIdMatch ? contractIdMatch[1] : undefined

  const isContractPage = pathname.startsWith('/dashboard/contract/')
  const baseUrl = isContractPage && contractId ? `/dashboard/contract/${contractId}` : '/dashboard'

  const analyticsUrl = `${baseUrl}${isContractPage ? '/analytics' : '/analytics'}`
  const historyUrl = `${baseUrl}${isContractPage ? '/history' : '/history'}`
  const alertsUrl = `${baseUrl}${isContractPage ? '/alerts' : '/alerts'}`

  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const clerk = useClerk()

  const setUserToken = useUserTokenStore((state) => state.setUserToken)
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile()

  const updateToken = async () => {
    if (isLoaded && user) {
      try {
        const currentToken = useUserTokenStore.getState().userToken
        const newToken = await getToken()

        if (currentToken !== newToken) {
          setUserToken(newToken)
        }

        return newToken
      } catch (error) {
        console.error('Error getting token:', error)
        setUserToken(null)
        return null
      }
    } else {
      setUserToken(null)
      return null
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const initializeToken = async () => {
      await updateToken()
      // Set up an interval to refresh the token every 1 minute
      intervalId = setInterval(updateToken, 1 * 60 * 1000)
    }

    initializeToken()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isLoaded, user, getToken, setUserToken])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                {isLoaded && user ? (
                  <Avatar src={user.imageUrl} alt={user.fullName || ''} />
                ) : (
                  <UserCircleIcon className="size-10" />
                )}
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SavedContracts />

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>

              <SidebarSpacer />
              <div className="hidden">
                <SidebarItem href={analyticsUrl} current={pathname.endsWith('/analytics')}>
                  <ArrowTrendingUpIcon />
                  <SidebarLabel>Analytics</SidebarLabel>
                </SidebarItem>
                <SidebarItem href={historyUrl} current={pathname.endsWith('/history')}>
                  <TableCellsIcon />
                  <SidebarLabel>History</SidebarLabel>
                </SidebarItem>
                <SidebarItem href={alertsUrl} current={pathname.endsWith('/alerts')}>
                  <BellAlertIcon />
                  <SidebarLabel>Alerts</SidebarLabel>
                </SidebarItem>
              </div>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href={supportMailtoLink}>
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href={process.env.NEXT_PUBLIC_LANDING_PAGE_URL}>
                <SparklesIcon />
                <SidebarLabel>blip.watch</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  {isLoaded && user ? (
                    <Avatar src={user.imageUrl} alt={user.fullName || ''} className="size-10" />
                  ) : (
                    <UserCircleIcon className="size-10" />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {isLoaded && user ? user.firstName : 'Loading...'}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {isLoaded && user ? user.primaryEmailAddress?.emailAddress : 'Loading...'}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
