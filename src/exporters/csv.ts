import type { Column, Row } from '../types'

export function exportCSV(columns: Column[], rows: Row[], filename = 'table') {
  const header = columns.map((c) => `"${c.label}"`).join(',')
  const body = rows.map((r) => columns.map((c) => `"${r.cells[c.id] ?? ''}"`).join(',')).join('\n')
  const blob = new Blob([header + '\n' + body], { type: 'text/csv' })
  const link = document.createElement('a')
  link.download = `${filename}.csv`
  link.href = URL.createObjectURL(blob)
  link.click()
}