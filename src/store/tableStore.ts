import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { useHistoryStore } from './historyStore'
import { saveToLocal, loadFromLocal } from '../utils/autoSave'
import type { TableState, Column, Row, ColumnType, Alignment, TableSettings } from '../types'
import { useTabsStore } from './tabsStore'

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
  updateCaption: (caption: string) => void
  addRow: () => void
  removeRow: (rowId: string) => void
  addColumn: () => void
  removeColumn: (colId: string) => void
  updateColumnLabel: (colId: string, label: string) => void
  loadState: (state: TableState) => void
  loadStateSilent: (state: TableState) => void
  updateColumnType: (colId: string, type: ColumnType) => void
  updateColumnAlign: (colId: string, align: Alignment) => void
  updateSettings: (settings: Partial<TableSettings>) => void
  toggleRowHighlight: (rowId: string) => void
  updateColumnWidth: (colId: string, width: number) => void
  reorderRows: (rows: Row[]) => void
  reorderColumns: (columns: Column[]) => void

}

// --- Load saved state or use defaults ---
const saved = loadFromLocal(localStorage.getItem('tablecraft:active') ?? '')

const initialState = saved ?? {
  id: nanoid(),
  title: 'My Table',
  caption: '',
  theme: 'corporate-blue',
  columns: defaultColumns,
  rows: defaultRows,
  settings: {
    showHeader: true, alternatingRows: true, showBorder: true,
    fontSize: 14, padding: 'normal' as const, 
  },
}

export const useTableStore = create<Store>((set) => ({
  ...initialState,
  caption: saved?.caption ?? '',

  setTitle: (title) => {
    set({ title })
    persist()
    useTabsStore.getState().updateTabTitle(useTabsStore.getState().activeId, title)
  },

  updateCaption: (caption) => {
    snapshot()
    set({ caption })
    persist()
  },
  setTheme: (theme) => { set({ theme }); persist() },


  updateCell: (rowId, colId, value) => {
    snapshot()
    set((s) => ({
      rows: s.rows.map((r) =>
        r.id === rowId ? { ...r, cells: { ...r.cells, [colId]: value } } : r
      ),
    }))
    persist()
  },

  addRow: () => {
    snapshot()
    set((s) => ({ rows: [...s.rows, { id: nanoid(), cells: {} }] }))
    persist()
  },

  removeRow: (rowId) => {
    snapshot()
    set((s) => ({ rows: s.rows.filter((r) => r.id !== rowId) }))
    persist()
  },

  addColumn: () => {
    snapshot()
    set((s) => ({
      columns: [...s.columns, { id: nanoid(), label: 'New Column', width: 150, type: 'text', align: 'left' }],
    }))
    persist()
  },

  removeColumn: (colId) => {
    snapshot()
    set((s) => ({ columns: s.columns.filter((c) => c.id !== colId) }))
    persist()

  },

  updateColumnLabel: (colId, label) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, label } : c)),
    }))
    persist()

  },

  updateColumnType: (colId, type) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, type } : c)),
    }))
    persist()

  },

  updateColumnAlign: (colId, align) => {
    snapshot()
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, align } : c)),
    }))
    persist()

  },

  loadState: (state) => {
    snapshot()
    const activeId = useTabsStore.getState().activeId
    const stateWithCorrectId = { ...state, id: activeId }
    set({ ...stateWithCorrectId })
    persist()
    useTabsStore.getState().updateTabTitle(activeId, state.title)
  },

  loadStateSilent: (state) => {
    const activeId = useTabsStore.getState().activeId
    const stateWithCorrectId = { ...state, id: activeId }
    set({ ...stateWithCorrectId })
    persist()
    useTabsStore.getState().updateTabTitle(activeId, state.title)
  },

  updateSettings: (patch) => {
    set((s) => ({ settings: { ...s.settings, ...patch } }))
    persist()
  },

  toggleRowHighlight: (rowId) => {
    snapshot()
    set((s) => ({
      rows: s.rows.map((r) =>
        r.id === rowId ? { ...r, highlighted: !r.highlighted } : r
      ),
    }))
    persist()

  },

  updateColumnWidth: (colId, width) => {
    set((s) => ({
      columns: s.columns.map((c) => (c.id === colId ? { ...c, width } : c)),
    }))
    persist()

  },

  reorderRows: (rows) => {
    snapshot()
    set({ rows })
    persist
  },

  reorderColumns: (columns) => {
    snapshot()
    set({ columns })
    persist()
  },

}))

// --- Helper: save snapshot before mutating ---
function snapshot() {
  const s = useTableStore.getState()
  const activeId = useTabsStore.getState().activeId
  useHistoryStore.getState().push(activeId, {
    id: s.id, title: s.title, caption:s.caption, theme: s.theme,
    columns: s.columns, rows: s.rows, settings: s.settings,
  })
}

function persist() {
  const s = useTableStore.getState()
  saveToLocal({
    id: s.id, title: s.title, caption: s.caption ,theme: s.theme,
    columns: s.columns, rows: s.rows, settings: s.settings,
  })
}