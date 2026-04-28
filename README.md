# TableCraft

A web and desktop tool for designing and exporting beautiful data tables — no code required.

**Live web app:** https://table-craft.vercel.app

## Features (v0.3)
- Editable table grid (add/remove rows & columns)
- 8 built-in themes
- Column types: text, number, currency, badge, status, bold
- Column alignment control
- Undo / Redo (Ctrl+Z / Ctrl+Y)
- CSV paste & file import
- JSON save/load
- Export: PNG, PDF, CSV, JSON, SVG, LaTeX
- Native file dialogs on desktop (Tauri)
- Works fully offline

## Downloads (Linux)
- AppImage: `TableCraft_0.1.0_amd64.AppImage`
- Debian/Ubuntu: `TableCraft_0.1.0_amd64.deb`
- Fedora/RHEL: `TableCraft-0.1.0-1.x86_64.rpm`

## Tech Stack
- React 18 + TypeScript
- Vite + Tailwind CSS v4
- Zustand (state + undo/redo history)
- html2canvas + jsPDF (PNG/PDF export)
- Tauri 2 (desktop wrapper)
- nanoid (ID generation)

## Run Web App Locally
```bash
git clone https://github.com/YOUR_USERNAME/tablecraft.git
cd tablecraft
npm install
npm run dev
```

## Run Desktop App Locally
```bash
npm install
npx tauri dev
```

## Build Desktop App
```bash
npx tauri build
# Output: src-tauri/target/release/bundle/
```

## Project Structure
src/
├── components/
│   ├── editor/       TableEditor.tsx
│   ├── preview/      TablePreview.tsx
│   └── panels/       ImportPanel.tsx
├── exporters/        png, pdf, csv, json, svg, latex
├── importers/        csv
├── store/            tableStore, historyStore
├── themes/           8 built-in themes
├── types/            TypeScript interfaces
├── utils/            fileSave (Tauri/web detection)
├── App.tsx
└── main.tsx
src-tauri/            Tauri desktop config + Rust entry

## Roadmap
See `PROGRESS.md` for full build log.
