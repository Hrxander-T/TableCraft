import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { isTauri } from '../utils/fileSave'

// --- Export table as PDF ---
export async function exportPDF(elementId: string, filename = 'table') {
  const el = document.getElementById(elementId)
  if (!el) return
  const canvas = await html2canvas(el, { scale: 2, useCORS: true })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)

  if (isTauri()) {
    const { save } = await import('@tauri-apps/plugin-dialog')
    const { writeFile } = await import('@tauri-apps/plugin-fs')

    const path = await save({ defaultPath: `${filename}.pdf`, filters: [{ name: 'PDF', extensions: ['pdf'] }] })
    if (!path) return

    // --- Convert PDF to Uint8Array ---
    const bytes = pdf.output('arraybuffer')
    await writeFile(path, new Uint8Array(bytes))
  } else {
    pdf.save(`${filename}.pdf`)
  }
}