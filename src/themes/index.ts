export interface Theme {
    name: string
    headerBg: string
    headerText: string
    rowEven: string
    rowOdd: string
    border: string
    text: string
}

export const themes: Record<string, Theme> = {
    'corporate-blue': {
        name: 'Corporate Blue',
        headerBg: '#1e40af',
        headerText: '#ffffff',
        rowEven: '#ffffff',
        rowOdd: '#eff6ff',
        border: '#bfdbfe',
        text: '#1e293b',
    },
    'minimal-clean': {
        name: 'Minimal Clean',
        headerBg: '#f8fafc',
        headerText: '#0f172a',
        rowEven: '#ffffff',
        rowOdd: '#f8fafc',
        border: '#e2e8f0',
        text: '#334155',
    },
    'dark-professional': {
        name: 'Dark Professional',
        headerBg: '#0f172a',
        headerText: '#f1f5f9',
        rowEven: '#1e293b',
        rowOdd: '#273549',
        border: '#334155',
        text: '#e2e8f0',
    },
}