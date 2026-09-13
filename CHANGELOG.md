# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

> As entradas abaixo desta linha foram escritas manualmente na preparação do publish inicial.
> A partir daqui, novas versões são geradas automaticamente pelo
> [release-please](https://github.com/googleapis/release-please) a partir dos commits
> (formato Angular, em inglês) e não devem ser editadas manualmente.

## [Unreleased]

### Corrigido

- Ajustado o `package.json` para publicação no npm: pacote renomeado para `@beiju-dev/beiju`
  (alinhado à documentação), removida a flag `private`, adicionados `files`, `types`,
  `exports`, `repository`, `license`, `author`, `description` e `keywords`.
- Adicionado pipeline de build (`tsup`) gerando um bundle ESM único com `.d.ts`, resolvendo
  os aliases de path (`@core/*`, `@builders/*`, etc.) que antes quebravam em runtime puro do
  Node.js quando importados por um consumidor externo.
- Corrigidos testes de `SemanticSelectBuilder` que instanciavam `Table` via `createTable()`
  sem registrar a `builderFactory`, o que agora é obrigatório desde a separação de
  responsabilidades entre `Table` e `SemanticSelectBuilder`.
- Corrigido mock de `pg.Pool` em `PgAdapter.test.ts` (arrow function não pode ser usada como
  construtor via `new`).
- Testes de integração (que dependem de um PostgreSQL real via `DB_STRING_CONNECTION`) agora
  usam `describe.skipIf` para não falhar quando não há banco configurado localmente ou em CI.
- Renomeado `LICENCE.md` para `LICENSE.md`, corrigindo o link quebrado referenciado pelos
  READMEs.

### Adicionado

- Workflow de CI (GitHub Actions) rodando typecheck, testes e build em Node 20.x e 22.x a
  cada push/PR para `main`.
- Scripts `build`, `typecheck` e `prepublishOnly` no `package.json`.

## [0.1.0]

Estado do projeto antes desta rodada de preparação para publicação — desenvolvido como
Trabalho de Conclusão de Curso (TCC) no Instituto Federal de Sergipe, Campus Lagarto.

### Adicionado

- **Semantic Layer**: `AnalyticsContext`, `Table`, `TypedColumn`, com introspecção automática
  de schema do PostgreSQL.
- **Window Functions**: `RANK`, `DENSE_RANK`, `ROW_NUMBER`, `LAG`, `LEAD`, com suporte a
  `PARTITION BY` / `ORDER BY`.
- **Agregações**: `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`, incluindo agregações aninhadas
  (`AVG(SUM(col))`).
- **JOINs**: `INNER`, `LEFT`, `RIGHT`, `FULL OUTER`.
- **WHERE composto**: operadores de comparação, `BETWEEN`, `IN`, além dos helpers `or()` e
  `and()`.
- **`@RawSql`**: decorator de escape hatch para SQL nativo, compartilhando a mesma conexão e
  parameter binding seguro do query builder.
- **API bilíngue**: todo método da Semantic Layer possui um equivalente em português
  (`selecione`, `onde`, `agrupePor`, `classificar`, `media`, etc.).
- **PgAdapter**: adapter de infraestrutura para PostgreSQL via `pg`, com pool de conexões e
  mapeamento de tipos (`PgTypeMap`).

[Unreleased]: https://github.com/beiju-dev/beiju/compare/main...HEAD
[0.1.0]: https://github.com/beiju-dev/beiju/commits/main
