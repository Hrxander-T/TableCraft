import type { Column, Row } from '../types'
import { saveFile } from '../utils/fileSave'

// --- Export table data as CSV ---
export async function exportCSV(columns: Column[], rows: Row[], filename = 'table') {
  const header = columns.map((c) => `"${c.label}"`).join(',')
  const body = rows.map((r) => columns.map((c) => `"${r.cells[c.id] ?? ''}"`).join(',')).join('\n')
  await saveFile(header + '\n' + body, `${filename}.csv`, 'text/csv')
}