import type { IBuilder } from '../../domain/interfaces/IBuilder.js'
import { WhereClause } from '../../domain/model/clause/WhereClause.js'
import { WhereCondition } from '../../domain/model/clause/WhereCondition.js'

export interface IWhereBuilder extends IBuilder<WhereClause> {
  and(...conditions: WhereCondition[]): this
  or(...conditions: WhereCondition[]): this
}