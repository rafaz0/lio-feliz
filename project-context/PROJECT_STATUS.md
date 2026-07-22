# Project Status — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** PROJECT_STATUS.md

**Versão:** 1.92

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 21/07/2026

---

## Objetivo
Registrar a criação da EWO-009 (Onda 4 — Análise e Insights), materializando a arquitetura aprovada na PI-010 para os módulos Backtests (14), Alertas (15) e Comparação Avançada (16) em 10 Slices verticais.

## Detalhes Importantes
- **EWO-009 criada e APROVADA** — 10 Slices: 1-3 (Backtests 14), 4-6 (Alertas 15), 7-9 (Comparação Avançada 16), 10 (Engineering Closure).
- Backtests 14 (Slices 1-3) **não depende de EWO-007** — pode iniciar imediatamente.
- Alertas 15 e Comparação 16 dependem de posições e dividendos internacionais (EWO-007, módulo 10).
- NCs ER-010 resolvidas: NC-010-002 (view composition /comparar via TanStack Router nested layout), NC-010-004 (AckAlertaCommand → ConfirmarAlertaCommand).
- DOCUMENTATION_INDEX v1.77, PROJECT_STATUS v1.90.

## Estado Atual do Trabalho
### Concluído
- EWO-005 encerrada: 13 Slices (Foundation, Auth, Dashboard, Portfolio, Operations, Dividends, History, Rebalanceamento, Impostos, Configurações, Sincronização, Relatórios, Engineering Closure)
- PI-008 (Domain Expansion) — APPROVED
- ER-008 — APPROVED (14 critérios, 4 NCs baixas)
- EWO-006 (Domain Expansion — Onda 1) — 🟢 CLOSED (Slices 1-10 concluídas e auditadas)
  - Slices 1-3: Metas (Core + Application + Infrastructure + Presentation)
  - Slices 4-6: Impostos (Core + Application + Infrastructure + Presentation)
  - Slices 7-9: Rebalanceamento (Core + Application + Infrastructure + Presentation)
  - Slice 10: Engineering Closure (Auditoria Final + Closure + commit + push)
- Quality gates verdes: architecture tests R-10 (37 testes, 0 violações), `vite build` green
- DOCUMENTATION_INDEX v1.76, PROJECT_STATUS v1.88

### Concluído
- **ER-010 🟢 APROVADA** — Engineering Review da PI-010: 10 critérios, 5 NCs baixas/médias. Veredito APROVADO PARA IMPLEMENTAÇÃO. PI-010 promovida DRAFT → APPROVED.
- **GOV-P013 implementada** — Consolidação Final do Fluxo Operacional. PROMPT_MASTER.md criado. AI_ENGINEERING_PROTOCOL.md e AI_OPERATION_CHECKLIST.md atualizados.
- **EWO-009 Slices 1-3 (Backtests 14) CONCLUÍDOS** — BR doc `14_BACKTESTS.md`, Anexo `07_BACKTEST_ALGORITMOS.md`, Core Domain (Backtest, Strategy, SimulationResult, BacktestEngine, 9 errors), Application Layer (2 commands, 2 queries, 4 services, port, 4 DTOs), Infrastructure (FakeBacktestRepository, SupabaseBacktestRepository). Barrels e application-layer.ts atualizados. Build green.
- **EWO-009 Slices 4-6 (Alertas 15) CONCLUÍDOS** — BR doc `15_ALERTAS.md`, Anexo `08_ALERTAS_EVENTOS.md`, Core Domain (Alert, AlertRule, AlertDelivery, AlertEvaluator, 5 errors), Application Layer (3 commands, 2 queries, 5 services, port, 6 DTOs), Infrastructure (FakeAlertRepository, SupabaseAlertRepository). NC-010-004 aplicada (ConfirmarAlertaCommand). Build green.
- **EWO-009 criada (APPROVED)** — Onda 4 (Backtests 14, Alertas 15, Comparação Avançada 16). 10 Slices. NCs ER-010 resolvidas.
- **EWO-008 — Onda 3: 🟢 CLOSED (Módulos 11, 12, 13 completos)**
  - **Módulo 11 (Import/Export):** BR doc, Core Domain (ImportJob, ExportJob, ImportMapping, ImportJobId), Application Layer (2 commands, 2 queries, 4 services, DTOs, port), Infrastructure (fake + Supabase), Presentation Feature (ImportExportPage, hooks, viewmodel)
  - **Módulo 12 (Integrações):** BR doc, Core Domain (IntegrationConfig, SyncLog, SyncOrchestrationService), Application Layer (2 commands, 2 queries, 4 services, DTOs, port), Infrastructure (fake + Supabase), Presentation Feature (IntegrationsPage, hooks, viewmodel)
  - **Módulo 13 (Relatórios):** Mantido do commit anterior (BR doc, Core Domain, App, Infra, Presentation, testes)
  - Composition Root (presentation-dispatcher.ts) estendido com handlers de ambos os módulos
  - Barrels e application-layer.ts atualizados

