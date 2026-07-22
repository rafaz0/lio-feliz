# BR-16 — Comparação Avançada (Scorecard Multi-Ativo)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-009 (Onda 4 — Módulo 16)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Comparação Avançada** do Lio Feliz. O módulo permite ao usuário comparar múltiplos ativos lado a lado, gerando um scorecard agregado com métricas de rentabilidade, risco, dividendos e drawdown.

O módulo **nunca recalcula projeções** (R-013). O `ComparisonAggregator` é uma operação de cálculo derivado que consome exclusivamente dados já materializados pelo `IProjectionRepository`.

---

## 2. Modelo de Domínio

### 2.1 `ComparisonSet` (Entidade)

Conjunto de ativos selecionados para comparação.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ComparisonSetId` | Identificador único |
| `name` | `string` | Nome de exibição (ex: "Fiis vs Ações") |
| `entries` | `ComparisonEntry[]` | Ativos do conjunto |
| `scope` | `ComparisonScope` | Escopo da comparação |
| `userId` | `string` | ID do usuário proprietário |
| `createdAt` | `Date` | Data de criação |

### 2.2 `ComparisonEntry` (Entidade)

Um ativo dentro do conjunto de comparação.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ComparisonEntryId` | Identificador único |
| `comparisonSetId` | `string` | Conjunto de origem |
| `assetTicker` | `string` | Ticker do ativo |
| `assetType` | `string` | Tipo do ativo (stock, fii, etf, etc.) |
| `weight` | `number` | Peso opcional no conjunto (0-100) |

### 2.3 `Scorecard` (Entidade)

Resultado da agregação de métricas.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ScorecardId` | Identificador único |
| `comparisonSetId` | `string` | Conjunto de origem |
| `metrics` | `ComparisonMetric[]` | Métricas agregadas por ativo |
| `generatedAt` | `Date` | Data de geração |

### 2.4 `ComparisonMetric` (Value Object)

Uma métrica de um ativo no scorecard.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `assetTicker` | `string` | Ticker do ativo |
| `metricType` | `MetricType` | Nome da métrica |
| `value` | `number` | Valor calculado |
| `rank` | `number` | Posição relativa entre ativos |
| `benchmarkValue` | `number` | Valor de referência |

### 2.5 `ComparisonScope` (Value Object)

Define o escopo da comparação.

```typescript
type ComparisonScopeType = "byAsset" | "byType" | "bySector";

interface ComparisonScope {
  type: ComparisonScopeType;
  filter?: string; // filtro opcional (ex: setor, tipo)
}
```

---

## 3. Métricas do Scorecard

| Métrica | Descrição | Fonte |
|---------|-----------|-------|
| **Rentabilidade (12m)** | Retorno acumulado nos últimos 12 meses | `IProjectionRepository` |
| **Rentabilidade (24m)** | Retorno acumulado nos últimos 24 meses | `IProjectionRepository` |
| **Rentabilidade (36m)** | Retorno acumulado desde o início | `IProjectionRepository` |
| **Volatilidade** | Desvio padrão anualizado dos retornos | Cálculo derivado sobre retornos |
| **Drawdown Máximo** | Maior queda do pico ao vale no período | Cálculo derivado sobre retornos |
| **Dividend Yield (12m)** | Rendimento de dividendos nos últimos 12 meses | `IProjectionRepository` |
| **Índice de Sharpe** | Retorno ajustado ao risco | Cálculo derivado (retorno - RF / volatilidade) |

---

## 4. Invariantes

- **I-001 (Read-Only sobre projeções):** `ComparisonAggregator` nunca recalcula projeções (R-013). Consome exclusivamente `IProjectionRepository`.
- **I-002 (Mínimo de ativos):** Um `ComparisonSet` deve ter no mínimo 2 ativos.
- **I-003 (Métrica completa):** Todo scorecard contém todas as 7 métricas para cada ativo.
- **I-004 (Ranking):** `rank` é calculado por métrica: 1 = melhor, N = pior.
- **I-005 (Cache por hash):** Scorecards são cacheados pelo hash de `(setId, metricTypes)` para performance.

---

## 5. Workflow de Agregação (`ComparisonAggregator`)

1. **Entrada:** ComparisonSet (`entries`) + dados de projeção (`IProjectionRepository`)
2. **Para cada entry (ativo):**
   - Consultar retornos históricos (12m, 24m, 36m)
   - Calcular volatilidade com base nos retornos mensais
   - Calcular drawdown máximo a partir da série de valor
   - Consultar dividend yield dos últimos 12 meses
   - Calcular Sharpe ratio
3. **Rankear:** Ordenar ativos por métrica e atribuir posição
4. **Saída:** Scorecard com métricas + rankings

---

## 6. Não-escopo

- Cálculo de projeções futuras (já em `IProjectionRepository`)
- Recomendação de compra/venda com base na comparação
- Dados em tempo real (apenas dados históricos já materializados)
- Exportação do scorecard (será coberto pelo módulo 18 — Exportação Avançada)
