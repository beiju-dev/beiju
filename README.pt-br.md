# Beiju
 
**Um query builder analítico para Node.js, com Semantic Layer e API bilíngue (Português / Inglês).**
 
O Beiju compila cadeias fluentes de métodos TypeScript em SQL seguro e parametrizado, abstraindo operações OLAP (Window Functions, agregações, JOINs, comparações temporais) que ORMs tradicionais como Prisma e TypeORM não possuem essa especialidade.
 
```typescript
const resultado = await vendas
  .selecione([
    vendas.vendedor_id,
    vendas.total.soma().como('total_vendas'),
    classificar()
      .sobre(w => w.particionePor('mes').ordenePor(vendas.total.soma(), 'DESC'))
      .como('classificacao'),
  ])
  .agrupePor(vendas.vendedor_id, vendas.mes)
  .buscar()
```
 
Sem strings de SQL nativo. Sem cast manual de colunas. Autocomplete completo na IDE e verificação de tipos em tempo de compilação em cada referência de coluna.
 
---
 
## Por que o Beiju?
 
O Node.js possui ORMs maduros para operações transacionais (OLTP), mas existe uma lacuna real quando um desenvolvedor backend precisa construir um ranking de vendas, uma comparação mês a mês ou uma média móvel diretamente dentro da aplicação. O caminho usual é recorrer a strings de SQL nativo, perdendo segurança de tipos e legibilidade no processo.
 
O Beiju fecha essa lacuna com uma **Semantic Layer**: em vez de escrever `SELECT`, `WHERE` e `GROUP BY` contra nomes de coluna em string, você referencia colunas como objetos tipados (`vendas.total`, `vendas.vendedor_id`), introspectados automaticamente a partir do schema do PostgreSQL em tempo de execução.
 
---
 
## Instalação
 
```bash
npm install @beiju-dev/beiju
```
 
> Requer Node.js 20+ e PostgreSQL.
 
---
 
## Começando
 
```typescript
import { AnalyticsContext, classificar, ou, e } from '@beiju-dev/beiju'
 
const ctx = new AnalyticsContext('postgresql://usuario:senha@localhost:5432/meubanco')
const vendas = await ctx.table('vendas')
 
const resultado = await vendas
  .selecione([
    vendas.vendedor_id,
    vendas.mes,
    vendas.total.soma().como('total_vendas'),
    classificar()
      .sobre(w => w.particionePor('mes').ordenePor(vendas.total.soma(), 'DESC'))
      .como('classificacao'),
  ])
  .onde(vendas.mes.igual('2026-01'))
  .agrupePor(vendas.vendedor_id, vendas.mes)
  .buscar()
```
 
### Comparação com mês anterior (LAG)
 
```typescript
import { anterior } from '@beiju-dev/beiju'
 
const resultado = await vendas
  .selecione([
    vendas.vendedor_id,
    vendas.mes,
    vendas.total.soma().como('total_vendas'),
    anterior(vendas.total.soma(), 1)
      .sobre(w => w.particionePor('vendedor_id').ordenePor('mes'))
      .como('total_mes_anterior'),
  ])
  .agrupePor(vendas.vendedor_id, vendas.mes)
  .buscar()
```
 
### Condições compostas
 
```typescript
const resultado = await vendas
  .selecione([vendas.vendedor_id, vendas.mes, vendas.total])
  .onde(ou(
    vendas.vendedor_id.igual(1),
    vendas.vendedor_id.igual(2),
  ))
  .buscar()
```
 
### Junção entre tabelas
 
```typescript
const vendedores = await ctx.table('vendedores')
 
const resultado = await vendas
  .selecione([
    vendedores.nome.como('nome_vendedor'),
    vendas.mes,
    vendas.total.soma().como('total_vendas'),
  ])
  .juncaoInterna(vendedores).em(vendas.vendedor_id, vendedores.id)
  .agrupePor(vendedores.nome, vendas.mes)
  .ordenePor(vendas.mes)
  .buscar()
```
 
---
 
## Vocabulário em Português
 
