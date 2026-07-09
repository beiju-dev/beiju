import { JoinCondition, JoinSpec, JoinType } from '../../core/ast/JoinSpec.js'
import type { TypedColumn }    from '../../semantic/TypedColumn.js'
import type { Table }          from '../../semantic/Table.js'

export class JoinBuilder<TBuilder> {
  private conditions: JoinCondition[] = [];
  private aliasValue?: string;

  constructor(
    private readonly joinTable: Table,
    private readonly onComplete: (spec: JoinSpec) => TBuilder,
    private readonly joinType?: JoinType,
  ) {}

  as(alias: string): this {
    this.aliasValue = alias;
    return this;
  }

  on(left: TypedColumn, right: TypedColumn): TBuilder {
    this.conditions.push(new JoinCondition(left.ref, right.ref));

    return this.onComplete(
      new JoinSpec(
        this.joinTable.tableName,
        this.conditions,
        this.joinType,
        this.aliasValue,
      ),
    );
  }

  como(alias: string): this {
    return this.as(alias);
  }

  em(left: TypedColumn, right: TypedColumn): TBuilder {
    return this.on(left, right);
  }
}