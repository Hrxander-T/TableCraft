import { useState } from 'react'
import { useUIStore } from '../../store/uiStore'
import { colors } from '../../utils/colors'

// --- Global confirm dialog state ---
type ConfirmOptions = {
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
}

type Listener = (options: ConfirmOptions) => void
let listener: Listener | null = null

export function showConfirm(options: ConfirmOptions) {
  listener?.(options)
}

// --- ConfirmDialog container --- mount once in App.tsx and MobileApp.tsx ---
export function ConfirmDialog() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const colorMode = useUIStore((s) => s.colorMode)
  const c = colors(colorMode)

  // --- Register listener ---
  useState(() => {
    listener = (opts) => setOptions(opts)
    return () => { listener = null }
  })

  if (!options) return null

  function handleConfirm() {
    options?.onConfirm()
    setOptions(null)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#00000066',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9998, fontFamily: 'Georgia, serif',
    }}>
      <div style={{
        background: c.surface, border: '1px solid ' + c.border,
        borderRadius: 12, padding: 24, maxWidth: 340, width: '90%',
        boxShadow: '0 8px 32px #00000044',
      }}>
        <div style={{ fontSize: 14, color: c.text, marginBottom: 20, lineHeight: 1.6 }}>
          {options.message}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => setOptions(null)} style={{
            padding: '7px 16px', background: 'transparent',
            border: '1px solid ' + c.border, borderRadius: 6,
            color: c.muted, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
          }}>Cancel</button>
          <button onClick={handleConfirm} style={{
            padding: '7px 16px', border: 'none', borderRadius: 6,
            background: options.danger ? '#dc2626' : c.accentBorder,
            color: '#fff', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>{options.confirmLabel ?? 'Confirm'}</button>
        </div>
      </div>
    </div>
  )
}