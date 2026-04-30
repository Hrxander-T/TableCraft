import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { saveToLocal, loadFromLocal } from '../utils/autoSave'
import type { TableState } from '../types'

// --- Default settings ---
export function defaultTable(name = 'New Table'): TableState {
  const c1 = nanoid(), c2 = nanoid(), c3 = nanoid()
  return {
    id: nanoid(),
    title: name,
    caption : '',
    theme: 'corporate-blue',
    columns: [
      { id: c1, label: 'Name', width: 200, type: 'text', align: 'left' },
      { id: c2, label: 'Value', width: 150, type: 'text', align: 'left' },
      { id: c3, label: 'Status', width: 120, type: 'text', align: 'center' },
    ],
    rows: [
      { id: nanoid(), cells: { [c1]: 'Item One', [c2]: '100', [c3]: 'Active' } },
      { id: nanoid(), cells: { [c1]: 'Item Two', [c2]: '200', [c3]: 'Inactive' } },
    ],
    settings: {
      showHeader: true, alternatingRows: true, showBorder: true,
      fontSize: 14, padding: 'normal',
    },
  }
}

// --- Tabs store ---
const TABS_KEY = 'tablecraft:tabs'
const ACTIVE_KEY = 'tablecraft:active'

function loadTabs(): string[] {
  try { return JSON.parse(localStorage.getItem(TABS_KEY) ?? '[]') } catch { return [] }
}

function saveTabs(ids: string[]) {
  localStorage.setItem(TABS_KEY, JSON.stringify(ids))
}

interface TabsStore {
  tabIds: string[]
  activeId: string
  tabTitles: Record<string, string>
  setActive: (id: string) => void
  addTab: () => void
  removeTab: (id: string) => void
  getTab: (id: string) => TableState | null
  updateTabTitle: (id: string, title: string) => void
}

export const useTabsStore = create<TabsStore>((set, get) => {
  // --- Hydrate from localStorage ---
  let tabIds = loadTabs()
  let activeId = localStorage.getItem(ACTIVE_KEY) ?? ''

  // --- Bootstrap if empty ---
  if (tabIds.length === 0) {
    const t = defaultTable('My Table')
    tabIds = [t.id]
    activeId = t.id
    saveToLocal(t)
    saveTabs(tabIds)
    localStorage.setItem(ACTIVE_KEY, activeId)
  }

  if (!tabIds.includes(activeId)) activeId = tabIds[0]

  return {
    tabIds,
    activeId,

    tabTitles: tabIds.reduce((acc, id) => {
      try {
        const raw = localStorage.getItem(`tablecraft:autosave:${id}`)
        if (raw) acc[id] = JSON.parse(raw).title ?? 'Untitled'
      } catch { acc[id] = 'Untitled' }
      return acc
    }, {} as Record<string, string>),

    setActive: (id) => {
      localStorage.setItem(ACTIVE_KEY, id)
      set({ activeId: id })
    },

    addTab: () => {
      const t = defaultTable(`Table ${get().tabIds.length + 1}`)
      saveToLocal(t)
      const tabIds = [...get().tabIds, t.id]
      saveTabs(tabIds)
      localStorage.setItem(ACTIVE_KEY, t.id)
      set({ tabIds, activeId: t.id })
    },

    removeTab: (id) => {
      const { tabIds, activeId } = get()
      if (tabIds.length === 1) return // keep at least one
      const next = tabIds.filter((t) => t !== id)
      localStorage.removeItem(`tablecraft:autosave:${id}`)
      saveTabs(next)
      const newActive = activeId === id ? next[0] : activeId
      localStorage.setItem(ACTIVE_KEY, newActive)
      set({ tabIds: next, activeId: newActive })
    },

    getTab: (id) => loadFromLocal(id),

    updateTabTitle: (id, title) => set((s) => ({
      tabTitles: { ...s.tabTitles, [id]: title },
    })),
  }
})