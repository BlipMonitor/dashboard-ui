import { create } from 'zustand'
import { SavedContract } from '@/lib/types/savedContracts'

interface SavedContractsState {
  savedContracts: SavedContract[]
  setSavedContracts: (contracts: SavedContract[]) => void
}

/**
 * Zustand store for saved contracts
 */
export const useSavedContractsStore = create<SavedContractsState>((set) => ({
  savedContracts: [],
  setSavedContracts: (contracts) => set({ savedContracts: contracts }),
}))
