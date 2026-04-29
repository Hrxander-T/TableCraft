# TableCraft — Build Progress

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite plugin — no config file)
- Zustand 4 (state + history)
- html2canvas + jsPDF + nanoid
- Tauri 2 (desktop wrapper)
- Deployed on Vercel: https://table-craft.vercel.app

## Important Conventions
- `TablePreview.tsx` uses **inline styles only** (html2canvas can't capture Tailwind classes)
- All other components use Tailwind
- Zustand selectors must be **primitive/separate** — avoid returning objects from selectors (causes infinite re-renders)
- Commit style: `feat:` `fix:` `style:` `refactor:` `docs:` `chore:`
- Excel import deferred to v2 — no safe library available (SheetJS and ExcelJS both have unresolved vulnerabilities)

## File Structure
src/
├── components/
│   ├── editor/
│   │   └── TableEditor.tsx
│   ├── preview/
│   │   └── TablePreview.tsx
│   ├── panels/
│   │   ├── ImportPanel.tsx
│   │   └── SettingsPanel.tsx
│   ├── toolbar/
│   │   └── Toolbar.tsx
│   └── ui/
│       └── index.tsx
├── exporters/
│   ├── png.ts, pdf.ts, csv.ts, json.ts, svg.ts, latex.ts
├── hooks/
│   ├── useColumnResize.ts
│   └── useDragReorder.ts
├── importers/
│   └── csv.ts
├── store/
│   ├── tableStore.ts
│   ├── historyStore.ts
│   └── uiStore.ts
├── themes/
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   ├── colors.ts
│   └── fileSave.ts
├── pages/
│   ├── Landing.tsx
│   └── App.tsx
├── App.tsx
└── main.tsx

## Phase 1 — MVP ✅ (Complete)
- [x] Vite + React + TypeScript + Tailwind v4 setup
- [x] Zustand store with table state (columns, rows, title, theme, settings)
- [x] TableEditor — editable grid, add/remove rows & columns
- [x] TablePreview — styled read-only render target (inline styles)
- [x] 3 themes: Corporate Blue, Minimal Clean, Dark Professional
- [x] CSV paste import
- [x] CSV file upload import
- [x] Export: PNG (html2canvas 2x scale)
- [x] Export: PDF (jsPDF landscape)
- [x] Export: CSV
- [x] Export: JSON (save full state)
- [x] Import: JSON (restore full state)
- [x] Deployed to Vercel

## Phase 2 — Polish ✅ (Complete)
- [x] Column types: text, number, currency, badge, status, bold
- [x] Column alignment control per column
- [x] 8 themes: Corporate Blue, Minimal Clean, Dark Professional, Forest Green, Warm Earth, High Contrast, Sunset Orange, Tech Terminal
- [x] Undo / Redo (Ctrl+Z / Ctrl+Y) — 30 step history
- [x] LaTeX exporter (tabular, escaped special chars)
- [x] SVG exporter (pure SVG, no dependencies)

## Phase 3 — Platform ✅ (Complete)
- [x] Tauri 2 desktop wrapper
- [x] Native file save dialogs (all formats)
- [x] Native file open dialogs
- [x] tauri-plugin-dialog + tauri-plugin-fs
- [x] fileSave.ts utility (auto-detects Tauri vs web)
- [x] Linux AppImage built and tested
- [x] Linux .deb package built
- [x] Linux .rpm package built
- [ ] Windows installer (.msi) — requires Windows build machine
- [ ] macOS .dmg — deferred to v2
- [ ] Excel (.xlsx) import — deferred to v2 (security concern)

## Phase 4 — Public Launch (Next)
- [ ] Landing page
- [ ] GitHub docs + screenshots
- [ ] Product Hunt launch
- [ ] v1.0 release tag on GitHub

## Phase 5 — Core Features ✅ (Complete)
- [x] Table settings panel (header, borders, alternating rows, font size, padding)
- [x] Table caption
- [x] Row highlighting
- [x] Column resizing (drag handle)
- [x] Row reordering (drag and drop)
- [x] Column reordering (drag and drop)

## Known Issues / Decisions
- Chunk size warning on build (801kb) — acceptable for now, fix with dynamic imports later
- html2canvas may not capture box-shadow or some CSS effects — keep preview styles simple
- Excel import deferred: SheetJS (high severity vuln, no fix) and ExcelJS (moderate, uuid dependency) both unsafe
- Tauri permissions must be declared explicitly in tauri.conf.json security.capabilities
- Tailwind v4: no tailwind.config.js, uses @tailwindcss/vite plugin
- macOS build requires Apple Silicon machine — deferred