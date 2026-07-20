# Lio Feliz - Documentação Oficial

# DOCUMENTATION_INDEX.md

**Projeto:** Lio Feliz

**Documento:** DOCUMENTATION_INDEX.md

**Versão da Documentação:** 1.69

**Status:** APROVADO

**Última atualização:** 20/07/2026

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
08_IMPOSTOS.md 🟢
09_RENDA_FIXA.md 🔴
10_INTERNACIONAL.md 🔴
11_IMPORT_EXPORT.md 🔴
12_INTEGRAÇÕES.md 🔴
13_RELATÓRIOS.md 🔴

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

✅ PI-009.md 🟢 (APPROVED)

Domain Expansion Ondas 2 & 3 (Renda Fixa 09, Internacional 10, Import/Export 11, Integrações 12, Relatórios 13). Estende a PI-008 (PA-008/R-001..R-007 carregados). Define escopo, priorização e **critérios explícitos para a ER-009 e para as EWO-007/EWO-008**. Aprovada por ER-009 (🟢 APROVADO PARA IMPLEMENTAÇÃO); NC-009-002 (O2) bloqueante pré-EWO-007.

✅ ER-009.md 🟢 (APPROVED)

Engineering Review da PI-009: 14 critérios + 6 dimensões solicitadas validadas; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. 3 NCs (NC-009-001 Baixa O1, NC-009-002 Média O2, NC-009-003 Baixa RER1).

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

## Histórico

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

EWO-006: Slices 1-3 (Metas) ✅ | Slices 4-6 (Impostos) ✅ | Slices 7-9 (Rebalanceamento) ✅ | Slice 10 (Closure) ✅ — EWO-006 encerrada (🟢 CLOSED). Ondas 2 e 3 (Renda Fixa 09, Internacional 10, Import/Export 11, Integrações 12, Relatórios 13) planejadas pela **PI-009 (🟢 APPROVED via ER-009)**. **ER-009 concluída** (🟢 APROVADO PARA IMPLEMENTAÇÃO). Próxima etapa: **EWO-007** (Onda 2 — Renda Fixa 09, Internacional 10), condicionada à resolução de O2 (NC-009-002); depois **EWO-008** (Onda 3).