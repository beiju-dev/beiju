import type { SelectQuery } from './SelectQuery.js'

// Porta de geração SQL — futuramente permite outros SGBDs
export interface SqlDialect {
  compile(query: SelectQuery): { sql: string; params: unknown[] }
}