
export type FrameBoundary = number | 'unbounded' | 'current'

export class FrameSpec {
  readonly kind = 'FrameSpec' as const

  constructor(
    readonly type: 'ROWS' | 'RANGE',
    readonly start: FrameBoundary,
    readonly end: FrameBoundary,
  ) {}
}