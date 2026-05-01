import { useState, useEffect, useCallback } from 'react'
import { useUIStore } from '../../store/uiStore'
import { colors } from '../../utils/colors'

// --- Toast types ---
export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

// --- Global toast store (simple, no zustand needed) ---
type Listener = (toast: Toast) => void
let listener: Listener | null = null

export function showToast(message: string, type: ToastType = 'success') {
  listener?.({ id: Math.random().toString(36).slice(2), message, type })
}

// --- Toast colors ---
const toastColors: Record<ToastType, string> = {
  success: '#16a34a',
  error: '#dc2626',
  info: '#2563eb',
}

// --- ToastContainer — mount once in App.tsx and MobileApp.tsx ---
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const colorMode = useUIStore((s) => s.colorMode)
  const c = colors(colorMode)

  const add = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
    }, 2500)
  }, [])

  useEffect(() => {
    listener = add
    return () => { listener = null }
  }, [add])

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      display: 'flex', flexDirection: 'column', gap: 8,
      zIndex: 9999, pointerEvents: 'none',
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: c.surface, border: '1px solid ' + c.border,
          borderLeft: '4px solid ' + toastColors[t.type],
          borderRadius: 8, padding: '10px 16px',
          fontSize: 13, color: c.text, fontFamily: 'Georgia, serif',
          boxShadow: '0 4px 12px #00000033',
          animation: 'slideIn 0.2s ease',
        }}>
          {t.message}
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}