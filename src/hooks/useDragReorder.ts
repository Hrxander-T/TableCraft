import { useRef } from 'react'

// --- Generic drag-to-reorder hook ---
export function useDragReorder<T>(
  items: T[],
  getId: (item: T) => string,
  onReorder: (newItems: T[]) => void
) {
  const dragId = useRef<string | null>(null)

  function onDragStart(id: string) {
    dragId.current = id
  }

  function onDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault()
    if (!dragId.current || dragId.current === overId) return
    const from = items.findIndex((i) => getId(i) === dragId.current)
    const to = items.findIndex((i) => getId(i) === overId)
    if (from === -1 || to === -1) return
    const reordered = [...items]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(to, 0, moved)
    onReorder(reordered)
  }

  function onDragEnd() {
    dragId.current = null
  }

  return { onDragStart, onDragOver, onDragEnd }
}