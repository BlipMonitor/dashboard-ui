import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/ui/dropdown'
import { Field, FieldGroup, Label } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { SidebarHeader, SidebarItem, SidebarLabel } from '@/components/ui/sidebar'
import { useCreateSavedContract, useSavedContracts } from '@/hooks/useSavedContracts'
import { SavedContract } from '@/lib/types/savedContracts'
import { useSavedContractsStore } from '@/store/savedContract.store'
import { QrCodeIcon } from '@heroicons/react/16/solid'
import { ChevronDownIcon, Cog8ToothIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation' // Changed from 'next/router' to 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Component to render a list of saved contracts.
 * Fetches saved contracts using the useSavedContracts hook and displays them in a dropdown.
 */
function SavedContractsList() {
  const { savedContracts } = useSavedContractsStore()

  return (
    <>
      {savedContracts.length === 0 ? (
        <DropdownItem disabled>
          <DropdownLabel>No saved contracts found</DropdownLabel>
        </DropdownItem>
      ) : (
        savedContracts.map((contract: SavedContract) => (
          <DropdownItem key={contract.contractId} href={`/dashboard/contract/${contract.contractId}`}>
            <QrCodeIcon />
            <DropdownLabel>{contract.nickname}</DropdownLabel>
          </DropdownItem>
        ))
      )}
    </>
  )
}

/**
 * Main component to manage saved contracts.
 * Provides options to create, update, delete, and set default saved contracts.
 */
function SavedContracts() {
  const router = useRouter()
  const createMutation = useCreateSavedContract()
  const { data: savedContracts, error } = useSavedContracts()
  const setSavedContracts = useSavedContractsStore((state) => state.setSavedContracts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newContractName, setNewContractName] = useState('')
  const [newContractId, setNewContractId] = useState('')

  useEffect(() => {
    if (savedContracts) {
      setSavedContracts(savedContracts)
    }
  }, [savedContracts, setSavedContracts])


  const handleNewContract = () => {
    setIsDialogOpen(true)
  }

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
          // Redirect to the new contract page
          router.push(`/dashboard/contract/${data.contractId}`)
        },
      }
    )
  }

  return (
    <div>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <Avatar 
              src="/teams/logo-dark.svg" 
              className="dark:hidden"
              outlined={false} 
            />
            <Avatar 
              src="/teams/logo-light.svg" 
              className="hidden dark:block"
              outlined={false} 
            />
            <SidebarLabel>Blip</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
            {/* <DropdownItem href={process.env.NEXT_PUBLIC_LANDING_PAGE_URL}>
              <Avatar src="/teams/catalyst.svg" outlined={false} className="size-6" />
              <DropdownLabel>Blip.watch</DropdownLabel>
            </DropdownItem> */}
            <DropdownDivider />
            <SavedContractsList />
            <DropdownDivider />
            <DropdownItem href="#" onClick={handleNewContract}>
              <PlusIcon />
              <DropdownLabel>New contract</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarHeader>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Contract</DialogTitle>
        <DialogDescription>Enter the details for the new contract you want to save.</DialogDescription>
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
          <Button plain onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveNewContract}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SavedContracts
