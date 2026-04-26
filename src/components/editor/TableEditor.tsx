import { useTableStore } from '../../store/tableStore'

export default function TableEditor() {
  const { columns, rows, updateCell, updateColumnLabel, addRow, removeRow, addColumn, removeColumn } = useTableStore()

  return (
    <div className="overflow-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} className="border border-gray-300 bg-gray-100 p-0 min-w-30">
                <div className="flex items-center gap-1 px-2 py-1">
                  <input
                    className="bg-transparent font-semibold w-full outline-none"
                    value={col.label}
                    onChange={(e) => updateColumnLabel(col.id, e.target.value)}
                  />
                  <button onClick={() => removeColumn(col.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                </div>
              </th>
            ))}
            <th className="border border-gray-300 bg-gray-100 px-2 py-1">
              <button onClick={addColumn} className="text-blue-500 hover:text-blue-700 font-bold">+ Col</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col) => (
                <td key={col.id} className="border border-gray-200 p-0">
                  <input
                    className="w-full px-2 py-1 outline-none bg-transparent"
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
      <button onClick={addRow} className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        + Add Row
      </button>
    </div>
  )
}