### Em andamento (planejamento)
- **PI-009 (APPROVED v1.2)** — Domain Expansion Ondas 2 & 3 (módulos 09-13). O2 (NC-009-002) **RESOLVIDA**: Renda Fixa/Internacional reutilizam `RegistrarOperacaoCommand` + `inferAssetType`. RER1 resolvida (ordem 09→10).
- **EWO-007 (APPROVED)** — Onda 2 (Renda Fixa 09, Internacional 10), 7 Slices. Aguardando execução.
- **PI-010 (APPROVED v1.0)** — Domain Enrichment & Investor Tooling (Ondas 4 & 5: módulos 14-18). Estende PI-008/PI-009. ER-010 aprovada com 5 NCs. Próxima etapa: EWO-009 / EWO-010.
- **EWO-009 (APPROVED)** — Onda 4 (Backtests 14, Alertas 15, Comparação Avançada 16). 10 Slices. **Slices 1-3 (Backtests 14) e Slices 4-6 (Alertas 15) concluídas.** Slices 7-9 (Comparação 16) aguardando Gate de Entrada.

### Bloqueado
- (nenhum)

### Próximo passo
1. **Auditoria ChatGPT das Slices 4-6** — Validação da implementação de Alertas 15.
2. **Iniciar EWO-009 Slice 7** — Comparação Avançada 16 (BR + Core Domain).
3. **Executar EWO-007 em paralelo** — Onda 2 (pré-requisito para Slices 7-9).

## Arquivos Relevantes
- `architecture-lab/PI-008.md`: v1.0 (Approved) — Domain Expansion & Business Rules Completion (base da PI-009)
- `architecture-lab/PI-009.md`: v1.2 (Approved) — Ondas 2 & 3 (módulos 09-13); O2 resolvida
- `architecture-lab/PI-010.md`: v1.0 (APPROVED) — Domain Enrichment & Investor Tooling (Ondas 4 & 5: módulos 14-18)
- `architecture-lab/ER-010.md`: v1.0 (APPROVED) — Engineering Review da PI-010 (🟢 APROVADO)
- `architecture-lab/EWO-009.md`: v1.0 (APPROVED) — Onda 4 (Backtests 14, Alertas 15, Comparação Avançada 16), 10 Slices
- `architecture-lab/ER-008.md`: v1.0 (Approved) — Engineering Review da PI-008
- `architecture-lab/ER-009.md`: v1.0 (Approved) — Engineering Review da PI-009 (🟢 APROVADO)
- `architecture-lab/EWO-006.md`: v1.0 (Approved) — Onda 1 (Metas, Impostos, Rebalanceamento), 10 Slices
- `architecture-lab/EWO-007.md`: v1.0 (Approved) — Onda 2 (Renda Fixa 09, Internacional 10), 7 Slices
- `docs/AUDITORIA_FINAL_EWO-006.md`: v1.0 🟢 — Auditoria final (veredito APROVADO PARA ENCERRAMENTO)
- `docs/EWO-006_ENGINEERING_CLOSURE.md`: v1.0 🟢 — Engineering Closure (Slice 10)
- `docs/EWO-008_ENGINEERING_CLOSURE.md`: v1.0 🟢 — Engineering Closure da Onda 3 (encerramento definitivo)
- `docs/DOCUMENTATION_INDEX.md`: v1.79 (reflete EWO-009 Slices 1-6)
- `project-context/PROJECT_STATUS.md`: v1.92 (reflete EWO-009 Slices 1-6)
- `project-context/PROMPT_MASTER.md`: v1.0 (APPROVED) — Matriz de Seleção de Modelos, Prompt Operacional, Fluxo ChatGPT (GOV-P013)
- `project-context/PROJECT_BOOTSTRAP.md`: v2.57 (Frozen Baselines + GOV-P013)
- Git: branch `main`, origin sincronizado

---

## Histórico

### Versão 1.92

- **EWO-009 Slices 4-6 (Alertas 15) CONCLUÍDOS** — BR doc `15_ALERTAS.md` e Anexo `08_ALERTAS_EVENTOS.md` criados. Core Domain `src/core/domain/alerts/`: Alert, AlertRule, AlertDelivery (entities), AlertEvaluator (domain service idempotente R-012, dedup por rule_id+run_id+asset+event_date), 5 erros de domínio, tipos. Application Layer: 3 commands (CriarAlertaCommand, AtualizarAlertaCommand, ConfirmarAlertaCommand — NC-010-004), 2 queries (ObterAlertaQuery, ListarAlertasAtivosQuery), 5 services, port IAlertRepository, 6 DTOs. Infrastructure: FakeAlertRepository e SupabaseAlertRepository (batch create com dedup_key). Barrels e application-layer.ts atualizados. Build green. DOCUMENTATION_INDEX v1.79, PROJECT_STATUS v1.92.

