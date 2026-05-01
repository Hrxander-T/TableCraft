import { useEffect, useState } from 'react'
// --- Components ---
import TabBar from '../components/tabs/TabBar'
import Toolbar from '../components/toolbar/Toolbar'
import TableEditor from '../components/editor/TableEditor'
import TablePreview from '../components/preview/TablePreview'
import ImportPanel from '../components/panels/ImportPanel'
import SettingsPanel from '../components/panels/SettingsPanel'
import TemplatesPanel from '../components/panels/TemplatesPanel'
import MobileApp from '../components/mobile/MobileApp'
import { Panel, PanelLabel } from '../components/ui'
import { ToastContainer } from '../components/ui/Toast'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'

// --- Store ---
import { useTabsStore } from '../store/tabsStore'
import { useTableStore } from '../store/tableStore'
import { useHistoryStore } from '../store/historyStore'
import { useUIStore } from '../store/uiStore'

import { useIsMobile } from '../hooks/useIsMobile'

// --- Utils ---
import { colors } from '../utils/colors'
import { ShortcutsDialog } from '../components/ui/ShortcutsDialog'

export default function App() {
  const [showImport, setShowImport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const history = useHistoryStore()
  const { viewMode, colorMode } = useUIStore()
  const c = colors(colorMode)

  // --- Keyboard shortcuts ---
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault()
        const activeId = useTabsStore.getState().activeId
        const prev = history.undo(activeId, useTableStore.getState())
        if (prev) useTableStore.getState().loadStateSilent(prev)
      }
      if ((e.ctrlKey && e.key === 'y')
        || (e.ctrlKey && e.shiftKey && e.key === 'Z')
      ) {
        e.preventDefault()
        const activeId = useTabsStore.getState().activeId
        const next = history.redo(activeId, useTableStore.getState())
        if (next) useTableStore.getState().loadStateSilent(next)
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
      <ToastContainer/>
      <ConfirmDialog/>
      <ShortcutsDialog/>
      {/* --- Toolbar --- */}
      <Toolbar
        showImport={showImport}
        showSettings={showSettings}
        showTemplates={showTemplates}
        onToggleImport={() => setShowImport((v) => !v)}
        onToggleSettings={() => setShowSettings((v) => !v)}
        onToggleTemplates={() => setShowTemplates((v) => !v)}
      />
      {/* ----TabBar------ */}
      <TabBar c={c} />

      {/* --- Settings panel --- */}
      {showSettings && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <SettingsPanel c={c} />
        </div>
      )}

      {showTemplates && (
        <div style={{
          background: c.surface, borderBottom: '1px solid ' + c.border,
          padding: '12px 20px', flexShrink: 0,
        }}>
          <TemplatesPanel c={c} onClose={() => setShowTemplates(false)} />
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