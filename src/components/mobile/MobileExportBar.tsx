import { useState } from 'react'
import { useTableStore } from '../../store/tableStore'
import { themes } from '../../themes'
import type { Colors } from '../../utils/colors'

// --- Exporters ---
import { exportPNG } from '../../exporters/png'
import { exportPDF } from '../../exporters/pdf'
import { exportCSV } from '../../exporters/csv'
import { exportJSON, importJSON } from '../../exporters/json'
import { exportHTML } from '../../exporters/html'
import { copyMarkdown } from '../../exporters/markdown'

export default function MobileExportBar({ c }: { c: Colors }) {
  const [open, setOpen] = useState(false)
  const { title, theme, caption } = useTableStore()
  const loadState = useTableStore((s) => s.loadState)

  const exports = [
    { label: '↓ PNG', color: '#1d4ed8', fn: () => exportPNG('table-preview', title) },
    { label: '↓ PDF', color: '#b91c1c', fn: () => exportPDF('table-preview', title) },
    { label: '↓ CSV', color: '#15803d', fn: () => exportCSV(useTableStore.getState().columns, useTableStore.getState().rows, title) },
    { label: '↓ JSON', color: '#7c3aed', fn: () => exportJSON(useTableStore.getState()) },
    { label: '↓ HTML', color: '#0369a1', fn: () => exportHTML(useTableStore.getState().columns, useTableStore.getState().rows, title, caption, themes[theme] ?? themes['corporate-blue'], useTableStore.getState().settings, title) },
    { label: '⎘ MD', color: '#0f766e', fn: async () => { const ok = await copyMarkdown(useTableStore.getState().columns, useTableStore.getState().rows); if (ok) alert('Copied!') } },
  ]

  return (
    <div style={{ background: c.surface, borderBottom: '1px solid ' + c.border, flexShrink: 0 }}>
      <button onClick={() => setOpen((v) => !v)} style={{
        width: '100%', padding: '6px', background: 'none', border: 'none',
        color: c.muted, fontSize: 11, fontWeight: 600, cursor: 'pointer',
        fontFamily: 'inherit', letterSpacing: '0.05em',
      }}>
        {open ? '▲ Hide Exports' : '▼ Exports & Import'}
      </button>

      {open && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 12px 12px' }}>
          {exports.map(({ label, color, fn }) => (
            <button key={label} onClick={fn} style={{
              padding: '5px 12px', background: color, color: '#fff',
              border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{label}</button>
          ))}
          <label style={{
            padding: '5px 12px', background: c.surface2, color: c.muted,
            borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', border: '1px solid ' + c.border,
          }}>
            ↑ JSON
            <input type="file" accept=".json" style={{ display: 'none' }} onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) loadState(await importJSON(file))
            }} />
          </label>
        </div>
      )}
    </div>
  )
}