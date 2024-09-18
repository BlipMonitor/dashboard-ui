'use client'

import AverageFeesChart from '@/components/features/charts/average-fees-chart'
import SuccessRateChart from '@/components/features/charts/success-rate-chart'
import TxVolumeChart from '@/components/features/charts/tx-volume-chart'
import UniqueUsersChart from '@/components/features/charts/unique-users-chart'
import Greeting from '@/components/features/greeting'
import { OverviewStatisticsGrid } from '@/components/features/overview-statistics-grid'
import RecentAlerts from '@/components/features/recent-alerts-table'
import RecentEvents from '@/components/features/recent-events-table'
import RecentTransactions from '@/components/features/recent-tx-table'
import TopEvents from '@/components/features/top-events-table'
import TopUsers from '@/components/features/top-users-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, Label } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { useCreateSavedContract, useSavedContracts } from '@/hooks/useSavedContracts'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { data: savedContracts, isLoading } = useSavedContracts()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newContractName, setNewContractName] = useState('')
  const [newContractId, setNewContractId] = useState('')
  const createMutation = useCreateSavedContract()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && savedContracts && savedContracts.length === 0) {
      setIsDialogOpen(true)
    }
  }, [savedContracts, isLoading])

  const handleSaveNewContract = () => {
    createMutation.mutate(
      {
        contractId: newContractId,
        nickname: newContractName,
      },
      {
        onSuccess: (data) => {
          setIsDialogOpen(false)
          setNewContractName('')
          setNewContractId('')
          router.push(`/dashboard/contract/${data.contractId}`)
        },
      }
    )
  }

  if (isLoading) {
    return <div>Loading...</div> // Or a more sophisticated loading component
  }

  return (
    <>
      <Greeting />
      <OverviewStatisticsGrid />

      {savedContracts && savedContracts.length > 0 ? (
        <>
          <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(15,_minmax(0,_1fr))]">
            <div className="relative sm:col-span-2 md:col-span-3 xl:col-span-8">
              <TxVolumeChart />
            </div>
            <div className="relative sm:col-span-2 md:col-span-3 xl:col-span-7">
              <RecentTransactions />
            </div>
            <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-7">
              <RecentAlerts />
            </div>
            <div className="relative sm:col-span-1 md:col-span-1 xl:col-span-8">
              <SuccessRateChart />
            </div>
            <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
              <TopEvents />
            </div>
            <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
              <UniqueUsersChart />
            </div>
            <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-5">
              <TopUsers />
            </div>
            <div className="relative sm:col-span-1 md:col-span-2 xl:col-span-9">
              <AverageFeesChart />
            </div>
            <div className="relative sm:col-span-1 md:col-span-1 xl:col-span-6">
              <RecentEvents />
            </div>
          </div>
        </>
      ) : null}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add Your First Contract</DialogTitle>
        <DialogDescription>To get started, please add your first contract.</DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Contract Name</Label>
              <Input
                name="contractName"
                value={newContractName}
                onChange={(e) => setNewContractName(e.target.value)}
                placeholder="Enter contract name"
                autoFocus
              />
            </Field>
            <Field>
              <Label>Contract ID</Label>
              <Input
                name="contractId"
                value={newContractId}
                onChange={(e) => setNewContractId(e.target.value)}
                placeholder="Enter contract ID"
              />
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button onClick={handleSaveNewContract}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
