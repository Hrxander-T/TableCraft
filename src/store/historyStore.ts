import { create } from 'zustand'
import type { TableState } from '../types'

// --- History store for undo/redo ---
interface HistoryStore {
    past: TableState[]
    future: TableState[]
    push: (state: TableState) => void
    undo: (current: TableState) => TableState | null
    redo: (current: TableState) => TableState | null
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    past: [],
    future: [],

    // --- Save snapshot to history ---
    push: (state) => set((s) => ({
        past: [...s.past.slice(-30), state],
        future: [],
    })),

    // --- Undo: return previous state ---
    undo: (current) => {
        const { past } = get()
        if (past.length === 0) return null
        const previous = past[past.length - 1]
        set((s) => ({
            past: s.past.slice(0, -1),
            future: [current, ...s.future],
        }))
        return previous
    },

    // --- Redo: return next state ---
    redo: (current) => {
        const { future } = get()
        if (future.length === 0) return null
        const next = future[0]
        set((s) => ({
            past: [...s.past, current],
            future: s.future.slice(1),
        }))
        return next
    },
}))