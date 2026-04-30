import type { Column, Row, TableSettings } from '../types'
import { nanoid } from 'nanoid'

// --- Template type ---
export interface Template {
  id: string
  name: string
  description: string
  theme: string
  columns: Column[]
  rows: Row[]
  settings: Partial<TableSettings>
}

// --- Helper to build columns ---
function col(label: string, type: Column['type'] = 'text', align: Column['align'] = 'left', width = 150): Column {
  return { id: nanoid(), label, type, align, width }
}


// --- Build template with linked IDs ---
function makeTemplate(
  id: string, name: string, description: string, theme: string,
  colDefs: Column[],
  rowData: string[][],
  settings: Partial<TableSettings> = {}
): Template {
  const columns = colDefs
  const rows: Row[] = rowData.map((vals) => ({
    id: nanoid(),
    cells: Object.fromEntries(columns.map((c, i) => [c.id, vals[i] ?? ''])),
  }))
  return { id, name, description, theme, columns, rows, settings }
}

// --- Templates ---
export const templates: Template[] = [

  // --- Pricing table ---
  makeTemplate(
    'pricing', 'Pricing Table', 'Compare plans and features',
    'corporate-blue',
    [
      col('Feature', 'bold', 'left', 180),
      col('Basic', 'badge', 'center', 120),
      col('Pro', 'badge', 'center', 120),
      col('Enterprise', 'badge', 'center', 130),
    ],
    [
      ['Users', '1', '5', 'Unlimited'],
      ['Storage', '5GB', '50GB', '1TB'],
      ['Support', 'Email', 'Priority', 'Dedicated'],
      ['API Access', 'No', 'Yes', 'Yes'],
      ['Analytics', 'Basic', 'Advanced', 'Custom'],
      ['Price/mo', '$0', '$29', '$99'],
    ],
    { showBorder: true, alternatingRows: true }
  ),

  // --- Project tracker ---
  makeTemplate(
    'project', 'Project Tracker', 'Track tasks and their status',
    'forest-green',
    [
      col('Task', 'bold', 'left', 200),
      col('Owner', 'text', 'left', 130),
      col('Due Date', 'text', 'center', 120),
      col('Priority', 'badge', 'center', 100),
      col('Status', 'status', 'center', 120),
    ],
    [
      ['Design mockups', 'Alice', '2024-01-15', 'High', 'Done'],
      ['Backend API', 'Bob', '2024-01-20', 'High', 'Active'],
      ['Frontend UI', 'Carol', '2024-01-25', 'Medium', 'Pending'],
      ['Testing', 'Dave', '2024-02-01', 'Medium', 'Pending'],
      ['Deployment', 'Alice', '2024-02-10', 'Low', 'Pending'],
    ],
    { showBorder: true, alternatingRows: true }
  ),

  // --- Financial summary ---
  makeTemplate(
    'financial', 'Financial Summary', 'Revenue and expense overview',
    'dark-professional',
    [
      col('Category', 'bold', 'left', 180),
      col('Q1', 'currency', 'right', 120),
      col('Q2', 'currency', 'right', 120),
      col('Q3', 'currency', 'right', 120),
      col('Q4', 'currency', 'right', 120),
    ],
    [
      ['Revenue', '$120,000', '$145,000', '$160,000', '$190,000'],
      ['Cost of Goods', '$45,000', '$52,000', '$58,000', '$68,000'],
      ['Gross Profit', '$75,000', '$93,000', '$102,000', '$122,000'],
      ['Operating Exp', '$30,000', '$32,000', '$35,000', '$38,000'],
      ['Net Profit', '$45,000', '$61,000', '$67,000', '$84,000'],
    ],
    { showBorder: true, alternatingRows: false }
  ),

  // --- Comparison table ---
  makeTemplate(
    'comparison', 'Product Comparison', 'Compare products side by side',
    'minimal-clean',
    [
      col('Spec', 'bold', 'left', 160),
      col('Product A', 'text', 'center', 140),
      col('Product B', 'text', 'center', 140),
      col('Product C', 'text', 'center', 140),
    ],
    [
      ['Price', '$199', '$249', '$299'],
      ['Weight', '1.2kg', '1.5kg', '1.8kg'],
      ['Battery', '10hr', '12hr', '15hr'],
      ['Display', '13"', '14"', '15.6"'],
      ['RAM', '8GB', '16GB', '32GB'],
      ['Storage', '256GB', '512GB', '1TB'],
    ],
    { showBorder: true, alternatingRows: true }
  ),

  // --- Team roster ---
  makeTemplate(
    'team', 'Team Roster', 'Team members and their roles',
    'sunset-orange',
    [
      col('Name', 'bold', 'left', 160),
      col('Role', 'text', 'left', 160),
      col('Department', 'badge', 'center', 140),
      col('Status', 'status', 'center', 100),
    ],
    [
      ['Alice Johnson', 'Engineering Lead', 'Engineering', 'Active'],
      ['Bob Smith', 'Product Manager', 'Product', 'Active'],
      ['Carol White', 'UX Designer', 'Design', 'Active'],
      ['Dave Brown', 'Backend Dev', 'Engineering', 'Active'],
      ['Eve Davis', 'Data Analyst', 'Analytics', 'Pending'],
    ],
    { showBorder: true, alternatingRows: true }
  ),
]