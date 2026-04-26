// --- Theme interface ---
export interface Theme {
    name: string
    headerBg: string
    headerText: string
    rowEven: string
    rowOdd: string
    border: string
    text: string
}

// --- Theme registry ---
export const themes: Record<string, Theme> = {

    // --- Corporate Blue ---
    'corporate-blue': {
        name: 'Corporate Blue',
        headerBg: '#1e40af',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#eff6ff',
        border: '#bfdbfe',
        text: '#1e293b',
    },

    // --- Minimal Clean ---
    'minimal-clean': {
        name: 'Minimal Clean',
        headerBg: '#334155',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#f8fafc',
        border: '#e2e8f0',
        text: '#1e293b',
    },

    // --- Dark Professional ---
    'dark-professional': {
        name: 'Dark Professional',
        headerBg: '#0f172a',
        headerText: '#ffffff',
        rowEven: '#1e293b',
        rowOdd: '#263244',
        border: '#475569',
        text: '#f1f5f9',
    },

    // --- Forest Green ---
    'forest-green': {
        name: 'Forest Green',
        headerBg: '#166534',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#f0fdf4',
        border: '#bbf7d0',
        text: '#14532d',
    },

    // --- Warm Earth ---
    'warm-earth': {
        name: 'Warm Earth',
        headerBg: '#92400e',
        headerText: '#fffbeb',
        rowEven: '#fffbeb',
        rowOdd: '#fef3c7',
        border: '#fde68a',
        text: '#78350f',
    },

    // --- High Contrast ---
    'high-contrast': {
        name: 'High Contrast',
        headerBg: '#000000',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#f3f4f6',
        border: '#000000',
        text: '#000000',
    },

    // --- Sunset Orange ---
    'sunset-orange': {
        name: 'Sunset Orange',
        headerBg: '#c2410c',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#fff7ed',
        border: '#fed7aa',
        text: '#7c2d12',
    },

    // --- Tech Terminal ---
    'tech-terminal': {
        name: 'Tech Terminal',
        headerBg: '#0d1117',
        headerText: '#00ff88',
        rowEven: '#161b22',
        rowOdd: '#1c2128',
        border: '#30363d',
        text: '#e6edf3',
    },
}