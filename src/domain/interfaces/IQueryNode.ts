export type QueryNodeKind =
  | 'SelectQuery'
  | 'ColumnRef'
  | 'AggregateExpr'
  | 'WindowSpec'
  | 'WindowFunctionExpr'
  | 'WhereClause'
  | 'OrderByItem'
  | 'FrameSpec'

export interface IQueryNode {
  readonly kind: QueryNodeKind
}