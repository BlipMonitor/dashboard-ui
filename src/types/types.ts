/**
 * Represents the structure of a ledger record.
 */
export interface LedgerRecord {
  id: string;
  paging_token: string;
  hash: string;
  prev_hash: string;
  sequence: number;
  successful_transaction_count: number;
  failed_transaction_count: number;
  operation_count: number;
  tx_set_operation_count: number | null;
  closed_at: string;
  total_coins: string;
  fee_pool: string;
  base_fee_in_stroops: number;
  base_reserve_in_stroops: number;
  max_tx_set_size: number;
  protocol_version: number;
  header_xdr: string;
}

/**
 * Represents the structure of a contract interaction.
 */
export interface ContractInteraction {
  id: string;
  contractName: string;
  interactionType: string;
  timestamp: string;
}

export interface Order {
  id: number;
  url: string;
  date: string;
  amount: {
    usd: string;
    cad: string;
    fee: string;
    net: string;
  };
  payment: {
    transactionId: string;
    card: {
      number: string;
      type: string;
      expiry: string;
    };
  };
  customer: {
    name: string;
  };
  event: {
    thumbUrl: string;
    name: string;
  };
}