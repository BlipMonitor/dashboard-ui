import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { useDeleteSavedContract, useSavedContractById, useUpdateSavedContract } from '@/hooks/useSavedContracts'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation' // Changed from 'next/router' to 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

// Component to display the contract details
function ContractHeader({ contractId }: { contractId: string }) {
  const router = useRouter()
  const { data: savedContract, isLoading, error, refetch } = useSavedContractById(contractId)
  const [isEditing, setIsEditing] = useState(false)
  const [editedNickname, setEditedNickname] = useState(savedContract?.nickname || '')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const updateContractMutation = useUpdateSavedContract()
  const deleteContractMutation = useDeleteSavedContract()

  // Update editedNickname when savedContract changes
  useEffect(() => {
    if (savedContract) {
      setEditedNickname(savedContract.nickname || '')
    }
  }, [savedContract])

  if (isLoading) {
    return <Subheading>Loading contract details...</Subheading>
  }

  if (error) {
    return <Subheading>Failed to load contract details. Please try again later.</Subheading>
  }

  // Create a truncated version of the contract ID for display
  const truncatedId = `${contractId.slice(0, 6)}...${contractId.slice(-4)}`

  // Handler for initiating the edit mode
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Handler for saving the edited nickname
  const handleSave = () => {
    updateContractMutation.mutate(
      { id: contractId, data: { nickname: editedNickname } },
      {
        onSuccess: () => {
          setIsEditing(false)
          refetch() // Refresh the contract data to reflect changes
        },
      }
    )
  }

  // Handler for initiating the delete process
  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  // Handler for confirming and executing the delete action
  const confirmDelete = () => {
    deleteContractMutation.mutate(contractId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        router.push('/') // Redirect to home after successful deletion
      },
    })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {isEditing ? (
            <Input
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <Heading>
              {savedContract?.nickname || 'Contract'}{' '}
              <span className="cursor-help font-mono text-zinc-400">{truncatedId}</span>
            </Heading>
          )}
        </div>
        <div className="flex space-x-1">
          <button className="rounded-full p-2 hover:bg-gray-100" onClick={handleEdit}>
            <PencilIcon className="h-5 w-5 text-zinc-500" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100" onClick={handleDelete}>
            <TrashIcon className="h-5 w-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete Contract</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this contract? This action cannot be undone.
        </DialogDescription>
        <DialogBody>{/* Can add additional content here if needed */}</DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="red">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// Main Contract Details component that fetches contract details and displays them
export default function ContractDetails({ contractId }: { contractId: string }) {
  return (
    <Suspense fallback={<Subheading>Loading contract details...</Subheading>}>
      <ContractHeader contractId={contractId} />
    </Suspense>
  )
}
