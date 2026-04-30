import type { TableState } from '../types'
  
const key = (id: string) => `tablecraft:autosave:${id}`


// --- Save state to localStorage ---
export function saveToLocal(state: TableState) {
  try { localStorage.setItem(key(state.id), JSON.stringify(state)) }
  catch { /* storage full */ }
}

// --- Load state from localStorage ---
export function loadFromLocal(id?: string): TableState | null {
  try {
    const k = id ? key(id) : 'tablecraft:autosave'
    const raw = localStorage.getItem(k)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

// --- Clear saved state ---
export function clearLocal(id: string) {
  localStorage.removeItem(key(id))
}