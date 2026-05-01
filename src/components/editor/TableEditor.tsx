import { useTableStore } from "../../store/tableStore";
import { useUIStore } from "../../store/uiStore";
import { useColumnResize } from '../../hooks/useColumnResize'
import { useDragReorder } from '../../hooks/useDragReorder'
import { isValidValue, validationMessage } from '../../utils/validate'
import type { ColumnType, Alignment } from "../../types";
// --- Options ---
const TYPES: ColumnType[] = [
  "text",
  "number",
  "currency",
  "badge",
  "status",
  "bold",
];

const ALIGNS: Alignment[] = ["left", "center", "right"];

// --- Resizable column header ---
function ResizableTh({ col, isDark, children, onDragStart, onDragOver, onDragEnd }: {
  col: { id: string; width: number }
  isDark: boolean
  children: React.ReactNode
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragEnd: () => void
}) {
  const { onMouseDown } = useColumnResize(col.id, col.width)

  return (
    <th
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      style={{ width: col.width, minWidth: col.width, position: 'relative', cursor: 'grab' }}
      className={`border p-0 ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-300 bg-gray-100'}`}
    >
      {children}
      {/* --- Resize handle --- */}
      <div
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: 6, cursor: 'col-resize',
          background: 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb88')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      />
    </th>
  )
}

