import { useEffect, useState } from 'react'
// --- Components ---
import Toolbar from '../components/toolbar/Toolbar'
import TableEditor from '../components/editor/TableEditor'
import TablePreview from '../components/preview/TablePreview'
import ImportPanel from '../components/panels/ImportPanel'
import SettingsPanel from '../components/panels/SettingsPanel'
import MobileApp from '../components/mobile/MobileApp'
import { Panel, PanelLabel } from '../components/ui'

// --- Store ---
import { useTableStore } from '../store/tableStore'
import { useHistoryStore } from '../store/historyStore'
import { useUIStore } from '../store/uiStore'

import { useIsMobile } from '../hooks/useIsMobile'

// --- Utils ---
import { colors } from '../utils/colors'

export default function App() {
  const [showImport, setShowImport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const history = useHistoryStore()
  const { viewMode, colorMode } = useUIStore()
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

  const isMobile = useIsMobile()
  if (isMobile) return <MobileApp />

  return (
    <div style={{
      height: '100vh', background: c.bg, display: 'flex',
      flexDirection: 'column', fontFamily: 'Georgia, serif',
      color: c.text, overflow: 'hidden',
    }}>

      {/* --- Toolbar --- */}
      <Toolbar
        showImport={showImport}
        showSettings={showSettings}
        onToggleImport={() => setShowImport((v) => !v)}
        onToggleSettings={() => setShowSettings((v) => !v)}
      />

      {/* --- Settings panel --- */}
      {showSettings && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <SettingsPanel c={c} />
        </div>
      )}

      {/* --- Import panel --- */}
      {showImport && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <ImportPanel />
        </div>
      )}

      {/* --- Main area --- */}
      <div style={{
        flex: 1, overflow: 'hidden', padding: 16,
        display: 'flex', gap: 16,
      }}>
        {(viewMode === 'editor' || viewMode === 'split') && (
          <Panel c={c}>
            <PanelLabel text="Editor" c={c} />
            <TableEditor />
          </Panel>
        )}
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