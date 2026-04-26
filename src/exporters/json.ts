import type { TableState } from '../types'
import { saveFile } from '../utils/fileSave'

// --- Export full table state as JSON ---
export async function exportJSON(state: TableState) {
  await saveFile(JSON.stringify(state, null, 2), `${state.title}.tablecraft.json`, 'application/json')
}

// --- Import table state from JSON file ---
export function importJSON(file: File): Promise<TableState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try { resolve(JSON.parse(e.target?.result as string)) }
      catch { reject(new Error('Invalid file')) }
    }
    reader.readAsText(file)
  })
}