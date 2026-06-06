import { IQueryExecutor, QueryResult } from "../../domain/interfaces/IQueryExecutor.js"
/*
export class PgAdapter implements IQueryExecutor {
  private static instance: PgAdapter

  private constructor(private readonly pool: Pool) {}
    execute<T>(sql: string, params: unknown[]): Promise<QueryResult<T>> {
        throw new Error("Method not implemented.")
    }
    close(): Promise<void> {
        throw new Error("Method not implemented.")
    }

  public static getInstance(config: PoolConfig): PgAdapter {
    if (!PgAdapter.instance) {
      PgAdapter.instance = new PgAdapter(new Pool(config))
    }
    return PgAdapter.instance
  }
}
  */