import { useTableStore } from '../../store/tableStore'
import { themes } from '../../themes'

export default function TablePreview() {
  const { columns, rows, title, theme: themeKey } = useTableStore()
  const theme = themes[themeKey] ?? themes['corporate-blue']

  return (
    <div id="table-preview">
      <div style={{ color: theme.text, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>{title}</div>
      <table style={{ borderCollapse: 'collapse', fontSize: 14, width: '100%' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} style={{
                background: theme.headerBg,
                color: theme.headerText,
                border: `1px solid ${theme.border}`,
                padding: '8px 12px',
                textAlign: col.align,
                fontWeight: 600,
              }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.id} style={{
                  background: i % 2 === 0 ? theme.rowEven : theme.rowOdd,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                  padding: '8px 12px',
                  textAlign: col.align,
                }}>{row.cells[col.id] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}