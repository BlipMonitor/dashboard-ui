import { SavedContract, SavedContractResponse } from '@/lib/types'
import axiosInstance from '@/lib/utils/api'

/**
 * Service for managing saved contracts.
 */
export const savedContractAPI = {
  /**
   * Create a new saved contract.
   * @param {Object} data - The data for the new saved contract.
   * @param {string} data.contractId - The ID of the contract to be saved.
   * @param {string} [data.nickname] - Optional nickname for the saved contract.
   * @returns {Promise<SavedContract>} - The created saved contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  create: async (data: { contractId: string; nickname?: string }): Promise<SavedContract> => {
    try {
      const response = await axiosInstance.post('/saved-contracts', data)
      return response.data
    } catch (error) {
      console.error('Error creating saved contract:', error)
      throw new Error('Failed to create saved contract')
    }
  },

  /**
   * Get all saved contracts.
   * @returns {Promise<SavedContractResponse>} - A list of saved contracts.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAll: async (): Promise<SavedContractResponse> => {
    try {
      const response = await axiosInstance.get<SavedContractResponse>('/saved-contracts')
      return response.data
    } catch (error) {
      console.error('Error fetching saved contracts:', error)
      throw new Error('Failed to fetch saved contracts')
    }
  },

  /**
   * Get a saved contract by ID.
   * @param {string} id - The ID of the saved contract.
   * @returns {Promise<SavedContract>} - The saved contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  getById: async (id: string): Promise<SavedContract> => {
    try {
      const response = await axiosInstance.get<SavedContract>(`/saved-contracts/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching saved contract with ID ${id}:`, error)
      throw new Error('Failed to fetch saved contract')
    }
  },

  /**
   * Update a saved contract.
   * @param {string} id - The ID of the saved contract.
   * @param {Object} data - The data to update the saved contract.
   * @param {string} data.nickname - The new nickname for the saved contract.
   * @returns {Promise<SavedContract>} - The updated saved contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  update: async (id: string, data: { nickname: string }): Promise<SavedContract> => {
    try {
      const response = await axiosInstance.patch(`/saved-contracts/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating saved contract with ID ${id}:`, error)
      throw new Error('Failed to update saved contract')
    }
  },

  /**
   * Delete a saved contract.
   * @param {string} id - The ID of the saved contract.
   * @returns {Promise<void>}
   * @throws {Error} - Throws an error if the request fails.
   */
  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/saved-contracts/${id}`)
    } catch (error) {
      console.error(`Error deleting saved contract with ID ${id}:`, error)
      throw new Error('Failed to delete saved contract')
    }
  },

  /**
   * Set a saved contract as default.
   * @param {string} id - The ID of the saved contract.
   * @returns {Promise<void>}
   * @throws {Error} - Throws an error if the request fails.
   */
  setDefault: async (id: string): Promise<void> => {
    try {
      await axiosInstance.post(`/saved-contracts/${id}/set-default`, {})
    } catch (error) {
      console.error(`Error setting saved contract with ID ${id} as default:`, error)
      throw new Error('Failed to set default saved contract')
    }
  },
}
