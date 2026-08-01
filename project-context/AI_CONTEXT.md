# AI Context — Lio Feliz

**Documento:** AI_CONTEXT.md

**Versão:** 2.06

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 01/08/2026 (v2.06)

> **Continuidade entre chats:** A continuidade entre sessões depende do `PROJECT_BOOTSTRAP.md`, que contém o Resumo Operacional Canônico. Ver "Objetivo Atual" abaixo para o estado real mais recente — o rastro formal PI → ER → EWO tem lacunas conhecidas entre PI-014 e PI-018 (ver nota abaixo).

---

**Aviso:** Este documento contém apenas identidade, estado operacional, objetivo atual e referências obrigatórias. Consulte `PROJECT_BOOTSTRAP.md` para o Runtime Operacional completo (regras, templates, rituais, fluxos). O Runtime é autossuficiente — não é necessário consultar `DEVELOPMENT_METHODOLOGY.md` para executar operações.

**⚠️ Lacuna de governança conhecida (não tentar reconstruir retroativamente — decisão já tomada pelo Rafael):** Em algum ponto entre a PI-013 e a PI-018, o OpenCode parou de criar os documentos de ER (Engineering Review) mesmo continuando a seguir as diretrizes e implementar via EWO. Resultado: existem EWOs marcadas `CONCLUÍDO` (ex: EWO-021) cuja PI pai ainda está em `DRAFT` (ex: PI-014), porque a aprovação formal nunca foi registrada — mas a implementação em si aconteceu. **Trate o status de cada `architecture-lab/EWO-0XX.md` e a presença real do código como fonte de verdade sobre "o que foi feito"; não confie apenas no status da PI/ER para isso.**

---

# Identidade

Projeto Lio Feliz — Dashboard de Investimentos. Stack: TanStack Start, Tailwind CSS, shadcn/ui, Supabase, Vercel.

# Estado Operacional

Manter durante toda a sessão: Projeto ativo, Objetivo atual, Modo, PS vigente, DEC ativas, Baseline válida, Protocolos ativos.

# Objetivo Atual

**Estado real verificado em 31/07/2026** (reconciliado direto com o código, não só com os documentos de planejamento):

- **EWO-013 (Presentation Layer — Backtests 14, Alertas 15) — 🟢 CONCLUÍDA hoje.** Os componentes já existiam prontos (`src/presentation/features/backtests`, `.../alerts`) mas não estavam plugados em nenhuma rota. Criadas `/backtests` e `/alertas` (`_authenticated`), adicionadas ao menu mobile e desktop. Verificado rodando a app — ambas renderizam corretamente (gate de plano Free/Basic funcionando).
- **EWO-014 (CI/CD, testes E2E, observabilidade) — já implementada no código**, mas nunca teve o fechamento formal registrado. Confirmado: `.github/workflows/ci-cd.yml`, `e2e/*.spec.ts` (Playwright), `src/lib/observability/` (Sentry) todos presentes. Falta apenas: alguém revisar e marcar como `CONCLUÍDO`/criar o Engineering Closure, se fizer sentido formalizar.
- **EWO-003 (migração do portfólio legado para o novo domínio) — 🟢 CONCLUÍDA hoje (01/08/2026).** As 4 slices foram executadas via `PROMPT_EWO003_EXECUCAO.md`: Slice 1 `ConsultarCarteiraService` (ex-`consolidatePortfolio`), Slice 2 `ObterEvolucaoCarteiraService` (ex-`buildPortfolioHistory`), Slice 3 migração dos arquivos de frontend para os services + tipos movidos para `src/shared/types/portfolio.ts`, Slice 4 avaliou a remoção do módulo legado. **Decisão da Slice 4:** o módulo legado `src/lib/portfolio/` NÃO foi removido — o barrel `@/lib/portfolio` permanece redirecionando tipos para shared e `inferAssetType` para `src/lib/asset-types.ts`, porque `operations.functions.ts`/`data-functions.ts` (fora de escopo) ainda o importam e o `legacy-equivalence.test.ts` (oráculo permanente) depende das funções de cálculo. **Desvio documentado:** os services foram nomeados `ConsultarCarteiraService`/`ObterEvolucaoCarteiraService` porque `consultar-posicao-service.ts` e `obter-historico-patrimonial-service.ts` já existiam (PI-005, interface diferente baseada em `IProjectionRepository`). Baseline de testes: 1171 passed (era 1156), 15 testes de integração novos, zero regressão numérica.
- **PI-017, PI-018, PI-019 — DRAFT, sem nenhuma EWO criada.** Essas são genuinamente as únicas frentes "não iniciadas" (diferente de EWO-013/014/021, que tinham código pronto sem status formal).
- Entre 27/07 e 31/07 houve uma sequência de correções táticas de produção não ligadas a nenhuma PI/EWO formal: performance da aba "Meu Plano" (causa raiz: `ObterPlanoAtivoService` retornando `NotFoundError`), integração Bolsai como fonte principal de indicadores, congelamento dos módulos Finance/Notícias no menu, correções de UI mobile, remoção do modo demo do login. Ver `git log` para o histórico completo — não há PROMPT_*.md correspondente pra essas (foram direto, sem handoff formal pro OpenCode).
- **01/08/2026 — correção tática de risco de negócio (não ligada a PI/EWO formal):** o gateway de pagamento é mock (aprova qualquer assinatura sem cobrar) e, desde a EWO-013, as rotas Pro (`/alertas`, `/backtests`) estão ao vivo — ou seja, qualquer visitante podia virar "Pro" de graça clicando em assinar. Mitigação rápida aplicada: botão "Assinar" desabilitado pra planos pagos em `CheckoutForm.tsx` (mostra "Em breve" em vez de processar), removido o bloco de "dados de pagamento simulado" que não fazia mais sentido sem fluxo de pagamento ativo. **Isso é só mitigação de frontend** — o endpoint/mutation de checkout ainda aceitaria a chamada se acionado diretamente (ex: via API), não é uma correção de backend. Resolver de verdade exige implementar o gateway real (Asaas, decisão já registrada) ou bloquear no backend também. Testes (`vitest run checkout`, 15 passando) e build verdes.

