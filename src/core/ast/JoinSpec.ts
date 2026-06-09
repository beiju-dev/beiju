import { ColumnRef } from '../ColumnRef.js'

export type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'JOIN';

/**
 * Condição atômica de junção.
 * Representa: tabela_a.coluna = tabela_b.coluna
 */
export class JoinCondition {
  constructor(
    readonly left:  ColumnRef,
    readonly right: ColumnRef,
    readonly op: '=' = '=',
  ) {}
}

export class JoinSpec {
  readonly kind = 'JoinSpec' as const

  constructor(
    readonly table: string,
    readonly conditions: JoinCondition[],
    readonly type?: JoinType,
    readonly alias?: string,
  ) {}
}