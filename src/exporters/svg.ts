import type { Column, Row, TableSettings } from '../types'
import type { Theme } from '../themes'
import { saveFile } from '../utils/fileSave'


// --- Padding map ---
const paddingMap = { compact: 6, normal: 10, spacious: 16 }

// --- Generate SVG from table state ---
export async function exportSVG(
  columns: Column[],
  rows: Row[],
  title: string,
  theme: Theme,
  settings: TableSettings,
  filename = 'table'
) {
  const pad = paddingMap[settings.padding]
  const fontSize = settings.fontSize
  const rowHeight = fontSize + pad * 2
  const colWidths = columns.map((c) => c.width)
  const totalWidth = colWidths.reduce((a, b) => a + b, 0)
  const titleHeight = title ? rowHeight + 8 : 0
  const totalHeight = titleHeight + rowHeight + rows.length * rowHeight

  // --- Build SVG rows ---
  let svgRows = ''

  // --- Title ---
  if (title) {
    svgRows += `<text x="${pad}" y="${fontSize + 4}" font-size="${fontSize + 2}" font-weight="bold" fill="${theme.text}" font-family="system-ui,sans-serif">${title}</text>`
  }

  // --- Header ---
  let x = 0
  columns.forEach((col, i) => {
    svgRows += `<rect x="${x}" y="${titleHeight}" width="${colWidths[i]}" height="${rowHeight}" fill="${theme.headerBg}"/>`
    svgRows += `<text x="${x + pad}" y="${titleHeight + fontSize + pad - 2}" font-size="${fontSize}" font-weight="600" fill="${theme.headerText}" font-family="system-ui,sans-serif">${col.label}</text>`
    x += colWidths[i]
  })

  // --- Body rows ---
  rows.forEach((row, ri) => {
    const y = titleHeight + rowHeight + ri * rowHeight
    const bg = settings.alternatingRows
      ? ri % 2 === 0 ? theme.rowEven : theme.rowOdd
      : theme.rowEven
    x = 0
    columns.forEach((col, ci) => {
      svgRows += `<rect x="${x}" y="${y}" width="${colWidths[ci]}" height="${rowHeight}" fill="${bg}"/>`
      if (settings.showBorder) {
        svgRows += `<rect x="${x}" y="${y}" width="${colWidths[ci]}" height="${rowHeight}" fill="none" stroke="${theme.border}" stroke-width="1"/>`
      }
      svgRows += `<text x="${x + pad}" y="${y + fontSize + pad - 2}" font-size="${fontSize}" fill="${theme.text}" font-family="system-ui,sans-serif">${row.cells[col.id] ?? ''}</text>`
      x += colWidths[ci]
    })
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <rect width="${totalWidth}" height="${totalHeight}" fill="#ffffff"/>
  ${svgRows}
</svg>`

  await saveFile(svg, `${filename}.svg`, 'image/svg+xml')

}