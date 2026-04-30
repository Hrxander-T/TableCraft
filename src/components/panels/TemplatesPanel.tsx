import { useTableStore } from '../../store/tableStore'
import { useTabsStore } from '../../store/tabsStore'

import { templates } from '../../templates'
import type { Colors } from '../../utils/colors'
// import { nanoid } from 'nanoid'

// --- TemplatesPanel ---
export default function TemplatesPanel({ c, onClose }: { c: Colors; onClose: () => void }) {
  const loadState = useTableStore((s) => s.loadState)

  function applyTemplate(templateId: string) {
    const t = templates.find((t) => t.id === templateId)
    const activeId = useTabsStore.getState().activeId

    if (!t) return
    loadState({
      id: activeId, // use current tab ID, not a new one
      title: t.name,
      caption:'',
      theme: t.theme,
      columns: t.columns,
      rows: t.rows,
      settings: {
        showHeader: true,
        alternatingRows: true,
        showBorder: true,
        fontSize: 14,
        padding: 'normal',
        ...t.settings,
      },
    })
    onClose()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: c.muted,
        borderBottom: '1px solid ' + c.border, paddingBottom: 6,
      }}>Templates</div>

      {/* --- Template grid --- */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {templates.map((t) => (
          <button key={t.id} onClick={() => applyTemplate(t.id)} style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 10, padding: '12px 16px', cursor: 'pointer',
            fontFamily: 'inherit', textAlign: 'left', minWidth: 160,
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.border)}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: c.muted }}>{t.description}</div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: c.muted }}>
        ⚠️ Applying a template will replace your current table.
      </div>
    </div>
  )
}