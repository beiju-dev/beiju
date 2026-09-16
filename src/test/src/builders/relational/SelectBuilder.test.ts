import { describe, it, expect, vi } from 'vitest'
import type { IQueryExecutor } from '@core/interfaces/IQueryExecutor.js'
import { SelectBuilder } from '../../../../builders/relational/SelectBuilder.js'

const mockExecutor: IQueryExecutor = {
  execute: vi.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
  executeRaw: vi.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
  close: vi.fn().mockResolvedValue(undefined),
}

describe('SelectBuilder', () => {
  it('gera SELECT DISTINCT quando solicitado', async () => {
    await new SelectBuilder(mockExecutor)
      .from('orders')
      .select(c => [c.col('seller_name')])
      .distinct()
      .fetch()

    expect(mockExecutor.execute).toHaveBeenCalledWith(
      'SELECT DISTINCT seller_name FROM orders',
      []
    )
  })
})