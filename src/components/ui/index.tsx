import type { Colors } from '../../utils/colors'

// --- Panel wrapper ---
export function Panel({ children, c }: { children: React.ReactNode; c: Colors }) {
  return (
    <div style={{
      background: c.surface, border: '1px solid ' + c.border,
      borderRadius: 12, padding: 20, overflow: 'auto',
      flex: 1, minWidth: 0, height: '100%', boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

// --- Panel label ---
export function PanelLabel({ text, c }: { text: string; c: Colors }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: c.muted, marginBottom: 12,
    }}>{text}</div>
  )
}

// --- Section header ---
export function Section({ label, c }: { label: string; c: Colors }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: c.muted,
      borderBottom: '1px solid ' + c.border, paddingBottom: 6, marginBottom: 10,
    }}>{label}</div>
  )
}

// --- Toggle switch ---
export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 36, height: 20, borderRadius: 999, border: 'none',
      background: value ? '#2563eb' : '#475569',
      cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: value ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s',
      }} />
    </button>
  )
}

// --- Select dropdown ---
export function Select<T extends string>({ value, options, onChange, c }: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  c: Colors
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)} style={{
      background: c.surface2, border: '1px solid ' + c.border,
      borderRadius: 6, padding: '3px 8px', fontSize: 12,
      color: c.text, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
    }}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// --- Label row ---
export function LabelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{label}</span>
      {children}
    </div>
  )
}

// --- Divider ---
export function Divider({ c }: { c: Colors }) {
  return <div style={{ width: 1, height: 18, background: c.border }} />
}

// --- Icon button ---
export function IconBtn({ label, active, onClick, c }: {
  label: string; active?: boolean; onClick: () => void; c: Colors
}) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', fontSize: 11, fontWeight: 600,
      background: active ? c.accentBg : 'transparent',
      color: active ? c.accent : c.muted,
      border: '1px solid ' + (active ? c.accentBorder : c.border),
      borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
      whiteSpace: 'nowrap',
    }}>{label}</button>
  )
}

// --- Export button ---
export function ExportBtn({ label, color, onClick }: {
  label: string; color: string; onClick: () => void
}) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', background: color, color: '#fff',
      border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 600,
      cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >{label}</button>
  )
}