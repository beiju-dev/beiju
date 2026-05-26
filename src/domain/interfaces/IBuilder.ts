// domain/interfaces/IBuilder.ts

/**
 * Contrato base para todos os builders do Beiju.
 * @template T — tipo produzido pelo build()
 */
export interface IBuilder<T> {
  build(): T
}