### Versão 1.91

- **EWO-009 Slices 1-3 (Backtests 14) CONCLUÍDOS** — BR doc `14_BACKTESTS.md` e Anexo Técnico `07_BACKTEST_ALGORITMOS.md` criados e aprovados. Core Domain `src/core/domain/backtests/`: Backtest, Strategy, SimulationResult (entities), BacktestEngine (domain service com algoritmo determinístico R-011), 9 erros de domínio, tipos (BacktestStatus, AllocationWeight, BenchmarkRef, DateRange, BacktestSnapshot, MonthlyReturn). Application Layer: commands ExecutarBacktestCommand e SalvarEstrategiaCommand; queries ObterBacktestQuery e ListarEstrategiasQuery; 4 DTOs (BacktestDto, StrategyDto, SimulationResultDto, BacktestCompletoDto, EstrategiaListDto); port IBacktestRepository; 4 services. Infrastructure: FakeBacktestRepository e SupabaseBacktestRepository. Barrels (commands, queries, dtos, ports, fakes, application-layer) atualizados. Build green. DOCUMENTATION_INDEX v1.78, PROJECT_STATUS v1.91.

### Versão 1.90

- **EWO-009 CRIADA (APPROVED)** — Engineering Work Order para a Onda 4 (Análise e Insights): 10 Slices. Módulos: Backtests 14 (Slices 1-3), Alertas 15 (Slices 4-6), Comparação Avançada 16 (Slices 7-9), Engineering Closure (Slice 10). NCs ER-010 resolvidas: NC-010-002 (view composition /comparar via TanStack Router nested layout), NC-010-004 (AckAlertaCommand → ConfirmarAlertaCommand). NC-010-001 (dependência EWO-007): Backtests 14 independente — Slices 1-3 podem iniciar imediatamente. Slices 4-9 requerem EWO-007 (módulo 10 Internacional). Próximo passo: Gate de Entrada + iniciar Slice 1. DOCUMENTATION_INDEX v1.77, PROJECT_STATUS v1.90.

### Versão 1.89

- **GOV-P013 implementada** — Consolidação Final do Fluxo Operacional. PROMPT_MASTER.md criado como fonte canônica para Matriz de Seleção de Modelos (DeepSeek V4 Flash/V4 Pro, GLM-5.2), Prompt Operacional (cabeçalho `Modelo recomendado: <modelo>`), Fluxo Operacional do ChatGPT (resumir, informar estado, gerar próximo prompt) e Registro Permanente de Melhorias (incorporar ou registrar como pendência). AI_ENGINEERING_PROTOCOL.md atualizado com referência cruzada. AI_OPERATION_CHECKLIST.md atualizado com cabeçalho de modelo no checklist de prompt. PROJECT_BOOTSTRAP.md atualizado com seção GOV-P013 e template Prompt OpenCode revisado. Nenhuma alteração técnica ou arquitetural. PROJECT_STATUS v1.89.

### Versão 1.88

- **ER-010 — Engineering Review da PI-010 APROVADA** - 10 critérios avaliados; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-010 promovida DRAFT → APPROVED (v1.0). 5 NCs: NC-010-001 (Baixa/O1 — monolithicidade EWO-009), NC-010-002 (Média/O2 — view composition módulo 16), NC-010-003 (Baixa/O3 — injeção tooltips), NC-010-004 (Baixa/O4 — nomenclatura AckAlertaCommand), NC-010-005 (Baixa/O5 — sobreposição schedulers). 5 recomendações (REC-010-001 a REC-010-005). Próximos passos: aplicar NCs, executar EWO-007, emitir EWO-009/EWO-010. DOCUMENTATION_INDEX v1.76, PROJECT_STATUS v1.88.

### Versão 1.87

- **PI-010 — Domain Enrichment & Investor Tooling CRIADA (DRAFT)** - Nova Product Increment planejando os módulos 14-18 (Backtests, Alertas, Comparação Avançada, Educação, Exportação Avançada), organizados em **Onda 4 (Análise e Insights)** e **Onda 5 (Educação e Compliance)**. Estende PI-008 (PA-008-001..006, R-001..R-007) e PI-009 (PA-009-001..003, R-008..R-010). 4 novas restrições propostas (R-011..R-014). 5 novos Ports. 3 novos Anexos Técnicos previstos. 6 riscos com mitigações. Seções 11/12 com critérios para ER-010 e EWO-009/EWO-010. **Dependência O2 registrada**: EWO-007 deve ser concluída antes de EWO-009. Próxima etapa do fluxo: ER-010. Operacionalmente, a próxima etapa imediata permanece EWO-007 (pendência da Onda 2). DOCUMENTATION_INDEX v1.75, PROJECT_STATUS v1.87.

### Versão 1.86

