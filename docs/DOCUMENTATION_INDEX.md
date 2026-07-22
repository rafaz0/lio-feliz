# Lio Feliz - Documentação Oficial

# DOCUMENTATION_INDEX.md

**Projeto:** Lio Feliz

**Documento:** DOCUMENTATION_INDEX.md

**Versão da Documentação:** 1.92

**Status:** APROVADO

**Última atualização:** 21/07/2026

---

## Objetivo

Este documento é o índice oficial da documentação do projeto Lio Feliz.

Ele define quais documentos existem, quais já foram concluídos, quais ainda estão em desenvolvimento e qual deve ser a ordem de leitura.

Todo IA ou desenvolvedor deve utilizar este documento como referência antes de consultar os demais arquivos da documentação.

---

## 1. Fundação

✅ 00_START_HERE.md

Define como o projeto deve ser desenvolvido.

---

## 2. Produto

✅ 03_PRODUCT_REQUIREMENTS.md

Define os módulos do sistema.

---

## 3. Regras de Negócio

✅ 06_BUSINESS_RULES/

Contém todas as regras financeiras do projeto.

Arquivos previstos:

00_INDEX.md ✅
00_GLOBAL_RULES.md ✅
01_PORTFOLIO.md ✅
02_TRANSACTIONS.md 🟡
03_MARKET_DATA.md ✅
04_CORPORATE_ACTIONS.md ✅
05_PROVENTOS.md ✅
06_REBALANCEAMENTO.md 🟢
07_METAS.md 🟢
09_RENDA_FIXA.md 🟢
08_IMPOSTOS.md 🟢
09_RENDA_FIXA.md 🔴
10_INTERNACIONAL.md 🔴
11_IMPORT_EXPORT.md 🔴
12_INTEGRAÇÕES.md 🔴
13_RELATÓRIOS.md ✅

---

## 4. Documentação Complementar

✅ 16_PRODUCT_BACKLOG.md

Backlog oficial do produto com funcionalidades aprovadas.

---

✅ 17_TRACEABILITY_MATRIX.md

Metodologia + matriz oficial de rastreabilidade: conecta features a Business Rules, Use Cases, Technical Annexes e ADRs.

---

✅ 19_GLOSSARY.md

Vocabulário oficial do projeto. Define cada conceito relevante com uma única definição oficial.

---

✅ 20_PROJECT_MAP.md

Visão macro oficial do projeto. Conecta todos os documentos. Serve como porta de entrada para o projeto. Institucionalizado via GOV-020.

---

✅ 21_FUNCTIONAL_SPECIFICATION.md

Especificação funcional oficial do produto. Consolida objetivos, público-alvo, escopo, MVP, fluxos, casos de uso, requisitos funcionais e não funcionais. Institucionalizado via GOV-021.

---

## 5. Decisões Arquiteturais

✅ 18_ARCHITECTURAL_DECISIONS/

Registro oficial de Architecture Decision Records (ADRs).

Arquivos:

00_INDEX.md ✅
ADR-001_DOCUMENTATION.md ✅
ADR-002_SINGLE_SOURCE_OF_TRUTH.md ✅
ADR-003_OPTIONAL_MODULES.md ✅
ADR-004_USER_FIRST.md ✅
ADR-005_MINIMUM_USER_ACTIONS.md ✅
ADR-006_COMMERCIAL_PRODUCT.md ✅
ADR-007_AUTOMATION_FIRST.md ✅
ADR-008_BACKLOG_GOVERNANCE.md ✅

---

## 6. Anexos Técnicos

✅ 07_TECHNICAL_ANNEXES/

Contém algoritmos, fórmulas, pseudocódigo e decisões de implementação.

Arquivos previstos:

00_INDEX.md ✅
01_PRICE_AVERAGE_ALGORITHMS.md ✅
00_ENGINE_GUIDELINES.md ✅
02_CORPORATE_ACTION_ENGINE.md ✅
03_PORTFOLIO_CONSOLIDATION_ENGINE.md ✅
04_INSIGHT_ENGINE.md ✅
05_ENGINE_ORCHESTRATOR.md ✅
06_HEALTH_ENGINE.md ✅
03_REBALANCEAMENTO_ALGORITMOS.md 🟢
04_IMPOSTO_CALCULOS.md 🟢
05_CORPORATE_ACTION_EXEMPLOS.md 🔴
06_CONVERSÃO_MOEDA.md 🔴
07_DIRETRIZES_DE_PERFORMANCE.md 🔴

---

## 7. Engenharia e Governança

✅ AUDITORIA_FINAL_EWO-006.md 🟢

