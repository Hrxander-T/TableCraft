import { useTableStore } from "../../store/tableStore";
import { themes } from "../../themes";
import type { Column } from "../../types";

// --- Cell renderer based on column type ---
function renderCell(
  value: string,
  col: Column,
  theme: {
    headerBg: string;
    headerText: string;
    rowEven: string;
    rowOdd: string;
    border: string;
    text: string;
  },
) {
  switch (col.type) {
    case "number":
      return (
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
      );

    case "currency":
      return <span style={{ color: "#16a34a", fontWeight: 600 }}>{value}</span>;

    case "bold":
      return (
        <span style={{ fontWeight: 700, color: theme.text }}>{value}</span>
      );

    case "badge":
      return (
        <span
          style={{
            background: badgeColor(value),
            color: "#fff",
            borderRadius: 999,
            padding: "2px 10px",
            fontSize: 12,
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          {value}
        </span>
      );

    case "status":
      return (
        <span>
          {statusIcon(value)} {value}
        </span>
      );

    default:
      return <span>{value}</span>;
  }
}

// --- Badge auto-color by value ---
function badgeColor(value: string) {
  const v = value.toLowerCase();
  if (["active", "yes", "success", "done", "complete", "core"].includes(v))
    return "#16a34a";
  if (["inactive", "no", "error", "failed", "blocked"].includes(v))
    return "#dc2626";
  if (["pending", "optional", "review", "warning"].includes(v))
    return "#d97706";
  return "#6366f1";
}

// --- Status icon by value ---
function statusIcon(value: string) {
  const v = value.toLowerCase();
  if (["yes", "active", "success", "done"].includes(v)) return "✅";
  if (["no", "error", "failed", "blocked"].includes(v)) return "❌";
  if (["pending", "warning", "review"].includes(v)) return "⚠️";
  return "•";
}

// --- TablePreview: styled read-only render target (inline styles only) ---
export default function TablePreview() {
  const { columns, rows, title, caption, theme: themeKey, settings } = useTableStore();
  const theme = themes[themeKey] ?? themes["corporate-blue"];

  const paddingMap = {
    compact: "4px 8px",
    normal: "8px 12px",
    spacious: "12px 18px",
  };
  const cellPadding = paddingMap[settings.padding];

  return (
    <div
      id="table-preview"
      style={{ display: "inline-block", padding: 16, background: "#fff" }}
    >
      {/* --- Title --- */}
      {title && (
        <div
          style={{
            color: theme.titleColor,
            fontWeight: 700,
            marginBottom: 10,
            fontSize: settings.fontSize + 2,
          }}
        >
          {title}
        </div>
      )}

      {/* --- Caption --- */}
      {caption && (
        <div style={{
          color: theme.text, fontSize: settings.fontSize - 2,
          marginTop: 6, marginBottom: 6, opacity: 0.7, fontStyle: 'italic',
        }}>
          {caption}
        </div>
      )}

      {/* --- Table --- */}
      <table
        style={{
          borderCollapse: "collapse",
          fontSize: settings.fontSize,
          width: "100%",
        }}
      >
        {/* --- Header --- */}
        {settings.showHeader && (
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  style={{
                    background: theme.headerBg,
                    color: theme.headerText,
                    border: settings.showBorder
                      ? `1px solid ${theme.border}`
                      : "none",
                    padding: cellPadding,
                    textAlign: col.align,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* --- Body --- */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td
                  key={col.id}
                  style={{
                    background: row.highlighted
                      ? theme.headerBg + "22"
                      : settings.alternatingRows
                        ? i % 2 === 0
                          ? theme.rowEven
                          : theme.rowOdd
                        : theme.rowEven,
                    color: theme.text,
                    border: settings.showBorder
                      ? `1px solid ${theme.border}`
                      : "none",
                    padding: cellPadding,
                    textAlign: col.align,
                  }}
                >
                  {renderCell(row.cells[col.id] ?? "", col, theme)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