Cada método da Semantic Layer possui um alias direto em português, que chama a mesma implementação testada em inglês. Não há custo de execução adicional nem perda de autocomplete ou de verificação de tipos.
 
| Inglês | Português |
|---|---|
| `select` | `selecione` |
| `where` | `onde` |
| `groupBy` | `agrupePor` |
| `orderBy` | `ordenePor` |
| `limit` | `limite` |
| `fetch` | `buscar` |
| `innerJoin` | `juncaoInterna` |
| `leftJoin` | `juncaoEsquerda` |
| `on` | `em` |
| `sum` | `soma` |
| `avg` | `media` |
| `count` | `contar` |
| `as` | `como` |
| `eq` | `igual` |
| `between` | `entre` |
| `rank` | `classificar` |
| `lag` | `anterior` |
| `over` | `sobre` |
| `partitionBy` | `particionePor` |
 
Os dois vocabulários podem ser combinados livremente na mesma query, conforme a preferência do time.
 
---
 
## Recursos
 
- **Window Functions**: `classificar` (RANK), `classificarDenso` (DENSE_RANK), `numeroDaLinha` (ROW_NUMBER), `anterior` (LAG), `proximo` (LEAD), `grupo` (NTILE), com suporte completo a `particionePor`, `ordenePor` e `linhasEntre`
- **Agregações**: `soma`, `media`, `contar`, `minimo`, `maximo`, incluindo agregações aninhadas (`media(vendas.total.soma())`)
- **Junções**: `juncaoInterna`, `juncaoEsquerda`, `juncaoDireita`, `juncaoExterna`
- **WHERE composto**: operadores de comparação, `entre`, `dentroDe`, além dos helpers `ou()` e `e()`
- **Introspecção automática de schema**: nenhum mapeamento manual de tabela é necessário, colunas já chegam tipadas e com autocomplete
- **Escape hatch `@RawSql`**: quando a DSL não cobre um caso específico, é possível usar SQL nativo no mesmo executor de conexão, com segurança de parâmetros preservada
---
 
## Arquitetura
 
O Beiju é construído em quatro camadas, seguindo Arquitetura Hexagonal e Domain-Driven Design:
 
```
Semantic Layer    →  AnalyticsContext, Table, TypedColumn
Builders          →  DSL fluente (SelectBuilder, WindowBuilder, JoinBuilder)
Core (Compilador) →  Nós da AST + SqlGenerator
Infraestrutura    →  PgAdapter (PostgreSQL)
```
 
O núcleo nunca importa código de infraestrutura. A construção da query (builders) é completamente desacoplada da geração de SQL (`SqlGenerator`), que por sua vez é desacoplada da execução (`PgAdapter`). É essa separação que torna o núcleo compilador inteiramente testável sem necessidade de conexão real com banco de dados.
 
---
 
## Status do Projeto
 
O Beiju foi desenvolvido como Trabalho de Conclusão de Curso (TCC) no **Instituto Federal de Sergipe, Campus Lagarto**, no curso de Sistemas de Informação. É funcional e validado contra PostgreSQL com testes unitários e de integração, mas deve ser considerado um artefato de pesquisa, não uma biblioteca pronta para produção neste estágio.
 
**Fora de escopo nesta versão** (registrado como trabalho futuro): adapters de CSV/Parquet, `HAVING`, `DISTINCT`, agrupamento WHERE aninhado com precedência mista de AND/OR, e suporte a CTEs.
 
---
 
## Como Contribuir
 
O Beiju é open source e contribuições são bem-vindas, seja um relato de bug, um novo adapter, novas Window Functions ou melhorias no vocabulário em português. Sinta-se à vontade para abrir uma issue para discutir uma ideia antes de enviar um pull request.
 
Se você está usando o Beiju em um projeto real ou experimentando a biblioteca para fins de estudo, adoraríamos saber.
 
---
 
## Licença
 
MIT. Veja [LICENSE.md](./LICENSE.md).
 
---
 
## Agradecimentos
 
Desenvolvido por Gilson Teixeira do Sacramento Junior, como trabalho academico no Instituto Federal de Sergipe.
