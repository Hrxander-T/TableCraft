import type { Column, Row } from '../types'
import { nanoid } from 'nanoid'

// --- Parse CSV text into columns and rows ---
export function parseCSV(text: string): { columns: Column[]; rows: Row[] } {
  const lines = text.trim().split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return { columns: [], rows: [] }

  // --- Build columns from header row ---
  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim())
  const columns: Column[] = headers.map((label) => ({
    id: nanoid(),
    label,
    width: 150,
    type: 'text',
    align: 'left',
  }))

  // --- Build rows from data rows ---
  const rows: Row[] = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim())
    const cells: Record<string, string> = {}
    columns.forEach((col, i) => { cells[col.id] = values[i] ?? '' })
    return { id: nanoid(), cells }
  })

  return { columns, rows }
}