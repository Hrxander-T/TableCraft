import type { TableState } from '../types'
import { saveFile } from '../utils/fileSave'

// --- Export full table state as JSON ---
export async function exportJSON(state: TableState) {
  await saveFile(JSON.stringify(state, null, 2), `${state.title}.tablecraft.json`, 'application/json')
}


// --- Validate if parsed object is a valid TableState ---
function isValidTableState(obj: unknown): obj is TableState {
  if (!obj || typeof obj !== 'object') return false
  const s = obj as Record<string, unknown>
  return (
    typeof s.id === 'string' &&
    typeof s.title === 'string' &&
    typeof s.theme === 'string' &&
    Array.isArray(s.columns) &&
    Array.isArray(s.rows)
  )
}

// --- Import table state from JSON file ---
export function importJSON(file: File): Promise<TableState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string)
        if (!isValidTableState(parsed)) {
          reject(new Error('Not a valid TableCraft file'))
          return
        }
        resolve(parsed)
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.readAsText(file)
  })
}