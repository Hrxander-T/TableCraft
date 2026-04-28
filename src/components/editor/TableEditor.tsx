import { useTableStore } from "../../store/tableStore";
import { useUIStore } from "../../store/uiStore";
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
  } = useTableStore();

  const isDark = useUIStore((s) => s.colorMode === "dark");

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
  };

  return (
    <div className={`overflow-auto ${theme.text}`}>
      <table className="border-collapse text-sm max-w-4xl">
        
        {/* --- Header --- */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                className={`border p-0 min-w-35 ${theme.border} ${theme.headerBg}`}
              >
                <div className="flex flex-col gap-1 px-2 py-1">
                  
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
                      className="text-red-400 hover:text-red-600 text-xs"
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
              </th>
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
            <tr key={row.id} className={i % 2 === 0 ? theme.rowEven : theme.rowOdd}>
              
              {columns.map((col) => (
                <td
                  key={col.id}
                  className={`border p-0 ${theme.borderSoft}`}
                >
                  <input
                    className={`w-full px-2 py-1 outline-none bg-transparent text-sm ${theme.text}`}
                    value={row.cells[col.id] ?? ""}
                    onChange={(e) =>
                      updateCell(row.id, col.id, e.target.value)
                    }
                  />
                </td>
              ))}

              {/* Delete row */}
              <td
                className={`border px-2 py-1 text-center ${theme.borderSoft}`}
              >
                <button
                  onClick={() => removeRow(row.id)}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  ✕
                </button>
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