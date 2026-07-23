# BR-09 — Renda Fixa (Tesouro Direto, CDB, LCI, LCA, Prefixados e Pós-fixados)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-007 (Slice 1 — Bloco 1: Renda Fixa)

---

## 1. Objetivo

Definir as regras de negócio do módulo de **Renda Fixa** do Investidor Pro. O módulo permite
registrar títulos de renda fixa (Tesouro Direto, CDB, LCI, LCA, prefixados e pós-fixados),
acompanhar o cronograma de pagamentos de juros e amortizações e projetar o retorno até o vencimento.

---

## 2. Tipos de Ativo Suportados

| `productType`    | Descrição                          | Isenção IR | Regime de Juros          |
| ---------------- | ---------------------------------- | ---------- | ------------------------ |
| `TESOURO_DIRETO` | Tesouro Selic, Prefixado, IPCA+    | Não        | Pre/Pos conforme subtipo |
| `CDB`            | Certificado de Depósito Bancário   | Não*       | Pre/Pos                  |
| `LCI`            | Letra de Crédito Imobiliário       | Sim        | Pre/Pos                  |
| `LCA`            | Letra de Crédito do Agronegócio    | Sim        | Pre/Pos                  |
| `PREFIXADO`      | Título prefixado genérico          | Não        | Pre                      |
| `POS_FIXADO`     | Título pós-fixado (Selic/CDI/IPCA) | Não        | Pos                      |

\* CDB até R$ 250 mil por instituição possui isenção após 720 dias (regra de IRPF tratada em BR-07).

---

## 3. Modelo de Domínio

### 3.1 `FixedIncomeAsset` (Entidade)

| Atributo       | Tipo                   | Regra                                    |
| -------------- | ---------------------- | ---------------------------------------- |
| `id`           | `EntityId`             | Identificador imutável                   |
| `ticker`       | `Ticker`               | Ticket do título (ex: `TESOURO-IPCA+`》) |
| `name`         | `string`               | Nome de exibição                         |
| `institution`  | `string`               | Emissor / Instituição financeira         |
| `productType`  | `FixedIncomeType`      | Um dos valores da seção 2                |
| `nominalValue` | `number`               | Valor nominal (Price 100)                |
| `rate`         | `number`               | Taxa anual (% a.a.)                      |
| `rateType`     | `"PRE" \| "POS"`       | Regime de juros                          |
| `issueDate`    | `Date`                 | Data de emissão                          |
| `maturityDate` | `Date`                 | Data de vencimento                       |
| `schedule`     | `AmortizationSchedule` | Cronograma gerado (seção 3.3)            |

### 3.2 `Coupon` (Value Object)

Representa um pagamento periódico.

| Atributo      | Tipo     | Regra                                        |
| ------------- | -------- | -------------------------------------------- |
| `date`        | `Date`   | Data do pagamento                            |
| `juros`       | `number` | Valor dos juros no período                   |
| `amortizacao` | `number` | Valor da amortização de principal no período |

### 3.3 `AmortizationSchedule` (Value Object)

Coleção ordenada de `Coupon`s entre emissão e vencimento.

| Atributo    | Tipo       | Regra                                    |
| ----------- | ---------- | ---------------------------------------- |
| `coupons`   | `Coupon[]` | Ordenados por `date` ascendente          |
| `principal` | `number`   | Principal total (igual a `nominalValue`) |

---

## 4. Invariantes (domínio)

- **I-010 (Parâmetros mínimos):** `rate >= 0` e `nominalValue > 0`. Taxa negativa ou valor nominal
  não positivo tornam o título inválido.
- **I-011 (Cronologia):** `maturityDate > issueDate`. O prazo deve ser estritamente positivo.
- **I-012 (Conservação do principal — Price 100):** a soma de `juros` e `amortizacao` de todos os
  cupons deve ser igual a `principal + totalJuros`, ou seja:
  `Σ(juros + amortizacao) = principal + Σ(juros)` ⟹ `Σ(amortizacao) = principal`.
  O cronograma gerado garante que a amortização total recupera integralmente o principal.

---

## 5. Geração do Cronograma (`FixedIncomeService.generateSchedule`)

Para um `FixedIncomeAsset` válido:

1. Calcula o número de anos `N = floor((maturityDate - issueDate) / 365 dias)`.
2. Define `principal = nominalValue`.
3. Para cada ano `k = 1..N` (ou bullet no vencimento, se `N == 0`):
   - `juros_k = principal * (rate/100) * (diasPeriodo/365)`
   - `amortizacao_k = principal / max(N, 1)`
4. Ordena os cupons por `date`.
5. Valida I-012 antes de retornar o `AmortizationSchedule`.

> Para títulos com menos de 1 ano (`N == 0`), gera-se um único cupom bullet no vencimento
> com `juros = principal * (rate/100) * (diasTotais/365)` e `amortizacao = principal`.

---

## 6. Projeções (camada Application)

- **Valor projetado no vencimento:** `nominalValue + Σ(juros)`.
- **Retorno total (%):** `(Σ(juros) / nominalValue) * 100`.
- **Cronograma de pagamentos:** achata todos os cupons de todos os ativos em carteira,
  ordenando por data, classificando cada evento como `JUROS` ou `AMORTIZACAO`.

---

## 7. Reuso de O2 (Decisão PI-009 v1.2)

O registro de uma operação de compra/venda de renda fixa **reutiliza** `RegistrarOperacaoCommand`

- `inferAssetType` (o legado já reconhece `fixed_income` em `asset-types.ts`). O comando
  `RegistrarCupomCommand` desta BR é responsável apenas por **registrar o título e seu cronograma**
  para acompanhamento de proventos, e **não** cria movimentação de carteira.

---

## 8. Não-escopo

- Cálculo de IRPF sobre renda fixa (em BR-07 / `src/core/domain/tax`).
- Integração com corretoras para importação automática de títulos (futuro, Slice 7+).
