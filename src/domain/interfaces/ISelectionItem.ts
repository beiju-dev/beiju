import { ColumnRef } from "../model/ColumnRef.js"
import { AggregateExpr } from "../model/AggregateExpr.js"
import { WindowFunctionExpr } from "../model/WindowFunctionExpr.js"

export type SelectionItem = ColumnRef | AggregateExpr | WindowFunctionExpr
