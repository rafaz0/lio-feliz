# BR-14 — Backtests (Simulação Histórica de Estratégias)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-009 (Onda 4 — Módulo 14)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Backtests** do Lio Feliz. O módulo permite ao usuário criar estratégias de alocação, executar simulações históricas contra séries de preços e analisar resultados comparativos contra benchmarks.

Toda execução de backtest é **determinística e reproduzível** (R-011): os dados de entrada (série histórica de preços, dividendos, splits) são snapshotted no início da simulação. O `BacktestEngine` não consulta APIs externas durante a execução.

---

## 2. Estratégia de Alocação

### 2.1 Definição

Uma estratégia é composta por:

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| Nome | `string` | Nome de exibição (ex: "Dividendos 60/40") |
| Alocações | `AllocationWeight[]` | Proporção por ativo (soma ≤ 100%) |
| Benchmark | `BenchmarkRef` | Índice de referência (ex: IBOV, IDIV, IFIX) |
| Data de criação | `Date` | Quando foi criada |
| Ativo | `boolean` | Se pode ser usada para novos backtests |

### 2.2 AllocationWeight

| Atributo | Tipo | Regra |
|----------|------|-------|
| `assetTicker` | `string` | Ticker do ativo (ex: "PETR4", "BBDC4") |
| `weightPercentage` | `number` | Percentual alocado (0-100%) |
| `assetType` | `AssetType` | Tipo do ativo (stock, fii, etf, etc.) |

**Invariante:** A soma de todos `weightPercentage` em uma estratégia não pode exceder 100%. Se for menor que 100%, o restante é considerado como posição em caixa (CDI).

### 2.3 BenchmarkRef

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `ticker` | `string` | Identificador do benchmark (ex: "IBOV", "^GSPC") |
| `name` | `string` | Nome de exibição |
| `type` | `string` | Tipo (indice, etf, cdi) |

---

## 3. Modelo de Domínio

### 3.1 `Strategy` (Entidade)

Define uma estratégia de alocação.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `string` | Identificador único |
| `name` | `string` | Nome de exibição |
| `allocations` | `AllocationWeight[]` | Alocações por ativo |
| `benchmark` | `BenchmarkRef` | Índice de referência |
| `userId` | `string` | ID do usuário proprietário |
| `createdAt` | `Date` | Data de criação |
| `isActive` | `boolean` | Se a estratégia está ativa |

### 3.2 `Backtest` (Entidade)

Uma execução concreta de backtest.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `string` | Identificador único |
| `strategyId` | `string` | Estratégia usada |
| `dateRange` | `DateRange` | Período simulado |
| `snapshotId` | `string` | ID do snapshot de dados usado |
| `status` | `BacktestStatus` | PENDING, RUNNING, COMPLETED, FAILED |
| `createdAt` | `Date` | Data de solicitação |
| `completedAt` | `Date` | Data de conclusão |
| `error` | `string` | Mensagem de erro (se FAILED) |

### 3.3 `SimulationResult` (Entidade)

O resultado de uma execução.

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | `string` | Identificador único |
| `backtestId` | `string` | Backtest de origem |
| `periodReturns` | `number` | Retorno total do período (%) |
| `benchmarkReturn` | `number` | Retorno do benchmark (%) |
| `maxDrawdown` | `number` | Drawdown máximo (%) |
| `sharpeRatio` | `number` | Índice de Sharpe |
| `volatility` | `number` | Volatilidade anualizada (%) |
| `alpha` | `number` | Alpha vs benchmark (%) |
| `beta` | `number` | Beta vs benchmark |
| `dividendYield` | `number` | Rendimento de dividendos (%) |
| `monthlyReturns` | `MonthlyReturn[]` | Retorno mês a mês |

### 3.4 `DateRange` (Value Object)

| Atributo | Tipo | Regra |
|----------|------|-------|
| `start` | `Date` | Início do período |
| `end` | `Date` | Fim do período |

**Invariante:** `end >= start`.

