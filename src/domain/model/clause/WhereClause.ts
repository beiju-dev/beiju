import { WhereCondition } from './WhereCondition.js'

export type WhereOp = '=' | '!=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'IN' 

export class WhereClause {
  constructor(
    readonly conditions: WhereCondition[],
    readonly operator: 'AND' | 'OR' = 'AND',
  ) {}
}

