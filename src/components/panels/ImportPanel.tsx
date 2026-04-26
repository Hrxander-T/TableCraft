import { useState } from "react";
import { parseCSV } from "../../importers/csv";
import { useTableStore } from "../../store/tableStore";

// --- ImportPanel: CSV paste and file upload ---
export default function ImportPanel() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // --- Store ---
  const loadState = useTableStore((s) => s.loadState);
  const id = useTableStore((s) => s.id);
  const title = useTableStore((s) => s.title);
  const theme = useTableStore((s) => s.theme);
  const settings = useTableStore((s) => s.settings);

  // --- Handle paste/text import ---
  function handleImport() {
    try {
      const { columns, rows } = parseCSV(text);
      if (columns.length === 0) {
        setError("No data found");
        return;
      }
      loadState({ id, title, theme, settings, columns, rows });
      setText("");
      setError("");
    } catch {
      setError("Failed to parse CSV");
    }
  }

  // --- Handle file upload ---
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setText(ev.target?.result as string);
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-gray-400 font-semibold uppercase">
        Import CSV
      </div>

      {/* --- File upload --- */}
      <label className="px-3 py-1 text-sm bg-gray-100 border rounded cursor-pointer hover:bg-gray-200 text-center">
        Upload CSV file
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFile}
        />
      </label>

      {/* --- Paste area --- */}
      <textarea
        className="border rounded text-sm p-2 h-28 resize-none font-mono"
        placeholder={
          "Paste CSV here...\nName,Value,Status\nItem One,100,Active"
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && <div className="text-red-500 text-xs">{error}</div>}

      <button
        onClick={handleImport}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Import
      </button>
    </div>
  );
}