- **EWO-008 — Onda 3 COMPLETA. Módulos 11, 12 e 13 CONCLUÍDOS.** EWO-008 oficialmente 🟢 CLOSED. Módulo 11 (Import/Export): BR doc, Core Domain, Application Layer (2 commands, 2 queries, 4 services, port, DTOs), Infrastructure (fake + Supabase), Presentation Feature (ImportExportPage, hooks, viewmodel) — implementados e commitados. Módulo 12 (Integrações): BR doc, Core Domain (IntegrationConfig, SyncLog, SyncOrchestrationService), Application Layer (2 commands, 2 queries, 4 services, port, DTOs), Infrastructure (fake + Supabase), Presentation Feature (IntegrationsPage, hooks, viewmodel) — implementados e commitados. Módulo 13 (Relatórios) mantido. Composition Root, barrels e application-layer.ts atualizados para ambos os módulos. Working Tree limpa. Quality gates: build green, architecture tests R-10 (37/37 passando). DOCUMENTATION_INDEX v1.74, PROJECT_STATUS v1.86.

### Versão 1.85

- **EWO-008 Engineering Closure — Onda 3 ENCERRADA (PARCIALMENTE)** - Engineering Closure documentado em `docs/EWO-008_ENGINEERING_CLOSURE.md` (v1.0 🟡). Módulo 13 (Relatórios) completo e commitado (`85d2114`). Módulo 11 (Import/Export) com BR doc + Core Domain stubs + Application/Infrastructure stubs na Working Tree (não commitados). Módulo 12 (Integrações) não iniciado. Pendências TD-008-001/002/003 registradas. Working Tree mantida suja intencionalmente para retomada futura de Módulo 11. Próximo passo: executar EWO-007 (Onda 2) e nova EWO para completar Onda 3. DOCUMENTATION_INDEX v1.73, PROJECT_STATUS v1.85.

### Versão 1.84

- **EWO-008 Bloco 3 — Módulo 13 (Relatórios) CONCLUÍDO** - BR-13 criado e APROVADO. Core Domain `reports/`: `ReportTemplate`, `ReportExecution`, `ReportSchedule`, `ReportRenderingService`. Application Layer: 2 commands, 2 queries, 4 services, port `IReportRepository`, DTOs. Infrastructure: `FakeReportRepository` e `SupabaseReportRepository`. Presentation Feature completa: 7 componentes, 4 hooks, ViewModel, 10 testes. Composition Root, barrels e `application-layer.ts` atualizados. DOCUMENTATION_INDEX v1.72, PROJECT_STATUS v1.84.

### Versão 1.82

- **EWO-007 CRIADA (APPROVED) + PI-009 v1.2 (O2 resolvida)** - NC-009-002 (O2) resolvida por decisão arquitetural: Renda Fixa e Internacional reutilizam `RegistrarOperacaoCommand` + `inferAssetType`; comandos `RegistrarRendaFixaCommand`/`RegistrarAtivoInternacionalCommand` removidos da PI-009 v1.2. RER1 resolvida (ordem 09→10). EWO-007 emitida para a Onda 2 (7 Slices). DOCUMENTATION_INDEX v1.70.

### Versão 1.81

- **ER-009 — Engineering Review da PI-009 APROVADA** - 14 critérios + 6 dimensões solicitadas validadas; veredito 🟢 APROVADO PARA IMPLEMENTAÇÃO. PI-009 promovida DRAFT → APPROVED (v1.1). 3 NCs: NC-009-001 (Baixa/O1), NC-009-002 (Média/O2 — bloqueante pré-EWO-007), NC-009-003 (Baixa/RER1). Próxima etapa: EWO-007 (após O2). DOCUMENTATION_INDEX v1.69.

### Versão 1.80

- **PI-009 — Domain Expansion Ondas 2 & 3 CRIADA (DRAFT)** - Nova Product Increment planejando os módulos 09-13 (Renda Fixa, Internacional, Import/Export, Integrações, Relatórios). Estende a PI-008 (princípios PA-008 e restrições R-001..R-007 carregados). 3 novos princípios (PA-009-001/002/003) e 3 novas restrições (R-008/009/010). Mapeia entidades, Commands, Queries, Ports e Infra adapters por módulo. Inclui Seções 11 e 12 com critérios explícitos para a futura ER-009 e para as futuras EWO-007/EWO-008. Próxima etapa: ER-009. DOCUMENTATION_INDEX v1.68.

### Versão 1.79

- **EWO-006 — Engineering Closure (Slice 10) CONCLUÍDA** - EWO-006 encerrada (🟢 CLOSED). Auditoria Final (`AUDITORIA_FINAL_EWO-006.md`, veredito 🟢 APROVADO PARA ENCERRAMENTO, 15/15 critérios ER) e Engineering Closure (`EWO-006_ENGINEERING_CLOSURE.md`) redigidos. Quality gates: 1052 testes (134 arquivos, 0 regressões), architecture tests R-10 (37 testes, 0 violações), `vite build` green, ESLint limpo. Pendências TD-006-001/002/003 (débitos técnicos herdados, fora de escopo). 4 camadas congeladas intactas. Próximas: Ondas 2 e 3 da PI-008 (exigem novas PI + ER). DOCUMENTATION_INDEX v1.67.

