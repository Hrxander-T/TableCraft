# TableCraft

A web tool for designing and exporting beautiful data tables — no code required.

**Live:** https://table-craft.vercel.app

## Features (v0.2)
- Editable table grid (add/remove rows & columns)
- 8 built-in themes
- Column types: text, number, currency, badge, status, bold
- Column alignment control per column
- Undo / Redo (Ctrl+Z / Ctrl+Y)
- CSV paste & file import
- JSON save/load
- Export: PNG, PDF, CSV, JSON, SVG, LaTeX
  
## Tech Stack
- React 18 + TypeScript
- Vite + Tailwind CSS v4
- Zustand (state)
- html2canvas + jsPDF (export)

## Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/tablecraft.git
cd tablecraft
npm install
npm run dev
```

## Roadmap
See `PROGRESS.md` for detailed build progress.