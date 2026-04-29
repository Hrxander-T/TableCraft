import { useTableStore } from '../../store/tableStore'
import type { Padding } from '../../types'

// --- Reusable row layout ---
function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{label}</span>
            {children}
        </div>
    )
}

// --- Reusable toggle ---
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button onClick={() => onChange(!value)} style={{
            width: 36, height: 20, borderRadius: 999, border: 'none',
            background: value ? '#2563eb' : '#475569',
            cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
            flexShrink: 0,
        }}>
            <div style={{
                position: 'absolute', top: 2, left: value ? 18 : 2,
                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
            }} />
        </button>
    )
}

// --- Reusable select ---
function Select<T extends string>({ value, options, onChange, c }: {
    value: T
    options: { value: T; label: string }[]
    onChange: (v: T) => void
    c: { surface2: string; border: string; text: string }
}) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value as T)} style={{
            background: c.surface2, border: '1px solid ' + c.border,
            borderRadius: 6, padding: '3px 8px', fontSize: 12,
            color: c.text, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
        }}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    )
}

// --- Section header ---
function Section({ label, c }: { label: string; c: { muted: string; border: string } }) {
    return (
        <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: c.muted,
            borderBottom: '1px solid ' + c.border, paddingBottom: 6, marginBottom: 10,
        }}>{label}</div>
    )
}

const PADDING_OPTIONS: { value: Padding; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'spacious', label: 'Spacious' },
]

// --- SettingsPanel ---
export default function SettingsPanel({ c }: {
    c: { surface2: string; border: string; text: string; muted: string }
}) {
    const { settings, updateSettings } = useTableStore()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>

            {/* --- Display --- */}
            <div>
                <Section label="Display" c={c} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Row label="Show Header">
                        <Toggle value={settings.showHeader} onChange={(v) => updateSettings({ showHeader: v })} />
                    </Row>
                    <Row label="Alternating Rows">
                        <Toggle value={settings.alternatingRows} onChange={(v) => updateSettings({ alternatingRows: v })} />
                    </Row>
                    <Row label="Show Border">
                        <Toggle value={settings.showBorder} onChange={(v) => updateSettings({ showBorder: v })} />
                    </Row>
                </div>
            </div>

            {/* --- Typography --- */}
            <div>
                <Section label="Typography" c={c} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Row label="Font Size">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                                type="range" min={10} max={20} value={settings.fontSize}
                                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                                style={{ width: 80, cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: 12, minWidth: 24 }}>{settings.fontSize}px</span>
                        </div>
                    </Row>
                    <Row label="Padding">
                        <Select
                            value={settings.padding}
                            options={PADDING_OPTIONS}
                            onChange={(v) => updateSettings({ padding: v })}
                            c={c}
                        />
                    </Row>
                </div>
            </div>

            {/* --- Caption --- */}
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
            </div>

        </div>
    )
}