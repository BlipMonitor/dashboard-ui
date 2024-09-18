import { useQuery } from '@tanstack/react-query';
import { metricsAPI } from '@/lib/services/metrics.service';
import {
  TransactionVolumeResponse,
  TransactionSuccessRateResponse,
  UniqueUsersResponse,
  TransactionFeesResponse,
  TopEventsResponse,
  TopUsersResponse,
  TimeRange,
  TransactionVolumeWithComparison,
  UniqueUsersWithComparison,
  TransactionFeesWithComparison,
  TransactionSuccessRateWithComparison,
  TopEvent,
  TopUser
} from '@/lib/types';

/**
 * Custom hook to fetch transaction volume for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction volume data, loading state, and error state.
 */
export const useAllTxVolume = (timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionVolumeWithComparison, Error>({
    queryKey: ['allTxVolume', timeRange],
    queryFn: () => metricsAPI.getAllTxVolume(timeRange),
  });
};

/**
 * Custom hook to fetch transaction volume for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction volume data, loading state, and error state.
 */
export const useContractTxVolume = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionVolumeWithComparison, Error>({
    queryKey: ['contractTxVolume', contractId, timeRange],
    queryFn: () => metricsAPI.getContractTxVolume(contractId, timeRange),
  });
};

/**
 * Custom hook to fetch transaction success rate for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction success rate data, loading state, and error state.
 */
export const useAllTxSuccessRate = (timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionSuccessRateWithComparison, Error>({
    queryKey: ['allTxSuccessRate', timeRange],
    queryFn: () => metricsAPI.getAllTxSuccessRate(timeRange),
  });
};

/**
 * Custom hook to fetch transaction success rate for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction success rate data, loading state, and error state.
 */
export const useContractTxSuccessRate = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionSuccessRateWithComparison, Error>({
    queryKey: ['contractTxSuccessRate', contractId, timeRange],
    queryFn: () => metricsAPI.getContractTxSuccessRate(contractId, timeRange),
  });
};

/**
 * Custom hook to fetch unique users for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the unique users data, loading state, and error state.
 */
export const useAllUniqueUsers = (timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<UniqueUsersWithComparison, Error>({
    queryKey: ['allUniqueUsers', timeRange],
    queryFn: () => metricsAPI.getAllUniqueUsers(timeRange),
  });
};

/**
 * Custom hook to fetch unique users for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the unique users data, loading state, and error state.
 */
export const useContractUniqueUsers = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<UniqueUsersWithComparison, Error>({
    queryKey: ['contractUniqueUsers', contractId, timeRange],
    queryFn: () => metricsAPI.getContractUniqueUsers(contractId, timeRange),
  });
};

/**
 * Custom hook to fetch transaction fees for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction fees data, loading state, and error state.
 */
export const useAllTxFees = (timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionFeesWithComparison, Error>({
    queryKey: ['allTxFees', timeRange],
    queryFn: () => metricsAPI.getAllTxFees(timeRange),
  });
};

/**
 * Custom hook to fetch transaction fees for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @returns {object} - The query object containing the transaction fees data, loading state, and error state.
 */
export const useContractTxFees = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1) => {
  return useQuery<TransactionFeesWithComparison, Error>({
    queryKey: ['contractTxFees', contractId, timeRange],
    queryFn: () => metricsAPI.getContractTxFees(contractId, timeRange),
  });
};

/**
 * Custom hook to fetch top events for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @param {number} [limit] - The maximum number of top events to return.
 * @returns {object} - The query object containing the top events data, loading state, and error state.
 */
export const useAllTopEvents = (timeRange: TimeRange = TimeRange.WEEK_1, limit?: number) => {
  return useQuery<TopEvent[], Error>({
    queryKey: ['allTopEvents', timeRange, limit],
    queryFn: () => metricsAPI.getAllTopEvents(timeRange, limit),
  });
};

/**
 * Custom hook to fetch top events for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @param {number} [limit] - The maximum number of top events to return.
 * @returns {object} - The query object containing the top events data, loading state, and error state.
 */
export const useContractTopEvents = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1, limit?: number) => {
  return useQuery<TopEvent[], Error>({
    queryKey: ['contractTopEvents', contractId, timeRange, limit],
    queryFn: () => metricsAPI.getContractTopEvents(contractId, timeRange, limit),
  });
};

/**
 * Custom hook to fetch top users for all contracts.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @param {number} [limit] - The maximum number of top users to return.
 * @returns {object} - The query object containing the top users data, loading state, and error state.
 */
export const useAllTopUsers = (timeRange: TimeRange = TimeRange.WEEK_1, limit?: number) => {
  return useQuery<TopUser[], Error>({
    queryKey: ['allTopUsers', timeRange, limit],
    queryFn: () => metricsAPI.getAllTopUsers(timeRange, limit),
  });
};

/**
 * Custom hook to fetch top users for a specific contract.
 * @param {string} contractId - The ID of the contract.
 * @param {TimeRange} [timeRange=TimeRange.WEEK_1] - The time range for the data.
 * @param {number} [limit] - The maximum number of top users to return.
 * @returns {object} - The query object containing the top users data, loading state, and error state.
 */
export const useContractTopUsers = (contractId: string, timeRange: TimeRange = TimeRange.WEEK_1, limit?: number) => {
  return useQuery<TopUser[], Error>({
    queryKey: ['contractTopUsers', contractId, timeRange, limit],
    queryFn: () => metricsAPI.getContractTopUsers(contractId, timeRange, limit),
  });
};