import type { ColumnType } from '../types'

// --- Validate cell value based on column type ---
export function isValidValue(value: string, type: ColumnType): boolean {
  if (value === '') return true // empty always allowed
  switch (type) {
    case 'number':
    case 'currency':
      return !isNaN(Number(value.replace(/[$,]/g, '')))
    default:
      return true
  }
}

// --- Get error message for invalid value ---
export function validationMessage(type: ColumnType): string {
  switch (type) {
    case 'number': return 'Must be a number'
    case 'currency': return 'Must be a number'
    default: return ''
  }
}