Auditoria final avaliativa das Slices 1-10 da EWO-006 (Metas, Impostos, Rebalanceamento). Veredito 🟢 APROVADO PARA ENCERRAMENTO. Framework ER (15 critérios), cobertura de Slices, Decision Areas/Invariantes, dívidas técnicas (TD-006-001/002/003).

✅ EWO-006_ENGINEERING_CLOSURE.md 🟢

Engineering Closure oficial da EWO-006 (Slice 10): revisão arquitetural, quality gates, auditorias, pendências, lições aprendidas, encerramento oficial e sincronização Git.

✅ EWO-008_ENGINEERING_CLOSURE.md 🟡

Engineering Closure oficial da EWO-008 (Onda 3 — Módulos 11, 12, 13): 1 de 3 módulos entregue (Relatórios 13 completo); Módulo 11 parcial (BR doc + Core Domain stubs); Módulo 12 não implementado. Pendências TD-008-001/002/003 registradas. Working Tree não limpa (leftovers preservados para retomada).

✅ PI-009.md 🟢 (APPROVED v1.2)

Domain Expansion Ondas 2 & 3 (Renda Fixa 09, Internacional 10, Import/Export 11, Integrações 12, Relatórios 13). Estende a PI-008 (PA-008/R-001..R-007 carregados). **NC-009-002 (O2) RESOLVIDA** (v1.2): Renda Fixa e Internacional reutilizam `RegistrarOperacaoCommand` + `inferAssetType`; **RER1 resolvida** (ordem intra-onda: 09 → 10). O1 aplica-se na EWO-007.

✅ ER-009.md 🟢 (APPROVED)

Engineering Review da PI-009: 14 critérios + 6 dimensões solicitadas validadas; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. 3 NCs (NC-009-001 O1, NC-009-002 O2 resolvida, NC-009-003 RER1 resolvida).

✅ EWO-007.md 🟢 (APPROVED)

Engineering Work Order para a Onda 2 (Renda Fixa 09, Internacional 10). 7 Slices. O2 resolvida por reuso do fluxo canônico de operações. NC-009-001/003 incorporadas ao planejamento.

🔴 PI-010.md (DRAFT v1.0)

Domain Enrichment & Investor Tooling (Ondas 4 & 5). Módulos 14-18 (Backtests, Alertas, Comparação Avançada, Educação, Exportação Avançada). Estende PI-008 (PA-008/R-001..R-007) e PI-009 (PA-009/R-008..R-010). 4 novas restrições (R-011..R-014: Backtest Determinístico, Alertas com Consentimento, Comparação Read-Only, Exportação Assíncrona Auditável). 3 novos Anexos Técnicos previstos (`07_BACKTEST_ALGORITMOS.md`, `08_ALERTAS_EVENTOS.md`, `09_EXPORTACAO_FORMATOS.md`). 6 riscos com mitigações. Seções 11 e 12 com critérios explícitos para a futura ER-010 e para as futuras EWO-009/EWO-010. **Dependência O2**: confirmar EWO-007 antes de abrir EWO-009.

🔴 ER-010.md 🟢 (APPROVED)

Engineering Review da PI-010: 10 critérios avaliados, 5 NCs baixas/médias. Veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-010 promovida DRAFT → APPROVED.

🔴 EWO-010.md 🟢 (CLOSED)

Engineering Work Order para a Onda 5 (Educação 17, Exportação Avançada 18). 7 Slices executadas. Engineering Closure concluído. NCs ER-010 resolvidas (NC-010-003, NC-010-005). Decisão O1 aplicada.

🔴 EWO-009.md 🟢 (CLOSED)

Engineering Work Order para a Onda 4 (Análise e Insights): Backtests 14, Alertas 15, Comparação Avançada 16. 10 Slices executadas. Engineering Closure concluído. NCs ER-010 resolvidas (NC-010-002, NC-010-004). Backtests 14 independente de EWO-007.

🔴 PI-011.md (DRAFT v1.0)

Platform Consolidation & Product Readiness (Onda 6). 4 módulos: 19 (Assinaturas e Planos), 20 (Perfil do Investidor), 21 (Onboarding Inteligente), 22 (Personalização). 2 ports estendidos, 1 criado. 3 decisões arquiteturais (O1, O2, O3). R-015 a R-017. KPIs GOV-P015.

🔴 ER-011.md 🟢 (APPROVED)

Engineering Review da PI-011: 10 critérios avaliados, 4 NCs baixas (NC-011-001 O1, NC-011-002 O2, NC-011-003 O3, NC-011-004 O4), 2 recomendações. Veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-011 promovida DRAFT → APPROVED.

