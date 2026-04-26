# TableCraft — Build Progress

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite plugin — no config file)
- Zustand 4
- html2canvas + jsPDF + nanoid
- Deployed on Vercel: https://table-craft.vercel.app

## Important Conventions
- `TablePreview.tsx` uses **inline styles only** (html2canvas can't capture Tailwind classes)
- All other components use Tailwind
- Zustand selectors must be **primitive/separate** — avoid returning objects from selectors (causes infinite re-renders)
- Commit style: `feat:` `fix:` `style:` `refactor:` `docs:` `chore:`

## File Structure
```
src/
├── components/
│   ├── editor/
│   │   └── TableEditor.tsx
│   ├── preview/
│   │   └── TablePreview.tsx
│   └── panels/
│       └── ImportPanel.tsx
├── exporters/
│   ├── png.ts
│   ├── pdf.ts
│   ├── csv.ts
│   └── json.ts
├── importers/
│   └── csv.ts
├── store/
│   └── tableStore.ts
├── themes/
│   └── index.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

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

## Phase 2 — Polish (Next)
- [ ] Column types: text, number, currency, badge, status, bold
- [ ] 5 more themes (Forest Green, Warm Earth, High Contrast, Sunset Orange, Tech Terminal)
- [ ] Undo / Redo (Ctrl+Z / Ctrl+Y)
- [ ] LaTeX exporter
- [ ] SVG exporter
- [ ] Table caption support in export

## Phase 3 — Platform (Planned)
- [ ] Tauri desktop wrapper
- [ ] Native file dialogs
- [ ] Excel (.xlsx) import via SheetJS
- [ ] Windows (.msi) + Linux (AppImage) installers

## Phase 4 — Public Launch (Planned)
- [ ] Landing page
- [ ] GitHub docs + screenshots
- [ ] Product Hunt launch
- [ ] v1.0 tag

## Known Issues / Decisions
- Chunk size warning on build (801kb) — acceptable for MVP, fix in Phase 2 with dynamic imports
- html2canvas may not capture box-shadow or some CSS effects — keep preview styles simple
- nanoid used for all IDs (columns, rows, table)
- Tailwind v4: no tailwind.config.js, uses @tailwindcss/vite plugin