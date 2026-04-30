import { isTauri } from '../utils/fileSave'

// --- Export table as PNG ---
export async function exportPNG(elementId: string, filename = 'table') {
  const el = document.getElementById(elementId)
  if (!el) return
  const { default: html2canvas } = await import('html2canvas')
  const canvas = await html2canvas(el, { scale: 2, useCORS: true })

  if (isTauri()) {
    const { save } = await import('@tauri-apps/plugin-dialog')
    const { writeFile } = await import('@tauri-apps/plugin-fs')

    const path = await save({ defaultPath: `${filename}.png`, filters: [{ name: 'PNG', extensions: ['png'] }] })
    if (!path) return

    // --- Convert canvas to Uint8Array ---
    const dataUrl = canvas.toDataURL('image/png')
    const base64 = dataUrl.split(',')[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    await writeFile(path, bytes)
  } else {
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}