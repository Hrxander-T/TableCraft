import { create } from 'zustand'

// --- UI preference types ---
type ViewMode = 'editor' | 'split' | 'preview'
type ColorMode = 'dark' | 'light'

interface UIStore {
  viewMode: ViewMode
  colorMode: ColorMode
  setViewMode: (mode: ViewMode) => void
  toggleColorMode: () => void
}

// --- UI store ---
export const useUIStore = create<UIStore>((set) => ({
  viewMode: 'split',
  colorMode: 'dark',
  setViewMode: (viewMode) => set({ viewMode }),
  toggleColorMode: () => set((s) => ({ colorMode: s.colorMode === 'dark' ? 'light' : 'dark' })),
}))