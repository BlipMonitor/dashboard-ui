import { useQuery } from '@tanstack/react-query';
import { historyAPI } from '@/lib/services/history.service';
import {
  RecentTransaction,
  RecentEvent,
  RecentAlert,
} from '@/lib/types/history';

/**
 * Custom hook to fetch recent transactions for all contracts.
 * @param {number} [limit=10] - The maximum number of recent transactions to return.
 * @returns {object} - The query object containing the recent transactions data, loading state, and error state.
 */
export const useAllRecentTx = (limit: number = 10) => {
  return useQuery<RecentTransaction[], Error>({
    queryKey: ['allRecentTx', limit],
    queryFn: async () => {
      const response = await historyAPI.getAllContractsRecentTx(limit);
      return response as RecentTransaction[]; // Directly return the array
    },
  });
};

/**
 * Custom hook to fetch recent transactions for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {number} [limit=10] - The maximum number of recent transactions to return.
 * @returns {object} - The query object containing the recent transactions data, loading state, and error state.
 */
export const useContractRecentTx = (contractId: string, limit: number = 10) => {
  return useQuery<RecentTransaction[], Error>({
    queryKey: ['contractRecentTx', contractId, limit],
    queryFn: async () => {
      const response = await historyAPI.getContractRecentTx(contractId, limit);
      return response as RecentTransaction[]; // Directly return the array
    },
  });
};

/**
 * Custom hook to fetch recent events for all contracts.
 * @param {number} [limit=10] - The maximum number of recent events to return.
 * @returns {object} - The query object containing the recent events data, loading state, and error state.
 */
export const useAllRecentEvents = (limit: number = 10) => {
  return useQuery<RecentEvent[], Error>({
    queryKey: ['allRecentEvents', limit],
    queryFn: async () => {
      const response = await historyAPI.getAllContractsRecentEvents(limit);
      return response as RecentEvent[]; // Directly return the array
    },
  });
};

/**
 * Custom hook to fetch recent events for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {number} [limit=10] - The maximum number of recent events to return.
 * @returns {object} - The query object containing the recent events data, loading state, and error state.
 */
export const useContractRecentEvents = (contractId: string, limit: number = 10) => {
  return useQuery<RecentEvent[], Error>({
    queryKey: ['contractRecentEvents', contractId, limit],
    queryFn: async () => {
      const response = await historyAPI.getContractRecentEvents(contractId, limit);
      return response as RecentEvent[]; // Directly return the array
    },
  });
};

/**
 * Custom hook to fetch recent alerts for all contracts.
 * @param {number} [limit=10] - The maximum number of recent alerts to return.
 * @returns {object} - The query object containing the recent alerts data, loading state, and error state.
 */
export const useAllRecentAlerts = (limit: number = 10) => {
  return useQuery<RecentAlert[], Error>({
    queryKey: ['allRecentAlerts', limit],
    queryFn: async () => {
      const response = await historyAPI.getAllContractsRecentAlerts(limit);
      return response as RecentAlert[]; // Directly return the array
    },
  });
};

/**
 * Custom hook to fetch recent alerts for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {number} [limit=10] - The maximum number of recent alerts to return.
 * @returns {object} - The query object containing the recent alerts data, loading state, and error state.
 */
export const useContractRecentAlerts = (contractId: string, limit: number = 10) => {
  return useQuery<RecentAlert[], Error>({
    queryKey: ['contractRecentAlerts', contractId, limit],
    queryFn: async () => {
      const response = await historyAPI.getContractRecentAlerts(contractId, limit);
      return response as RecentAlert[]; // Directly return the array
    },
  });
};