---

## Legenda

✅ Concluído
🟡 Em desenvolvimento
🔴 Planejado

---

## Regras

Sempre que um novo documento for criado:
- adicionar neste índice;
- atualizar seu status;
- registrar sua versão.

Sempre que um documento mudar de nome:
- atualizar este índice.

Sempre que um documento for removido:
- atualizar este índice.

Este arquivo representa a estrutura oficial da documentação.

---

## Versão 1.92

- **EWO-011 Slices 1-3 (Assinaturas 19) CONCLUÍDOS** — BR `19_ASSINATURAS.md`, Core Domain (Plan, Subscription, BillingCycle, AuthorizationService com PlanCapabilities, BillingSimulator), Application + Infrastructure (3 commands, 2 queries, 5 services, DTOs, repositórios estendidos), Presentation (SubscriptionsPage, hooks, viewmodel). PlanCapabilities centralizadas. Composition Root registrado. Build green. DOCUMENTATION_INDEX v1.92.

## Versão 1.91

- **EWO-011 CRIADA (APPROVED)** — Engineering Work Order para o Bloco A (Assinaturas 19, Perfil do Investidor 20). 7 Slices. NCs ER-011 tratadas (NC-011-001 a NC-011-004). ADRs registrados (ADR-011-001 a ADR-011-003). AuthorizationService com Plan Capabilities (REC-011-002). DOCUMENTATION_INDEX v1.91.

## Versão 1.90

- **ER-011 APROVADA** — Engineering Review da PI-011: 10 critérios avaliados, 4 NCs baixas (NC-011-001 O1, NC-011-002 O2, NC-011-003 O3, NC-011-004 O4), 2 recomendações. Veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-011 promovida DRAFT → APPROVED. DOCUMENTATION_INDEX v1.90.

## Versão 1.89

- **PI-011 CRIADA (DRAFT)** — Platform Consolidation & Product Readiness (Onda 6). 4 módulos: 19 (Assinaturas e Planos), 20 (Perfil do Investidor), 21 (Onboarding Inteligente), 22 (Personalização). 2 ports existentes estendidos (ISubscriptionRepository, IConfigurationRepository), 1 novo (IInvestorProfileRepository). 3 decisões arquiteturais (O1, O2, O3) priorizando reuso. R-015 a R-017. KPIs GOV-P015 por módulo. EWOs: 011 (Bloco A), 012 (Bloco B). DOCUMENTATION_INDEX v1.89.

## Versão 1.88

- **GOV-P015 implementada** — Indicadores Oficiais de Progresso da Engenharia. 5 indicadores: I-001 (Implementação Arquitetural — 0-4), I-002 (Implementação Funcional — FRs), I-003 (Estado Consolidado por Módulo), I-004 (Estado Geral do Projeto), I-005 (Aplicabilidade). PROJECT_BOOTSTRAP.md v2.59, AI_OPERATION_CHECKLIST.md v1.45. DOCUMENTATION_INDEX v1.88.

## Versão 1.87

- **EWO-007 🟢 FECHADA** — Onda 2 concluída. Módulo 09 (Renda Fixa) já implementado. Módulo 10 (Internacional) implementado com BR doc, Anexo, Core Domain, Application + Infrastructure e Presentation. PI-009 (Ondas 2 e 3) totalmente materializada. DOCUMENTATION_INDEX v1.87.

## Versão 1.86

- **EWO-010 — Onda 5 🟢 FECHADA** — Engineering Closure concluído. 7 Slices executadas. Módulos 17 (Educação) e 18 (Exportação Avançada) implementados. NCs ER-010 resolvidas (NC-010-003 tooltips, NC-010-005 scheduler). Todas as 5 NCs da ER-010 encerradas. Decisão O1 aplicada. DOCUMENTATION_INDEX v1.86.

## Versão 1.85

- **EWO-010 Slices 4-6 (Exportação Avançada 18) CONCLUÍDOS** — BR `18_EXPORTACAO_AVANCADA.md` e Anexo `09_EXPORTACAO_FORMATOS.md` criados. Core Domain `src/core/domain/advanced-export/`: ExportTemplate, ExportJob, ExportComposer (R-014), 5 errors. Application Layer: 2 commands, 2 queries, 4 services, port IExportTemplateRepository, 3 DTOs. Infrastructure: FakeExportTemplateRepository e SupabaseExportTemplateRepository. NC-010-005 resolvida (scheduler compartilhado mód.13). Decisão O1 aplicada. Build green. DOCUMENTATION_INDEX v1.85.

## Versão 1.84

