import SettingsPanel from '../panels/SettingsPanel'
import ImportPanel from '../panels/ImportPanel'
import TemplatesPanel from '../panels/TemplatesPanel'
import type { Colors } from '../../utils/colors'

// --- Section tab ---
function DrawerTab({ label, active, onClick, c }: {
  label: string; active: boolean; onClick: () => void; c: Colors
}) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '8px 4px', background: 'none', border: 'none',
      borderBottom: '2px solid ' + (active ? c.accentBorder : 'transparent'),
      color: active ? c.accent : c.muted,
      fontSize: 11, fontWeight: 600, cursor: 'pointer',
      fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{label}</button>
  )
}

type DrawerTab_T = 'settings' | 'import' | 'templates'

export default function MobileMoreDrawer({ c, onTemplateApplied }: {
  c: Colors
  onTemplateApplied: () => void
}) {
  const tabs: { id: DrawerTab_T; label: string }[] = [
    { id: 'settings', label: '⚙ Settings' },
    { id: 'import', label: '📥 Import' },
    { id: 'templates', label: '📋 Templates' },
  ]

  const [active, setActive] = useState<DrawerTab_T>('settings')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* --- Drawer tab bar --- */}
      <div style={{
        display: 'flex', borderBottom: '1px solid ' + c.border,
        marginBottom: 16, flexShrink: 0,
      }}>
        {tabs.map((t) => (
          <DrawerTab key={t.id} label={t.label} active={active === t.id}
            onClick={() => setActive(t.id)} c={c} />
        ))}
      </div>

      {/* --- Drawer content --- */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {active === 'settings' && <SettingsPanel c={c} />}
        {active === 'import' && <ImportPanel />}
        {active === 'templates' && <TemplatesPanel c={c} onClose={onTemplateApplied} />}
      </div>
    </div>
  )
}

// --- need useState ---
import { useState } from 'react'