import type { IBuilder } from './IBuilder.js'
import { WhereClause } from '../ast/clause/WhereClause.js' 
import { WhereCondition } from '../ast/clause/WhereCondition.js' 

export interface IWhereBuilder extends IBuilder<WhereClause> {
  and(...conditions: WhereCondition[]): this
  or(...conditions: WhereCondition[]): this
}