### Versão 1.78

- **EWO-006 — Domain Expansion Onda 1 (Metas, Impostos, Rebalanceamento) APROVADA** - Engineering Work Order criada com 10 Slices de implementação. Ordem: 1º Metas, 2º Impostos, 3º Rebalanceamento. NCs da ER-008 incorporadas (O1, O2, RER1, RER2). Features existentes de `tax/` e `rebalancing/` serão estendidas, não recriadas. Próxima etapa: iniciar Slice 1 (Metas: Business Rules + Core Domain). DOCUMENTATION_INDEX v1.62.

### Versão 1.77

- **ER-008 — Engineering Review da PI-008 (Domain Expansion) APROVADA** - Revisão técnica completa da PI-008. 14 critérios auditados, 4 NCs baixas documentais identificadas (NC-008-001 a NC-008-004), 0 NCs arquiteturais. Veredito: 🟢 APROVADO PARA IMPLEMENTAÇÃO. 1 risco Alto (RA-008-002 — regras fiscais), 3 Médios, 1 Baixo. PI-008 promovida de DRAFT para APPROVED. Próxima etapa: EWO-006 (Onda 1 — Metas, Impostos, Rebalanceamento). DOCUMENTATION_INDEX v1.61.

### Versão 1.76

- **PI-008 — Domain Expansion & Business Rules Completion (DRAFT)** - Criado novo ciclo de evolução do projeto. PI-007 finalizada como Completed (Presentation Layer congelada). PI-008 define arquitetura para completar 8 módulos de domínio pendentes (06 a 13), 5 anexos técnicos, e extensão das 4 camadas sem modificar Frozen Baselines. 6 princípios arquiteturais, 8 novos Commands/Queries/Ports, 3 ondas de priorização. Próximas etapas: ER-008, EWO-006 a EWO-008. DOCUMENTATION_INDEX v1.60.

### Versão 1.75

- **Padronização Final de Idioma (Português) da Engineering Closure EWO-005** - Tradução integral para português das seções de contexto da Engineering Closure. Nenhuma alteração arquitetural, de código ou de comportamento. Conformidade com OP-013 (Português como idioma oficial). DOCUMENTATION_INDEX v1.59.

### Versão 1.74

- **Consolidação Final da EWO-005** - Aplicadas melhorias documentais e de governança identificadas durante a auditoria final do ChatGPT:
  * Padronização das métricas na documentação (substituindo números voláteis por descrições consolidadas)
  * Padronização de nomenclatura (correção de termos como "Rebalancement" para "Rebalanceamento", etc.)
  * Adição da seção "Frozen Baseline" ao PROJECT_BOOTSTRAP.md
  * Adição das seções "Lições Aprendidas" e "Encerramento Oficial" ao ER-005
  * Atualização dos documentos de projeto para refletir a consolidação final
  * Esta é a última atividade oficial da EWO-005

### Versão 1.73

**EWO-005 Slice 12 — Relatórios / Exportação ENCERRADA.** Feature `reports` da Camada de Apresentação materializada: `ReportsPage`, `ReportsList`, `ReportCard`, `ReportFilters`, `ExportPanel`, `ExportProgress`, `ReportsLoading`, `ReportsEmpty`, `ReportsError`; hooks `useReportsQuery` (catálogo estático via TanStack Query) e `useExportReportMutation` (TanStack Query `useMutation` + `useDispatcher` → `ExportarDadosQuery`); ViewModels `ReportViewModel`/`ExportResultValueModel` com mappers puros (`toReportViewModel`, `toReportViewModels`, `toExportResultValueModel`); query keys em `reports-query-keys.ts`. Componente Raiz (`presentation-dispatcher.ts`): registrado `ExportarDadosQuery` (via `ExportarDadosService`, consome `IProjectionRepository`). Rota `/portfolio/:portfolioId/reports`. 17 testes novos (14 feature + 3 testes de arquitetura R-10 estendido para reports), 260 totais, zero regressões. Construção/ESLint/Verificação de Tipo verdes nos arquivos da Slice. Aguarda auditoria ChatGPT antes do Encerramento da Engenharia (Slice 13). DOCUMENTATION_INDEX v1.57.

### Versão 1.72

