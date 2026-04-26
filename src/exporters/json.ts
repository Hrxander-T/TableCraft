import type { TableState } from '../types'

export function exportJSON(state: TableState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.download = `${state.title}.tablecraft.json`
  link.href = URL.createObjectURL(blob)
  link.click()
}

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