- **EWO-010 Slices 1-3 (Educação 17) CONCLUÍDOS** — BR `17_EDUCACAO.md` criado. Core Domain `src/core/domain/education/`: GlossaryTerm, Tooltip, LearningPath, GlossaryIndexer, 4 errors. Application Layer: 2 commands, 2 queries, 4 services, port IGlossaryRepository, 4 DTOs. Infrastructure: FakeGlossaryRepository e SupabaseGlossaryRepository. NC-010-003 resolvida (Tooltip como fonte de dados, TooltipProvider na Presentation). Build green. DOCUMENTATION_INDEX v1.84.

## Versão 1.83

- **EWO-010 CRIADA (APPROVED)** — Engineering Work Order para a Onda 5 (Educação e Exportação Avançada): 7 Slices (Educação 17 Slices 1-3, Exportação Avançada 18 Slices 4-6, Engineering Closure Slice 7). NCs ER-010 resolvidas (NC-010-003 tooltips via TooltipProvider, NC-010-005 scheduler compartilhado). Aderência às melhorias GOV-P014 (resumo estatístico, rastreabilidade). DOCUMENTATION_INDEX v1.83.

## Versão 1.82

- **GOV-P014 implementada** — Atualização Metodológica de Prompt e Relatório. 5 melhorias incorporadas: GOV-P014-001 (Orientação ao Operador), GOV-P014-002 (Cabeçalho do Prompt), GOV-P014-003 (Resumo Estatístico), GOV-P014-004 (Bloco de Rastreabilidade), GOV-P014-005 (Estado da EWO). PROMPT_MASTER.md v1.1, AI_OPERATION_CHECKLIST.md v1.44, PROJECT_BOOTSTRAP.md v2.58. DOCUMENTATION_INDEX v1.82.

## Versão 1.81

- **EWO-009 — Onda 4 🟢 FECHADA** — Engineering Closure concluído. 10 Slices executadas. Módulos 14 (Backtests), 15 (Alertas), 16 (Comparação Avançada) implementados. Presentation do módulo 16 concluída (ComparisonPage, ScorecardGrid, hooks, tests). NCs ER-010 resolvidas (NC-010-002, NC-010-004). DOCUMENTATION_INDEX v1.81.

## Versão 1.80

- **EWO-009 Slices 7-8 (Comparação Avançada 16) CONCLUÍDOS** — BR `16_COMPARACAO_AVANCADA.md` criado. Core Domain `src/core/domain/comparison/`: ComparisonSet, ComparisonEntry, Scorecard, ComparisonAggregator (R-013), 5 errors. Application Layer: 2 commands, 2 queries, 4 services, port IComparisonRepository, 3 DTOs. Infrastructure: FakeComparisonRepository e SupabaseComparisonRepository. Build green. DOCUMENTATION_INDEX v1.80.

## Versão 1.79

- **EWO-009 Slices 4-6 (Alertas 15) CONCLUÍDOS** — BR `15_ALERTAS.md` e Anexo `08_ALERTAS_EVENTOS.md` criados. Core Domain `src/core/domain/alerts/`: Alert, AlertRule, AlertDelivery, AlertEvaluator (idempotente R-012), 5 errors. Application Layer: 3 commands (CriarAlerta, AtualizarAlerta, ConfirmarAlerta), 2 queries, 5 services, port IAlertRepository, 6 DTOs. Infrastructure: FakeAlertRepository e SupabaseAlertRepository. Build green. DOCUMENTATION_INDEX v1.79.

## Versão 1.78

- **EWO-009 Slices 1-3 (Backtests 14) CONCLUÍDOS** — BR `14_BACKTESTS.md` e Anexo `07_BACKTEST_ALGORITMOS.md` criados e aprovados. Core Domain `src/core/domain/backtests/`: Backtest, Strategy, SimulationResult, BacktestEngine (domain service), 9 domain errors, tipos. Application Layer: 2 commands, 2 queries, 4 services, port IBacktestRepository, 4 DTOs. Infrastructure: FakeBacktestRepository e SupabaseBacktestRepository. Composition Root, barrels e application-layer.ts estendidos. DOCUMENTATION_INDEX v1.78.

## Versão 1.77

- **EWO-009 CRIADA (APPROVED)** — Engineering Work Order para a Onda 4 (Análise e Insights): 10 Slices (Backtests 14, Alertas 15, Comparação Avançada 16). NCs ER-010 tratadas: NC-010-001 (dependência EWO-007), NC-010-002 (view composition /comparar resolvida via TanStack Router nested layout), NC-010-004 (AckAlertaCommand → ConfirmarAlertaCommand). DOCUMENTATION_INDEX v1.77.