**EWO-005 Slice 11 — Sincronização ENCERRADA.** Feature `sync` da Camada de Apresentação materializada: `SyncPage`, `SyncForm`, `SyncButton`, `SyncResultCard`, `SyncLoading`, `SyncError`, `SyncEmpty`; hook `useSyncMutation` (→ `SincronizarDadosCommand`); ViewModels com mappers puros. Componente Raiz registra `SincronizarDadosCommand` (bloco `portfolioRepository && eventPublisher && dataGateway && importInterpreter`). Nova infra: `DataGatewayRouter` (adapter `IDataGateway` roteável) + injeção de `DataGatewayRouter`/`ImportInterpreter` no `__root.tsx`. Rota `/sync`. 16 testes novos (13 feature + 3 testes de arquitetura R-10), 240 totais, zero regressões. Construção/ESLint/Verificação de Tipo verdes nos arquivos da Slice. Aguarda auditoria ChatGPT antes da Slice 12. PROJECT_STATUS v1.72.

### Versão 1.71

**EWO-005 Slice 10 — Configurações ENCERRADA.** Feature `settings` da Camada de Apresentação materializada: `SettingsPage`, `UserPreferencesCard`, `StrategySettings`, `GoalsSettings`, `NotificationSettings`, `ThemeSettings`, `AccountSettings`, `SettingsLoading`, `SettingsEmpty`, `SettingsError`; hooks `useSettingsQuery` (→ `ObterConfiguracoesQuery`) e `useUpdateSettingsMutation` (→ `ConfigurarEstrategiaCommand`); novos contratos de Aplicação `ObterConfiguracoesQuery`/`ConfiguracoesDto`/`ObterConfiguracoesService` + reuso de `ConfigurarEstrategiaCommand`; `presentation-dispatcher.ts` registra ambos no bloco `configurationRepository`; rota `/settings`. 22 testes novos (19 feature + 3 testes de arquitetura R-10 estendido para settings), 852 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.69.

### Versão 1.70

**AUDITORIA_INTERMEDIARIA_EWO-005.md** adicionado ao índice. Auditoria avaliativa das Slices 1-10 da EWO-005 (9 features da Camada de Apresentação). Veredito: 🟡 APROVADO COM RECOMENDAÇÕES. 222 testes da apresentação verdes (32 testes de arquitetura R-10). 4 achados (A1 duplicação de handler no Componente Raiz — MÉDIA; A2 import de DTO fora do padrão — BAIXA; A3 divisão de código ausente — BAIXA/MÉDIA; A4 teste redundante — INFO). Slice 11 (Sincronização) autorizada, condicionada à correção de A1. PROJECT_STATUS v1.69.

### Versão 1.69

**EWO-005 Slice 9 — Gestão Fiscal/IR ENCERRADA.** Feature `tax` da Camada de Apresentação materializada: `TaxPage`, `TaxSummary`, `TaxReportCard`, `TaxYearSelector`, `TaxFilters`, `TaxTable`, `TaxExportPanel`, `TaxLoading`, `TaxEmpty`, `TaxError`; hook `useTaxReportQuery` (→ `GerarRelatorioFiscalQuery`); `presentation-dispatcher.ts` registra `GerarRelatorioFiscalQuery` via `GerarRelatorioFiscalService` (consome `IProjectionRepository`); rota `/portfolio/:portfolioId/tax`. 24 testes novos (21 feature + 3 testes de arquitetura R-10 estendido para tax), 830 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.68.

### Versão 1.68

**EWO-005 Slice 8 — Rebalanceamento ENCERRADO.** Feature `rebalanceamento` da Camada de Apresentação materializada: `RebalancingPage`, `AllocationChart` (recharts), `AllocationComparison`, `SuggestedContribution`, `RebalancingTable`, `RebalancingFilters`, `RebalancingLoading`, `RebalancingEmpty`, `RebalancingError`; hook `useRebalancingQuery` (→ `CalcularRebalanceamentoQuery`); `presentation-dispatcher.ts` registra `CalcularRebalanceamentoQuery` via `CalcularRebangleamentoService` (consome `IProjectionRepository` + `IConfigurationRepository`); `__root.tsx` injeta `SupabaseConfigurationRepository`; rota `/portfolio/:portfolioId/rebalancing`. 23 testes novos (20 feature + 3 testes de arquitetura R-10 estendido para rebalanceamento), 806 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.67.

### Versão 1.67

**EWO-005 Slice 7 — Histórico e Rentabilidade ENCERRADA.** Feature `history` da Camada de Apresentação materializada: `HistoryPage`, `PerformanceSummary`, `PerformanceChart` (recharts), `BenchmarkComparison`, `HistoryTable`, `HistoryFilters`, `HistoryTable`, `HistoryFilters`, `HistoryLoading`, `HistoryEmpty`, `HistoryError`; hooks `useHistoricoQuery` (→ `ObterHistoricoPatrimonialQuery`) e `useRentabilidadeQuery` (→ `ConsultarRentabilidadeQuery`); `presentation-dispatcher.ts` registra `ConsultarRentabilidadeQuery` via `ConsultarRentabilidadeService`; rota `/portfolio/:portfolioId/history`. 22 testes novos (19 feature + 3 testes de arquitetura R-10 estendido para history), 783 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.66.

