export type QueryNodeKind =
  | 'SelectQuery'
  | 'ColumnRef'
  | 'AggregateExpr'
  | 'WindowSpec'
  | 'WindowFunctionExpr'
  | 'WhereClause'
  | 'OrderByItem'
  | 'FrameSpec'

export interface QueryNode {
  readonly kind: QueryNodeKind
}