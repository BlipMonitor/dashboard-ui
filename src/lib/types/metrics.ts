import { PaginatedResponse } from "./types";

/**
 * Represents a metric comparison between two time periods.
 */
export interface ComparedMetric {
  previousCount: number | null;
  absoluteChange: number;
  percentageChange: number | null;
}

/**
 * Represents transaction volume for a specific interval.
 */
export interface IntervalTransactionVolume {
  date: string;
  transactionCount: number;
}

/**
 * Represents transaction volume data with comparison to a previous period.
 */
export interface TransactionVolumeWithComparison {
  intervalVolumes: IntervalTransactionVolume[];
  totalVolume: number;
  comparedTotalVolume: ComparedMetric;
}

/**
 * Represents transaction success rate for a specific interval.
 */
export interface IntervalTransactionSuccessRate {
  date: string;
  transactionCount: number;
  successfulTransactions: number;
  failedTransactions: number;
  intervalSuccessRate: number;
  intervalFailureRate: number;
}

/**
 * Represents transaction success rate data with comparison to a previous period.
 */
export interface TransactionSuccessRateWithComparison {
  intervalSuccessRates: IntervalTransactionSuccessRate[];
  totalTransactions: number;
  totalSuccessful: number;
  totalFailed: number;
  overallSuccessRate: number;
  overallFailureRate: number;
  comparedTotalTransactions: ComparedMetric;
  comparedTotalSuccessful: ComparedMetric;
  comparedTotalFailed: ComparedMetric;
  comparedOverallSuccessRate: ComparedMetric;
  comparedOverallFailureRate: ComparedMetric;
}

/**
 * Represents unique users data for a specific interval.
 */
export interface IntervalUniqueUsers {
  date: string;
  uniqueUsers: number;
}

/**
 * Represents unique users data with comparison to a previous period.
 */
export interface UniqueUsersWithComparison {
  intervalUniqueUsers: IntervalUniqueUsers[];
  totalUniqueUsers: number;
  comparedTotalUniqueUsers: ComparedMetric;
}

/**
 * Represents transaction fees data for a specific interval.
 */
export interface IntervalTransactionFees {
  date: string;
  totalFees: number;
  avgFee: number;
  transactionCount: number;
}

/**
 * Represents transaction fees data with comparison to a previous period.
 */
export interface TransactionFeesWithComparison {
  intervalFees: IntervalTransactionFees[];
  totalFees: number;
  avgFee: number;
  totalTransactions: number;
  comparedTotalFees: ComparedMetric;
  comparedAvgFee: ComparedMetric;
  comparedTotalTransactions: ComparedMetric;
}

/**
 * Represents data for a top event in the system.
 */
export interface TopEvent {
  contractId: string;
  contractNickname: string;
  eventName: string;
  eventCount: number;
  compared: ComparedMetric;
}

/**
 * Represents data for a top user in the system.
 */
export interface TopUser {
  contractId: string;
  contractNickname: string;
  user: string;
  transactionCount: number;
  compared: ComparedMetric;
}

/**
 * Represents the response for a transaction volume metric.
 */
export interface TransactionVolumeResponse extends PaginatedResponse {
  transactionVolume: TransactionVolumeWithComparison;
}

/**
 * Represents the response for a transaction success rate metric.
 */
export interface TransactionSuccessRateResponse extends PaginatedResponse {
  transactionSuccessRate: TransactionSuccessRateWithComparison;
}

/**
 * Represents the response for a unique users metric.
 */
export interface UniqueUsersResponse extends PaginatedResponse {
  uniqueUsers: UniqueUsersWithComparison;
}

/**
 * Represents the response for a transaction fees metric.
 */
export interface TransactionFeesResponse extends PaginatedResponse {
  transactionFees: TransactionFeesWithComparison;
}

/**
 * Represents the response for a top events metric.
 */
export interface TopEventsResponse extends PaginatedResponse {
  topEvents: TopEvent[];
}

/**
 * Represents the response for a top users metric.
 */
export interface TopUsersResponse extends PaginatedResponse {
  topUsers: TopUser[];
}