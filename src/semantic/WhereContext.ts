import { WhereColumnRef } from "./WhereColumnRef.js"
import { ColumnRef } from "../core/ColumnRef.js"
export class WhereContext {
  col(name: string, table?: string): WhereColumnRef {
    return new WhereColumnRef(new ColumnRef(name, 'string', table))
  }
}