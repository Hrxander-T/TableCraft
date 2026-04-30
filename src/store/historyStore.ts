import { create } from 'zustand'
import type { TableState } from '../types'

// --- Per-tab history ---
interface TabHistory {
  past: TableState[]
  future: TableState[]
}

interface HistoryStore {
  tabs: Record<string, TabHistory>
  push: (tabId: string, state: TableState) => void
  undo: (tabId: string, current: TableState) => TableState | null
  redo: (tabId: string, current: TableState) => TableState | null
  clear: (tabId: string) => void
}

function emptyHistory(): TabHistory {
  return { past: [], future: [] }
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  tabs: {},

  // --- Save snapshot for a tab ---
  push: (tabId, state) => set((s) => {
    const tab = s.tabs[tabId] ?? emptyHistory()
    return {
      tabs: {
        ...s.tabs,
        [tabId]: {
          past: [...tab.past.slice(-30), state],
          future: [],
        },
      },
    }
  }),

  // --- Undo for a tab ---
  undo: (tabId, current) => {
    const tab = get().tabs[tabId] ?? emptyHistory()
    if (tab.past.length === 0) return null
    const previous = tab.past[tab.past.length - 1]
    set((s) => ({
      tabs: {
        ...s.tabs,
        [tabId]: {
          past: tab.past.slice(0, -1),
          future: [current, ...tab.future],
        },
      },
    }))
    return previous
  },

  // --- Redo for a tab ---
  redo: (tabId, current) => {
    const tab = get().tabs[tabId] ?? emptyHistory()
    if (tab.future.length === 0) return null
    const next = tab.future[0]
    set((s) => ({
      tabs: {
        ...s.tabs,
        [tabId]: {
          past: [...tab.past, current],
          future: tab.future.slice(1),
        },
      },
    }))
    return next
  },

  // --- Clear history for a tab ---
  clear: (tabId) => set((s) => ({
    tabs: { ...s.tabs, [tabId]: emptyHistory() },
  })),
}))