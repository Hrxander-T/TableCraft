// --- Detect if running inside Tauri desktop ---
export const isTauri = () => '__TAURI_INTERNALS__' in window

// --- Save file: native dialog on desktop, browser download on web ---
export async function saveFile(content: string, filename: string, mimeType: string) {
  if (isTauri()) {
    const { save } = await import('@tauri-apps/plugin-dialog')
    const { writeTextFile } = await import('@tauri-apps/plugin-fs')

    const path = await save({ defaultPath: filename })
    if (path) await writeTextFile(path, content)
  } else {
    // --- Browser fallback ---
    const blob = new Blob([content], { type: mimeType })
    const link = document.createElement('a')
    link.download = filename
    link.href = URL.createObjectURL(blob)
    link.click()
  }
}

// --- Open file: native dialog on desktop, file input on web ---
export async function openFile(accept: string): Promise<string | null> {
  if (isTauri()) {
    const { open } = await import('@tauri-apps/plugin-dialog')
    const { readTextFile } = await import('@tauri-apps/plugin-fs')

    const path = await open({ filters: [{ name: accept, extensions: [accept.replace('.', '')] }] })
    if (typeof path === 'string') return await readTextFile(path)
    return null
  } else {
    return null // web uses <input type="file"> directly
  }
}