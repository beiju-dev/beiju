import type { QueryNode } from './QueryNode.js'

export type SqlType = 'number' | 'string' | 'date' | 'boolean'

export interface ColumnRef<T extends SqlType = SqlType> extends QueryNode {
  readonly kind: 'ColumnRef'
  readonly table?: string
  readonly column: string
  readonly type: T
}

export function columnRef<T extends SqlType>(
  column: string,
  type: T,
  table?: string
): ColumnRef<T> {
  return { kind: 'ColumnRef', column, type, table }
}