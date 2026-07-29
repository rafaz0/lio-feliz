# Prompt para o OpenCode — Migração legado → domínio novo (portfolio)

## Contexto

Antes de qualquer coisa, siga o fluxo obrigatório definido em `docs/00_START_HERE.md`. Leia a documentação na ordem indicada lá. Este prompt não substitui esse processo — é apenas o ponto de partida da tarefa.

## Achado (já confirmado, não precisa reconfirmar)

O projeto tem dois caminhos de cálculo de carteira coexistindo:

- **Legado**, em `src/lib/portfolio/` (`models.ts`, `consolidator.ts`, `history.ts`, `asset-types.ts`) — funcional/procedural, marcado como "a ser substituído" em `architecture-lab/ER-004.md`.
- **Novo (DDD)**, em `src/core/domain/portfolio/` — Aggregate Root, hierarquia de `FinancialEvent`, `PortfolioProjector`, com cobertura completa de testes em `src/core/tests/portfolio/*.test.ts`, e já com camada de aplicação pronta (`src/application/services/*`, `src/application/handlers/*`).

Os seguintes 11 arquivos ainda importam do módulo **legado** e precisam migrar para o **novo**:

```
src/routes/_authenticated/carteira.index.tsx
src/routes/_authenticated/dashboard.tsx
src/routes/_authenticated/carteira.patrimonio.tsx
src/routes/_authenticated/carteira.rentabilidade.tsx
src/routes/_authenticated/carteira.analise.tsx
src/seed/demo-operations.ts
src/seed/demo-data.ts
src/lib/tax/rules.ts
src/components/add-operation-dialog.tsx
src/components/irpf-content.tsx (nome pode variar levemente — confirmar)
src/components/metas-content.tsx (nome pode variar levemente — confirmar)
```

Essa lista veio de um grep por `from ['"].*lib/portfolio`, não de leitura completa de cada arquivo — confirme a lista atual antes de migrar, pode ter mudado.

## O que NÃO foi verificado ainda (fazer isso primeiro)

Não mapeei função-por-função o que substitui cada chamada do módulo antigo (ex: `consolidatePortfolio`, `buildPortfolioHistory`). Antes de alterar qualquer arquivo:

1. Leia `architecture-lab/ER-004.md`, seção 4.2 (mapeamento legado → novo) e `architecture-lab/EWO-002.md`.
2. Para cada um dos 11 arquivos, identifique exatamente qual serviço/query da camada de aplicação (`src/application/services/*`, `src/application/ports/*`) ou do domínio novo substitui a chamada legada.
3. Verifique se já existe um serviço pronto para expor esses dados para a UI (ex: algo como "ObterPatrimonio"), ou se será necessário criar um adaptador fino na camada de aplicação — sem duplicar lógica de domínio.

## Regras obrigatórias (do próprio projeto)

- Nunca duplicar lógica de cálculo financeiro.
- Preservar os resultados numéricos — patrimônio, rentabilidade, preço médio, dividendos, JCP, bonificações, desdobramentos, grupamentos não podem mudar de valor por causa da migração.
- Rodar `bun run build`, `bun run lint` e `bun test` antes de considerar qualquer arquivo migrado como concluído.
- Não deixar o módulo antigo (`src/lib/portfolio/`) órfão pela metade — se ao final da tarefa nenhum arquivo mais o importar, avaliar removê-lo (mas isso é uma decisão para relatar e não presumir).
- Antes de tocar em código, apresente um plano (quais arquivos, em que ordem, o que muda em cada um) e aguarde aprovação do Rafael, conforme `00_START_HERE.md`.

## Formato de relatório ao final

Seguir exatamente a seção "Comunicação com o Usuário" de `docs/00_START_HERE.md`: Resumo, Arquivos Alterados, Motivo, Impactos, Riscos, Próximos Passos. Nunca responder apenas "Pronto" ou "Concluído".
