import LZString from 'lz-string'
import type { TableState } from '../types'

// --- Encode table state to URL-safe string ---
export function encodeState(state: TableState): string {
  const json = JSON.stringify({
    id: state.id,
    title: state.title,
    caption: state.caption,
    theme: state.theme,
    columns: state.columns,
    rows: state.rows,
    settings: state.settings,
  })
  return LZString.compressToEncodedURIComponent(json)
}

// --- Decode URL-safe string to table state ---
export function decodeState(encoded: string): TableState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    const parsed = JSON.parse(json)
    if (!parsed?.columns || !parsed?.rows) return null
    return parsed as TableState
  } catch { return null }
}

// --- Build share URL ---
export function buildShareUrl(state: TableState): string {
  const encoded = encodeState(state)
  return `${window.location.origin}/app?share=${encoded}`
}