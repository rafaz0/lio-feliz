# Lio Feliz — Documentação Oficial

# 07_TECHNICAL_ANNEXES/04_IMPOSTO_CALCULOS.md

**Projeto:** Lio Feliz

**Documento:** 04_IMPOSTO_CALCULOS.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 20/07/2026

---

# 1. Objetivo

Este anexo técnico detalha as fórmulas e algoritmos utilizados pelo módulo de Impostos do Lio Feliz.

Todo cálculo aqui especificado é implementado pelo `TaxCalculationService` no domínio (`src/core/domain/tax/tax-calculation-service.ts`).

---

# 2. Cálculo de Custo Médio Ponderado

O custo médio ponderado (WAC — Weighted Average Cost) é o método utilizado para apurar o custo de cada ativo.

## Fórmula

```
custoMédioNovo = (custoMédioAnterior × quantidadeAnterior + preçoCompra × quantidadeCompra)
                 / (quantidadeAnterior + quantidadeCompra)
```

## Regras

1. Apenas operações de **compra** alteram o custo médio.
2. Operações de **venda** reduzem a quantidade mas NÃO alteram o custo médio.
3. O custo médio é calculado por ticker independentemente da corretora.
4. Arredondamento: 2 casas decimais.

## Exemplo

```
Compra 100 PETR4 a R$ 25,00 → custo médio = R$ 25,00 | qtd = 100
Compra 50  PETR4 a R$ 30,00 → custo médio = R$ 26,67 | qtd = 150
Venda  30  PETR4 a R$ 28,00 → custo médio = R$ 26,67 | qtd = 120
```

---

# 3. Cálculo de Ganho de Capital

## Swing-Trade

Ganho líquido por operação de venda:

```
ganho = (preçoVenda - custoMédio) × quantidadeVendida
```

Onde:

- `preçoVenda` = preço unitário da venda
- `custoMédio` = custo médio ponderado na data da venda
- `quantidadeVendida` = número de ativos vendidos

## Day-Trade

Ganho líquido por operação de day-trade (compra e venda no mesmo dia):

```
ganhoDayTrade = ∑(preçoVenda × quantidadeVendida) - ∑(preçoCompra × quantidadeComprada)
```

Para cada par compra-venda no mesmo dia:

```
ganho = receitaTotalVendas - custoTotalCompras
```

## Corporate Actions

### Desdobramento (Split)

```
quantidadeAjustada = quantidadeAnterior × fatorSplit
custoMédioAjustado = custoMédioAnterior / fatorSplit
```

### Bonificação

```
quantidadeAjustada = quantidadeAnterior + quantidadeBônus
custoMédioAjustado = custoMédioAnterior × quantidadeAnterior / quantidadeAjustada
```

### Grupamento

```
quantidadeAjustada = quantidadeAnterior / fatorGrupamento
custoMédioAjustado = custoMédioAnterior × fatorGrupamento
```

---

# 4. Cálculo de Imposto Devido

## Apuração Mensal

```
impostoDevidoMensal = max(0, (ganhoLíquidoTipo - prejuízoAcumuladoTipo) × alíquotaTipo)
```

Onde:

- `ganhoLíquidoTipo` = soma dos ganhos líquidos do mês para o tipo (day-trade ou swing-trade)
- `prejuízoAcumuladoTipo` = saldo de prejuízo acumulado para o tipo (de meses anteriores)
- `alíquotaTipo` = conforme tabela da Seção 6

Se `ganhoLíquidoTipo <= prejuízoAcumuladoTipo`:

```
impostoDevidoMensal = 0
prejuízoAcumuladoTipo = prejuízoAcumuladoTipo - |ganhoLíquidoTipo|
```

## Isenção — Vendas de Ações (R$ 20.000/mês)

```
se tipo == "stock" && totalVendasMês <= 20.000:
    impostoDevido = 0
```

A isenção se aplica APENAS a:

- Ações à vista negociadas em bolsa brasileira (B3)
- Vendas totais no mercado à vista no mês ≤ R$ 20.000,00

NÃO se aplica a:

- FIIs (alíquota 20% independente do valor)
- Day-trade (sempre tributado)
- ETFs (alíquota 15% independente do valor)

## Alíquotas

| Tipo Ativo        | Alíquota Swing-Trade | Alíquota Day-Trade | Isenção       |
| ----------------- | -------------------- | ------------------ | ------------- |
| stock             | 15%                  | 20%                | R$ 20.000/mês |
| fii               | 20%                  | 20%                | —             |
| bdr               | 15%                  | 20%                | R$ 20.000/mês |
| etf               | 15%                  | 20%                | —             |
| etf_internacional | 15%                  | 20%                | —             |
| stock_us          | 15%                  | 20%                | R$ 20.000/mês |
| reit              | 15%                  | 20%                | —             |
| fixed_income      | 15%                  | 20%                | —             |
| crypto            | 15%                  | 20%                | R$ 35.000/mês |

---

# 5. Compensação de Prejuízos

## Algoritmo

