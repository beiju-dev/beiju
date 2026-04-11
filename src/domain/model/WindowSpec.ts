import type { QueryNode } from './QueryNode.js'
import type { ColumnRef } from './ColumnRef.js'

export type FrameBoundary = number | 'unbounded' | 'current'

export interface FrameSpec extends QueryNode {
  readonly kind: 'FrameSpec'
  readonly type: 'ROWS' | 'RANGE'
  readonly start: FrameBoundary
  readonly end: FrameBoundary
}

export interface OrderByItem extends QueryNode {
  readonly kind: 'OrderByItem'
  readonly column: ColumnRef
  readonly direction: 'ASC' | 'DESC'
}

// Representa a cláusula OVER(...) de uma Window Function
export interface WindowSpec extends QueryNode {
  readonly kind: 'WindowSpec'
  readonly partitionBy?: readonly ColumnRef[]
  readonly orderBy?: readonly OrderByItem[]
  readonly frame?: FrameSpec
}