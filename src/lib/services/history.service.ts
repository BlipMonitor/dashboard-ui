import axiosInstance from '@/lib/utils/api';
import {
  RecentTransaction,
  RecentEvent,
  RecentAlert,
  ContractRecentTxResponse,
  ContractRecentEventsResponse,
  ContractRecentAlertsResponse
} from '@/lib/types/history';

/**
 * Service for retrieving historical data for Soroban contracts.
 */
export const historyAPI = {
  /**
   * Get recent transactions for all saved Soroban contracts.
   * @param {number} [limit=10] - Maximum number of recent transactions to return per contract.
   * @returns {Promise<RecentTransaction[]>} - Recent transactions for all contracts.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllContractsRecentTx: async (limit: number = 10): Promise<RecentTransaction[]> => {
    try { 
      const response = await axiosInstance.get<RecentTransaction[]>('/history/recent-tx', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent transactions for all contracts:', error);
      throw new Error('Failed to fetch recent transactions');
    }
  },

  /**
   * Get recent events for all saved Soroban contracts.
   * @param {number} [limit=10] - Maximum number of recent events to return per contract.
   * @returns {Promise<RecentEvent[]>} - Recent events for all contracts.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllContractsRecentEvents: async (limit: number = 10): Promise<RecentEvent[]> => {
    try {
      const response = await axiosInstance.get<RecentEvent[]>('/history/recent-events', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent events for all contracts:', error);
      throw new Error('Failed to fetch recent events');
    }
  },

  /**
   * Get recent alerts for all saved Soroban contracts.
   * @param {number} [limit=10] - Maximum number of recent alerts to return per contract.
   * @returns {Promise<RecentAlert[]>} - Recent alerts for all contracts.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllContractsRecentAlerts: async (limit: number = 10): Promise<RecentAlert[]> => {
    try {
      const response = await axiosInstance.get<RecentAlert[]>('/history/recent-alerts', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent alerts for all contracts:', error);
      throw new Error('Failed to fetch recent alerts');
    }
  },

  /**
   * Get recent transactions for a specific Soroban contract.
   * @param {string} contractId - The ID of the contract.
   * @param {number} [limit=10] - Maximum number of recent transactions to return.
   * @returns {Promise<RecentTransaction[]>} - Recent transactions for the specified contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractRecentTx: async (contractId: string, limit: number = 10): Promise<RecentTransaction[]> => {
    try {
      const response = await axiosInstance.get<RecentTransaction[]>(`/history/recent-tx/${contractId}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching recent transactions for contract ${contractId}:`, error);
      throw new Error('Failed to fetch recent transactions');
    }
  },

  /**
   * Get recent events for a specific Soroban contract.
   * @param {string} contractId - The ID of the contract.
   * @param {number} [limit=10] - Maximum number of recent events to return.
   * @returns {Promise<RecentEvent[]>} - Recent events for the specified contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractRecentEvents: async (contractId: string, limit: number = 10): Promise<RecentEvent[]> => {
    try {
      const response = await axiosInstance.get<RecentEvent[]>(`/history/recent-events/${contractId}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching recent events for contract ${contractId}:`, error);
      throw new Error('Failed to fetch recent events');
    }
  },

  /**
   * Get recent alerts for a specific Soroban contract.
   * @param {string} contractId - The ID of the contract.
   * @param {number} [limit=10] - Maximum number of recent alerts to return.
   * @returns {Promise<RecentAlert[]>} - Recent alerts for the specified contract.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractRecentAlerts: async (contractId: string, limit: number = 10): Promise<RecentAlert[]> => {
    try {
      const response = await axiosInstance.get<RecentAlert[]>(`/history/recent-alerts/${contractId}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching recent alerts for contract ${contractId}:`, error);
      throw new Error('Failed to fetch recent alerts');
    }
  }
};