# 07_BACKTEST_ALGORITMOS.md — Algoritmos de Backtest

**Versão:** 1.0
**Status:** APROVADO
**Classificação:** Technical Annex

---

## 1. Objetivo

Definir os algoritmos, fórmulas e pseudocódigo para execução de backtest de estratégias de alocação.

---

## 2. Estruturas de Dados

### 2.1 PriceSnapshot (entrada)

```typescript
interface PriceSnapshot {
  assetTicker: string;
  historicalPrices: DailyPrice[];
}

interface DailyPrice {
  date: string; // ISO
  close: number;
  adjustedClose: number;
}
```

### 2.2 DividendEvent

```typescript
interface DividendEvent {
  date: string; // ISO
  assetTicker: string;
  valuePerShare: number;
  type: "dividendo" | "jcp";
}
```

### 2.3 SplitEvent

```typescript
interface SplitEvent {
  date: string; // ISO
  assetTicker: string;
  factor: number; // 2 = 2:1 split, 0.5 = 1:2 reverse split
}
```

---

## 3. Algoritmo de Simulação

### 3.1 Pseudocódigo

```
function executarBacktest(strategy, dateRange, snapshot):
    // Validações
    if soma(strategy.allocations.weight) > 100:
        erro("Alocação excede 100%")

    // Inicialização
    capital = 100000 // capital virtual inicial
    posicoes = inicializarPosicoes(strategy.allocations, capital)
    historicoMensal = []
    drawdownPico = capital
    drawdownMaximo = 0
    retornosMensais = []

    // Iteração mês a mês
    for mes in range(dateRange.start, dateRange.end, MENSAL):
        // 1. Calcular retorno do período
        for posicao in posicoes:
            precoAtual = obterPreco(posicao.ticker, mes.fim, snapshot)
            precoAnterior = obterPreco(posicao.ticker, mes.inicio, snapshot)
            retornoAtivo = (precoAtual - precoAnterior) / precoAnterior
            posicao.valor *= (1 + retornoAtivo)

        // 2. Aplicar dividendos
        for dividendo in snapshot.dividendos.filterPorPeriodo(mes):
            posicao = encontrarPosicao(dividendo.assetTicker)
            if posicao:
                valorDividendo = posicao.cotas * dividendo.valuePerShare
                capital += valorDividendo // reinvestimento virtual

        // 3. Aplicar splits
        for split in snapshot.splits.filterPorPeriodo(mes):
            posicao = encontrarPosicao(split.assetTicker)
            if posicao:
                ajustarCotas(posicao, split.factor)

        // 4. Registrar retorno mensal
        valorCarteira = soma(posicoes.map(p => p.valor)) + capital
        retornoMes = (valorCarteira - capitalAnterior) / capitalAnterior

        // 5. Atualizar drawdown
        if valorCarteira > drawdownPico:
            drawdownPico = valorCarteira
        drawdownAtual = (drawdownPico - valorCarteira) / drawdownPico
        drawdownMaximo = max(drawdownMaximo, drawdownAtual)

        // 6. Registrar benchmark
        retornoBenchmark = calcularRetornoBenchmark(strategy.benchmark, mes, snapshot)

        historicoMensal.push({
            mes: formatarMes(mes),
            strategyReturn: retornoMes * 100,
            benchmarkReturn: retornoBenchmark * 100
        })

    // Cálculo das métricas finais
    retornoTotal = (valorCarteira - capitalInicial) / capitalInicial * 100
    retornoBenchmarkTotal = calcularRetornoBenchmarkAcumulado(...)
    volatilidade = desvioPadrao(retornosMensais) * sqrt(12)
    sharpe = (mediaRetornosMensais - taxaLivreRisco) / desvioPadrao(retornosMensais) * sqrt(12)
    beta = calcularBeta(retornosMensais, retornosBenchmarkMensais)
    alpha = retornoTotal - (taxaLivreRisco + beta * (retornoBenchmarkTotal - taxaLivreRisco))

    return SimulationResult {
        periodReturns: retornoTotal,
        benchmarkReturn: retornoBenchmarkTotal,
        maxDrawdown: drawdownMaximo * 100,
        sharpeRatio: sharpe,
        volatility: volatilidade * 100,
        alpha: alpha,
        beta: beta,
        dividendYield: calcularDividendYield(snapshot, strategy),
        monthlyReturns: historicoMensal
    }
```

