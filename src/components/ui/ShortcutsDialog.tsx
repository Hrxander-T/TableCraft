import { useState } from 'react'
import { useUIStore } from '../../store/uiStore'
import { colors } from '../../utils/colors'

// --- Shortcut item ---
const shortcuts = [
  { category: 'History', items: [
    { keys: 'Ctrl+Z', desc: 'Undo' },
    { keys: 'Ctrl+Y / Ctrl+Shift+Z', desc: 'Redo' },
  ]},
  { category: 'Navigation', items: [
    { keys: 'Tab', desc: 'Next cell' },
    { keys: 'Shift+Tab', desc: 'Previous cell' },
  ]},
  { category: 'Export', items: [
    { keys: '↓ PNG', desc: 'Export as image' },
    { keys: '↓ PDF', desc: 'Export as PDF' },
    { keys: '↓ SVG', desc: 'Export as vector' },
    { keys: '↓ CSV', desc: 'Export as spreadsheet' },
    { keys: '↓ LaTeX', desc: 'Export as LaTeX' },
    { keys: '↓ JSON', desc: 'Save table state' },
    { keys: '↓ HTML', desc: 'Export as webpage' },
    { keys: '⎘ MD', desc: 'Copy as Markdown' },
    { keys: '⎘ IMG', desc: 'Copy as image' },
  ]},
  { category: 'Editor', items: [
    { keys: '⠿ drag', desc: 'Reorder rows' },
    { keys: 'Column header drag', desc: 'Reorder columns' },
    { keys: 'Column right edge drag', desc: 'Resize column' },
    { keys: '★', desc: 'Highlight row' },
  ]},
]

// --- Global toggle ---
type Listener = () => void
let listener: Listener | null = null
export function showShortcuts() { listener?.() }

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false)
  const colorMode = useUIStore((s) => s.colorMode)
  const c = colors(colorMode)

  useState(() => {
    listener = () => setOpen(true)
    return () => { listener = null }
  })

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#00000066',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9997, fontFamily: 'Georgia, serif',
    }} onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: c.surface, border: '1px solid ' + c.border,
        borderRadius: 12, padding: 24, width: 480, maxWidth: '90vw',
        maxHeight: '80vh', overflow: 'auto',
        boxShadow: '0 8px 32px #00000044',
      }}>
        {/* --- Header --- */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20,
        }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: c.text }}>
            Keyboard Shortcuts
          </div>
          <button onClick={() => setOpen(false)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: c.muted, fontSize: 18,
          }}>✕</button>
        </div>

        {/* --- Shortcuts list --- */}
        {shortcuts.map((section) => (
          <div key={section.category} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: c.muted,
              borderBottom: '1px solid ' + c.border, paddingBottom: 6, marginBottom: 10,
            }}>{section.category}</div>
            {section.items.map((item) => (
              <div key={item.keys} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '6px 0',
                borderBottom: '1px solid ' + c.border + '44',
              }}>
                <span style={{ fontSize: 12, color: c.text }}>{item.desc}</span>
                <kbd style={{
                  background: c.surface2, border: '1px solid ' + c.border,
                  borderRadius: 4, padding: '2px 8px', fontSize: 11,
                  color: c.muted, fontFamily: 'monospace',
                }}>{item.keys}</kbd>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}