import { useTableStore } from '../../store/tableStore'
import { useTabsStore } from '../../store/tabsStore'
import { loadFromLocal } from '../../utils/autoSave'
import type { Colors } from '../../utils/colors'

export default function MobileTablesPanel({ c, onSwitch }: {
    c: Colors
    onSwitch: () => void
}) {
    const { tabIds, activeId, tabTitles, setActive, addTab, removeTab } = useTabsStore()
    const loadStateSilent = useTableStore((s) => s.loadStateSilent)

    function switchTab(id: string) {
        setActive(id)
        const state = loadFromLocal(id)
        if (state) loadStateSilent(state)
        onSwitch() // --- callback to switch to editor ---
    }

    function handleAdd() {
        addTab()
        setTimeout(() => {
            const { activeId } = useTabsStore.getState()
            const state = loadFromLocal(activeId)
            if (state) loadStateSilent(state)
            onSwitch() // --- switch to editor ---
        }, 0)
    }

    function handleRemove(id: string) {
        removeTab(id)
        setTimeout(() => {
            const { activeId } = useTabsStore.getState()
            const state = loadFromLocal(activeId)
            if (state) loadStateSilent(state)
        }, 0)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: c.muted,
                borderBottom: '1px solid ' + c.border, paddingBottom: 6,
            }}>My Tables</div>

            {tabIds.map((id) => (
                <div key={id} onClick={() => switchTab(id)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                    background: id === activeId ? c.accentBg : c.surface2,
                    border: '1px solid ' + (id === activeId ? c.accentBorder : c.border),
                }}>
                    <span style={{
                        fontSize: 13, fontWeight: id === activeId ? 600 : 400,
                        color: id === activeId ? c.accent : c.text,
                    }}>
                        {tabTitles[id] ?? 'Untitled'}
                    </span>
                    {tabIds.length > 1 && (
                        <button onClick={(e) => { e.stopPropagation(); handleRemove(id) }} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: c.muted, fontSize: 14, padding: '0 4px',
                        }}>✕</button>
                    )}
                </div>
            ))}

            <button onClick={handleAdd} style={{
                padding: '10px', background: 'none', border: '1px dashed ' + c.border,
                borderRadius: 8, color: c.muted, fontSize: 13, cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'center',
            }}>+ New Table</button>
        </div>
    )
}