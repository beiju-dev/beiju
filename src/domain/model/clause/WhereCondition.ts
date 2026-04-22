import { ColumnRef } from "../ColumnRef.js";
import { WhereOp } from "./WhereClause.js";

export class WhereCondition {
  constructor(
    readonly column: ColumnRef,
    readonly op: WhereOp,
    readonly value: unknown,
  ) {}
}