```
prejuízoCompensarTipo = saldoAcumuladoTipo

# Ao processar um mês com ganho líquido positivo:
se ganhoLíquidoMêsTipo > 0:
    impostoBase = max(0, ganhoLíquidoMêsTipo - prejuízoCompensarTipo)
    impostosDevido = impostoBase × alíquota
    prejuízoCompensarTipo = max(0, prejuízoCompensarTipo - ganhoLíquidoMêsTipo)

# Ao processar um mês com ganho líquido negativo:
se ganhoLíquidoMêsTipo <= 0:
    prejuízoCompensarTipo += |ganhoLíquidoMêsTipo|
    impostosDevido = 0
```

## Regras

- Day-trade e swing-trade têm acumuladores separados.
- O prejuízo acumulado não expira (válido indefinidamente).
- Ao final de cada ano, o saldo remanescente é transportado para o ano seguinte.

---

# 6. Exemplo Completo

## Cenário: Investidor com operações em jan/2026

### Operações realizadas:

| Data  | Ticker | Tipo  | Operação | Quantidade | Preço    |
| ----- | ------ | ----- | -------- | ---------- | -------- |
| 05/01 | PETR4  | stock | Compra   | 200        | R$ 28,00 |
| 10/01 | PETR4  | stock | Venda    | 100        | R$ 32,00 |
| 15/01 | BBDC4  | stock | Compra   | 100        | R$ 18,00 |
| 20/01 | BBDC4  | stock | Venda    | 50         | R$ 16,00 |
| 25/01 | BBDC4  | stock | Compra   | 50         | R$ 17,00 |

### Cálculo passo a passo:

**1. Custo médio PETR4:**

```
Compra 200 x R$ 28,00 = R$ 5.600,00 → custo médio = R$ 28,00 | qtd = 200
```

**2. Venda PETR4 (swing-trade, dia 10):**

```
Ganho = (32,00 - 28,00) × 100 = R$ 400,00
Total vendas PETR4 no mês = R$ 3.200,00 (≤ R$ 20.000 → isento)
```

**3. Custo médio BBDC4:**

```
Compra 100 x R$ 18,00 = R$ 1.800,00 → custo médio = R$ 18,00 | qtd = 100
```

**4. Venda BBDC4 (swing-trade, dia 20):**

```
Ganho = (16,00 - 18,00) × 50 = -R$ 100,00 (prejuízo)
```

**5. Compra BBDC4 (dia 25):**

```
Quantidade = 50 + 50 = 100
Custo médio = (18,00 × 50 + 17,00 × 50) / 100 = R$ 17,50
```

**6. Resumo do mês:**

```
Ganho líquido swing-trade: R$ 400,00 - R$ 100,00 = R$ 300,00
Total vendas: R$ 3.200,00 + R$ 800,00 = R$ 4.000,00
Isenção: vendas ≤ R$ 20.000 → imposto = 0
Prejuízo compensar: -R$ 100,00 (transportado para meses seguintes)
```

---

# 7. Fórmulas de Consolidação Anual

## Posição em 31 de Dezembro

```
posição31Dez[ticker] = {
    quantidade: qtdFinal,
    custoMédio: custoMédioFinal,
    valorTotal: qtdFinal × cotação31Dez
}
```

## Total de Proventos

```
totalDividendos = ∑dividendosDoAno(isento = true)
totalJCP = ∑jcpDoAno
totalIRRetidoFonte = ∑jcpDoAno × 0.15
```

## Ganho de Capital Anual

```
ganhoCapitalAnual = ∑ganhosMensaisSwing + ∑ganhosMensaisDayTrade
totalImpostoDevido = ∑impostoDevidoMensal
```

## Prejuízo a Compensar (Final do Ano)

```
prejuízoFinalSwing = prejuízoAcumuladoSwing (não expira)
prejuízoFinalDayTrade = prejuízoAcumuladoDayTrade (não expira)
```

---

# 8. Tratamento de Corporate Actions

## Desdobramento (Split)

```
fator = novaQuantidade / quantidadeAntiga
qtdAjustada = qtdAtual × fator
custoMédioAjustado = custoMédio / fator
```

Nenhum ganho de capital é realizado.

## Bonificação

```
qtdBônus = qtdAtual × razãoBônus
qtdAjustada = qtdAtual + qtdBônus
custoMédioAjustado = custoMédio × qtdAtual / qtdAjustada
```

## Grupamento

```
fator = quantidadeAntiga / novaQuantidade
qtdAjustada = qtdAtual / fator
custoMédioAjustado = custoMédio × fator
```

## Subscrição

```
# O investidor exerce direito de compra a um preço preferencial
qtdAjustada = qtdAtual + qtdSubscrita
custoMédioAjustado = (custoMédio × qtdAtual + preçoSubscrição × qtdSubscrita) / qtdAjustada
```

---

# Histórico

## Versão 1.0

- Criação do anexo técnico de cálculos fiscais.
- Definição de fórmulas de custo médio, ganho de capital, IR, compensação.
- Exemplo completo de apuração mensal.
- Corporate actions: split, bonificação, grupamento, subscrição.
