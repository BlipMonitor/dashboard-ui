import { PaginatedResponse } from "./types";

/**
 * Represents a parameter for a Soroban contract.
 */
export interface Parameter {
  type: string;
  value: string;
}

/**
 * Represents a topic for a Soroban contract.
 */
export interface Topic {
  type: string;
  value: string;
}

/**
 * Represents a recent transaction for a Soroban contract.
 */
export interface RecentTransaction {
  contractId: string;
  contractNickname?: string;
  sourceAccount: string;
  transactionHash: string;
  ledgerSequence: number;
  createdAt: string;
  functionName: string;
  parameters: Parameter[];
  successful: boolean;
  feeCharged: number;
}

/**
 * Represents a recent event for a Soroban contract.
 */
export interface RecentEvent {
  contractId: string;
  contractNickname?: string;
  transactionHash: string;
  ledgerSequence: number;
  createdAt: string;
  eventType: string;
  topics: Topic[];
  data: any;
  successful: boolean;
  inSuccessfulContractCall: boolean;
}

/**
 * Represents a recent alert for a Soroban contract.
 */
export interface RecentAlert {
  contractId: string;
  contractNickname?: string;
  alertTime: string;
  totalTransactions: number;
  failedTransactions: number;
  errorRate: number;
}

/**
 * Represents the response for recent transactions of all contracts.
 */
export interface ContractRecentTxResponse extends PaginatedResponse {
  results: RecentTransaction[];
}

/**
 * Represents the response for recent events of a contract.
 */
export interface ContractRecentEventsResponse extends PaginatedResponse {
  results: RecentEvent[];
}

/**
 * Represents the response for recent alerts of all contracts.
 */
export interface ContractRecentAlertsResponse extends PaginatedResponse {
  results: RecentAlert[];
}