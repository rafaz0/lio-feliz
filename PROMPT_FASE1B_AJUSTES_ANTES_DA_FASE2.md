# Prompt para o OpenCode — Ajustes antes da Fase 2 (Migração Portfolio)

## Contexto

O relatório da Fase 1 foi bom e revelou que a migração não é um "swap de import" — há gaps reais (fees, histórico, market value/PnL, tratamento de dividendo/JCP excedendo custo). Antes de aprovar a Fase 2 (Application Service), há três pontos a resolver.

## 1. Recriar e manter o teste de equivalência (não apagar)

O teste criado na Fase 1 (`src/core/tests/equivalence-legado-vs-novo.test.ts`) foi removido depois da análise. Para um projeto que exige zero regressão em cálculo financeiro, isso não deve se repetir: recrie o teste e **mantenha-o no repositório** como teste de regressão permanente (pode reorganizar o nome/local se fizer mais sentido, ex: `src/core/tests/portfolio/legacy-equivalence.test.ts`). Sem esse teste versionado, o resultado "142 casos, todos passando" não é verificável nem reproduzível por ninguém além de quem rodou uma vez.

## 2. Refazer a comparação numérica incluindo fees e IRRF

A conclusão da Fase 1 foi "equivalente quando fee=0". Isso não cobre o caso real — praticamente toda operação tem corretagem, e várias têm IRRF. Antes de considerar o núcleo de cálculo validado:

- Adicione ao teste de equivalência casos com `fee`, `irrf` e `other_costs` diferentes de zero (compra com corretagem, venda com IRRF de day-trade, etc.).
- Confirme se, incluindo esses valores no `totalCost` do `FinancialEvent` (conforme já identificado — Divergência 1), os resultados batem com o legado.
- Documente qualquer caso que não bata.

## 3. Investigar o tratamento correto de dividendo/JCP que excede o custo total

Isso é uma dúvida de regra de negócio/contábil, não uma escolha de implementação. Antes de decidir entre "travar em zero" (legado) ou "permitir negativo" (novo domínio):

- Pesquise como a prática contábil padrão e as regras da Receita Federal/B3 tratam o custo de aquisição de um ativo quando proventos recebidos (dividendo, JCP) superam o valor investido — especificamente para fins de cálculo de **preço médio** usado em apuração de imposto de renda sobre ganho de capital.
- Verifique se dividendo/JCP deveriam sequer reduzir o custo de aquisição da posição (tratamento comum é que proventos são renda separada, não abatimento de custo) — ou se esse comportamento do legado é uma regra de negócio específica do Lio Feliz com propósito próprio (ex: métrica de "capital líquido investido"). Se for isso, documente onde essa decisão de produto foi definida.
- Apresente as opções encontradas, com fontes, para o Rafael decidir. **Não implemente nenhuma das duas opções até ter essa aprovação explícita** — essa é uma regra sinalizada como zona de cuidado extra pelo próprio `00_START_HERE.md` (preço médio).

## Sobre o escopo da Fase 2

O relatório mostrou que a Fase 2 é maior do que "um adapter": além de mapear tipos, será necessário (a) resolver o histórico (`PortfolioHistory` não tem estrutura equivalente à atual — não é ponto semanal com preço de mercado) e (b) computar `totalValue`/`currentValue`/`PnL`, que hoje não existem em lugar nenhum do domínio novo. Antes de começar a codificar a Fase 2, proponha se isso deveria virar uma EWO formal própria (seguindo o padrão já usado em `EWO-002.md`), dado o tamanho do gap — é uma recomendação, decisão final é do Rafael.

## Não fazer ainda

Não implemente o Application Service da Fase 2 neste passo. Resolva os itens 1, 2 e 3 acima, reporte os resultados (formato Resumo/Arquivos Alterados/Motivo/Impactos/Riscos/Próximos Passos do `00_START_HERE.md`), e aguarde aprovação antes de prosseguir.