**Próximo passo em aberto:** (b) definir a próxima frente a partir de PI-017/018/019 (a EWO-003 foi concluída), ou (c) resolver o pagamento real antes de qualquer divulgação pública mais ampla do produto (ver correção tática de 01/08/2026 acima — mitigação é só parcial).

# Referências Obrigatórias

| Documento                    | Propósito                                                |
| ---------------------------- | -------------------------------------------------------- |
| `PROJECT_BOOTSTRAP.md`       | Runtime Operacional (regras, templates, rituais, fluxos) |
| `DEVELOPMENT_METHODOLOGY.md` | Metodologia oficial — fonte de verdade dos protocolos    |
| `AI_OPERATION_CHECKLIST.md`  | Checklist executável obrigatório                         |
| `DOCUMENTACAO_COMPLETA.md`   | Consolidação completa para consulta                      |
| `09_STRATEGIC_BACKLOG.md`    | Repositório de melhorias estratégicas                    |
| `PS_TEMPLATE.md`             | Template oficial de Pacotes de Sincronização             |

---

# Histórico

### Versão 2.06

**EWO-003 CONCLUÍDA (01/08/2026).** Migração do portfólio legado (`src/lib/portfolio/`) para o novo domínio executada via `PROMPT_EWO003_EXECUCAO.md`. Slices 1-4 implementadas: `ConsultarCarteiraService` (posições, substitui `consolidatePortfolio`), `ObterEvolucaoCarteiraService` (histórico semanal, substitui `buildPortfolioHistory`), mapper `Operation → FinancialEvent` em `src/application/mappers/`, tipos movidos para `src/shared/types/portfolio.ts`, `inferAssetType` movido para `src/lib/asset-types.ts`. 11 arquivos de frontend migrados (zero imports diretos de `@/lib/portfolio`). Slice 4: módulo legado mantido (barrel redireciona tipos; funções de cálculo preservadas como oráculo do `legacy-equivalence.test.ts`; `operations.functions.ts`/`data-functions.ts` fora de escopo dependem do barrel). Desvio documentado: nomes dos services distintos dos propostos na EWO-003 por conflito com services existentes da PI-005. Baseline de testes: 1156 → 1171 passed (15 testes de integração novos), build e lint verdes, 0 erros TS novos.

### Versão 2.05

**Mitigação de risco de plano Pro gratuito (01/08/2026).** Botão "Assinar" desabilitado no `CheckoutForm.tsx` pra planos pagos (gateway de pagamento continua mock, e desde a EWO-013 as rotas Pro estão ao vivo — risco real de qualquer visitante virar Pro sem pagar). Mitigação de frontend apenas, não resolve o backend. Preparado `PROMPT_EWO003_EXECUCAO.md` (self-sufficient, cabeçalho DeepSeek V4 Flash) pra execução da EWO-003 via OpenCode — substitui o `PROMPT_MIGRACAO_PORTFOLIO.md` antigo, que estava desatualizado desde que a EWO-003 foi criada com o mapeamento completo.

### Versão 2.04

