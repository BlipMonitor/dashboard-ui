import axiosInstance from '@/lib/utils/api';
import {
  TransactionVolumeResponse,
  TransactionSuccessRateResponse,
  UniqueUsersResponse,
  TransactionFeesResponse,
  TopEventsResponse,
  TopUsersResponse,
  TimeRange,
  TransactionVolumeWithComparison,
  TransactionFeesWithComparison,
  UniqueUsersWithComparison,
  TransactionSuccessRateWithComparison,
  TopEvent,
  TopUser
} from '@/lib/types';

/**
 * Service for retrieving metrics data for Soroban contracts.
 */
export const metricsAPI = {
  /**
   * Get transaction volume for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionVolumeWithComparison>} - The transaction volume data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllTxVolume: async (timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionVolumeWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionVolumeWithComparison>('/metrics/tx-volume', {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction volume for all contracts:', error);
      throw new Error('Failed to fetch transaction volume');
    }
  },

  /**
   * Get transaction volume for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionVolumeWithComparison>} - The transaction volume data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractTxVolume: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionVolumeWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionVolumeWithComparison>(`/metrics/tx-volume/${contractId}`, {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction volume for contract ${contractId}:`, error);
      throw new Error('Failed to fetch transaction volume');
    }
  },

  /**
   * Get transaction success rate for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionSuccessRateWithComparison>} - The transaction success rate data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllTxSuccessRate: async (timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionSuccessRateWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionSuccessRateWithComparison>('/metrics/tx-success-rate', {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction success rate for all contracts:', error);
      throw new Error('Failed to fetch transaction success rate');
    }
  },

  /**
   * Get transaction success rate for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionSuccessRateWithComparison>} - The transaction success rate data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractTxSuccessRate: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionSuccessRateWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionSuccessRateWithComparison>(`/metrics/tx-success-rate/${contractId}`, {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction success rate for contract ${contractId}:`, error);
      throw new Error('Failed to fetch transaction success rate');
    }
  },

  /**
   * Get unique users for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<UniqueUsersWithComparison>} - The unique users data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllUniqueUsers: async (timeRange: TimeRange = TimeRange.WEEK_1): Promise<UniqueUsersWithComparison> => {
    try {
      const response = await axiosInstance.get<UniqueUsersWithComparison>('/metrics/unique-users', {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching unique users for all contracts:', error);
      throw new Error('Failed to fetch unique users');
    }
  },

  /**
   * Get unique users for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<UniqueUsersWithComparison>} - The unique users data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractUniqueUsers: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1): Promise<UniqueUsersWithComparison> => {
    try {
      const response = await axiosInstance.get<UniqueUsersWithComparison>(`/metrics/unique-users/${contractId}`, {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching unique users for contract ${contractId}:`, error);
      throw new Error('Failed to fetch unique users');
    }
  },

  /**
   * Get transaction fees for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionFeesWithComparison>} - The transaction fees data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllTxFees: async (timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionFeesWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionFeesWithComparison>('/metrics/tx-fees', {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction fees for all contracts:', error);
      throw new Error('Failed to fetch transaction fees');
    }
  },

  /**
   * Get transaction fees for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @returns {Promise<TransactionFeesWithComparison>} - The transaction fees data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractTxFees: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1): Promise<TransactionFeesWithComparison> => {
    try {
      const response = await axiosInstance.get<TransactionFeesWithComparison>(`/metrics/tx-fees/${contractId}`, {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction fees for contract ${contractId}:`, error);
      throw new Error('Failed to fetch transaction fees');
    }
  },

  /**
   * Get top events for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @param {number} [limit] - The maximum number of top events to return.
   * @returns {Promise<TopEvent[]>} - The top events data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllTopEvents: async (timeRange: TimeRange = TimeRange.WEEK_1, limit?: number): Promise<TopEvent[]> => {
    try {
      const response = await axiosInstance.get<TopEvent[]>('/metrics/top-events', {
        params: { timeRange, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top events for all contracts:', error);
      throw new Error('Failed to fetch top events');
    }
  },

  /**
   * Get top events for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @param {number} [limit] - The maximum number of top events to return.
   * @returns {Promise<TopEvent[]>} - The top events data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractTopEvents: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1, limit?: number): Promise<TopEvent[]> => {
    try {
      const response = await axiosInstance.get<TopEvent[]>(`/metrics/top-events/${contractId}`, {
        params: { timeRange, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching top events for contract ${contractId}:`, error);
      throw new Error('Failed to fetch top events');
    }
  },

  /**
   * Get top users for all contracts.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @param {number} [limit] - The maximum number of top users to return.
   * @returns {Promise<TopUser[]>} - The top users data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getAllTopUsers: async (timeRange: TimeRange = TimeRange.WEEK_1, limit?: number): Promise<TopUser[]> => {
    try {
      const response = await axiosInstance.get<TopUser[]>('/metrics/top-users', {
        params: { timeRange, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top users for all contracts:', error);
      throw new Error('Failed to fetch top users');
    }
  },

  /**
   * Get top users for a specific contract.
   * @param {string} contractId - The ID of the contract.
   * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
   * @param {number} [limit] - The maximum number of top users to return.
   * @returns {Promise<TopUser[]>} - The top users data.
   * @throws {Error} - Throws an error if the request fails.
   */
  getContractTopUsers: async (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1, limit?: number): Promise<TopUser[]> => {
    try {
      const response = await axiosInstance.get<TopUser[]>(`/metrics/top-users/${contractId}`, {
        params: { timeRange, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching top users for contract ${contractId}:`, error);
      throw new Error('Failed to fetch top users');
    }
  }
};