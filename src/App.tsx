import { useState } from "react";
import { useEffect } from "react";

// --- Components ---
import TableEditor from "./components/editor/TableEditor";
import TablePreview from "./components/preview/TablePreview";
import ImportPanel from "./components/panels/ImportPanel";

// --- Store ---
import { useTableStore } from "./store/tableStore";
import { useHistoryStore } from "./store/historyStore";

// --- Themes ---
import { themes } from "./themes";

// --- Exporters ---
import { exportPNG } from "./exporters/png";
import { exportPDF } from "./exporters/pdf";
import { exportCSV } from "./exporters/csv";
import { exportLatex } from "./exporters/latex";
import { exportSVG } from "./exporters/svg";
import { exportJSON, importJSON } from "./exporters/json";

function App() {
  const [showImport, setShowImport] = useState(false);
  const { title, setTitle, theme, setTheme, columns, rows } = useTableStore();
  const loadState = useTableStore((s) => s.loadState);
  const history = useHistoryStore();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "z") {
        const prev = history.undo(useTableStore.getState());
        if (prev) useTableStore.getState().loadState(prev);
      }
      if (e.ctrlKey && e.key === "y") {
        const next = history.redo(useTableStore.getState());
        if (next) useTableStore.getState().loadState(next);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [history]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col p-6 gap-4">
      {/* --- Top bar --- */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-blue-600">TableCraft</h1>

        <input
          className="border rounded px-2 py-1 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Table title"
        />

        <select
          className="border rounded px-2 py-1 text-sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>
              {t.name}
            </option>
          ))}
        </select>

        {/* --- Export buttons --- */}
        <div className="flex gap-2 ml-auto flex-wrap">
          <button
            onClick={() => setShowImport((v) => !v)}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {showImport ? "Hide Import" : "↑ Import"}
          </button>
          <button
            onClick={async () => exportPNG("table-preview", title)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ↓ PNG
          </button>
          <button
            onClick={async () => exportPDF("table-preview", title)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            ↓ PDF
          </button>
          <button
            onClick={async () => exportCSV(columns, rows, title)}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            ↓ CSV
          </button>
          <button
            onClick={async () => exportLatex(columns, rows, title)}
            className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            ↓ LaTeX
          </button>

          <button
            onClick={async () =>
              exportSVG(
                columns,
                rows,
                title,
                themes[theme] ?? themes["corporate-blue"],
                useTableStore.getState().settings,
              )
            }
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ↓ SVG
          </button>

          <button
            onClick={async () => exportJSON(useTableStore.getState())}
            className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            ↓ JSON
          </button>
          <label className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer">
            ↑ Load JSON
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) loadState(await importJSON(file));
              }}
            />
          </label>
        </div>
      </div>

      {/* --- Import panel (collapsible) --- */}
      {showImport && (
        <div className="bg-white rounded shadow p-4 w-80">
          <ImportPanel />
        </div>
      )}

      {/* --- Main area: editor + preview --- */}
      <div className="flex gap-6 flex-1 overflow-auto">
        <div className="bg-white rounded shadow p-4 flex-1 overflow-auto">
          <div className="text-xs text-gray-400 mb-2 font-semibold uppercase">
            Editor
          </div>
          <TableEditor />
        </div>
        <div className="bg-white rounded shadow p-4 flex-1 overflow-auto">
          <div className="text-xs text-gray-400 mb-2 font-semibold uppercase">
            Preview
          </div>
          <TablePreview />
        </div>
      </div>
    </div>
  );
}

export default App;
