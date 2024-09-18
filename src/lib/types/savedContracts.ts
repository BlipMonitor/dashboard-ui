import { PaginatedResponse } from "./types";

/**
 * Represents a saved contract in the system.
 */
export interface SavedContract {
  contractId: string;
  nickname: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents the paginated response from the savedContractAPI.getAll() function.
 */
export interface SavedContractResponse extends PaginatedResponse {
  results: SavedContract[];
}