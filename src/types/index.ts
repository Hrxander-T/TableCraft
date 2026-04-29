export type ColumnType = 'text' | 'number' | 'currency' | 'badge' | 'status' | 'bold'
export type Alignment = 'left' | 'center' | 'right'
export type Padding = 'compact' | 'normal' | 'spacious'

export interface Column {
    id: string
    label: string
    width: number
    type: ColumnType
    align: Alignment
}

export interface Row {
    id: string
    cells: Record<string, string>
    highlighted?: boolean
}

export interface TableSettings {
    showHeader: boolean
    alternatingRows: boolean
    showBorder: boolean
    fontSize: number
    padding: Padding
    caption: string

}

export interface TableState {
    id: string
    title: string
    theme: string
    columns: Column[]
    rows: Row[]
    settings: TableSettings
}