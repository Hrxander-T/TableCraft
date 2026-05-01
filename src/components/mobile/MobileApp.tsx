import { useEffect } from 'react'
import { useState } from 'react'

// --- Components ---
import TableEditor from '../editor/TableEditor'
import TablePreview from '../preview/TablePreview'
import MobileTopBar from './MobileTopBar'
import MobileExportBar from './MobileExportBar'
import MobileTablesPanel from './MobileTablesPanel'
import MobileMoreDrawer from './MobileMoreDrawer'
import { ToastContainer } from '../ui/Toast'

// --- Store ---
import { useTableStore } from '../../store/tableStore'
import { useHistoryStore } from '../../store/historyStore'
import { useTabsStore } from '../../store/tabsStore'
import { useUIStore } from '../../store/uiStore'

// --- Utils ---
import { colors } from '../../utils/colors'

// --- Tab type ---
type Tab = 'editor' | 'preview' | 'tables' | 'more'

// --- Bottom tab button ---
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
    const history = useHistoryStore()
    const { colorMode } = useUIStore()
    const c = colors(colorMode)

    // --- Keyboard shortcuts ---
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.ctrlKey && e.key === 'z') {
                const activeId = useTabsStore.getState().activeId
                const prev = history.undo(activeId, useTableStore.getState())
                if (prev) useTableStore.getState().loadStateSilent(prev)
            }
            if (
                (e.ctrlKey && e.key === 'y') ||
                (e.ctrlKey && e.shiftKey && e.key === 'Z')
            ) {
                const activeId = useTabsStore.getState().activeId
                const next = history.redo(activeId, useTableStore.getState())
                if (next) useTableStore.getState().loadStateSilent(next)
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
            <ToastContainer/>

            {/* --- Top bar --- */}
            <MobileTopBar c={c} />

            {/* --- Export bar --- */}
            <MobileExportBar c={c} />

            {/* --- Content area --- */}
            <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
                {tab === 'editor' && <TableEditor />}
                {tab === 'preview' && <TablePreview />}
                {tab === 'tables' && (<MobileTablesPanel c={c} onSwitch={() => setTab('editor')} />)}
                {tab === 'more' && <MobileMoreDrawer c={c} onTemplateApplied={() => setTab('editor')} />}
            </div>

            {/* --- Bottom tab bar --- */}
            <div style={{
                display: 'flex', background: c.surface,
                borderTop: '1px solid ' + c.border, flexShrink: 0,
            }}>
                <TabBtn label="Editor" icon="✏️" active={tab === 'editor'} onClick={() => setTab('editor')} c={c} />
                <TabBtn label="Preview" icon="👁" active={tab === 'preview'} onClick={() => setTab('preview')} c={c} />
                <TabBtn label="Tables" icon="🗂" active={tab === 'tables'} onClick={() => setTab('tables')} c={c} />
                <TabBtn label="More" icon="☰" active={tab === 'more'} onClick={() => setTab('more')} c={c} />
            </div>

        </div>
    )
}