### Versão 1.66

**EWO-005 Slice 6 — Proventos ENCERRADO.** Feature `dividends` da Camada de Apresentação materializada: `DividendsPage`, `DividendsSummary`, `DividendsTable`, `DividendCard`, `DividendFilters`, `DividendDetails`, `DividendsLoading`, `DividendsEmpty`, `DividendsError`; hook `useDividendsQuery` (TanStack Query + `useDispatcher` → `ObterProventosQuery`); `presentation-dispatcher.ts` registra `ObterProventosQuery` via `AcompanharProventosService`; rota `/portfolio/:portfolioId/dividends`. 24 testes novos (21 feature + 3 testes de arquitetura R-10 estendido para dividends), 761 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.65.

### Versão 1.65

**EWO-005 Slice 5 — Operações ENCERRADA.** Feature `operations` da Camada de Apresentação materializada: `OperationPage`, `OperationForm` (RHF+zod), `OperationHistory`, `OperationTable`, `OperationFilters`, `OperationLoading`, `OperationError`, `OperationEmpty`; hooks (useRegisterOperationMutation → `RegistrarOperacaoCommand`, useOperations estado client-side); ViewModels; `presentation-dispatcher.ts` registra `RegistrarOperacaoCommand` quando `portfolioRepository`+`eventPublisher` injetados; `__root.tsx` injeta `SupabasePortfolioRepository`+`InProcessEventPublisher`; rota `/portfolio/:portfolioId/operations`. 20 testes novos (17 feature + 3 testes de arquitetura R-10 estendido para operations), 737 totais, zero regressões. Construção verde (exit 0). PROJECT_STATUS v1.64.

### Versão 1.64

**EWO-005 Slice 4 — Portfolio ENCERRADO.** Feature `portfolio` da Camada de Apresentação materializada: `PortfolioPage`, `PortfolioSummary`, `PortfolioTable`, `PortfolioCard`, `PortfolioFilters`, `AssetDetailsPanel`, `PositionRow`, `AllocationBadge`, `PortfolioLoading`, `PortfolioError`, `EmptyPortfolio`; hooks (usePortfolioQuery/usePortfolioSummaryQuery/useAssetDetailsQuery); ViewModels; dispatcher adapter estendido com `ConsultarPosicaoQuery`; rota `/portfolio/:portfolioId`. 25 novos testes, 717 totais, zero regressões. Construção verde. PROJECT_STATUS v1.63.

### Versão 1.63

**EWO-005 Slice 3 — Dashboard ENCERRADO.** Feature `dashboard` da Camada de Apresentação materializada: `DashboardView`, `KpiCards`, `PatrimonioConsolidado`, `AlocacaoChart`, `EvolucaoChart`, hooks (usePatrimonioQuery/useHistoricoQuery/useDashboardQuery), ViewModels, dispatcher adapter em `src/integrations` (Componente Raiz, fora da apresentação), rota `/dashboard`. 22 novos testes, 692 totais, zero regressões. Construção verde. PROJECT_STATUS v1.62.

### Versão 1.62

