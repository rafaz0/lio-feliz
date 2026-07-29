# Prompt para o OpenCode — Fase 1: Análise de Equivalência (Legado x Novo Domínio)

## Aprovação

Aprovado seguir com a **Fase 1** do plano que você apresentou (análise de equivalência numérica). As Fases 2 e 3 continuam **não aprovadas** — não escreva nenhum Application Service nem toque nos 11 arquivos de rota/componente ainda. Ao final da Fase 1, apresente os resultados e aguarde nova aprovação, conforme `00_START_HERE.md`.

## Objetivo da Fase 1

Provar, com evidência concreta (não inspeção visual de código), se o motor novo (`core/domain/portfolio`, via `PortfolioProjector` / `PortfolioHistoryCalculator` / `PerformanceCalculator` / `AssetAllocationCalculator`) produz os **mesmos resultados numéricos** que o motor legado (`consolidator.ts` / `history.ts`) para os mesmos dados de entrada.

## Passo 0 — Cobertura de tipos de evento (fazer antes de qualquer teste)

Antes de comparar números, liste explicitamente:

- Quais dos 9 tipos de evento do domínio novo (compra, venda, dividendo, JCP, bonificação, desdobramento, grupamento, amortização, ajuste) o **legado** (`consolidator.ts`) efetivamente trata hoje.
- Quais tipos o legado ignora, trata de forma simplificada, ou nem reconhece.

Isso é crítico: se o legado for mais simples que o novo domínio, "equivalência perfeita" pode não existir para todos os casos — e isso precisa ficar visível **antes** de prosseguir, não descoberto no meio da Fase 2. Reporte essa lista mesmo que a resposta seja "o legado cobre tudo".

## Passo 1 — Verificação automatizada, não manual

Não compare as implementações lendo fórmula por fórmula. Monte um teste (script ou arquivo de teste em `vitest`) que:

1. Pegue um conjunto de operações (`Operation[]`) que cubra todos os tipos de evento identificados no Passo 0 — pode reaproveitar fixtures já existentes em `src/core/tests/portfolio/*.test.ts`, já que o domínio novo tem 362+ testes.
2. Rode o mesmo conjunto de dados pelos dois motores:
   - Legado: `consolidatePortfolio(...)` e `buildPortfolioHistory(...)`
   - Novo: `PortfolioProjector.project(...)` e `PortfolioHistoryCalculator.calculate(...)` (ou os métodos equivalentes)
3. Compare os resultados numéricos ponto a ponto: posição por ativo, preço médio, patrimônio total, histórico ao longo do tempo, rentabilidade.
4. Para qualquer divergência, registre: qual operação/evento causou a diferença, valor esperado (legado) vs valor obtido (novo), e uma hipótese do porquê.

Se possível, use dados reais da carteira do Rafael (via as server functions existentes) além de fixtures sintéticas — operações reais tendem a expor casos que fixtures não cobrem.

## Passo 2 — Mapeamento de tipos

Documente a correspondência entre:

- `Operation` (legado) → `FinancialEvent` (novo) — campos que não têm equivalente direto, se houver.
- `Position` (legado) → `Position` (domínio novo).
- `PortfolioSummary` (o que os 5 arquivos de rota esperam hoje) → os DTOs que o domínio novo produz.

Não precisa implementar conversores ainda — só documentar o mapeamento.

## Entregável da Fase 1

Um relatório (pode ser um arquivo `.md` novo em `architecture-lab/` ou anexo ao `ER-004.md`, o que fizer mais sentido para a documentação do projeto) contendo:

- Lista de tipos de evento cobertos/não cobertos pelo legado (Passo 0).
- Resultado da comparação numérica: bateu ou não bateu, com exemplos de divergência se houver.
- Mapeamento de tipos (Passo 2).
- Recomendação: a migração é segura como está planejada, ou precisa de ajuste de escopo?

Siga o formato de comunicação do `00_START_HERE.md` (Resumo, Arquivos Alterados — se algum teste novo foi criado —, Motivo, Impactos, Riscos, Próximos Passos). Nenhum código de produção deve ser alterado nesta fase — só testes/scripts de análise, se necessário para a comparação.
