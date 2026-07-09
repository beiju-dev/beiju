import { Pool, type PoolConfig } from 'pg'
import type { IDataSourceAdapter } from '../../core/interfaces/IDataSourceAdapter.js' 
import type { TableSchema, ColumnSchema } from '../../core/interfaces/IDataSourceAdapter.js' 
import type { IQueryResult } from '@core/interfaces/IQueryExecutor.js' 
import { QueryResultRow } from 'pg'
import { PG_TYPE_MAP } from '@infrastructure/PgTypeMap.js'

interface InformationSchemaRow {
  column_name: string
  data_type: string
  is_nullable: 'YES' | 'NO'
}

export class PgAdapter implements IDataSourceAdapter {
  private static instances: Map<string, PgAdapter> = new Map()

  private readonly pool: Pool
   
  private constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })

    this.pool.on('error', (err: any) => {
      console.error('[PgAdapter] Erro inesperado no pool de conexões:', err)
    })
  }
  static getInstance(connectionString: string): PgAdapter {
    if (!PgAdapter.instances.has(connectionString)) {
      PgAdapter.instances.set(connectionString, new PgAdapter(connectionString))
    }
    return PgAdapter.instances.get(connectionString)!
  }

  async execute<T extends QueryResultRow>(sql: string, params: unknown[]): Promise<IQueryResult<T>> {
    const client = await this.pool.connect()

    try {
      const result = await client.query<T>(sql, params as unknown[])
      return {
        rows: result.rows,
        rowCount: result.rowCount ?? 0,
      }
    } finally {
      client.release()
    }
  }

  async executeRaw<T = any>(
  sql: string,
  params: unknown[] = [],
): Promise<IQueryResult<T>> {
  const client = await this.pool.connect()
  try {
    const result = await client.query(sql, params as any[])
    return {
      rows: result.rows,
      rowCount: result.rowCount ?? 0,
    }
  } finally {
    client.release()
  }
}

  async introspect(tableName: string): Promise<TableSchema> {
    const sql = `
      SELECT
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns
      WHERE table_name   = $1
        AND table_schema = 'public'
      ORDER BY ordinal_position
    `

    const result = await this.execute<InformationSchemaRow>(sql, [tableName])

    if (result.rows.length === 0) {
      throw new Error(
        `PgAdapter.introspect: tabela "${tableName}" não encontrada no schema public. ` +
        `Verifique se a tabela existe e se a conexão tem permissão de leitura.`
      )
    }

    const columns: ColumnSchema[] = result.rows.map((row: any) => ({
      name:     row.column_name,
      type:     PG_TYPE_MAP[row.data_type] ?? 'string',
      nullable: row.is_nullable === 'YES',
    }))

    return {
      tableName,
      columns,
    }
  }

  async close(): Promise<void> {
    await this.pool.end()
    PgAdapter.instances.delete(
      [...PgAdapter.instances.entries()]
        .find(([, v]) => v === this)?.[0] ?? ''
    )
  }
}