**EWO-005 Slice 2 — Autenticação ENCERRADA.** Feature `auth` da Camada de Apresentação materializada: `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `EmailVerificationPage`, `PerfilUsuarioPage`; hooks `useLoginMutation`, `useRegisterMutation`, `useForgotPasswordMutation`, `useEmailVerificationMutation`, `usePerfilUsuarioQuery`; ViewModels `LoginViewModel`/`RegisterViewModel`/`ForgotPasswordViewModel`/`EmailVerificationViewModel`/`PerfilUsuarioViewModel`; `AuthProvider` em `src/presentation/providers`; rota `/auth`. 22 novos testes, 640 totais, zero regressões. Construção verde. PROJECT_STATUS v1.61.

### Versão 1.61

**EWO-005 Slice 1 — Foundation ENCERRADA.** Feature `foundation` da Camada de Apresentação materializada: `DashboardView` (simplificado), `KpiCards` (simplificado), `PatrimonioConsolidado` (simplificado); hooks `usePatrimonioQuery`, `useHistoricoQuery`; ViewModels `PatrimonioConsolidadoViewModel`; dispatcher adapter em `src/integrations` (Componente Raiz, fora da apresentação); rota `/dashboard`. 15 novos testes, 577 totais, zero regressões. Construção verde. PROJECT_STATUS v1.60.

### Versão 1.60

**EWO-004 Encerramento da Engenharia concluído.** EWO-004-COVERAGE.md adicionado ao índice. PI-006, ER-006, EWO-004 adicionados ao índice. Camada de Infraestrutura finalizada (7 Slices, 630 testes). PI-005, ER-005, EWO-003 adicionados retroativamente. Camada de Aplicação registrada (8 Slices, 528 testes).

### Versão 1.59

**EWO-003 Encerramento da Engenharia concluído.** EWO-003-COVERAGE.md adicionado ao índice. PI-005, ER-005, EWO-003 adicionados ao índice. Camada de Aplicação finalizada (8 Slices, 528 testes). PI-004, ER-004, EWO-002 adicionados retroativamente. Camada de Infraestrutura registrada (7 Slices, 630 testes).

### Versão 1.58

**EWO-002 Encerramento da Engenharia concluído.** EWO-002-COVERAGE.md adicionado ao índice. PI-004, ER-004, EWO-002 marcados como ✅ Concluídos. Domínio Patrimonial finalizado.

### Versão 1.57

**PI-004 aprovada e integrada ao índice oficial.** ER-004 criada (Aprovado). Documentação do domínio patrimonial consolidada. Próxima etapa: EWO-002.

### Versão 1.56

- **SYNC-001 implementado.** Bootstrap consolidado como Runtime Operacional permanente. Visão da Engenharia em PARTE A. Regra de Promoção de Conhecimento Permanente. LISTA DE VERIFICAÇÃO DE OPERAÇÃO DE IA expandida com Qualidade de Promptos. Bootstrap v2.33.

### Versão 1.55

- **GOV-009 implementado.** Sincronização Operacional obrigatória. Ciclo completo de 8 etapas, regra de consistência do estado, bloco de relatório expandido. Bootstrap v2.32.

### Versão 1.54

- **GOV-008 refinado.** PASSO 0 generalizado para Agente Executor. Fluxo da Engenharia atualizado: PI define arquitetura, EWO apenas materializa. Bootstrap v2.31.

### Versão 1.53

- **GOV-006 implementado.** C-001 + C-02 concluídos (10 Slices, 175 testes). ER-C001-C002-001 aprovada (Excelente). API de Núcleo Congelada. Roteiro Técnico criado. Projeto entra em evolução do domínio de investimentos. Bootstrap v2.30.

### Versão 1.52

- **GOV-005 implementado.** C-001 (Núcleo de Fundação) concluída — 5 Slices, 13 arquivos de domínio, 83 testes, zero regressões. Convenções do Núcleo de Fundação registradas. BK-008 registrado. Bootstrap v2.29. LISTA DE VERIFICAÇÃO DE OPERAÇÃO DE IA v1.19.

### Versão 1.51

- **GOV-004 implementado.** Consolidação final da governança: verificação pós-sincronização, lista de verificação de encerramento (10 itens), EWO-001 refinada com slices independentes. Decisões registradas: validate() pós-construtor (temporária), ID de Entidade desacoplado, Dinheiro com escopo reduzido. Bootstrap v2.28. LISTA DE VERIFICAÇÃO DE OPERAÇÃO DE IA v1.18. EWO-001.md criado.

### Versão 1.50

- **GOV-003 implementado.** C-001 + C-02 concluídos (5 Slices, 11 arquivos de domínio, 42 testes, zero regressões). API de Núcleo Congelada. Entradas adicionadas para EWO-001.md e ER-C001-C002-001. Bootstrap v2.27.

### Versão 1.49

- **GOV-002 implementado.** G-001 — Sprint de Governança. GOV-001, GOV-002, padronização de relatórios. Bootstrap v2.26.

### Versão 1.48

- **GOV-001 implementado.** Adicionada entrada para 09_STRATEGIC_BACKLOG.md (PS#032 — Consolidação Metodológica).

### Versão 1.47

- **Adicionada entrada para PROJECT_BOOTSTRAP.md (PS#031 — Bootstrap do Projeto).**

### Versão 1.46

- **Atualização de vigência documental (Emenda Final ao PS#030D).**

### Versão 1.45

- **Atualização de vigência documental (Emenda ao PS#030D).**

### Versão 1.44

- **Atualização de vigência documental (PS#030D — Prompt 1).**

### Versão 1.43

- **Adicionada entrada para SYNC_HISTORY.md.**

### Versão 1.42

- **Adicionada entrada para DOCUMENTACAO_COMPLETA.md** (artefato derivado).

### Versão 1.41

- **Adicionada entrada para 19_GLOSSARY.md.**

### Versão 1.40

- **Removida entrada para 12_GLOSSARY.md** (conceito migrado para 19_GLOSSARY.md).

### Versão 1.39

- **Adicionada entrada para 16_PRODUCT_BACKLOG.md.**

### Versão 1.38

- **Adicionada entrada para 17_TRACEABILITY_MATRIX.md.**

### Versão 1.37

- **Adicionada seção 5: Decisões Arquiteturais (18_ARCHITECTURAL_DECISIONS/).**

### Versão 1.36

- **Criação do índice oficial da documentação.**
 
- **Definição da estrutura inicial dos documentos.**

(End of file - total 323 lines)