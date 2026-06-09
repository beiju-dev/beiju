import { JoinCondition, JoinSpec, JoinType } from '../../core/ast/JoinSpec.js'
import type { TypedColumn }    from '../../semantic/TypedColumn.js'
import type { Table }          from '../../semantic/Table.js'

/**
 * Builder intermediário para cláusulas JOIN.
 * Criado por SemanticSelectBuilder.innerJoin() / leftJoin() / rightJoin().
 *
 * O callback onComplete devolve o controle ao SemanticSelectBuilder
 * assim que .on() é chamado — permitindo o encadeamento continuar.
 *
 * Exemplo:
 *   .innerJoin(tableUsuarios).on(vendas.usuario_id, tableUsuarios.id)
 *   .leftJoin(tableProdutos).on(vendas.produto_id, tableProdutos.id)
 */
export class JoinBuilder<TBuilder> {
  private conditions: JoinCondition[] = []
  private aliasValue?: string

  constructor(
    private readonly joinTable:  Table,
    private readonly onComplete: (spec: JoinSpec) => TBuilder,
    private readonly joinType?:   JoinType,
  ) {}

  /**
   * Define o alias SQL da tabela joined.
   * Exemplo: .innerJoin(usuarios).as('u').on(vendas.usuario_id, ...)
   */
  as(alias: string): this {
    this.aliasValue = alias
    return this
  }

  /**
   * Define a condição ON e finaliza o JOIN,
   * devolvendo o builder pai para encadeamento.
   *
   * Suporta múltiplas condições:
   *   .on(vendas.usuario_id, usuarios.id)
   *   .on(vendas.regiao_id,  usuarios.regiao_id) ← segunda condição AND
   */
  on(left: TypedColumn, right: TypedColumn): TBuilder {
    this.conditions.push(new JoinCondition(left.ref, right.ref))
    
    return this.onComplete(
      new JoinSpec(
        this.joinTable.tableName,
        this.conditions,
        this.joinType,
        this.aliasValue,
      )
    )
  }
}