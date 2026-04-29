import { create } from 'zustand'
import type { TableState, Column, Row, ColumnType, Alignment, TableSettings } from '../types'
import { nanoid } from 'nanoid'
import { useHistoryStore } from './historyStore'


const defaultColumns: Column[] = [
  { id: 'c1', label: 'Name', width: 200, type: 'text', align: 'left' },
  { id: 'c2', label: 'Value', width: 150, type: 'text', align: 'left' },
  { id: 'c3', label: 'Status', width: 120, type: 'text', align: 'center' },
]

const defaultRows: Row[] = [
  { id: 'r1', cells: { c1: 'Item One', c2: '100', c3: 'Active' } },
  { id: 'r2', cells: { c1: 'Item Two', c2: '200', c3: 'Inactive' } },
  { id: 'r3', cells: { c1: 'Item Three', c2: '300', c3: 'Active' } },
]

interface Store extends TableState {
  setTitle: (title: string) => void
  setTheme: (theme: string) => void
  updateCell: (rowId: string, colId: string, value: string) => void
  addRow: () => void
  removeRow: (rowId: string) => void
  addColumn: () => void
  removeColumn: (colId: string) => void
  updateColumnLabel: (colId: string, label: string) => void
  loadState: (state: TableState) => void
  updateColumnType: (colId: string, type: ColumnType) => void
  updateColumnAlign: (colId: string, align: Alignment) => void
  updateSettings: (settings: Partial<TableSettings>) => void
  toggleRowHighlight: (rowId: string) => void
  updateColumnWidth: (colId: string, width: number) => void
  reorderRows: (rows: Row[]) => void
  reorderColumns: (columns: Column[]) => void
}

export const useTableStore = create<Store>((set) => ({
  id: nanoid(),
  title: 'My Table',
  theme: 'corporate-blue',
  columns: defaultColumns,
  rows: defaultRows,
  settings: {
    showHeader: true,
    alternatingRows: true,
    showBorder: true,
    fontSize: 14,
    padding: 'normal',
    caption: '',

  },

  setTitle: (title) => set({ title }),
  setTheme: (theme) => set({ theme }),

  updateCell: (rowId, colId, value) => {
    snapshot()
    set((s) => ({
      rows: s.rows.map((r) =>
        r.id === rowId ? { ...r, cells: { ...r.cells, [colId]: value } } : r
      ),
    }))
  },

  addRow: () => {
    snapshot()
    set((s) => ({ rows: [...s.rows, { id: nanoid(), cells: {} }] }))
  },

  removeRow: (rowId) => {
    snapshot()
    set((s) => ({ rows: s.rows.filter((r) => r.id !== rowId) }))
  },

  addColumn: () => {
    snapshot()
    set((s) => ({
      columns: [...s.columns, { id: nanoid(), label: 'New Column', width: 150, type: 'text', align: 'left' }],
    }))
  },

  removeColumn: (colId) => {
    snapshot()
    set((s) => ({ columns: s.columns.filter((c) => c.id !== colId) }))
  },

  updateColumnLabel: (colId, label) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, label } : c)),
    }))
  },

  updateColumnType: (colId, type) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, type } : c)),
    }))
  },

  updateColumnAlign: (colId, align) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, align } : c)),
    }))
  },
  loadState: (state: TableState) => set({ ...state }),

  updateSettings: (patch) =>
    set((s) => ({ settings: { ...s.settings, ...patch } })),

  toggleRowHighlight: (rowId) => {
    snapshot()
    set((s) => ({
      rows: s.rows.map((r) =>
        r.id === rowId ? { ...r, highlighted: !r.highlighted } : r
      ),
    }))
  },

  updateColumnWidth: (colId, width) =>
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, width } : c)),
    })),

  reorderRows: (rows) => {
    snapshot()
    set({ rows })
  },

  reorderColumns: (columns) => {
    snapshot()
    set({ columns })
  },

}))

// --- Helper: save snapshot before mutating ---
function snapshot() {
  const s = useTableStore.getState()
  useHistoryStore.getState().push({
    id: s.id, title: s.title, theme: s.theme,
    columns: s.columns, rows: s.rows, settings: s.settings,
  })
}