## Versão 1.76

- **ER-010 — Engineering Review da PI-010 APROVADA** - 10 critérios avaliados; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-010 promovida DRAFT → APPROVED. 5 NCs: NC-010-001 (Baixa/O1 — monolithicidade EWO-009), NC-010-002 (Média/O2 — view composition módulo 16), NC-010-003 (Baixa/O3 — injeção tooltips), NC-010-004 (Baixa/O4 — nomenclatura AckAlertaCommand), NC-010-005 (Baixa/O5 — sobreposição schedulers). 5 recomendações (REC-010-001 a REC-010-005). DOCUMENTATION_INDEX v1.76.

## Versão 1.75

- **PI-010 — Domain Enrichment & Investor Tooling CRIADA (DRAFT)** - Nova Product Increment planejando os módulos 14-18 (Backtests, Alertas, Comparação Avançada, Educação, Exportação Avançada), organizados em **Onda 4 (Análise e Insights)** e **Onda 5 (Educação e Compliance)**. Estende PI-008 (PA-008-001..006, R-001..R-007) e PI-009 (PA-009-001..003, R-008..R-010). 4 novas restrições (R-011 Backtest Determinístico, R-012 Alertas com Consentimento, R-013 Comparação Read-Only, R-014 Exportação Assíncrona Auditável). 5 novos Ports (`IBacktestRepository`, `IAlertRepository`, `IComparisonRepository`, `IGlossaryRepository`, `IExportTemplateRepository`). 3 novos Anexos Técnicos previstos. 6 riscos com mitigações. Seções 11/12 com critérios para ER-010 e EWO-009/EWO-010. **Dependência O2 registrada**: confirmar EWO-007 antes de abrir EWO-009. DOCUMENTATION_INDEX v1.75.

## Versão 1.74

- **EWO-008 — Onda 3 COMPLETA. Módulos 11, 12 e 13 CONCLUÍDOS.** Engineering Closure finalizado em `docs/EWO-008_ENGINEERING_CLOSURE.md` (v1.0 🟢). Módulo 13 (Relatórios) mantido. Módulo 11 (Import/Export): BR doc `11_IMPORT_EXPORT.md`, Core Domain (ImportJob, ExportJob, ImportMapping), Application Layer (2 commands, 2 queries, DTOs, 4 services, port `IImportHistoryRepository`), Infrastructure (FakeImportHistoryRepository, SupabaseImportHistoryRepository), Presentation Feature (ImportExportPage, hooks, viewmodel) — implementados e commitados. Módulo 12 (Integrações): BR doc `12_INTEGRACOES.md`, Core Domain (IntegrationConfig, SyncLog, SyncOrchestrationService), Application Layer (2 commands, 2 queries, DTOs, port `IIntegrationRepository`, 4 services), Infrastructure (FakeIntegrationRepository, SupabaseIntegrationRepository), Presentation Feature (IntegrationsPage, hooks, viewmodel) — implementados e commitados. Working Tree limpa. DOCUMENTATION_INDEX v1.74.

## Versão 1.73

- **EWO-008 Engineering Closure — Onda 3 ENCERRADA (PARCIALMENTE)** - Engineering Closure documentado em `docs/EWO-008_ENGINEERING_CLOSURE.md` (v1.0 🟡). Módulo 13 (Relatórios) completo em produção; Módulo 11 (Import/Export) com BR doc + Core Domain stubs na Working Tree (não commitados); Módulo 12 (Integrações) não iniciado. Pendências TD-008-001/002/003 registradas. Working Tree mantida suja intencionalmente para preservar stubs de Módulo 11. DOCUMENTATION_INDEX v1.73.

## Versão 1.72

- **EWO-008 Bloco 3 — Módulo 13 (Relatórios) CONCLUÍDO** - BR-13 criado e APROVADO (`docs/06_BUSINESS_RULES/13_RELATÓRIOS.md`). Core Domain `src/core/domain/reports/`: `ReportTemplate`, `ReportExecution`, `ReportSchedule` (entidades), `ReportRenderingService` (domain service), 5 domain errors. Application Layer: 2 commands (`GerarRelatorioCommand`, `AgendarRelatorioCommand`), 2 queries (`ObterRelatoriosDisponiveisQuery`, `ObterRelatorioExecutadoQuery`), 4 services, port `IReportRepository`, DTOs. Infrastructure: `FakeReportRepository` e `SupabaseReportRepository`. Presentation Feature `src/presentation/features/reports/`: 6 componentes (ReportPage, ReportList, ReportCard, ReportExecutionItem, ScheduleForm, ReportLoading, ReportError), 4 hooks, ViewModel com transformações, 10 testes. Composition Root e barrels atualizados. DOCUMENTATION_INDEX v1.72.

