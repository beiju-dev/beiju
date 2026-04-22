import { ColumnRef } from './ColumnRef.js'

export class OrderByItem {
  readonly kind = 'OrderByItem' as const

  constructor(
    readonly column: ColumnRef,
    readonly direction: 'ASC' | 'DESC' = 'ASC',
  ) {}
}