### 3.5 `BacktestSnapshot` (Entidade)

Snapshot dos dados históricos usados na simulação.

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | `string` | Identificador único |
| `backtestId` | `string` | Backtest de origem |
| `assets` | `string[]` | Tickers incluídos |
| `startDate` | `string` | Data inicial (ISO) |
| `endDate` | `string` | Data final (ISO) |
| `prices` | `unknown` | Dados de preço serializados |
| `dividends` | `unknown` | Dados de dividendos serializados |
| `splits` | `unknown` | Dados de splits serializados |
| `createdAt` | `string` | Timestamp ISO do snapshot |

### 3.6 `MonthlyReturn` (Value Object)

| Atributo | Tipo |
|----------|------|
| `month` | `string` | Mês no formato "YYYY-MM" |
| `strategyReturn` | `number` | Retorno da estratégia (%) |
| `benchmarkReturn` | `number` | Retorno do benchmark (%) |

---

## 4. Invariantes (domínio)

- **I-001 (Determinístico):** A mesma estratégia + mesmo snapshot produzem exatamente o mesmo `SimulationResult` (R-011).
- **I-002 (Alocação máxima):** A soma de `weightPercentage` em uma estratégia não pode exceder 100%.
- **I-003 (Snapshot isolado):** O `BacktestEngine` nunca consulta APIs externas. Consome apenas o snapshot armazenado.
- **I-004 (Período consistente):** `dateRange.end >= dateRange.start`.
- **I-005 (Benchmark obrigatório):** Toda estratégia deve ter um benchmark de referência.
- **I-006 (Versão única):** Cada backtest executa exatamente uma vez para o mesmo `(strategyId, dateRange, snapshotId)`.

---

## 5. Workflow de Execução (`BacktestEngine`)

1. **Entrada:** Strategy + DateRange + BacktestSnapshot
2. **Validação:** Verificar I-001 a I-005
3. **Simulação** (passo a passo, mês a mês):
   - Calcular retorno ponderado da carteira com base nos pesos da estratégia
   - Aplicar dividendos recebidos no período (reinvestimento virtual)
   - Aplicar splits/bonificações
   - Rebalancear pesos periodicamente (se configurado)
   - Calcular retorno acumulado, drawdown, Sharpe, alpha/beta
4. **Saída:** SimulationResult com métricas completas
5. **Armazenamento:** Persistir resultado + metadados da execução

---

## 6. Métricas Calculadas

| Métrica | Fórmula |
|---------|---------|
| Retorno Período | `(valorFinal - valorInicial) / valorInicial × 100` |
| Drawdown Máximo | Maior queda do pico ao vale no período |
| Sharpe Ratio | `(Rp - Rf) / σp` onde Rp = retorno carteira, Rf = taxa livre de risco, σp = desvio padrão |
| Volatilidade | Desvio padrão dos retornos anualizado |
| Alpha | `Rp - (Rf + β × (Rm - Rf))` |
| Beta | Covariância(Rp, Rm) / Variância(Rm) |

---

## 7. Snapshot de Dados (R-011)

O snapshot congelado contém:

- Preços de fechamento diários de cada ativo no período
- Eventos de dividendos (data, valor por cota)
- Eventos de splits/bonificações
- Taxa CDI diária (como proxy de caixa)

O snapshot é montado **antes** da execução e nunca modificado durante a simulação.

---

## 8. Relação com outros módulos

- Consome dados de `IProjectionRepository` (já existente) para séries históricas de preços e dividendos.
- **Não depende** de módulos 09/10 (Renda Fixa/Internacional) — Backtests 14 é independente.
- Não altera carteira real — executa exclusivamente em snapshot isolado.

---

## 9. Não-escopo

- Execução em tempo real (apenas dados históricos)
- Recomendação automática de alocação (apenas simulação de estratégia do usuário)
- Conexão com corretoras para execução real
- Dados de ativos não disponíveis no `IProjectionRepository`
