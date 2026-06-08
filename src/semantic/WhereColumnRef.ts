import { ColumnRef } from "../core/ColumnRef.js" 
import { WhereCondition } from "../core/ast/clause/WhereCondition.js"

export class WhereColumnRef {
  constructor(private readonly column: ColumnRef) {}

  private cond(op: WhereCondition['op'], value: unknown): WhereCondition {
    return new WhereCondition(this.column, op, value)
  }

  eq(value: unknown): WhereCondition { return this.cond('=', value) }
  neq(value: unknown): WhereCondition { return this.cond('!=', value) }
  gt(value: unknown): WhereCondition { return this.cond('>', value) }
  lt(value: unknown): WhereCondition { return this.cond('<', value) }
  gte(value: unknown): WhereCondition { return this.cond('>=', value) }
  lte(value: unknown): WhereCondition { return this.cond('<=', value) }
  between(start: unknown, end: unknown): WhereCondition {
    return this.cond('BETWEEN', [start, end])
  }
  in(values: unknown[]): WhereCondition    { return this.cond('IN', values) }
}