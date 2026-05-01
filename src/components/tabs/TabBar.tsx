import { useTabsStore } from '../../store/tabsStore'
import { useTableStore } from '../../store/tableStore'
import { loadFromLocal } from '../../utils/autoSave'
import { showConfirm } from '../ui/ConfirmDialog'
import type { Colors } from '../../utils/colors'

export default function TabBar({ c }: { c: Colors }) {
    const { tabIds, activeId,tabTitles, setActive, addTab, removeTab, getTab } = useTabsStore()

    function switchTab(id: string) {
        setActive(id)
        const state = loadFromLocal(id)
        if (state) useTableStore.getState().loadStateSilent(state)
    }

    function handleAdd() {
        addTab()
        setTimeout(() => {
            const { activeId } = useTabsStore.getState()
            const state = loadFromLocal(activeId)
            if (state) useTableStore.getState().loadStateSilent(state)
        }, 0)
    }

    function handleRemove(e: React.MouseEvent, id: string) {
        e.stopPropagation()
        showConfirm({
            message: `Delete "${tabTitles[id] ?? 'Untitled'}"? This cannot be undone.`,
            confirmLabel: 'Delete',
            danger: true,
            onConfirm: () => {
                removeTab(id)
                setTimeout(() => {
                    const { activeId } = useTabsStore.getState()
                    const state = loadFromLocal(activeId)
                    if (state) useTableStore.getState().loadStateSilent(state)
                }, 0)
            },
        })
    }
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 2,
            background: c.surface, borderBottom: '1px solid ' + c.border,
            padding: '0 16px', flexShrink: 0, overflowX: 'auto',
        }}>
            {tabIds.map((id) => {
                const state = getTab(id)
                const label = state?.title || 'Untitled'
                const isActive = id === activeId
                return (
                    <div key={id} onClick={() => switchTab(id)} style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 14px', cursor: 'pointer', flexShrink: 0,
                        borderBottom: '2px solid ' + (isActive ? c.accentBorder : 'transparent'),
                        color: isActive ? c.accent : c.muted,
                        fontSize: 12, fontWeight: isActive ? 600 : 400,
                        transition: 'color 0.15s',
                    }}>
                        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {label}
                        </span>
                        {tabIds.length > 1 && (
                            <button onClick={(e) => handleRemove(e, id)} style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: c.muted, fontSize: 11, padding: '0 2px', lineHeight: 1,
                            }}>✕</button>
                        )}
                    </div>
                )
            })}

            {/* --- Add tab button --- */}
            <button onClick={handleAdd} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: c.muted, fontSize: 18, padding: '4px 10px', lineHeight: 1,
                flexShrink: 0,
            }} title="New table">+</button>
        </div>
    )
}