export default function TableEditor() {
  const {
    columns,
    rows,
    updateCell,
    updateColumnLabel,
    updateColumnType,
    updateColumnAlign,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
    toggleRowHighlight,
    reorderColumns,
    reorderRows,
    caption,
    updateCaption,
  } = useTableStore();

  const isDark = useUIStore((s) => s.colorMode === "dark");

  // --- Drag reorder hooks ---
  const rowDrag = useDragReorder(rows, (r) => r.id, reorderRows)
  const colDrag = useDragReorder(columns, (c) => c.id, reorderColumns)

  // --- Theme system (centralized) ---
  const theme = {
    text: isDark ? "text-slate-100" : "text-gray-800",
    subText: isDark ? "text-slate-200" : "text-gray-700",
    border: isDark ? "border-slate-700" : "border-gray-300",
    borderSoft: isDark ? "border-slate-700" : "border-gray-200",
    headerBg: isDark ? "bg-slate-800" : "bg-gray-100",
    rowEven: isDark ? "bg-slate-900" : "bg-white",
    rowOdd: isDark ? "bg-slate-800" : "bg-gray-50",
    inputBg: isDark ? "bg-slate-900" : "bg-white",
    caption: isDark ? 'bg-slate-900 border-slate-600 text-slate-200 placeholder:text-slate-500'
      : 'bg-white border-gray-300 text-gray-800 placeholder:text-gray-400'
  };

  function handleCellKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) {
    if (e.key !== 'Tab') return
    e.preventDefault()

    const totalCols = columns.length
    const totalRows = rows.length

    let nextRow = rowIndex
    let nextCol = colIndex

    if (e.shiftKey) {
      // --- Shift+Tab: go back ---
      if (colIndex > 0) {
        nextCol = colIndex - 1
      } else if (rowIndex > 0) {
        nextRow = rowIndex - 1
        nextCol = totalCols - 1
      }
    } else {
      // --- Tab: go forward ---
      if (colIndex < totalCols - 1) {
        nextCol = colIndex + 1
      } else if (rowIndex < totalRows - 1) {
        nextRow = rowIndex + 1
        nextCol = 0
      }
    }

    // --- Focus next cell ---
    const nextId = `cell-${rows[nextRow]?.id}-${columns[nextCol]?.id}`
    document.getElementById(nextId)?.focus()
  }

  return (
    <div className={`overflow-auto ${theme.text}`}>

      <div style={{ marginBottom: 10, maxWidth: 400 }}>
        <input
          value={caption ?? ''}
          onChange={(e) => updateCaption(e.target.value)}
          placeholder="Table caption (optional)..."
          className={`w-full px-2 py-1 text-sm rounded border outline-none ${theme.caption}`}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
          onBlur={(e) => (e.currentTarget.style.borderColor = isDark ? '#475569' : '#d1d5db')}
        />
      </div>

      <table className="border-collapse text-sm max-w-4xl">

        {/* --- Header --- */}
        <thead>
          <tr>
            {columns.map((col) => (
              <ResizableTh
                key={col.id}
                col={col}
                isDark={isDark}
                onDragStart={() => colDrag.onDragStart(col.id)}
                onDragOver={(e) => colDrag.onDragOver(e, col.id)}
                onDragEnd={colDrag.onDragEnd}
              >
                <div className="flex flex-col gap-1 px-2 py-1" style={{ paddingRight: 14 }}>
                  {/* Label */}
                  <div className="flex items-center gap-1">
                    <input
                      className={`bg-transparent font-semibold w-full outline-none text-sm ${theme.text}`}
                      value={col.label}
                      onChange={(e) =>
                        updateColumnLabel(col.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeColumn(col.id)}
                      className="text-red-400 hover:text-red-600 text-xs "
                    >
                      ✕
                    </button>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-1">
                    <select
                      className={`text-xs border rounded px-1 py-0.5 flex-1 ${theme.inputBg} ${theme.border} ${theme.subText}`}
                      value={col.type}
                      onChange={(e) =>
                        updateColumnType(col.id, e.target.value as ColumnType)
                      }
                    >
                      {TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>

                    <select
                      className={`text-xs border rounded px-1 py-0.5 flex-1 ${theme.inputBg} ${theme.border} ${theme.subText}`}
                      value={col.align}
                      onChange={(e) =>
                        updateColumnAlign(col.id, e.target.value as Alignment)
                      }
                    >
                      {ALIGNS.map((a) => (
                        <option key={a} value={a}>
                          {a[0].toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </ResizableTh>
            ))}

            {/* Add column */}
            <th className={`border px-2 py-1 ${theme.border} ${theme.headerBg}`}>
              <button
                onClick={addColumn}
                className="text-blue-500 hover:text-blue-700 font-bold text-sm"
              >
                + Col
              </button>
            </th>
          </tr>
        </thead>

        {/* --- Body --- */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} draggable
              onDragStart={() => rowDrag.onDragStart(row.id)}
              onDragOver={(e) => rowDrag.onDragOver(e, row.id)}
              onDragEnd={rowDrag.onDragEnd}
              style={{ cursor: 'grab' }}
              className={i % 2 === 0 ? theme.rowEven : theme.rowOdd}>

              {columns.map((col) => (
                <td key={col.id} className={`border p-0 ${theme.borderSoft}`}>
                  <div style={{ position: 'relative' }}>
                    <input
                      id={`cell-${row.id}-${col.id}`}
                      onKeyDown={(e) => handleCellKeyDown(e, i, columns.indexOf(col))}
                      className={`w-full px-2 py-1 outline-none bg-transparent text-sm ${isDark ? 'text-slate-100' : 'text-gray-800'}`}
                      value={row.cells[col.id] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value
                        if (isValidValue(val, col.type)) {
                          updateCell(row.id, col.id, val)
                        }
                      }}
                      title={!isValidValue(row.cells[col.id] ?? '', col.type)
                        ? validationMessage(col.type) : ''}
                      style={{
                        borderLeft: !isValidValue(row.cells[col.id] ?? '', col.type)
                          ? '2px solid #ef4444' : '2px solid transparent',
                      }}
                    />
                  </div>
                </td>
              ))}

              {/* Delete row */}
              <td className={`border px-2 py-1 text-center ${theme.borderSoft}`}>
                {/* Highlights Row  */}
                <div style={{ display: 'flex', gap: 4, padding: '0 6px' }}>
                  <button
                    onClick={() => toggleRowHighlight(row.id)}
                    title="Highlight row"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 12, opacity: row.highlighted ? 1 : 0.3,
                      padding: '2px 4px',
                    }}
                  >★</button>
                  {/* Deletes Row  */}
                  <button
                    onClick={() => removeRow(row.id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </td>


            </tr>
          ))}
        </tbody>
      </table>

      {/* Add row */}
      <button
        onClick={addRow}
        className="mt-3 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Add Row
      </button>
    </div>
  );
}