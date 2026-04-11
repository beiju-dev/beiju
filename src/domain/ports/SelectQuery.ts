import type { ColumnRef } from '../model/ColumnRef.js'
import type { AggregateExpr, WindowFunctionExpr } from '../model/AggregateExpr.js'

export type SelectionItem = ColumnRef | AggregateExpr | WindowFunctionExpr

export interface SelectQuery {
  readonly from: { table: string; alias?: string }
  readonly select: readonly SelectionItem[]
  readonly where?: WhereClause
  readonly groupBy?: readonly ColumnRef[]
  readonly orderBy?: readonly { column: ColumnRef; direction: 'ASC' | 'DESC' }[]
  readonly limit?: number
  readonly offset?: number
}

export interface WhereClause {
  readonly conditions: readonly WhereCondition[]
  readonly operator: 'AND' | 'OR'
}

export interface WhereCondition {
  readonly column: ColumnRef
  readonly op: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'IN'
  readonly value: unknown
}