## Histórico

## Versão 1.70

- **EWO-007 CRIADA (APPROVED) + PI-009 v1.2 (O2 resolvida)** - EWO-007 (Onda 2: Renda Fixa 09, Internacional 10) materializada com 7 Slices; NC-009-002 (O2) resolvida por reuso de `RegistrarOperacaoCommand` + `inferAssetType`. PI-009 atualizada para v1.2: O2 resolvida (comandos `RegistrarRendaFixaCommand`/`RegistrarAtivoInternacionalCommand` removidos; mantidos `RegistrarCupomCommand`/`AtualizarTaxaCambioCommand`), RER1 resolvida (ordem 09→10). DOCUMENTATION_INDEX v1.70.

## Versão 1.69

- **ER-009 — Engineering Review da PI-009 APROVADA** - 14 critérios + 6 dimensões solicitadas validadas; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-009 promovida DRAFT → APPROVED (v1.1). 3 NCs: NC-009-001 (Baixa/O1 — status dos BRs), NC-009-002 (Média/O2 — integração com fluxo de operações, bloqueante pré-EWO-007), NC-009-003 (Baixa/RER1 — ordem intra-onda). DOCUMENTATION_INDEX v1.69.

## Versão 1.68

- **PI-009 — Domain Expansion Ondas 2 & 3 CRIADA (DRAFT)** - Nova Product Increment planejando os módulos 09-13 (Renda Fixa, Internacional, Import/Export, Integrações, Relatórios). Estende a PI-008 (princípios PA-008 e restrições R-001..R-007 carregados). 3 novos princípios (PA-009-001 Conversão de Moeda Isolada, PA-009-002 Import via Interpreter, PA-009-003 Relatórios Read-Only) e 3 novas restrições (R-008 Câmbio, R-009 Import Interpreter, R-010 Relatórios Read-Only). Mapeia entidades, Commands, Queries, Ports e Infra adapters por módulo. Inclui Seções 11 e 12 com critérios explícitos para a futura ER-009 e para as futuras EWO-007/EWO-008. DOCUMENTATION_INDEX v1.68.

## Versão 1.67

- **EWO-006 Slice 10 — Engineering Closure CONCLUÍDA** - Auditoria Final (`AUDITORIA_FINAL_EWO-006.md`, veredito 🟢 APROVADO PARA ENCERRAMENTO, 15/15 critérios ER) e Engineering Closure (`EWO-006_ENGINEERING_CLOSURE.md`) redigidos. Quality gates: 1052 testes (134 arquivos, 0 regressões), architecture tests R-10 (37 testes, 0 violações), `vite build` green, ESLint limpo. Pendências TD-006-001/002/003 (débitos técnicos herdados, fora de escopo). EWO-006 (Slices 1-10) encerrada. DOCUMENTATION_INDEX v1.67.

## Versão 1.66

- **EWO-006 Slices 7-9 — Rebalanceamento: Core + Application + Infrastructure + Presentation CONCLUÍDA** - BR doc `06_REBALANCEAMENTO.md` e Anexo Técnico `03_REBALANCEAMENTO_ALGORITMOS.md` criados e APROVADOS. Core Domain `rebalancing/`: `AllocationTarget`, `AllocationTargetCollection` (VOs), `normalisePercentages`, `RebalancingService` (domain service com cálculo de diferenças, sugestões de aporte/venda, verificação de tolerância), `rebalancing-types.ts` (enums + tipos), `errors.ts` (5 erros de domínio). Application Layer: query `CalcularRebalanceamentoQuery` estendida com `valorAporte` opcional; `CalcularRebalanceamentoService` refatorado para usar `RebalancingService` do domínio — `valorSugerido` agora calculado corretamente. Command `ExecutarRebalanceamentoCommand` + `ExecutarRebalanceamentoService` (portfólio + event publisher). DTO `RebalanceamentoExecutadoDto`. Barrels, `application-layer.ts` e `presentation-dispatcher.ts` atualizados (handler registrado). Rota `/_authenticated/portfolio/$portfolioId/rebalancing` já existente aponta para `RebalancingPage`. DOCUMENTATION_INDEX v1.66.

## Versão 1.65

