import { useTableStore } from '../../store/tableStore'
import type { ColumnType, Alignment } from '../../types'

// --- Options ---
const TYPES: ColumnType[] = ['text', 'number', 'currency', 'badge', 'status', 'bold']
const ALIGNS: Alignment[] = ['left', 'center', 'right']

export default function TableEditor() {
  const {
    columns, rows,
    updateCell, updateColumnLabel, updateColumnType, updateColumnAlign,
    addRow, removeRow, addColumn, removeColumn,
  } = useTableStore()

  return (
    <div className="overflow-auto">
      <table className="border-collapse text-sm">

        {/* --- Column headers --- */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} className="border border-gray-300 bg-gray-100 p-0 min-w-35">
                <div className="flex flex-col gap-1 px-2 py-1">

                  {/* --- Label + remove --- */}
                  <div className="flex items-center gap-1">
                    <input
                      className="bg-transparent font-semibold w-full outline-none text-sm"
                      value={col.label}
                      onChange={(e) => updateColumnLabel(col.id, e.target.value)}
                    />
                    <button onClick={() => removeColumn(col.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>

                  {/* --- Type + align --- */}
                  <div className="flex gap-1">
                    <select
                      className="text-xs border rounded px-1 py-0.5 bg-white flex-1"
                      value={col.type}
                      onChange={(e) => updateColumnType(col.id, e.target.value as ColumnType)}
                    >
                      {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select
                      className="text-xs border rounded px-1 py-0.5 bg-white"
                      value={col.align}
                      onChange={(e) => updateColumnAlign(col.id, e.target.value as Alignment)}
                    >
                      {ALIGNS.map((a) => <option key={a} value={a}>{a[0].toUpperCase()}</option>)}
                    </select>
                  </div>

                </div>
              </th>
            ))}

            {/* --- Add column --- */}
            <th className="border border-gray-300 bg-gray-100 px-2 py-1">
              <button onClick={addColumn} className="text-blue-500 hover:text-blue-700 font-bold text-sm">+ Col</button>
            </th>
          </tr>
        </thead>

        {/* --- Rows --- */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col) => (
                <td key={col.id} className="border border-gray-200 p-0">
                  <input
                    className="w-full px-2 py-1 outline-none bg-transparent text-sm"
                    value={row.cells[col.id] ?? ''}
                    onChange={(e) => updateCell(row.id, col.id, e.target.value)}
                  />
                </td>
              ))}
              <td className="border border-gray-200 px-2 py-1 text-center">
                <button onClick={() => removeRow(row.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Add row --- */}
      <button onClick={addRow} className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        + Add Row
      </button>
    </div>
  )
}