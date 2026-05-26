import { ColumnRef } from "../ColumnRef.js";
export type WhereOp = '=' | '!=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'IN' 

export class WhereCondition {
  constructor(
    readonly column: ColumnRef,
    readonly op: WhereOp,
    readonly value: unknown,
  ) {}
}