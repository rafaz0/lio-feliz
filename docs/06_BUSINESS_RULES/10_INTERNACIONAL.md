# BR-10 — Internacional (Ativos Globais e Conversão de Moeda)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-007 (Onda 2 — Módulo 10)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Internacional** do Lio Feliz. O módulo permite ao usuário registrar e acompanhar ativos globais (ações US, REITs, ETFs internacionais, BDRs) com conversão automática de moeda estrangeira para BRL.

O registro de operações (compra/venda) de ativos internacionais **reutiliza o fluxo canônico** `RegistrarOperacaoCommand` + `inferAssetType` (Decisão O2/NC-009-002). Nenhum comando específico de registro de operação é criado.

---

## 2. Conversão de Moeda (R-008 / PA-009-001)

Nenhum cálculo de posição ou rentabilidade de ativo internacional persiste valor em moeda estrangeira sem conversão explícita para BRL via `CurrencyConversionService`. A taxa utilizada deve ser registrada (`ExchangeRate`) para auditabilidade (I-014).

### Fluxo de Conversão

```
Operação em USD
    ↓
Buscar ExchangeRate para a data da operação
    ↓
Se não existir: usar taxa de fechamento do dia (Yahoo/BRAPI)
                  ou taxa comercial (AwesomeAPI)
    ↓
Armazenar taxa utilizada + fonte + timestamp
    ↓
Converter valor para BRL
    ↓
Persistir posição consolidada em BRL
```

---

## 3. Modelo de Domínio

### 3.1 `ForeignAsset` (Entidade)

Um ativo negociado em bolsa estrangeira.

| Atributo    | Tipo             | Regra                                  |
| ----------- | ---------------- | -------------------------------------- |
| `id`        | `ForeignAssetId` | Identificador único                    |
| `ticker`    | `string`         | Ticker na bolsa de origem (ex: "AAPL") |
| `name`      | `string`         | Nome do ativo                          |
| `exchange`  | `string`         | Bolsa de origem (NASDAQ, NYSE, etc.)   |
| `currency`  | `string`         | Moeda de negociação (USD, EUR, etc.)   |
| `assetType` | `string`         | stock_us, reit, etf_internacional, bdr |

### 3.2 `CurrencyConversion` (Value Object)

Resultado de uma conversão de moeda.

| Atributo       | Tipo                  |
| -------------- | --------------------- |
| `fromAmount`   | `number`              |
| `fromCurrency` | `string`              |
| `toAmount`     | `number` (sempre BRL) |
| `rate`         | `number`              |
| `date`         | `Date`                |

### 3.3 `ExchangeRate` (Value Object) — já implementado

Taxa de câmbio registrada, com indicador de frescor (`isFresh` = < 24h).

### 3.4 `CurrencyPair` (Value Object) — já implementado

Par de moedas (ex: USD → BRL).

---

## 4. Serviço de Domínio: `CurrencyConversionService`

| Método                                | Descrição                                                          |
| ------------------------------------- | ------------------------------------------------------------------ |
| `convert(amount, fromCurrency, rate)` | Converte valor usando taxa fornecida, retorna `CurrencyConversion` |
| `getFreshRate(pair, rates)`           | Retorna a taxa mais recente de um cache, se fresca                 |

### Regras

- Se `ExchangeRate.isFresh` for true, reutiliza a taxa em cache.
- Se não houver taxa fresca, uma nova deve ser buscada (pelo service da Application Layer).
- A conversão é isolada no domínio, sem dependência de APIs externas (PA-009-001).

---

## 5. Invariantes

- **I-013:** Todo valor em moeda estrangeira é convertido para BRL via `CurrencyConversionService` no cálculo de posição.
- **I-014:** `ExchangeRate` utilizada é registrada para auditabilidade.
- **I-015:** Conversão usa taxa da data da operação (ou taxa de fechamento do dia, conforme Anexo `06_CONVERSÃO_MOEDA.md`).

---

## 6. Integração com Fluxo Canônico (O2)

Compras e vendas de ativos internacionais são registradas via `RegistrarOperacaoCommand` padrão. O `inferAssetType` reconhece os tipos `stock_us`, `reit`, `etf_internacional`, `bdr` e alimenta a consolidação. A conversão BRL ocorre em `CurrencyConversionService` usando a taxa da data da operação.

---

## 7. Não-escopo

- Câmbio em tempo real (apenas taxa de fechamento do dia)
- Múltiplas moedas de conversão (sempre BRL como destino)
- Ativos de renda fixa internacionais (apenas ações, REITs, ETFs, BDRs)
- Imposto de renda sobre ganho de capital internacional (será coberto pelo módulo 08 — Impostos)