- **EWO-006 Slice 4-6 — Impostos: Core + Application + Infrastructure + Presentation CONCLUÍDA** - BR doc `08_IMPOSTOS.md` e Anexo Técnico `04_IMPOSTO_CALCULOS.md` criados e APROVADOS. Core Domain tax/: `TaxLot` (VO), `TaxEvent`/`TaxStatement` (entities), `TaxCalculationService` (domain service), `tax-types.ts` (enums + `TAX_RATE_TABLE`), `errors.ts`. Application Layer: 2 commands (`CalcularImpostoCommand`, `ExportarDeclaracaoCommand`), 2 queries (`ObterDeclaracaoQuery`, `ObterPosicaoFiscalQuery`), DTOs (`DeclaracaoDto`, `LoteFiscalDto`, `ImpostoMensalDto`, `ConsolidadoAnualDto`), port `ITaxStatementRepository`, 4 services. Infrastructure: `InMemoryTaxStatementRepository`, `SupabaseTaxStatementRepository`. Presentation: 2 hooks (`useTaxCalculationQuery`, `useTaxDeclarationExportMutation`), 4 components (`TaxCalculationDetail`, `TaxDeductionPanel`, `TaxLotTable`, `TaxSummaryExtended`). Composition Root registrado. 14 testes novos, zero regressões. DOCUMENTATION_INDEX v1.65.

## Versão 1.64

- **EWO-006 Slice 2 — Metas: Application + Infrastructure CONCLUÍDA** - Application Layer: `CriarMetaCommand`, `AtualizarMetaCommand`, `RegistrarContribuicaoCommand` (commands); `ObterMetasQuery`, `ObterProgressoMetaQuery` (queries); `MetaListDto`, `MetaProgressoDetalhadoDto` (DTOs); `CriarMetaService`, `AtualizarMetaService`, `RegistrarContribuicaoService`, `ObterMetasService`, `ObterProgressoMetaService` (services); `IFinancialGoalRepository` (port). Infrastructure Layer: `SupabaseFinancialGoalRepository` (concreto) e `FakeFinancialGoalRepository` (fake para testes). 5 suites de teste de serviços + 1 suite de teste do fake repository. Build, 981 testes e lint verdes. DOCUMENTATION_INDEX v1.64.

## Versão 1.63

- **EWO-006 Slice 1 — Metas: Business Rules + Core Domain CONCLUÍDA** - Documento `07_METAS.md` criado e APROVADO. Módulo `financial-goal/` implementado no Core Domain: `FinancialGoal` aggregate root, `GoalCategory`/`GoalStatus` enums, `GoalContribution` entity, `GoalProgress` value object, `FinancialGoalService`, 4 domain events. 62 testes unitários, zero regressões. DOCUMENTATION_INDEX v1.63.

## Versão 1.62

- **EWO-006 — Domain Expansion Onda 1 (Metas, Impostos, Rebalanceamento) APROVADA** - Engineering Work Order com 10 Slices. Ordem: 1º Metas, 2º Impostos, 3º Rebalanceamento. NCs ER-008 incorporadas (O1, O2, RER1, RER2). Features existentes estendidas, não recriadas. PROJECT_STATUS v1.78.

## Versão 1.61

- **ER-008 — Engineering Review da PI-008 (Domain Expansion) APROVADA** - Revisão técnica completa: 14 critérios, 4 NCs baixas, veredito APROVADO. PI-008 promovida para APPROVED. PROJECT_STATUS v1.77.

## Versão 1.60

- **PI-008 — Domain Expansion & Business Rules Completion (DRAFT)** - Nova Product Increment para completar 8 módulos de domínio e 5 anexos técnicos. Extensão das 4 camadas congeladas sem modificação. PI-007 finalizada como Completed. PROJECT_STATUS v1.76.

## Versão 1.59

- **Padronização Final de Idioma (Português) da Engineering Closure EWO-005** - Tradução integral para português do parágrafo final e normalização de seções. Conformidade com OP-013 (Português como idioma oficial). Nenhuma alteração técnica. PROJECT_STATUS v1.75.

## Versão 1.58

- **Consolidação Final da EWO-005** - Aplicadas melhorias documentais e de governança identificadas durante a auditoria final do ChatGPT:
  * Padronização das métricas na documentação (substituindo números voláteis por descrições consolidadas)
  * Padronização de nomenclatura (correção de termos como "Rebalancement" para "Rebalanceamento", etc.)
  * Adição da seção "Frozen Baseline" ao PROJECT_BOOTSTRAP.md
  * Adição das seções "Lições Aprendidas" e "Encerramento Oficial" ao ER-005
  * Atualização dos documentos de projeto para refletir a consolidação final
  * Esta é a última atividade oficial da EWO-005

## Versão 1.57

