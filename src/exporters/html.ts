import type { Column, Row, TableSettings } from '../types'
import type { Theme } from '../themes'
import { saveFile } from '../utils/fileSave'

// --- Padding map ---
const paddingMap = { compact: '4px 8px', normal: '8px 12px', spacious: '12px 18px' }

// --- Generate standalone HTML file ---
export async function exportHTML(
  columns: Column[],
  rows: Row[],
  title: string,
  caption: string,
  theme: Theme,
  settings: TableSettings,
  filename = 'table'
) {
  const pad = paddingMap[settings.padding]

  const headerRow = settings.showHeader ? `
    <tr>
      ${columns.map((col) => `
        <th style="
          background: ${theme.headerBg};
          color: ${theme.headerText};
          padding: ${pad};
          text-align: ${col.align};
          font-weight: 600;
          ${settings.showBorder ? `border: 1px solid ${theme.border};` : ''}
        ">${col.label}</th>
      `).join('')}
    </tr>` : ''

  const bodyRows = rows.map((row, i) => {
    const bg = settings.alternatingRows
      ? i % 2 === 0 ? theme.rowEven : theme.rowOdd
      : theme.rowEven

    return `
  <tr>
    ${columns.map((col) => {
      const cellValue = (row.cells[col.id] ?? '').replace(/\n/g, '<br/>')
      return `
        <td style="
          background: ${bg};
          color: ${theme.text};
          padding: ${pad};
          text-align: ${col.align};
          white-space: pre-wrap;
          ${settings.showBorder ? `border: 1px solid ${theme.border};` : ''}
        ">${cellValue}</td>
      `
    }).join('')}
  </tr>`
  }).join('')
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title || 'Table'}</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; background: #fff; }
    table { border-collapse: collapse; font-size: ${settings.fontSize}px; }
    caption { font-weight: 700; font-size: ${settings.fontSize + 2}px; margin-bottom: 8px; text-align: left; color: ${theme.text}; }
  </style>
</head>
<body>
  <table>
    ${caption ? `<caption>${caption}</caption>` : ''}
    ${title ? `<caption>${title}</caption>` : ''}
    <thead>${headerRow}</thead>
    <tbody>${bodyRows}</tbody>
  </table>
</body>
</html>`

  await saveFile(html, `${filename}.html`, 'text/html')
}