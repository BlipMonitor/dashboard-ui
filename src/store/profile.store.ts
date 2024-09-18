import { UserProfile } from '@/lib/types'
import { create } from 'zustand'
import { useClerk } from '@clerk/nextjs'

interface UserProfileState {
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile | null) => void
}

interface UserTokenState {
  userToken: string | null
  setUserToken: (token: string | null) => void
  refreshToken: () => Promise<string | null>
}

/**
 * Zustand store for user profile
 */
export const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}))

/**
 * Zustand store for user token
 */
export const useUserTokenStore = create<UserTokenState>((set) => ({
  userToken: null,
  setUserToken: (token) => set({ userToken: token }),
  refreshToken: async () => {
    const clerk = useClerk()
    try {
      const token = await clerk.session?.getToken()
      if (token) {
        set({ userToken: token })
        return token
      }
      // If token is undefined, set userToken to null and return null
      set({ userToken: null })
      return null
    } catch (error) {
      console.error('Error refreshing token:', error)
      set({ userToken: null })
      return null
    }
  },
}))
