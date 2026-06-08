import { ColumnRef } from "../ColumnRef.js" 
import { AggregateExpr } from "../ast/expr/AggregateExpr.js"
import { WindowFunctionExpr } from "../ast/expr/WindowFunctionExpr.js"

export type SelectionItemType = ColumnRef | AggregateExpr | WindowFunctionExpr
