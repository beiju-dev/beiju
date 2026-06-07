import { ColumnRef } from '@core/ColumnRef.js' 
import { WhereClause } from '@core/ast/clause/WhereClause.js' 
import { WhereCondition } from '@core/ast/clause/WhereCondition.js' 
import { IWhereBuilder } from '@core/interfaces/IWhereBuilder.js' 

export class WhereBuilder implements IWhereBuilder {
  private conditions: WhereCondition[] = []
  private operator: 'AND' | 'OR' = 'AND'

  and(...conditions: WhereCondition[]): this {
    this.conditions.push(...conditions)
    this.operator = 'AND'
    return this
  }

  or(...conditions: WhereCondition[]): this {
    this.conditions.push(...conditions)
    this.operator = 'OR'
    return this
  }

  build(): WhereClause {
    if (this.conditions.length === 0) {
      throw new Error('WhereBuilder: ao menos uma condição é necessária')
    }
    return new WhereClause(this.conditions, this.operator)
  }
}