import { useNavigate } from 'react-router-dom'
import { useTableStore } from '../../store/tableStore'
import { useUIStore } from '../../store/uiStore'
import { themes } from '../../themes'
import { colors } from '../../utils/colors'
import { Divider, IconBtn, ExportBtn } from '../ui'
import { showToast } from '../ui/Toast'
import { showShortcuts } from '../ui/ShortcutsDialog'

// --- Exporters ---
import { exportPNG, copyAsImage } from '../../exporters/png'
import { exportPDF } from '../../exporters/pdf'
import { exportCSV } from '../../exporters/csv'
import { exportJSON, importJSON } from '../../exporters/json'
import { exportLatex } from '../../exporters/latex'
import { exportSVG } from '../../exporters/svg'
import { exportHTML } from '../../exporters/html'
import { copyMarkdown } from '../../exporters/markdown'
import { buildShareUrl } from '../../utils/shareUrl'

interface ToolbarProps {
  showImport: boolean
  showSettings: boolean
  showTemplates: boolean
  onToggleImport: () => void
  onToggleSettings: () => void
  onToggleTemplates: () => void
}

export default function Toolbar({ showImport, showSettings, showTemplates, onToggleImport, onToggleSettings, onToggleTemplates }: ToolbarProps) {
  const navigate = useNavigate()
  const { title, setTitle, theme, setTheme, columns, rows, caption } = useTableStore()
  const loadState = useTableStore((s) => s.loadState)
  const { viewMode, setViewMode, colorMode, toggleColorMode } = useUIStore()
  const c = colors(colorMode)

  return (
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

      <Divider c={c} />

      {/* --- Title input --- */}
      <input
        value={title ?? ''}
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

      <div style={{
        fontSize: 11, color: c.muted, whiteSpace: 'nowrap',
        padding: '4px 8px', background: c.surface2,
        border: '1px solid ' + c.border, borderRadius: 6,
      }}>
        {rows.length} rows · {columns.length} cols
      </div>

      <Divider c={c} />

      {/* --- View mode --- */}
      <div style={{ display: 'flex', gap: 4 }}>
        <IconBtn label="✏️ Editor" active={viewMode === 'editor'} onClick={() => setViewMode('editor')} c={c} />
        <IconBtn label="⬛ Split" active={viewMode === 'split'} onClick={() => setViewMode('split')} c={c} />
        <IconBtn label="👁 Preview" active={viewMode === 'preview'} onClick={() => setViewMode('preview')} c={c} />
      </div>

      <Divider c={c} />

      {/* --- Panel toggles --- */}
      <IconBtn label="⚙ Settings" active={showSettings} onClick={onToggleSettings} c={c} />
      <IconBtn label="📋 Templates" active={showTemplates} onClick={onToggleTemplates} c={c} />
      <IconBtn label="↑ CSV" active={showImport} onClick={onToggleImport} c={c} />

      <Divider c={c} />

      {/* --- Export buttons --- */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        <ExportBtn label="↓ PNG" color="#1d4ed8" onClick={async () => exportPNG('table-preview', title)} />

        <ExportBtn
          label="⎘ IMG"
          color="#1d4ed8"
          onClick={async () => {
            const ok = await copyAsImage('table-preview')
            ok ? showToast('Image copied!') : showToast('Copy failed — try PNG export', 'error')
          }}
        />

        <ExportBtn label="↓ PDF" color="#b91c1c" onClick={async () => exportPDF('table-preview', title)} />
        <ExportBtn label="↓ SVG" color="#4338ca" onClick={async () => exportSVG(columns, rows, title, themes[theme] ?? themes['corporate-blue'], useTableStore.getState().settings)} />
        <ExportBtn label="↓ CSV" color="#15803d" onClick={async () => exportCSV(columns, rows, title)} />
        <ExportBtn label="↓ LaTeX" color="#b45309" onClick={async () => exportLatex(columns, rows, title)} />
        <ExportBtn label="↓ JSON" color="#7c3aed" onClick={async () => exportJSON(useTableStore.getState())} />
        <ExportBtn label="↓ HTML" color="#0369a1" onClick={async () => exportHTML(columns, rows, title, caption, themes[theme] ?? themes['corporate-blue'], useTableStore.getState().settings, title)} />
        <ExportBtn
          label="⎘ MD"
          color="#0f766e"
          onClick={async () => {
            const ok = await copyMarkdown(columns, rows)
            ok ? showToast('Markdown copied!') : showToast('Copy failed', 'error')
          }}
        />

        <label style={{
          padding: '5px 12px', background: c.surface2, color: c.muted,
          borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', border: '1px solid ' + c.border, whiteSpace: 'nowrap',
        }}>
          ↑ JSON
          <input type="file" accept=".json" style={{ display: 'none' }}
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                loadState(await importJSON(file))
                showToast('Table loaded!')
              } catch {
                showToast('Invalid JSON file', 'error')
              }
            }} />
        </label>
      </div>


      {/* --- Right side --- */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: c.muted }}>Ctrl+Z · Ctrl+Y</span>

        {/* Share Url  */}
        <button onClick={() => {
          const url = buildShareUrl(useTableStore.getState())
          navigator.clipboard.writeText(url)
          showToast('Share link copied!')
        }} style={{
          background: c.surface2, border: '1px solid ' + c.border,
          borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
          fontSize: 11, color: c.muted, fontFamily: 'inherit', fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>🔗 Share</button>
        
        {/* Shortcut dialog  */}
        <button onClick={showShortcuts} style={{
          background: c.surface2, border: '1px solid ' + c.border,
          borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
          fontSize: 12, color: c.muted, fontFamily: 'inherit', fontWeight: 700,
        }} title="Keyboard shortcuts">?</button>

        <button onClick={toggleColorMode} style={{
          background: c.surface2, border: '1px solid ' + c.border,
          borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 14,
        }}>
          {colorMode === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

    </div>
  )
}