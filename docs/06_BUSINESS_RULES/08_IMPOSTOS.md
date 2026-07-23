# Lio Feliz — Documentação Oficial

# 06_BUSINESS_RULES/08_IMPOSTOS.md

**Projeto:** Lio Feliz

**Documento:** 08_IMPOSTOS.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 20/07/2026

---

# Objetivo

Este documento define todas as regras relacionadas ao módulo de Impostos do Lio Feliz.

O módulo de Impostos é responsável por:

- apurar o Imposto de Renda sobre operações de renda variável (day-trade e swing-trade);
- consolidar proventos (dividendos e JCP) recebidos no ano-calendário;
- gerenciar lotes fiscais para controle de custo médio e prejuízo compensar;
- gerar relatórios para declaração de ajuste anual (DIRPF);
- exportar declarações em formato CSV/PDF para entrega ao contador.

---

# Escopo

Este documento cobre:

- apuração mensal de IR sobre operações de compra e venda;
- classificação de operações como day-trade ou swing-trade;
- cálculo de alíquotas conforme tipo de ativo e modalidade;
- compensação de prejuízos fiscais entre operações do mesmo tipo;
- isenções legais (vendas até R$ 20.000 no mês para ações);
- consolidação anual para declaração de ajuste;
- exportação de relatórios fiscais.

Este documento NÃO cobre:

- regras de declaração de bens e direitos (fora do escopo do sistema);
- cálculo de IR sobre renda fixa (módulo 09);
- cálculo de IR sobre investimentos internacionais (módulo 10);
- obrigações acessórias como DARF (o sistema apura, mas não emite);
- regras de Carnê-Leão para rendimentos de pessoa física.

---

# Conceitos

**Swing-Trade:** Operação de compra e venda realizada em dias diferentes. Alíquota padrão de 15% sobre o ganho líquido.

**Day-Trade:** Operação de compra e venda do mesmo ativo no mesmo dia. Alíquota de 20% sobre o ganho líquido.

**Ganho Líquido:** Diferença entre o valor de venda e o custo médio de aquisição, descontando custos operacionais.

**Prejuízo Compensar:** Saldo negativo de operações que pode ser abatido de lucros futuros no mesmo tipo de operação.

**Custo Médio Ponderado:** Método de apuração do custo de aquisição que pondera preço e quantidade das compras realizadas.

**Lote Fiscal:** Conjunto de ativos com mesma data de aquisição e custo médio, utilizado para controle fiscal.

**Isenção Legal:** Vendas de ações no mercado à vista de até R$ 20.000,00 no mês são isentas de IR para pessoa física.

**Alíquota:** Percentual aplicado sobre a base de cálculo para determinar o imposto devido.

**Provento Tributável:** Rendimentos como Juros sobre Capital Próprio (JCP) que sofrem tributação na fonte.

**Provento Isento:** Rendimentos como dividendos que são isentos de IR para pessoa física.

---

# Entradas

O módulo de Impostos recebe as seguintes informações:

- **Operações:** compras, vendas, dividendos, JCP, bonificações registradas pelo usuário.
- **Ticker do Ativo:** identificador do ativo negociado.
- **Tipo do Ativo:** classificação para aplicação da alíquota correta.
- **Ano-Calendário:** período de apuração dos impostos.
- **Parâmetros Fiscais:** alíquotas vigentes, faixas de isenção, regras de compensação.

---

# Processamento

## Apuração Mensal de IR

O sistema deve processar as operações de cada mês de forma independente:

1. Agrupar operações por mês e por ticker.
2. Para cada ticker, calcular o ganho líquido:
   - Calcular o custo médio ponderado das compras até a data da venda.
   - Calcular o ganho: `(preçoVenda - custoMédio) × quantidadeVendida`.
3. Classificar cada venda como day-trade ou swing-trade.
4. Aplicar a alíquota correspondente:
   - Day-trade: 20% (todos os ativos).
   - Swing-trade ações/BDR/ETF: 15% (com isenção até R$ 20.000/mês).
   - Swing-trade FII: 20% (sem isenção).
   - Swing-trade cripto: 15% (isenção até R$ 35.000/mês para vendas).
5. Acumular ganhos e perdas do mesmo tipo (day-trade ou swing-trade) para compensação.
6. Calcular o imposto devido: `imposto = ganhoLíquidoAcumulado × alíquota - prejuízoCompensar`.

## Compensação de Prejuízos

Prejuízos fiscais devem ser compensados automaticamente:

1. Prejuízos em operações de day-trade compensam lucros futuros em day-trade.
2. Prejuízos em operações de swing-trade compensam lucros futuros em swing-trade.
3. A compensação não expira (prejuízos podem ser carregados indefinidamente).
4. O sistema deve manter o saldo de prejuízo acumulado por tipo de operação.
5. Ao calcular o imposto de um mês, o sistema deve primeiro abater o prejuízo acumulado.

Alíquotas vigentes por tipo de ativo:

