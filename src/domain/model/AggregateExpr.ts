import type { QueryNode } from './QueryNode.js'
import type { ColumnRef, SqlType } from './ColumnRef.js'
import type { WindowSpec } from './WindowSpec.js'

export type AggFn = 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX'

// Funções de janela — o coração do Beiju
export type WindowFn =
  | 'ROW_NUMBER'
  | 'RANK'
  | 'DENSE_RANK'
  | 'LAG'
  | 'LEAD'
  | 'NTILE'

export interface AggregateExpr<T extends SqlType = SqlType> extends QueryNode {
  readonly kind: 'AggregateExpr'
  readonly fn: AggFn
  readonly column: ColumnRef<T>
  readonly alias?: string
  readonly window?: WindowSpec   // se presente, vira AGG() OVER (...)
}

export interface WindowFunctionExpr<T extends SqlType = SqlType> extends QueryNode {
  readonly kind: 'WindowFunctionExpr'
  readonly fn: WindowFn
  readonly column?: ColumnRef<T>  // opcional: ROW_NUMBER não precisa
  readonly offset?: number         // para LAG/LEAD
  readonly window: WindowSpec
  readonly alias?: string
}