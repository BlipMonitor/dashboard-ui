"use client";

import React, { useEffect, useState } from 'react';

interface LedgerRecord {
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

const RealTimeUpdates = () => {
  const [ledgerData, setLedgerData] = useState<LedgerRecord | null>(null);

  useEffect(() => {
    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (!websocketUrl) {
      console.error('WebSocket URL is not defined');
      return;
    }

    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'ledger') {
        setLedgerData(message.data);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Ledger Updates</h1>
      {ledgerData ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hash</th>
              <th>Previous Hash</th>
              <th>Sequence</th>
              <th>Successful Transactions</th>
              <th>Failed Transactions</th>
              <th>Operation Count</th>
              <th>Closed At</th>
              <th>Total Coins</th>
              <th>Fee Pool</th>
              <th>Base Fee (Stroops)</th>
              <th>Base Reserve (Stroops)</th>
              <th>Max TX Set Size</th>
              <th>Protocol Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ledgerData.id}</td>
              <td style={{ wordWrap: 'break-word' }}>{ledgerData.hash}</td>
              <td style={{ wordWrap: 'break-word' }}>{ledgerData.prev_hash}</td>
              <td>{ledgerData.sequence}</td>
              <td>{ledgerData.successful_transaction_count}</td>
              <td>{ledgerData.failed_transaction_count}</td>
              <td>{ledgerData.operation_count}</td>
              <td>{new Date(ledgerData.closed_at).toLocaleString()}</td>
              <td>{ledgerData.total_coins}</td>
              <td>{ledgerData.fee_pool}</td>
              <td>{ledgerData.base_fee_in_stroops}</td>
              <td>{ledgerData.base_reserve_in_stroops}</td>
              <td>{ledgerData.max_tx_set_size}</td>
              <td>{ledgerData.protocol_version}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default RealTimeUpdates;