- **EWO-005 Slice 12 — Relatórios / Exportação CLOSED.** Feature `reports` da Presentation Layer materializada: `ReportsPage`, `ReportsList`, `ReportCard`, `ReportFilters`, `ExportPanel`, `ExportProgress`, `ReportsLoading`, `ReportsEmpty`, `ReportsError`; hooks `useReportsQuery` (catálogo estático via TanStack Query) e `useExportReportMutation` (TanStack Query `useMutation` + `useDispatcher` → `ExportarDadosQuery`); ViewModels `ReportViewModel`/`ExportResultViewModel` com mappers puros (`toReportViewModel`, `toReportViewModels`, `toExportResultViewModel`); query keys em `reports-query-keys.ts`. Composition Root (`presentation-dispatcher.ts`): registrado `ExportarDadosQuery` (via `ExportarDadosService`, consome `IProjectionRepository`). Rota `/portfolio/:portfolioId/reports`. 17 testes novos (14 feature + 3 architecture R-10 estendido para reports), 260 totais, zero regressões. Build/ESLint/TypeCheck verdes nos arquivos da Slice. Aguarda auditoria ChatGPT antes do Engineering Closure (Slice 13). PROJECT_STATUS v1.73.

## Versão 1.56

- **EWO-005 Slice 11 — Sincronização CLOSED.** Feature `sync` da Presentation Layer materializada: `SyncPage`, `SyncForm`, `SyncButton`, `SyncResultCard`, `SyncLoading`, `SyncError`, `SyncEmpty`; hook `useSyncMutation` (→ `SincronizarDadosCommand`); ViewModels com mappers puros. Composition Root registra `SincronizarDadosCommand` (bloco `portfolioRepository && eventPublisher && dataGateway && importInterpreter`). Nova infra: `DataGatewayRouter` (adapter `IDataGateway` roteável) + injeção de `DataGatewayRouter`/`ImportInterpreter` no `__root.tsx`. Rota `/sync`. 16 testes novos (13 feature + 3 architecture R-10), 240 totais, zero regressões. Build/ESLint/TypeCheck verdes nos arquivos da Slice. Aguarda auditoria ChatGPT antes da Slice 12. PROJECT_STATUS v1.72.

## Versão 1.55

- **Correções Pós-Auditoria EWO-005 (A1-A4) CONCLUÍDAS.** Atividade avaliativa de correção dos achados da Auditoria Intermediária. A1 (obrigatória): duplicação de `RegisterQuery("ConsultarRentabilidadeQuery")` removida em `presentation-dispatcher.ts` (1 registro oficial). A2: `OperationForm.tsx` realinhado para `application-layer.ts`. A4: teste arquitetural redundante eliminado (221 testes, cobertura preservada). A3: backlog técnico (code-splitting). Build/ESLint/Testes/TypeCheck verdes nos arquivos alterados. Slice 11 liberada. PROJECT_STATUS v1.71.

## Versão 1.54

- **AUDITORIA_INTERMEDIARIA_EWO-005.md** adicionado ao índice. Auditoria avaliativa das Slices 1-10 da EWO-005 (9 features da Presentation Layer). Veredito: 🟡 APPROVED WITH RECOMMENDATIONS. 222 testes da presentation verdes (32 architecture tests R-10). 4 achados (A1 duplicação de handler no Composition Root — MÉDIA; A2 import de DTO fora do padrão — BAIXA; A3 code-splitting ausente — BAIXA/MÉDIA; A4 teste redundante — INFO). Slice 11 (Sincronização) autorizada, condicionada à correção de A1. PROJECT_STATUS v1.70.

Com base no contexto atual do projeto e na aprovação da PI-008, ER-008 e EWO-006, a Onda 1 (Domain Expansion) foi concluída.

EWO-006: Slices 1-3 (Metas) ✅ | Slices 4-6 (Impostos) ✅ | Slices 7-9 (Rebalanceamento) ✅ | Slice 10 (Closure) ✅ — EWO-006 encerrada (🟢 CLOSED). Ondas 2 e 3 planejadas pela **PI-009 (🟢 APPROVED v1.2)**; **ER-009 concluída** (🟢). **O2 (NC-009-002) RESOLVIDA**: Renda Fixa/Internacional reutilizam `RegistrarOperacaoCommand` + `inferAssetType`. **EWO-007 CRIADA (🟢)** para a Onda 2 (Renda Fixa 09 → Internacional 10, 7 Slices). **EWO-008 — Onda 3 COMPLETA**: Módulos 11 (Import/Export), 12 (Integrações) e 13 (Relatórios) implementados, commitados e sincronizados. EWO-008 oficialmente 🟢 CLOSED.