**Reconciliação de documentação (31/07/2026).** "Objetivo Atual" estava desatualizado e continha uma contradição interna (nota de continuidade citava PI-014/ER-014, seção abaixo citava PI-018/ER-018). Reconciliado com o código real: EWO-013 concluída nesta sessão (rotas de Backtests/Alertas plugadas), EWO-014 confirmada já implementada no código (falta só fechamento formal), EWO-003 confirmada em rascunho aguardando decisão. Documentada a lacuna de governança PI-014→PI-018 (EWOs concluídas com PI pai em draft) como conhecida e intencionalmente não reconstruída. `PROJECT_STATE.md` (raiz) e `docs/PROJECT_STATE.md` marcados como desatualizados/não oficiais, apontando para este documento e para `PROJECT_STATUS.md`.

### Versão 2.00

**PI-013 CONCLUÍDA.** Todos os 5 blocos materializados: A (Vercel Deploy), B (UX Excellence), C (Intelligence Layer), D (Feature Completion), E (Licensing & Access). 5 EWOs (EWO-016 a EWO-020), 24 slices, ~1.2k linhas adicionadas. Zero alterações em Core Domain. Stack oficial: GitHub + Supabase + Vercel + Sentry. Próxima etapa: definição do próximo roadmap estratégico.

### Versão 1.21

EWO-019 CONCLUÍDA. Bloco D da PI-013 (Feature Completion) materializado: SyncIndicator, NotificationBell, NotificationPanel com confirmação, useSyncStatus com dados reais. 5 Slices, 4 componentes, 202 linhas. FEAT-009 e FEAT-008 implementados. Nenhum Core Domain alterado. Próxima etapa: Bloco E (Licensing & Access — EWO-020).

### Versão 1.20

EWO-018 CONCLUÍDA. Bloco C da PI-013 (Intelligence Layer) materializado: InsightCard, InsightSection, 4 geradores (patrimônio, dividendos, metas, rebalanceamento), hook unificado useAllInsights. 4 Slices, 10 arquivos, 421 linhas. Nenhum Core Domain alterado. Conformidade R-021 validada. Próxima etapa: Bloco D da PI-013 (EWO-019) ou próximo roadmap.

### Versão 1.19

EWO-017 CONCLUÍDA. Bloco B da PI-013 (UX Excellence) materializado: MobileNav, SkeletonCard/Chart/Table, EmptyState, ErrorState/NotFoundState/RouteErrorBoundary, prefers-reduced-motion, ARIA labels, focus-visible. 5 Slices, 4 componentes, 277 linhas adicionadas. Nenhum Core Domain alterado. Próxima etapa: Bloco C da PI-013 (Intelligence Layer — EWO-018).

### Versão 1.18

EWO-016 CONCLUÍDA. Bloco A da PI-013 (Production Deployment) materializado: Vercel configurada como plataforma oficial (ADR-013-001), Nitro preset ajustado, Cloudflare Workers substituído, variáveis de ambiente validadas. Stack oficial: GitHub + Supabase + Vercel. Lovable registrado como legado. Próxima etapa: Bloco B da PI-013 (UX Excellence — EWO-017).

### Versão 1.17

EWO-015 CONCLUÍDA. Bloco C da PI-012 (Comercialização) materializado: IPaymentGateway, billing real com retry e webhook, checkout integrado. 4 Slices, 12 testes novos, 14 arquivos. Nenhum Core Domain alterado. Próxima etapa: definição do roadmap pós-PI-012.

### Versão 1.16

GOV-M06 — Baseline Lock. Baseline Congelada após Gate de Entrada. PI, ER, EWO congelados durante EWO ativa. Fluxo oficial atualizado. Projeto apto para EWO-004.

### Versão 1.15

GOV-M06 — Baseline Lock. Baseline Congelada após Gate de Entrada. PI, ER, EWO congelados durante EWO ativa. Fluxo oficial atualizado. Projeto apto para EWO-004.

### Versão 1.14

GOV-M01 a GOV-M05 implementados. Fluxo operacional formalizado. Git sync obrigatório. Template de pendências metodológicas. Projeto apto para EWO-004.

### Versão 1.13

EWO-003 CONCLUÍDA. Objetivo atualizado para Infrastructure Layer como próxima etapa.

### Versão 1.12

EWO-002 CONCLUÍDA. Objetivo atualizado para Application Layer como próxima etapa.

### Versão 1.10

Referência de Continuidade Arquitetural adicionada. Nova seção "Continuidade entre chats" formalizada.

### Versão 1.9

Aviso atualizado: Bootstrap Runtime é autossuficiente (não requer DEVELOPMENT_METHODOLOGY.md para execução).

### Versão 1.8

Simplificado. Conteúdo reduzido a identidade, estado, objetivo e referências. Regras operacionais migradas para PROJECT_BOOTSTRAP.md v2.0.

### Versão 1.7

PS#033 (Prompt 3). Marco Documentação Consolidada. Ordem de Precedência. Ciclo encerrado.
