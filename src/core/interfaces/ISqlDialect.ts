import { SelectQuery } from '../ast/clause/SelectQuery.js' 
import { ISqlCompileResult } from './ISqlCompileResult.js'

export interface ISqlDialect {
   compile(query: SelectQuery): ISqlCompileResult
}