### 3.2 Detalhamento das Funções

#### calcularRetornoBenchmark(benchmark, mes, snapshot)

```typescript
function calcularRetornoBenchmark(benchmark, mes, snapshot):
    precoAtual = obterPrecoBenchmark(benchmark.ticker, mes.fim, snapshot)
    precoAnterior = obterPrecoBenchmark(benchmark.ticker, mes.inicio, snapshot)
    return (precoAtual - precoAnterior) / precoAnterior
```

#### calcularBeta(retornosCarteira, retornosBenchmark)

```typescript
function calcularBeta(retCarteira: number[], retBenchmark: number[]): number {
    const n = retCarteira.length;
    const mediaCarteira = media(retCarteira);
    const mediaBenchmark = media(retBenchmark);

    let covariancia = 0;
    let varianciaBenchmark = 0;

    for (let i = 0; i < n; i++) {
        const diffCarteira = retCarteira[i] - mediaCarteira;
        const diffBenchmark = retBenchmark[i] - mediaBenchmark;
        covariancia += diffCarteira * diffBenchmark;
        varianciaBenchmark += diffBenchmark * diffBenchmark;
    }

    return covariancia / varianciaBenchmark;
}
```

#### calcularSharpeRatio(retornos, taxaLivreRisco)

```typescript
function calcularSharpeRatio(retornos: number[], taxaLivreRiscoAnual: number): number {
    const n = retornos.length;
    const retornoMedioMensal = media(retornos);
    const desvioPadraoMensal = desvioPadrao(retornos);
    const retornoExcessMensal = retornoMedioMensal - (taxaLivreRiscoAnual / 12);
    return (retornoExcessMensal / desvioPadraoMensal) * Math.sqrt(12);
}
```

### 3.3 Tratamento de Caixa

Quando a soma dos `weightPercentage` for inferior a 100%, o saldo restante é alocado como **caixa** (rendendo CDI diário). O snapshot inclui a taxa CDI projetada para o período.

```
capitalCaixa = capital * (1 - somaPesos / 100)
rendimentoCaixa = capitalCaixa * (cdiAcumuladoPeriodo / 100)
```

---

## 4. Snapshot e Serialização

O snapshot é serializado em JSON e armazenado em `backtest_snapshots`. Estrutura:

```typescript
interface BacktestSnapshotData {
  id: string;
  backtestId: string;
  assets: string[];
  startDate: string;
  endDate: string;
  prices: Record<string, DailyPrice[]>; // ticker -> preços
  dividends: DividendEvent[];
  splits: SplitEvent[];
  cdiRates: DailyRate[]; // CDI diário
  createdAt: string;
  metadata: {
    dataSources: string[]; // ex: ["yahoo", "brapi"]
    assetCount: number;
    totalDays: number;
  };
}
```

---

## 5. Validações

| Validação | Código | Comportamento |
|-----------|--------|---------------|
| Alocação > 100% | `INVALID_ALLOCATION` | Rejeitar estratégia |
| Período inválido | `INVALID_DATE_RANGE` | Rejeitar backtest |
| Benchmark não encontrado | `BENCHMARK_NOT_FOUND` | Usar CDI como fallback |
| Snapshot expirado (>30 dias) | `SNAPSHOT_EXPIRED` | Solicitar novo snapshot |
| Ativo sem dados no período | `ASSET_NO_DATA` | Ignorar ativo com warning |
