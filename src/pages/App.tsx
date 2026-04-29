import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// --- Components ---
import TableEditor from '../components/editor/TableEditor'
import TablePreview from '../components/preview/TablePreview'
import ImportPanel from '../components/panels/ImportPanel'
import SettingsPanel from '../components/panels/SettingsPanel'
// --- Store ---
import { useTableStore } from '../store/tableStore'
import { useHistoryStore } from '../store/historyStore'
import { useUIStore } from '../store/uiStore'

// --- Themes ---
import { themes } from '../themes'

// --- Exporters ---
import { exportPNG } from '../exporters/png'
import { exportPDF } from '../exporters/pdf'
import { exportCSV } from '../exporters/csv'
import { exportJSON, importJSON } from '../exporters/json'
import { exportLatex } from '../exporters/latex'
import { exportSVG } from '../exporters/svg'

import { useState } from 'react'

// --- Color tokens based on mode ---
function colors(mode: 'dark' | 'light') {
  if (mode === 'dark') return {
    bg: '#0a0f1e',
    surface: '#0d1424',
    surface2: '#0f172a',
    border: '#1e293b',
    text: '#f1f5f9',
    muted: '#475569',
    accent: '#60a5fa',
    accentBg: '#1e3a5f',
    accentBorder: '#2563eb',
  }
  return {
    bg: '#f8fafc',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a',
    muted: '#94a3b8',
    accent: '#2563eb',
    accentBg: '#dbeafe',
    accentBorder: '#2563eb',
  }
}

