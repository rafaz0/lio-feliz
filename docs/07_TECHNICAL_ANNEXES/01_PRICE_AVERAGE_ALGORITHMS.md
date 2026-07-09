# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/01_PRICE_AVERAGE_ALGORITHMS.md

**Projeto:** Lio Feliz

**Documento:** 01_PRICE_AVERAGE_ALGORITHMS.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define o algoritmo oficial de cálculo do preço médio utilizado pelo Lio Feliz.

Toda implementação deverá produzir exatamente os mesmos resultados descritos neste documento.

---

# Escopo

Este algoritmo é utilizado para:

- consolidação da carteira;
- cálculo do patrimônio;
- cálculo da rentabilidade;
- cálculo do custo investido;
- cálculo do Imposto de Renda;
- cálculo do rebalanceamento.

---

# Definições

## Quantidade

Número atual de unidades do ativo.

---

## Custo Total

Valor efetivamente investido na posição.

Inclui apenas operações que alteram o custo de aquisição.

---

## Preço Médio

Preço Médio = Custo Total / Quantidade Atual

Sempre que Quantidade = 0:

Preço Médio = 0

---

# Princípios

O algoritmo deve ser:

- determinístico;
- reproduzível;
- auditável;
- independente da interface;
- independente do banco de dados.

---

# Operações que ALTERAM o preço médio

## Compra

Aumenta:

- quantidade;
- custo total.

Novo cálculo:

Quantidade Nova =
Quantidade Atual + Quantidade Comprada

Custo Novo =
Custo Atual + Valor da Compra

Preço Médio =
Custo Novo / Quantidade Nova

---

## Venda

A venda NÃO recalcula o preço médio.

Ela apenas reduz:

- quantidade;
- custo total proporcional.

Exemplo:

100 ações

Preço médio:

R$ 20,00

Venda:

20 ações

Quantidade:

80

Preço médio continua:

R$ 20,00

---

## Encerramento da posição

Quando:

Quantidade = 0

O sistema deverá:

zerar

- quantidade;
- custo;
- preço médio.

O histórico deverá permanecer preservado.

---

# Operações que NÃO alteram o preço médio

Dividendos

JCP

Rendimentos

Amortizações em dinheiro

Esses eventos representam entrada de recursos.

Não alteram custo de aquisição.

---

# Eventos Corporativos

## Bonificação

Aumenta quantidade.

Não altera custo total.

Consequentemente reduz o preço médio.

---

Exemplo

100 ações

Preço médio:

R$ 10

Bonificação:

10%

Nova quantidade:

110

Novo custo:

R$ 1.000

Novo preço médio:

R$ 9,090909...

---

## Desdobramento

Mesmo princípio da bonificação.

Quantidade aumenta.

Custo permanece.

Preço médio diminui proporcionalmente.

---

## Grupamento

Quantidade diminui.

Custo permanece.

Preço médio aumenta proporcionalmente.

---

## Subscrição

Será tratada como uma nova compra.

Segue exatamente o algoritmo de compra.

---

## Incorporação

A regra dependerá do fator de conversão.

Será especificada no anexo:

05_CORPORATE_ACTION_EXAMPLES.md

---

## Cisão

Segue regras específicas.

Não altera este algoritmo.

---

# Ativos Internacionais

O cálculo do preço médio ocorre sempre na moeda original do ativo.

Conversões cambiais nunca modificam o preço médio.

A conversão ocorre apenas para apresentação dos valores consolidados.

---

# Moedas

Cada posição deverá possuir:

- moeda original;
- custo original;
- preço médio original.

Valores convertidos deverão ser calculados separadamente.

---

# Precisão

Internamente os cálculos deverão utilizar alta precisão.

Arredondamentos deverão ocorrer apenas na apresentação ao usuário.

---

# Pseudocódigo

```text
Para cada operação:

se Compra:

quantidade += quantidadeCompra

custo += valorCompra

precoMedio = custo / quantidade

----------------------------

se Venda:

custo -= precoMedio * quantidadeVendida

quantidade -= quantidadeVendida

----------------------------

se Bonificação:

quantidade += quantidadeBonificada

precoMedio = custo / quantidade

----------------------------

se Desdobramento:

quantidade *= fator

precoMedio = custo / quantidade

----------------------------

se Grupamento:

quantidade /= fator

precoMedio = custo / quantidade
```

---

# Casos Especiais

## Venda superior à posição

Nunca permitida.

Deverá gerar erro.

---

## Quantidade negativa

Nunca permitida.

---

## Custo negativo

Nunca permitido.

---

## Preço médio negativo

Nunca permitido.

---

# Casos de Teste

Caso 1

Compra

100

R$10

Resultado

Quantidade:

100

Preço médio:

10

---

Compra

100

R$20

Resultado

Quantidade:

200

Preço médio:

15

---

Venda

50

Resultado

Quantidade:

150

Preço médio:

15

---

Bonificação

10%

Resultado

Quantidade:

165

Preço médio:

13,636363...

---

Desdobramento

2:1

Quantidade:

330

Preço médio:

6,818181...

---

Grupamento

10:1

Quantidade:

33

Preço médio:

68,181818...

---

# Decisões de Projeto

## Por que vendas não recalculam o preço médio?

Porque o custo da posição remanescente permanece proporcional ao custo original das ações ainda mantidas.

Essa metodologia segue a prática adotada na tributação brasileira.

---

## Por que dividendos não reduzem o preço médio?

Porque representam rendimento financeiro, e não redução do custo de aquisição.

---

## Por que utilizar a moeda original?

Porque evita distorções causadas pela variação cambial.

O câmbio influencia apenas a consolidação patrimonial.

---

# Impacto em Outros Módulos

Este algoritmo é utilizado por:

- Carteira
- Rebalanceamento
- Patrimônio
- Rentabilidade
- Relatórios
- Imposto de Renda

Qualquer alteração neste documento poderá impactar diretamente todos esses módulos.

---

# Histórico

## Versão 1.0

Criação do algoritmo oficial de cálculo do preço médio.
