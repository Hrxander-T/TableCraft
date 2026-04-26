# TableCraft — Beautiful Table Design & Export Tool
### Complete Project Documentation

> **Version:** 1.0  
> **Status:** Planning  
> **Type:** Open Source / Public Tool  
> **Author:** [Your Name]

---

## Table of Contents

1. [Project Summary](#1-project-summary)
2. [Why We Are Building This](#2-why-we-are-building-this)
3. [What We Are Building](#3-what-we-are-building)
4. [Where We Are Building](#4-where-we-are-building)
5. [How We Are Building](#5-how-we-are-building)
6. [Recommended Tech Stack](#6-recommended-tech-stack)
7. [System Architecture](#7-system-architecture)
8. [Project Structure](#8-project-structure)
9. [Core Features](#9-core-features)
10. [Implementation Plan](#10-implementation-plan)
11. [Development Process](#11-development-process)
12. [Roadmap](#12-roadmap)
13. [Future Plans](#13-future-plans)
14. [Open Questions & Decisions](#14-open-questions--decisions)

---

## 1. Project Summary

**TableCraft** is a web and desktop tool for designing, editing, and
exporting beautiful data tables without needing to write code, use a
spreadsheet, or struggle with LaTeX formatting.

The tool lets anyone — developer, researcher, writer, or analyst —
create professional-grade tables in minutes, apply beautiful themes,
and export them in multiple formats including PNG, PDF, SVG, CSV,
and LaTeX.

| Property        | Detail                                      |
|-----------------|---------------------------------------------|
| Project Name    | TableCraft                                  |
| Type            | Web App + Desktop App (shared codebase)     |
| Target Users    | Anyone who works with tabular data in docs  |
| Primary Goal    | Design and export beautiful tables fast     |
| License         | Open Source (MIT)                           |
| Export Formats  | PNG, JPG, PDF, SVG, CSV, LaTeX, JSON        |

---

## 2. Why We Are Building This

### The Problem

Working with tables in documents, reports, and presentations is
painful. Here is why:

**Existing tools fall short:**

- **Spreadsheets (Excel, Google Sheets)** — Great for data, terrible
  for design. Exports look raw and unpolished. No control over
  typography, colors, or visual hierarchy.

- **Word Processors (Word, Google Docs)** — Basic table support with
  very limited styling. Tedious to format row by row.

- **Design Tools (Canva, Figma)** — Beautiful output but not built
  for tables. No CSV import, no data-driven editing, no LaTeX export.

- **LaTeX** — Produces perfect output but requires technical knowledge,
  is slow to write, and has no visual preview. Column width issues,
  overflow warnings, and formatting bugs waste hours.

- **Notion / Airtable** — Good for internal databases but exports are
  plain and unsuitable for professional documents or presentations.

**The result:** People either spend hours manually formatting tables
in Word or Figma, or they accept ugly-looking output from spreadsheets.
Neither is acceptable for professional work.

### The Opportunity

There is no dedicated, beautiful, fast, export-ready table tool that
works for everyone. TableCraft fills that exact gap.

### Personal Origin

This project was born out of a real need while preparing a technical
research document (a conveyor label reading system analysis). Creating
polished tables for the report required writing Python scripts to
generate them as images — a workaround that should not be necessary.
A proper tool would have solved this in minutes.

---

## 3. What We Are Building

TableCraft is a **table design and export tool** with the following
core capabilities:

### Core Capabilities

```
┌─────────────────────────────────────────────────────────────┐
│                        TABLECRAFT                           │
├─────────────────┬───────────────────┬───────────────────────┤
│   DATA INPUT    │   DESIGN STUDIO   │   EXPORT ENGINE       │
│                 │                   │                       │
│  • Type cells   │  • Theme picker   │  • PNG / JPG          │
│  • Paste CSV    │  • Color control  │  • PDF                │
│  • Upload file  │  • Font settings  │  • SVG                │
│  • JSON import  │  • Column types   │  • CSV                │
│                 │  • Badge cells    │  • LaTeX code         │
│                 │  • Row styling    │  • JSON (save/load)   │
└─────────────────┴───────────────────┴───────────────────────┘
```

### What It Is NOT

- Not a spreadsheet — no formulas or calculations
- Not a database — no relationships or queries
- Not a full design tool — focused only on tables
- Not a backend service — runs entirely in the browser or locally

### Key Differentiators

| Feature                  | TableCraft | Excel | Canva | LaTeX |
|--------------------------|:----------:|:-----:|:-----:|:-----:|
| Beautiful out of the box | ✅         | ❌    | ✅    | ✅    |
| CSV import               | ✅         | ✅    | ❌    | ❌    |
| LaTeX export             | ✅         | ❌    | ❌    | ✅    |
| No coding required       | ✅         | ✅    | ✅    | ❌    |
| Works offline            | ✅         | ✅    | ❌    | ✅    |
| PNG/PDF export           | ✅         | ⚠️    | ✅    | ✅    |
| Themed templates         | ✅         | ⚠️    | ✅    | ❌    |
| Free                     | ✅         | ❌    | ⚠️    | ✅    |

---

## 4. Where We Are Building

### Platforms

**Web Application**
- Runs in any modern browser (Chrome, Firefox, Safari, Edge)
- No installation required
- Hosted publicly for anyone to use
- URL: `tablecraft.app` (planned)

**Desktop Application**
- Windows 10/11
- Ubuntu / Linux
- macOS
- Built using Tauri — wraps the same React web app as a native binary
- Works fully offline
- Available as a downloadable installer

### Why Both Platforms?

| Reason              | Web                        | Desktop                     |
|---------------------|----------------------------|-----------------------------|
| Accessibility       | Anyone, no install needed  | Power users, offline use    |
| File system access  | Limited (browser sandbox)  | Full (read/write anywhere)  |
| Export quality      | Good                       | Better (native file dialog) |
| Performance         | Good                       | Excellent                   |
| Offline use         | ❌ (unless PWA)             | ✅ always                   |

The web app is the primary product. Desktop is a packaging layer
on top of the same codebase — minimal extra work using Tauri.

---

## 5. How We Are Building

### Philosophy

- **Simple first** — MVP does one thing perfectly: create and export
  a beautiful table. Add complexity only when needed.
- **One codebase** — Web and desktop share 100% of the React code.
  Only the export layer differs slightly.
- **Export quality is non-negotiable** — Every export format must
  produce professional, pixel-perfect output.
- **Offline by default** — No account required. No data sent to any
  server. Everything runs locally.
- **Open source** — Community can contribute themes, exporters,
  and features.

### Development Approach

We follow a **phased delivery** model:

```
Phase 1 → Phase 2 → Phase 3 → Public Launch → Continuous Improvement
  MVP       Polish    Platform    v1.0              v1.x+
```

Each phase has a working, usable product at its end. Nothing is held
back until "it's perfect."

### Coding Standards

- **Language:** JavaScript / TypeScript (TypeScript preferred)
- **Formatting:** Prettier + ESLint
- **Component style:** Functional components + React Hooks only
- **State:** Zustand (simple, no boilerplate)
- **Styling:** Tailwind CSS
- **Testing:** Vitest for unit tests, Playwright for E2E
- **Git:** Feature branches + pull requests, conventional commits

---

## 6. Recommended Tech Stack

### Frontend

| Technology     | Version  | Purpose                                  |
|----------------|----------|------------------------------------------|
| React          | 18+      | Core UI framework                        |
| TypeScript     | 5+       | Type safety across the codebase          |
| Vite           | 5+       | Fast build tool and dev server           |
| Tailwind CSS   | 3+       | Utility-first styling                    |
| Zustand        | 4+       | Lightweight global state management      |
| React DnD Kit  | Latest   | Drag to reorder rows and columns         |

### Export Libraries

| Library        | Purpose                                  |
|----------------|------------------------------------------|
| html2canvas    | Render DOM table to PNG/JPG canvas       |
| jsPDF          | Generate PDF from canvas output          |
| dom-to-svg     | Export table as clean SVG                |
| Custom         | LaTeX tabular code generator (we write)  |
| Papa Parse     | CSV parsing for import                   |
| SheetJS (xlsx) | Excel file import support                |

### Desktop

| Technology     | Purpose                                   |
|----------------|-------------------------------------------|
| Tauri 2        | Desktop wrapper (Rust-based, lightweight) |
| Tauri FS API   | Native file read/write for desktop        |
| Tauri Dialog   | Native file open/save dialogs             |

### Why Tauri over Electron?

| Metric          | Tauri        | Electron      |
|-----------------|--------------|---------------|
| Bundle size     | ~5 MB        | ~150 MB       |
| RAM usage       | ~50 MB       | ~300 MB       |
| Startup time    | Fast         | Slow          |
| Security        | Excellent    | Good          |
| Native feel     | Excellent    | Moderate      |

### Development Tools

| Tool           | Purpose                                   |
|----------------|-------------------------------------------|
| Vite           | Dev server and bundler                    |
| Vitest         | Unit testing                              |
| Playwright     | End-to-end browser testing                |
| Prettier       | Code formatting                           |
| ESLint         | Code linting                              |
| GitHub Actions | CI/CD pipeline                            |

---

## 7. System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│                                                          │
│   ┌────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│   │   Table    │  │   Design    │  │     Export      │  │
│   │   Editor   │  │   Panel     │  │     Panel       │  │
│   └─────┬──────┘  └──────┬──────┘  └────────┬────────┘  │
│         │                │                   │           │
│   ──────┴────────────────┴───────────────────┴──────     │
│                    ZUSTAND STORE                         │
│              (table state, theme, settings)              │
│   ──────┬────────────────┬───────────────────┬──────     │
│         │                │                   │           │
│   ┌─────▼──────┐  ┌──────▼──────┐  ┌────────▼────────┐  │
│   │   Table    │  │   Theme     │  │    Exporter     │  │
│   │  Renderer  │  │   Engine    │  │    Engine       │  │
│   └────────────┘  └─────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────┘
         │                                   │
    ┌────▼────┐                    ┌──────────▼──────────┐
    │ Browser │                    │  PNG / PDF / SVG /  │
    │   DOM   │                    │  CSV / LaTeX / JSON │
    └─────────┘                    └─────────────────────┘
```

### Data Flow

```
User Input (type / paste / upload)
        ↓
  CSV Parser / JSON Parser
        ↓
  Zustand Store (table state)
        ↓
  Table Renderer (React component)
        ↓
  Theme Engine (applies colors, fonts, spacing)
        ↓
  Live Preview (in browser DOM)
        ↓
  Export Engine (on demand)
        ↓
  Output File (PNG / PDF / SVG / CSV / LaTeX / JSON)
```

### Table State Schema

```typescript
interface TableState {
  id: string;
  title: string;
  theme: ThemeKey;
  columns: Column[];
  rows: Row[];
  settings: TableSettings;
}

interface Column {
  id: string;
  label: string;
  width: number;
  type: 'text' | 'currency' | 'badge' | 'number' | 'status';
  align: 'left' | 'center' | 'right';
  bold: boolean;
  color?: string;
}

interface Row {
  id: string;
  cells: Record<string, CellValue>;
  highlighted?: boolean;
}

interface TableSettings {
  showHeader: boolean;
  alternatingRows: boolean;
  showBorder: boolean;
  fontSize: number;
  padding: 'compact' | 'normal' | 'spacious';
}
```

---

## 8. Project Structure

```
tablecraft/
│
├── src/                          # React application source
│   ├── components/               # UI components
│   │   ├── editor/
│   │   │   ├── TableEditor.tsx   # Main editable table grid
│   │   │   ├── CellInput.tsx     # Individual cell editor
│   │   │   ├── ColumnHeader.tsx  # Column header with controls
│   │   │   └── RowHandle.tsx     # Drag handle for row reorder
│   │   │
│   │   ├── panels/
│   │   │   ├── DesignPanel.tsx   # Right sidebar: theme & style
│   │   │   ├── ColumnPanel.tsx   # Column type & width settings
│   │   │   ├── ExportPanel.tsx   # Export format options
│   │   │   └── ImportPanel.tsx   # CSV / file import UI
│   │   │
│   │   ├── preview/
│   │   │   └── TablePreview.tsx  # Read-only export preview
│   │   │
│   │   └── ui/                   # Shared UI primitives
│   │       ├── Button.tsx
│   │       ├── ColorPicker.tsx
│   │       ├── Dropdown.tsx
│   │       └── Toggle.tsx
│   │
│   ├── themes/                   # Table theme definitions
│   │   ├── index.ts              # Theme registry
│   │   ├── corporate-blue.ts     # Blue corporate theme
│   │   ├── dark-professional.ts  # Dark theme
│   │   ├── minimal-clean.ts      # Minimal white theme
│   │   ├── warm-earth.ts         # Warm tones theme
│   │   └── high-contrast.ts      # Accessibility theme
│   │
│   ├── exporters/                # Export format handlers
│   │   ├── png.ts                # PNG export via html2canvas
│   │   ├── pdf.ts                # PDF export via jsPDF
│   │   ├── svg.ts                # SVG export
│   │   ├── csv.ts                # CSV serializer
│   │   ├── latex.ts              # LaTeX tabular code generator
│   │   └── json.ts               # JSON save/load
│   │
│   ├── importers/                # Data import handlers
│   │   ├── csv.ts                # CSV parser (Papa Parse)
│   │   └── excel.ts              # Excel parser (SheetJS)
│   │
│   ├── store/                    # Zustand state management
│   │   ├── tableStore.ts         # Table data state
│   │   ├── uiStore.ts            # UI state (panels, modals)
│   │   └── historyStore.ts       # Undo/redo history
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useExport.ts
│   │   ├── useImport.ts
│   │   └── useKeyboardShortcuts.ts
│   │
│   ├── utils/                    # Helper functions
│   │   ├── colorUtils.ts
│   │   ├── tableUtils.ts
│   │   └── formatters.ts
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── App.tsx                   # Root component
│   └── main.tsx                  # Entry point
│
├── src-tauri/                    # Tauri desktop config
│   ├── src/
│   │   └── main.rs               # Tauri Rust entry point
│   ├── tauri.conf.json           # App config, permissions
│   └── Cargo.toml                # Rust dependencies
│
├── tests/
│   ├── unit/                     # Vitest unit tests
│   └── e2e/                      # Playwright E2E tests
│
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
├── package.json
└── README.md
```

---

## 9. Core Features

### 9.1 Table Editor

- Add, remove, and reorder rows and columns via drag and drop
- Inline cell editing — click any cell to edit
- Multi-cell selection for bulk operations
- Keyboard navigation (Tab, Enter, Arrow keys)
- Undo / Redo (Ctrl+Z / Ctrl+Y)
- Auto-resize columns to content

### 9.2 Column Types

| Type       | Behavior                                          | Example             |
|------------|---------------------------------------------------|---------------------|
| `text`     | Plain text, left aligned                          | "Camera Unit"       |
| `number`   | Right aligned, optional decimal places            | 14.5                |
| `currency` | Prefix symbol, green color, bold                  | $60 - $300          |
| `badge`    | Colored pill badge auto-colored by value          | CORE / OPTIONAL     |
| `status`   | Icon + text (success / warning / error)           | ✅ Yes / ❌ No      |
| `bold`     | Bold text, primary color                          | Component name      |

### 9.3 Themes

Each theme defines: header color, row colors, border style, font
weight, padding, and accent colors.

Built-in themes:

| Theme              | Description                              |
|--------------------|------------------------------------------|
| Corporate Blue     | Blue header, alternating light rows      |
| Dark Professional  | Dark background, white text              |
| Minimal Clean      | No color, clean borders only             |
| Warm Earth         | Brown/amber tones, warm feel             |
| Forest Green       | Green header, light green rows           |
| High Contrast      | Black/white, accessibility optimized     |
| Sunset Orange      | Orange accent, light background          |
| Tech Terminal      | Monospace font, dark code-like style     |

Custom themes can be created and saved.

### 9.4 Import

- **Type manually** — start from an empty table
- **Paste CSV** — paste raw CSV text, columns auto-detected
- **Upload CSV file** — file picker, instant parse
- **Upload Excel (.xlsx)** — sheet selection, header row detection
- **JSON** — load a previously saved TableCraft file

### 9.5 Export

| Format  | Quality  | Use Case                              |
|---------|----------|---------------------------------------|
| PNG     | High DPI | Embed in Word, PowerPoint, Notion     |
| JPG     | High     | Smaller file size for web use         |
| PDF     | Vector   | Print-ready, professional documents   |
| SVG     | Vector   | Scale to any size without loss        |
| CSV     | Data     | Re-import or open in Excel            |
| LaTeX   | Code     | Paste directly into .tex documents    |
| JSON    | Data     | Save and reopen in TableCraft later   |

### 9.6 LaTeX Exporter (Key Feature)

The LaTeX exporter generates clean, ready-to-paste `tabularx` code:

```latex
% Generated by TableCraft
\begin{tabularx}{\linewidth}{>{\bfseries}p{3cm} p{4cm} r}
\toprule
\rowcolor{tableheader}
\textcolor{white}{\textbf{Component}} &
\textcolor{white}{\textbf{Specification}} &
\textcolor{white}{\textbf{Cost}} \\
\midrule
\rowcolor{tablerowA}
Camera & USB Industrial, 2-5MP & \$60--\$300 \\
\rowcolor{tablerowB}
Lighting & LED Ring Light & \$15--\$40 \\
\bottomrule
\end{tabularx}
```

Options: choose document class compatibility, color scheme, and
package dependencies.

---

## 10. Implementation Plan

### Phase 1 — MVP (Weeks 1–3)

**Goal:** Working web app that can create and export a basic table.

- [ ] Project setup (Vite + React + TypeScript + Tailwind)
- [ ] Basic table editor (add/remove rows and columns, cell editing)
- [ ] 3 built-in themes (Corporate Blue, Minimal Clean, Dark)
- [ ] CSV paste import
- [ ] PNG export via html2canvas
- [ ] PDF export via jsPDF
- [ ] JSON save/load (localStorage)
- [ ] Responsive layout (sidebar + main editor)
- [ ] Deploy to Vercel for public access

**Deliverable:** Shareable web URL where anyone can create a table
and export it as PNG or PDF.

---

### Phase 2 — Polish (Weeks 4–5)

**Goal:** Make it feel professional and complete.

- [ ] Column type system (text, currency, badge, status, number)
- [ ] Full theme customizer (edit any color in a theme)
- [ ] 5 more built-in themes
- [ ] Drag and drop row/column reorder
- [ ] Undo / Redo history
- [ ] Keyboard shortcuts
- [ ] Export resolution selector (1x, 2x, 3x for PNG)
- [ ] SVG export
- [ ] LaTeX exporter
- [ ] Table title and caption support

**Deliverable:** Full-featured web tool ready for daily use.

---

### Phase 3 — Platform (Weeks 6–7)

**Goal:** Desktop app + data import improvements.

- [ ] Tauri desktop wrapper setup
- [ ] Native file open/save dialogs on desktop
- [ ] Excel (.xlsx) import via SheetJS
- [ ] CSV file upload (in addition to paste)
- [ ] Windows installer (.msi)
- [ ] Linux AppImage
- [ ] macOS .dmg (if Apple Silicon support added)

**Deliverable:** Downloadable desktop app for Windows and Linux.

---

### Phase 4 — Public Launch (Week 8)

**Goal:** Production-ready public release.

- [ ] Custom domain setup (tablecraft.app)
- [ ] Landing page with demos and examples
- [ ] GitHub repository with full documentation
- [ ] README with screenshots and usage guide
- [ ] Product Hunt launch
- [ ] v1.0 release tag

---

## 11. Development Process

### Branching Strategy

```
main          ← stable, production-ready code
  └── dev     ← integration branch
        ├── feature/table-editor
        ├── feature/theme-engine
        ├── feature/csv-import
        └── feature/latex-exporter
```

### Commit Convention

```
feat:     new feature
fix:      bug fix
style:    UI/CSS change only
refactor: code restructure, no behavior change
test:     add or update tests
docs:     documentation only
chore:    config, deps, build changes
```

Example:
```
feat: add LaTeX tabular code exporter
fix: column width calculation on narrow screens
style: update corporate-blue theme header color
```

### Code Review

- All features go through a pull request
- No direct commits to `main`
- PR must pass all CI checks before merge
- Self-review checklist before opening PR

### CI/CD Pipeline (GitHub Actions)

```
On Pull Request:
  → Lint (ESLint + Prettier check)
  → Type check (tsc --noEmit)
  → Unit tests (Vitest)
  → Build check (vite build)

On merge to main:
  → All above
  → Deploy to Vercel (web)
  → Build Tauri binaries (desktop)
  → Upload artifacts to GitHub Release
```

### Testing Strategy

| Layer      | Tool       | What is tested                        |
|------------|------------|---------------------------------------|
| Unit       | Vitest     | Exporters, parsers, utility functions |
| Component  | Vitest     | Table renderer, theme engine          |
| E2E        | Playwright | Full user flows (create, style, export)|

---

## 12. Roadmap

### v1.0 — Foundation *(Target: Week 8)*
- Web app live
- Desktop app downloadable
- PNG, PDF, SVG, CSV, LaTeX, JSON export
- 8 built-in themes
- CSV and Excel import
- Undo/redo
- Keyboard shortcuts

### v1.1 — Collaboration *(Month 3)*
- Share table as a public read-only link
- Embed table as iframe in any webpage
- Copy table as HTML for direct web use

### v1.2 — Templates *(Month 4)*
- Pre-built table templates for common use cases
  - Hardware comparison table
  - Software requirements table
  - Project roadmap table
  - Budget breakdown table
  - Feature comparison table
- Community template submissions

### v1.3 — Power Features *(Month 5–6)*
- Multi-table documents (multiple tables in one file)
- Table of tables (export all as a PDF document)
- Conditional formatting (color rows based on cell value)
- Column sorting and filtering in editor
- Find and replace across cells

### v2.0 — Platform *(Month 8–12)*
- User accounts and cloud save
- Team workspaces
- Version history (see and restore previous versions)
- API access (generate tables programmatically)
- Plugin system for custom exporters and themes

---

## 13. Future Plans

### AI Integration
- **AI table generator** — describe your table in plain English,
  AI fills in the structure and sample data
- **Smart column detection** — paste raw text, AI identifies
  columns and data types automatically
- **Auto-theme suggestion** — AI recommends a theme based on
  the table's content and purpose

### Integrations
- **Notion integration** — import tables from Notion databases
- **Google Sheets sync** — two-way sync with a Google Sheet
- **Obsidian plugin** — generate tables directly inside Obsidian
  markdown notes
- **VS Code extension** — create and insert tables into code
  documentation

### Advanced Export
- **Word (.docx) export** — embed table directly into a Word document
- **PowerPoint export** — paste table into a slide as a native shape
- **Markdown table** — export as GitHub-flavored markdown table
- **HTML table** — export as styled, self-contained HTML file

### Mobile
- **iOS / Android app** — view and lightly edit tables on mobile
- **Responsive editor** — touch-friendly cell editing on tablets

---

## 14. Open Questions & Decisions

| Question                             | Options                          | Decision       |
|--------------------------------------|----------------------------------|----------------|
| Should v1 require a user account?    | Yes / No                         | ❌ No — local only |
| Cloud save in v1?                    | Yes / No                         | ❌ No — v1.1   |
| Monetization model?                  | Free / Freemium / One-time / OSS | 🔄 TBD         |
| macOS support in v1?                 | Yes / No                         | ⚠️ Later       |
| Mobile support?                      | Yes / No                         | ❌ No — v2+    |
| Custom font upload?                  | Yes / No                         | 🔄 TBD         |

---

## Getting Started (Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/tablecraft.git
cd tablecraft

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Run Tauri desktop in development
npm run tauri dev

# Build desktop app
npm run tauri build
```

---

## Contributing

TableCraft is open source and welcomes contributions. Areas where
help is most valuable:

- New themes
- New export formats
- Accessibility improvements
- Translations / i18n
- Documentation and examples

See `CONTRIBUTING.md` for guidelines.

---

*Document maintained by the TableCraft team.*  
*Last updated: 2026*
