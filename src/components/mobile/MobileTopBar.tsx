import { useNavigate } from 'react-router-dom'
import { useTableStore } from '../../store/tableStore'
import { useHistoryStore } from '../../store/historyStore'
import { useTabsStore } from '../../store/tabsStore'
import { useUIStore } from '../../store/uiStore'
import { themes } from '../../themes'
import type { Colors } from '../../utils/colors'
import { showShortcuts } from '../ui/ShortcutsDialog'

export default function MobileTopBar({ c }: { c: Colors }) {
  const navigate = useNavigate()
  const { title, setTitle, theme, setTheme, rows, columns } = useTableStore()
  const { colorMode, toggleColorMode } = useUIStore()
  const history = useHistoryStore()

  function undo() {
    const activeId = useTabsStore.getState().activeId
    const prev = history.undo(activeId, useTableStore.getState())
    if (prev) useTableStore.getState().loadStateSilent(prev)
  }

  function redo() {
    const activeId = useTabsStore.getState().activeId
    const next = history.redo(activeId, useTableStore.getState())
    if (next) useTableStore.getState().loadStateSilent(next)
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 10px', background: c.surface,
      borderBottom: '1px solid ' + c.border, flexShrink: 0,
    }}>
      {/* --- Logo --- */}
      <button onClick={() => navigate('/')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 700, color: c.accent,
        fontFamily: 'inherit', padding: 0, flexShrink: 0,
      }}>
        Table<span style={{ color: c.text }}>Craft</span>
      </button>

      {/* --- Title --- */}
      <input
        value={title ?? ''}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
        style={{
          width: 80, background: c.surface2, border: '1px solid ' + c.border, flex: 1,
          borderRadius: 6, padding: '4px 8px', fontSize: 12,
          color: c.text, fontFamily: 'inherit', outline: 'none',
        }}
      />

      {/* --- Theme --- */}
      <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{
        background: c.surface2, border: '1px solid ' + c.border,
        borderRadius: 6, padding: '4px 6px', fontSize: 11,
        color: c.text, fontFamily: 'inherit', outline: 'none',
      }}>
        {Object.entries(themes).map(([key, t]) => (
          <option key={key} value={key}>{t.name}</option>
        ))}
      </select>

      {/* --- Undo / Redo --- */}
      {[{ icon: '↩', fn: undo }, { icon: '↪', fn: redo }].map(({ icon, fn }) => (
        <button key={icon} onClick={fn} style={{
          background: c.surface2, border: '1px solid ' + c.border,
          borderRadius: 6, padding: '4px 7px', cursor: 'pointer',
          fontSize: 13, flexShrink: 0,
        }}>{icon}</button>
      ))}

      {/* -------Shortcut Dialog--------- */}
      <button onClick={showShortcuts} style={{
        background: c.surface2, border: '1px solid ' + c.border,
        borderRadius: 6, padding: '4px 7px', cursor: 'pointer',
        fontSize: 12, color: c.muted, fontWeight: 700, flexShrink: 0,
      }}>?</button>

      {/* --- Dark mode --- */}
      <button onClick={toggleColorMode} style={{
        background: c.surface2, border: '1px solid ' + c.border,
        borderRadius: 6, padding: '4px 7px', cursor: 'pointer',
        fontSize: 13, flexShrink: 0,
      }}>{colorMode === 'dark' ? '☀️' : '🌙'}</button>

      {/* Row/Column count */}
      <div style={{
        background: c.surface, borderBottom: '1px solid ' + c.border,
        padding: '3px 12px', fontSize: 10, color: c.muted,
        letterSpacing: '0.05em',
      }}>
        {rows.length} rows · {columns.length} cols
      </div>

    </div>
  )
}