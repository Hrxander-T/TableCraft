import { useRef } from 'react'
import { useTableStore } from '../store/tableStore'

// --- Hook: drag to resize a column ---
export function useColumnResize(colId: string, currentWidth: number) {
  const startX = useRef(0)
  const startWidth = useRef(0)
  const updateColumnWidth = useTableStore((s) => s.updateColumnWidth)

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    startX.current = e.clientX
    startWidth.current = currentWidth

    function onMouseMove(ev: MouseEvent) {
      const delta = ev.clientX - startX.current
      const newWidth = Math.max(60, startWidth.current + delta)
      updateColumnWidth(colId, newWidth)
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return { onMouseDown }
}