// --- Export button ---
function ExportBtn({ label, color, onClick }: {
  label: string; color: string; onClick: () => void
  c: ReturnType<typeof colors>
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

// --- View mode button ---
function ViewBtn({ label, active, onClick, c }: {
  label: string; active: boolean; onClick: () => void
  c: ReturnType<typeof colors>
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

// --- Panel wrapper ---
function Panel({ children, c }: { children: React.ReactNode; c: ReturnType<typeof colors> }) {
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
function PanelLabel({ text, c }: { text: string; c: ReturnType<typeof colors> }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: c.muted, marginBottom: 12,
    }}>{text}</div>
  )
}

export default function App() {
  const [showImport, setShowImport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { title, setTitle, theme, setTheme, columns, rows } = useTableStore()
  const loadState = useTableStore((s) => s.loadState)
  const history = useHistoryStore()
  const { viewMode, setViewMode, colorMode, toggleColorMode } = useUIStore()
  const navigate = useNavigate()
  const c = colors(colorMode)

  // --- Keyboard shortcuts ---
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'z') {
        const prev = history.undo(useTableStore.getState())
        if (prev) useTableStore.getState().loadState(prev)
      }
      if (e.ctrlKey && e.key === 'y') {
        const next = history.redo(useTableStore.getState())
        if (next) useTableStore.getState().loadState(next)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [history])

  return (
    <div style={{
      height: '100vh', background: c.bg, display: 'flex',
      flexDirection: 'column', fontFamily: 'Georgia, serif',
      color: c.text, overflow: 'hidden',
    }}>

      {/* --- Top bar --- */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
        background: c.surface, borderBottom: '1px solid ' + c.border,
        flexShrink: 0, flexWrap: 'wrap',
      }}>

        {/* --- Logo --- */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 15, fontWeight: 700, color: c.accent,
          fontFamily: 'inherit', letterSpacing: '-0.02em', padding: 0,
        }}>
          Table<span style={{ color: c.text }}>Craft</span>
        </button>

        <div style={{ width: 1, height: 18, background: c.border }} />

        {/* --- Title --- */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Table"
          style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '4px 10px', fontSize: 12,
            color: c.text, fontFamily: 'inherit', outline: 'none', width: 140,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = c.accentBorder)}
          onBlur={(e) => (e.currentTarget.style.borderColor = c.border)}
        />

        {/* --- Theme selector --- */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '4px 10px', fontSize: 12,
            color: c.text, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
          }}
        >
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>{t.name}</option>
          ))}
        </select>

        <div style={{ width: 1, height: 18, background: c.border }} />

        {/* --- View mode --- */}
        <div style={{ display: 'flex', gap: 4 }}>
          <ViewBtn label="✏️ Editor" active={viewMode === 'editor'} onClick={() => setViewMode('editor')} c={c} />
          <ViewBtn label="⬛ Split" active={viewMode === 'split'} onClick={() => setViewMode('split')} c={c} />
          <ViewBtn label="👁 Preview" active={viewMode === 'preview'} onClick={() => setViewMode('preview')} c={c} />
        </div>

        {/* <div style={{ width: 1, height: 18, background: c.border }} /> */}
        {/* -----Settings Toggle -------- */}
        <button onClick={() => setShowSettings((v) => !v)} style={{
          padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          background: showSettings ? c.accentBg : 'transparent',
          color: showSettings ? c.accent : c.muted,
          border: '1px solid ' + (showSettings ? c.accentBorder : c.border),
          borderRadius: 6, fontFamily: 'inherit',
        }}>⚙ Settings</button>

        <div style={{ width: 1, height: 18, background: c.border }} />

        {/* --- Export buttons --- */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <ExportBtn label="↓ PNG" color="#1d4ed8" c={c} onClick={async () => exportPNG('table-preview', title)} />
          <ExportBtn label="↓ PDF" color="#b91c1c" c={c} onClick={async () => exportPDF('table-preview', title)} />
          <ExportBtn label="↓ SVG" color="#4338ca" c={c} onClick={async () => exportSVG(columns, rows, title, themes[theme] ?? themes['corporate-blue'], useTableStore.getState().settings)} />
          <ExportBtn label="↓ CSV" color="#15803d" c={c} onClick={async () => exportCSV(columns, rows, title)} />
          <ExportBtn label="↓ LaTeX" color="#b45309" c={c} onClick={async () => exportLatex(columns, rows, title)} />
          <ExportBtn label="↓ JSON" color="#7c3aed" c={c} onClick={async () => exportJSON(useTableStore.getState())} />
          <label style={{
            padding: '5px 12px', background: c.surface2, color: c.muted,
            borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', border: '1px solid ' + c.border, whiteSpace: 'nowrap',
          }}>
            ↑ JSON
            <input type="file" accept=".json" style={{ display: 'none' }} onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) loadState(await importJSON(file))
            }} />
          </label>
          <button onClick={() => setShowImport((v) => !v)} style={{
            padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
            background: showImport ? c.accentBg : c.surface2,
            color: showImport ? c.accent : c.muted,
            border: '1px solid ' + (showImport ? c.accentBorder : c.border),
            borderRadius: 6, fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>↑ CSV</button>
        </div>

        {/* --- Right side: dark mode + shortcut hint --- */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: c.muted }}> Undo→Ctrl+Z · Redo→Ctrl+Y</span>
          <button onClick={toggleColorMode} style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
            fontSize: 14, lineHeight: 1,
          }} title="Toggle light/dark mode">
            {colorMode === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* --- Import panel --- */}
      {showImport && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <ImportPanel />
        </div>
      )}
      {/* -----Settings panel---- */}
      {showSettings && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <SettingsPanel c={c} />
        </div>
      )}

      {/* --- Main area --- */}
      <div style={{
        flex: 1, overflow: 'hidden', padding: 16,
        display: 'flex', gap: 16,
      }}>

        {/* --- Editor panel --- */}
        {(viewMode === 'editor' || viewMode === 'split') && (
          <Panel c={c}>
            <PanelLabel text="Editor" c={c} />
            <TableEditor />
          </Panel>
        )}

        {/* --- Preview panel --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <Panel c={c}>
            <PanelLabel text="Preview" c={c} />
            <TablePreview />
          </Panel>
        )}

      </div>
    </div>
  )
}