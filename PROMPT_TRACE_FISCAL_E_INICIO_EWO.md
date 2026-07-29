# Prompt para o OpenCode — Rastreio de Impacto Fiscal (urgente) + Início da EWO

## Passo 1 — URGENTE: rastrear se o custo reduzido por dividendo já afeta IR hoje

Você descobriu que o legado (`consolidator.ts`) reduz `totalCost` por dividendos/JCP, e que isso **não é exigido por regra fiscal** (`docs/06_BUSINESS_RULES/08_IMPOSTOS.md`, linha 134 — custo de aquisição é fixo: valor pago + corretagens).

Isso precisa ser checado com prioridade, antes de qualquer outra coisa: **esse `totalCost`/`avgPrice` reduzido, do jeito que existe hoje no legado, é usado em algum lugar para calcular ganho de capital, preço médio de IR, ou qualquer número exibido/exportado para apuração de imposto de renda?**

Rastreie especificamente:

- `src/lib/tax/rules.ts` — de onde vêm os valores de custo/preço médio que ele usa?
- Qualquer tela ou export de IRPF (`irpf-content.tsx` e o que ele consome).
- Qualquer outro lugar que leia `Position.totalCost` ou `Position.avgPrice` do `consolidator.ts` para fins de tributação (não para exibição de "capital líquido investido" — isso é outra coisa, sem risco).

Reporte o resultado **imediatamente**, mesmo antes de terminar o Passo 2:

- Se **não** houver uso fiscal desse valor reduzido: ótimo, sem risco, prossiga para o Passo 2.
- Se **houver** uso fiscal: isso significa que números de IR já exibidos ao Rafael podem estar incorretos, independente da migração. Pare e reporte isso com destaque — não é algo para esperar a EWO resolver com calma.

Registre também, como item separado (bug existente, independente da decisão de design): `TaxLot` (`src/core/domain/tax/tax-lot.ts:35`) rejeita custo médio negativo com `throw`, mas `PortfolioProjector` permite `totalCost` negativo. Verifique se `TaxLot` já é usado em algum fluxo alcançável hoje — se sim, isso pode já estar quebrando algo.

## Passo 2 — Formalizar a EWO da migração (Fase 2)

Depois de reportar o Passo 1, inicie a EWO formal para a Fase 2 (seguindo o padrão de `EWO-002.md`), com as 4 slices que você propôs:

- Slice 1: Application Service de posições (projeta + aplica preços + expõe `PortfolioSummary`)
- Slice 2: History Calculator novo (combina projector + grade temporal + preços históricos)
- Slice 3: Migração dos 11 arquivos de frontend
- Slice 4: Remoção do módulo legado (se aplicável, avaliar ao final)

Adote a **Opção C** (separar `totalCost` fiscal puro de um campo `netInvested` ajustado por proventos) como base de design — já está decidido, não precisa reabrir essa discussão. Documente essa decisão na EWO, citando a fonte fiscal encontrada no Passo 1 do prompt anterior.

Neste passo, só crie o documento da EWO (planejamento). Não implemente nenhuma slice ainda — aguarde aprovação do Rafael sobre a EWO antes de codificar, conforme `00_START_HERE.md`.
