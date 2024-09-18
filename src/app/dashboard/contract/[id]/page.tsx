'use client'

import AverageFeesChart from '@/components/features/charts/average-fees-chart'
import SuccessRateChart from '@/components/features/charts/success-rate-chart'
import TxVolumeChart from '@/components/features/charts/tx-volume-chart'
import UniqueUsersChart from '@/components/features/charts/unique-users-chart'
import ContractHeader from '@/components/features/contract/contract-header'
import { OverviewStatisticsGrid } from '@/components/features/overview-statistics-grid'
import RecentAlerts from '@/components/features/recent-alerts-table'
import RecentEvents from '@/components/features/recent-events-table'
import RecentTransactions from '@/components/features/recent-tx-table'
import TopEvents from '@/components/features/top-events-table'
import TopUsers from '@/components/features/top-users-table'
import { useParams } from 'next/navigation'

/**
 * Functional component representing the Contract Overview page.
 */
export default function ContractOverview() {
  const params = useParams()
  const contractId = params.id as string

  return (
    <>
      <ContractHeader contractId={contractId} />
      <OverviewStatisticsGrid contractId={contractId} />

      <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(15,_minmax(0,_1fr))]">
        <div className="relative sm:col-span-2 md:col-span-3 xl:col-span-8">
          <TxVolumeChart contractId={contractId} />
        </div>
        <div className="relative sm:col-span-2 md:col-span-3 xl:col-span-7">
          <RecentTransactions contractId={contractId} />
        </div>
      </div>
      <div className="relative grid gap-[17px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(15,_minmax(0,_1fr))]">
        <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-7">
          <RecentAlerts contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-1 xl:col-span-8">
          <SuccessRateChart contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
          <TopEvents contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
          <UniqueUsersChart contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
          <TopUsers contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-9">
          <AverageFeesChart contractId={contractId} />
        </div>
        <div className="relative sm:col-span-1 md:col-span-1 xl:col-span-6">
          <RecentEvents contractId={contractId} />
        </div>
      </div>
    </>
  )
}
