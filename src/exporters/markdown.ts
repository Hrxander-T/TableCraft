import type { Column, Row } from '../types'

// --- Generate markdown table string ---
export function toMarkdown(columns: Column[], rows: Row[]): string {
  // --- Header ---
  const header = '| ' + columns.map((c) => c.label).join(' | ') + ' |'

  // --- Separator with alignment ---
  const sep = '| ' + columns.map((c) => {
    if (c.align === 'center') return ':---:'
    if (c.align === 'right') return '---:'
    return '---'
  }).join(' | ') + ' |'

  // --- Rows ---
  const body = rows.map((row) =>
    '| ' + columns.map((col) => row.cells[col.id] ?? '').join(' | ') + ' |'
  ).join('\n')

  return [header, sep, body].join('\n')
}

// --- Copy markdown to clipboard ---
export async function copyMarkdown(columns: Column[], rows: Row[]): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(toMarkdown(columns, rows))
    return true
  } catch { return false }
}