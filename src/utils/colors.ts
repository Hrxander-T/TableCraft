// --- Color tokens for light/dark mode ---
export type ColorMode = 'dark' | 'light'
export type Colors = ReturnType<typeof colors>

export function colors(mode: ColorMode) {
  if (mode === 'dark') return {
    bg: '#0a0f1e',
    surface: '#0d1424',
    surface2: '#0f172a',
    border: '#1e293b',
    text: '#f1f5f9',
    muted: '#475569',
    accent: '#60a5fa',
    accentBg: '#1e3a5f',
    accentBorder: '#2563eb',
  }
  return {
    bg: '#f8fafc',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a',
    muted: '#94a3b8',
    accent: '#2563eb',
    accentBg: '#dbeafe',
    accentBorder: '#2563eb',
  }
}