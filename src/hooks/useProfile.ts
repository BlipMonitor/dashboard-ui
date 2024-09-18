import { userProfileAPI } from '@/lib/services/profile.service'
import { UserProfile } from '@/lib/types'
import { useUserProfileStore, useUserTokenStore } from '@/store/profile.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**
 * Custom hook to fetch the current user's profile.
 * Uses React Query's useQuery to fetch data and manage caching.
 *
 * @returns {object} - The query object containing the user profile data, loading state, and error state.
 */
export const useUserProfile = () => {
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async (): Promise<UserProfile> => {
      const data: UserProfile = await userProfileAPI.getMe()
      setUserProfile(data)
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Custom hook to update the current user's profile.
 * Uses React Query's useMutation to handle the mutation and manage caching.
 *
 * @returns {object} - The mutation object containing the mutate function and mutation state.
 */
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userProfileAPI.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
    onError: (error: unknown) => {
      console.error('Error updating user profile:', error)
    },
  })
}

/**
 * Custom hook to manage user token.
 * @returns {object} - Object containing the user token and a function to set it.
 */
export const useUserToken = () => {
  const { userToken, setUserToken } = useUserTokenStore()

  return {
    userToken,
    setUserToken,
  }
}
