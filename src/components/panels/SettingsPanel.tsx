import { useTableStore } from '../../store/tableStore'
import type { Padding } from '../../types'
import type { Colors } from '../../utils/colors'
import { Toggle, Select, Section, LabelRow } from '../ui'


const PADDING_OPTIONS: { value: Padding; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'spacious', label: 'Spacious' },
]

// --- SettingsPanel ---
export default function SettingsPanel({ c }: {
    c: Colors
}) {
    const { settings, updateSettings } = useTableStore()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>

            {/* --- Display --- */}
            <div>
                <Section label="Display" c={c} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <LabelRow label="Show Header">
                        <Toggle value={settings.showHeader} onChange={(v) => updateSettings({ showHeader: v })} />
                    </LabelRow>
                    <LabelRow label="Alternating Rows">
                        <Toggle value={settings.alternatingRows} onChange={(v) => updateSettings({ alternatingRows: v })} />
                    </LabelRow>
                    <LabelRow label="Show Border">
                        <Toggle value={settings.showBorder} onChange={(v) => updateSettings({ showBorder: v })} />
                    </LabelRow>
                </div>
            </div>

            {/* --- Typography --- */}
            <div>
                <Section label="Typography" c={c} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <LabelRow label="Font Size">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                                type="range" min={10} max={20} value={settings.fontSize}
                                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                                style={{ width: 80, cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: 12, minWidth: 24 }}>{settings.fontSize}px</span>
                        </div>
                    </LabelRow>
                    <LabelRow label="Padding">
                        <Select
                            value={settings.padding}
                            options={PADDING_OPTIONS}
                            onChange={(v) => updateSettings({ padding: v })}
                            c={c}
                        />
                    </LabelRow>
                </div>
            </div>

            {/* --- Caption ---
            <div>
                <Section label="Caption" c={c} />
                <input
                    value={settings.caption}
                    onChange={(e) => updateSettings({ caption: e.target.value })}
                    placeholder="Optional table caption..."
                    style={{
                        background: c.surface2, border: '1px solid ' + c.border,
                        borderRadius: 6, padding: '5px 10px', fontSize: 12,
                        color: c.text, fontFamily: 'inherit', outline: 'none',
                        width: '100%', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = c.border)}
                />
            </div> */}

        </div>
    )
}