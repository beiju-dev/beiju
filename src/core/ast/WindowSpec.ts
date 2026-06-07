import { ColumnRef } from '../ColumnRef.js' 
import { FrameSpec } from './FrameSpec.js'
import { OrderByItem } from './OrderByItem.js'

export class WindowSpec {
  readonly kind = 'WindowSpec' as const

  constructor(
    readonly partitionBy?: ColumnRef[],
    readonly orderBy?: OrderByItem[],
    readonly frame?: FrameSpec,
  ) {}
}