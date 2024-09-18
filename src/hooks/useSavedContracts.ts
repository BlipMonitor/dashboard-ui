import { savedContractAPI } from '@/lib/services/savedContracts.service'
import { SavedContract, SavedContractResponse } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**
 * Custom hook to fetch all saved contracts.
 * Uses React Query's useQuery to fetch data and manage caching.
 *
 * @returns {object} - The query object containing the saved contracts data, loading state, and error state.
 */
export const useSavedContracts = () => {
  return useQuery({
    queryKey: ['savedContracts'],
    queryFn: async (): Promise<SavedContract[]> => {
      const data: SavedContractResponse = await savedContractAPI.getAll()
      // console.log('Fetched saved contracts:', data); // Log the response to inspect it
      if (!data || !Array.isArray(data.results)) {
        throw new Error('Unexpected response format')
      }
      return data.results.map((contract: SavedContract) => ({
        ...contract,
        contractId: contract.contractId,
        nickname: contract.nickname,
        isDefault: contract.isDefault,
        createdAt: contract.createdAt,
        updatedAt: contract.updatedAt,
      }))
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()), // Sort by date modified, descending
  })
}

/**
 * Custom hook to fetch a saved contract by ID.
 * Uses React Query's useQuery to fetch data and manage caching.
 *
 * @param {string} id - The ID of the saved contract to fetch.
 * @returns {object} - The query object containing the saved contract data, loading state, and error state.
 */
export const useSavedContractById = (id: string) => {
  return useQuery({
    queryKey: ['savedContract', id],
    queryFn: () => savedContractAPI.getById(id),
    enabled: !!id, // Only run the query if an ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Custom hook to create a new saved contract.
 * Uses React Query's useMutation to handle the mutation and manage caching.
 *
 * @returns {object} - The mutation object containing the mutate function and mutation state.
 */
export const useCreateSavedContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: savedContractAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedContracts'] })
    },
    onError: (error: unknown) => {
      console.error('Error creating saved contract:', error)
    },
  })
}

/**
 * Custom hook to update an existing saved contract.
 * Uses React Query's useMutation to handle the mutation and manage caching.
 *
 * @returns {object} - The mutation object containing the mutate function and mutation state.
 */
export const useUpdateSavedContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { nickname: string } }) => savedContractAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedContracts'] })
    },
    onError: (error: unknown) => {
      console.error('Error updating saved contract:', error)
    },
  })
}

/**
 * Custom hook to delete an existing saved contract.
 * Uses React Query's useMutation to handle the mutation and manage caching.
 *
 * @returns {object} - The mutation object containing the mutate function and mutation state.
 */
export const useDeleteSavedContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: savedContractAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedContracts'] })
    },
    onError: (error: unknown) => {
      console.error('Error deleting saved contract:', error)
    },
  })
}

/**
 * Custom hook to set a saved contract as the default.
 * Uses React Query's useMutation to handle the mutation and manage caching.
 *
 * @returns {object} - The mutation object containing the mutate function and mutation state.
 */
export const useSetDefaultSavedContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: savedContractAPI.setDefault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedContracts'] })
    },
    onError: (error: unknown) => {
      console.error('Error setting default saved contract:', error)
    },
  })
}