| Tipo              | Swing-Trade | Day-Trade | Isenção Mensal |
| ----------------- | ----------- | --------- | -------------- |
| Ação              | 15%         | 20%       | R$ 20.000      |
| FII               | 20%         | 20%       | —              |
| BDR               | 15%         | 20%       | R$ 20.000      |
| ETF               | 15%         | 20%       | R$ 20.000      |
| ETF Internacional | 15%         | 20%       | R$ 20.000      |
| Stock EUA         | 15%         | 20%       | R$ 20.000      |
| REIT EUA          | 15%         | 20%       | R$ 20.000      |
| Cripto            | 15%         | 20%       | R$ 35.000      |
| Renda Fixa        | 15%         | 20%       | —              |

## Cálculo de Custos

O custo de aquisição deve incluir:

- Preço unitário pago pelo ativo.
- Custos operacionais (taxas de corretagem, emolumentos, ISS) proporcionais.

O custo de venda pode ser descontado para apuração do ganho líquido.

## Consolidação Anual

Ao final do ano-calendário, o sistema deve consolidar:

- Total de operações realizadas (compras e vendas).
- Ganho líquido total por tipo de operação.
- Imposto devido por mês.
- Imposto já pago (se informado pelo usuário).
- Saldo de prejuízo a compensar.
- Posição em 31 de dezembro (para declaração de bens).
- Total de dividendos recebidos (isentos).
- Total de JCP recebidos (com IR retido na fonte).

## Exportação

O sistema deve permitir exportar:

- Relatório completo em CSV com todas as operações do ano.
- Relatório de imposto mensal consolidado.
- Posição em 31 de dezembro.

---

# Saídas

O módulo de Impostos produz as seguintes informações:

- **Resumo Fiscal:** cards com Dividendos, JCP, Ganho de Capital, Prejuízo Compensar.
- **Tabela de Operações:** detalhamento por mês com tipo, ticker, compra, venda, ganho, imposto.
- **Relatório Anual:** consolidação de todo o ano-calendário.
- **Detalhamento por Ativo:** posição fiscal individual com custo médio e lotes.
- **Arquivo CSV:** exportação dos dados para uso externo.

---

# Integração com Outros Módulos

**Carteira:** Fornece operações de compra e venda para apuração fiscal.

**Proventos:** Fornece dividendos e JCP recebidos no ano.

**Yahoo/BRAPI:** Cotações para valorização da posição em 31/12.

**Relatórios:** Gera relatórios fiscais consolidados para exportação.

---

# Casos Especiais

**Venda sem compra anterior (herança/doação):** O sistema deve permitir registrar o custo médio informado pelo usuário.

**Desdobramento/Bonificação:** O custo médio deve ser ajustado proporcionalmente ao novo número de cotas.

**Grupamento:** O custo médio deve ser ajustado proporcionalmente ao novo número de cotas.

**Fusão/Cisão:** O usuário deve informar o novo ticker e o custo médio correspondente.

**Ativo sem movimentação no ano:** Apenas a posição em 31/12 é relevante para declaração de bens.

**Venda com prejuízo em mês lucrativo:** O prejuízo reduz o ganho do mês e o imposto devido.

**Múltiplas compras no mesmo dia:** O custo médio deve considerar todas as compras do dia como uma única operação.

---

# Regras Obrigatórias

1. O cálculo de IR deve seguir as alíquotas da legislação brasileira vigente.
2. Day-trade e swing-trade devem ser calculados separadamente.
3. Prejuízos de day-trade compensam apenas lucros de day-trade.
4. Prejuízos de swing-trade compensam apenas lucros de swing-trade.
5. A isenção de R$ 20.000/mês se aplica apenas a vendas de ações no mercado à vista.
6. Dividendos são isentos de IR para pessoa física (apenas declaratórios).
7. JCP tem IR retido na fonte (o sistema deve exibir o valor retido).
8. Operações com FII têm alíquota de 20% sem isenção.
9. O prejuízo acumulado não expira.
10. A posição em 31 de dezembro deve refletir o saldo do último dia útil do ano.

---

# Regras Proibidas

1. Nunca compensar prejuízo de day-trade com lucro de swing-trade (ou vice-versa).
2. Nunca aplicar isenção de R$ 20.000 para FII ou cripto.
3. Nunca permitir que o imposto devido seja negativo (mínimo zero).
4. Nunca descartar prejuízo acumulado ao final do ano.
5. Nunca alterar o custo médio de lotes vendidos anteriormente.
6. Nunca tributar dividendos como renda tributável para pessoa física.

---

# Preparação para Crescimento

O módulo de Impostos deve permitir futuras expansões sem reescrita:

- **Novos Tipos de Ativo:** novas categorias com alíquotas específicas devem ser adicionáveis via configuração.
- **Regras por Jurisdição:** preparar para cenários de dupla tributação (Brasil-EUA, Brasil-Portugal).
- **Integração com DARF:** preparar para cálculo automático de DARF com código de receita correto.
- **Carnê-Leão:** preparar para recolhimento mensal obrigatório para rendimentos do exterior.
- **Múltiplas Corretoras:** preparar para consolidação de operações de diferentes fontes.

---

# Histórico

## Versão 1.0

- Criação do documento de Regra de Negócio do módulo de Impostos.
- Definição de conceitos, alíquotas, apuração mensal e anual.
- Definição de compensação de prejuízos, isenções e casos especiais.
