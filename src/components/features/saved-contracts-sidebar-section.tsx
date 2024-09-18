import { SidebarItem, SidebarLabel, SidebarSection } from '@/components/ui/sidebar'
import { useSavedContractsStore } from '@/store/savedContract.store'
import { QrCodeIcon } from '@heroicons/react/16/solid'

interface SavedContractsSidebarSectionProps {
  category: 'analytics' | 'history'
}

function SavedContractsSidebarSection({ category }: SavedContractsSidebarSectionProps) {
  const { savedContracts } = useSavedContractsStore()

  return (
    <SidebarSection className="pl-6">
      <SidebarItem key={category} href={`/dashboard/${category}`}>
        All Contracts
      </SidebarItem>
      {savedContracts.map((contract) => (
        <SidebarItem key={contract.contractId} href={`/dashboard/${category}/contract/${contract.contractId}`}>
          <QrCodeIcon className="h-4 w-4" />
          <SidebarLabel>{contract.nickname}</SidebarLabel>
        </SidebarItem>
      ))}
    </SidebarSection>
  )
}

export default SavedContractsSidebarSection
