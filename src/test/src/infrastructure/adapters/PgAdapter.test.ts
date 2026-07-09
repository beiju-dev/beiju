import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PgAdapter } from '../../../../infrastructure/adapters/PgAdapter.js'

const mockQuery = vi.fn()
const mockRelease = vi.fn()
const mockConnect = vi.fn().mockResolvedValue({
  query: mockQuery,
  release: mockRelease,
})

const mockPool = {
  connect: mockConnect,
  end:     vi.fn(),
  on:      vi.fn(),
}

vi.mock('pg', () => {
  return {
    Pool: vi.fn(() => mockPool)
  }
})

describe('PgAdapter', () => {
  let adapter: PgAdapter

  beforeEach(() => {
    //PgAdapter.instances = new Map()
    adapter = PgAdapter.getInstance('postgresql://localhost:5432/test')

    vi.clearAllMocks()
  })

  it('retorna sempre a mesma instância para a mesma connection string', () => {
    const a = PgAdapter.getInstance('postgresql://localhost:5432/test')
    const b = PgAdapter.getInstance('postgresql://localhost:5432/test')
    expect(a).toBe(b)
  })

  it('cria instâncias distintas para connection strings diferentes', () => {
    const a = PgAdapter.getInstance('postgresql://localhost:5432/db_a')
    const b = PgAdapter.getInstance('postgresql://localhost:5432/db_b')
    expect(a).not.toBe(b)
  })

  it('executa query e retorna rows e rowCount', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 })

    const result = await adapter.execute('SELECT id FROM orders WHERE id = $1', [1])

    expect(result.rowCount).toBe(1)
    expect(result.rows).toHaveLength(1)
    expect(mockRelease).toHaveBeenCalledOnce()
  })

  it('introspecta schema e mapeia tipos corretamente', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [
        { column_name: 'id',          data_type: 'integer',   is_nullable: 'NO' },
        { column_name: 'seller_name', data_type: 'text',      is_nullable: 'NO' },
        { column_name: 'total',       data_type: 'numeric',   is_nullable: 'YES' },
        { column_name: 'created_at',  data_type: 'timestamp', is_nullable: 'YES' },
        { column_name: 'active',      data_type: 'boolean',   is_nullable: 'NO' },
      ],
      rowCount: 5,
    })

    const schema = await adapter.introspect('orders')

    expect(schema.tableName).toBe('orders')
    expect(schema.columns).toEqual([
      { name: 'id',          type: 'number',  nullable: false },
      { name: 'seller_name', type: 'string',  nullable: false },
      { name: 'total',       type: 'number',  nullable: true },
      { name: 'created_at',  type: 'date',    nullable: true },
      { name: 'active',      type: 'boolean', nullable: false },
    ])
  })

  it('lança erro se tabela não existe', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 0 })

    await expect(adapter.introspect('tabela_inexistente')).rejects.toThrow(
      'tabela "tabela_inexistente" não encontrada'
    )
  })

  it('libera o cliente de volta ao pool mesmo em caso de erro', async () => {
    mockQuery.mockRejectedValueOnce(new Error('falha na query'))

    await expect(
      adapter.execute('SELECT boom', [])
    ).rejects.toThrow('falha na query')

    expect(mockRelease).toHaveBeenCalledOnce()
  })
})