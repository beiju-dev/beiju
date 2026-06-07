import { WhereCondition } from './WhereCondition.js'

export class WhereClause {
  constructor(
    readonly conditions: WhereCondition[],
    readonly operator: 'AND' | 'OR' = 'AND',
  ) {}
}