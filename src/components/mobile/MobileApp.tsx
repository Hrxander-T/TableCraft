import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// --- Components ---
import TableEditor from '../editor/TableEditor'
import TablePreview from '../preview/TablePreview'
import ImportPanel from '../panels/ImportPanel'
import SettingsPanel from '../panels/SettingsPanel'

// --- Store ---
import { useTableStore } from '../../store/tableStore'
import { useHistoryStore } from '../../store/historyStore'
import { useUIStore } from '../../store/uiStore'

// --- Utils ---
import { colors } from '../../utils/colors'
import { themes } from '../../themes'

// --- Exporters ---
import { exportPNG } from '../../exporters/png'
import { exportPDF } from '../../exporters/pdf'
import { exportCSV } from '../../exporters/csv'
import { exportJSON, importJSON } from '../../exporters/json'

// --- Tab type ---
type Tab = 'editor' | 'preview' | 'settings' | 'import'

// --- Tab bar button ---
function TabBtn({ label, icon, active, onClick, c }: {
  label: string; icon: string; active: boolean
  onClick: () => void; c: ReturnType<typeof colors>
}) {
  return (
    <button onClick={onClick} style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 3, padding: '8px 4px',
      background: 'none', border: 'none', cursor: 'pointer',
      color: active ? c.accent : c.muted,
      borderTop: '2px solid ' + (active ? c.accentBorder : 'transparent'),
      fontFamily: 'inherit',
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </button>
  )
}

export default function MobileApp() {
  const [tab, setTab] = useState<Tab>('editor')
  const [showExports, setShowExports] = useState(false)
  const navigate = useNavigate()
  const { title, setTitle, theme, setTheme } = useTableStore()
  const loadState = useTableStore((s) => s.loadState)
  const history = useHistoryStore()
  const { colorMode, toggleColorMode } = useUIStore()
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

      {/* --- Mobile top bar --- */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', background: c.surface,
        borderBottom: '1px solid ' + c.border, flexShrink: 0,
      }}>
        {/* --- Logo --- */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: 700, color: c.accent,
          fontFamily: 'inherit', padding: 0,
        }}>
          Table<span style={{ color: c.text }}>Craft</span>
        </button>

        {/* --- Title input --- */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          style={{
            flex: 1, background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '4px 8px', fontSize: 12,
            color: c.text, fontFamily: 'inherit', outline: 'none', minWidth: 0,
          }}
        />

        {/* --- Theme selector --- */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '4px 6px', fontSize: 11,
            color: c.text, fontFamily: 'inherit', outline: 'none',
            maxWidth: 120
          }}
        >
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>{t.name}</option>
          ))}
        </select>

        {/* --- Dark mode toggle --- */}
        <button onClick={toggleColorMode} style={{
          background: c.surface2, border: '1px solid ' + c.border,
          borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 14,
          flexShrink: 0,
        }}>
          {colorMode === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* --- Export bar (collapsible) --- */}
      <div style={{
        background: c.surface, borderBottom: '1px solid ' + c.border,
        flexShrink: 0,
      }}>
        <button onClick={() => setShowExports((v) => !v)} style={{
          width: '100%', padding: '6px', background: 'none', border: 'none',
          color: c.muted, fontSize: 11, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.05em',
        }}>
          {showExports ? '▲ Hide Exports' : '▼ Exports & Import'}
        </button>

        {showExports && (
          <div style={{
            display: 'flex', gap: 6, flexWrap: 'wrap',
            padding: '8px 12px 12px',
          }}>
            {[
              { label: '↓ PNG', color: '#1d4ed8', fn: () => exportPNG('table-preview', title) },
              { label: '↓ PDF', color: '#b91c1c', fn: () => exportPDF('table-preview', title) },
              { label: '↓ CSV', color: '#15803d', fn: () => exportCSV(useTableStore.getState().columns, useTableStore.getState().rows, title) },
              { label: '↓ JSON', color: '#7c3aed', fn: () => exportJSON(useTableStore.getState()) },
            ].map(({ label, color, fn }) => (
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

      {/* --- Content area --- */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {tab === 'editor' && <TableEditor />}
        {tab === 'preview' && <TablePreview />}
        {tab === 'settings' && <SettingsPanel c={c} />}
        {tab === 'import' && <ImportPanel />}
      </div>

      {/* --- Bottom tab bar --- */}
      <div style={{
        display: 'flex', background: c.surface,
        borderTop: '1px solid ' + c.border, flexShrink: 0,
      }}>
        <TabBtn label="Editor" icon="✏️" active={tab === 'editor'} onClick={() => setTab('editor')} c={c} />
        <TabBtn label="Preview" icon="👁" active={tab === 'preview'} onClick={() => setTab('preview')} c={c} />
        <TabBtn label="Settings" icon="⚙️" active={tab === 'settings'} onClick={() => setTab('settings')} c={c} />
        <TabBtn label="Import" icon="📥" active={tab === 'import'} onClick={() => setTab('import')} c={c} />
      </div>

    </div>
  )
}