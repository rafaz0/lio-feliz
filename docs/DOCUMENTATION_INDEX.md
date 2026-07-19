# Lio Feliz - Documentação Oficial

# DOCUMENTATION_INDEX.md

**Projeto:** Lio Feliz

**Documento:** DOCUMENTATION_INDEX.md

**Versão da Documentação:** 1.52

**Status:** APROVADO

**Última atualização:** 19/07/2026

---

# Objetivo

Este documento é o índice oficial da documentação do projeto Lio Feliz.

Ele define quais documentos existem, quais já foram concluídos, quais ainda estão em desenvolvimento e qual deve ser a ordem de leitura.

Toda IA ou desenvolvedor deve utilizar este documento como referência antes de consultar os demais arquivos da documentação.

---

# Ordem Obrigatória de Leitura

## 1. Fundação

✅ 00_START_HERE.md

Define como o projeto deve ser desenvolvido.

---

✅ 01_VISION.md

Define a missão, visão e filosofia do produto.

---

✅ 02_PROJECT_RULES.md

Define todas as regras de desenvolvimento.

---

# 2. Produto

✅ 03_PRODUCT_REQUIREMENTS.md

Define os módulos do sistema.

---

✅ 04_DATA_MODEL.md

Define os conceitos fundamentais do domínio.

---

✅ 05_SYSTEM_ARCHITECTURE.md

Define a arquitetura do sistema.

---

# 3. Regras de Negócio

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

06_REBALANCING.md 🔴

07_GOALS.md 🔴

08_TAX.md 🔴

09_FIXED_INCOME.md 🔴

10_INTERNATIONAL.md 🔴

11_IMPORT_EXPORT.md 🔴

12_INTEGRATIONS.md 🔴

13_REPORTS.md 🔴

---

# 4. Documentação Complementar

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

✅ 19_GLOSSARY.md

Vocabulário oficial do projeto. Define cada conceito relevante com uma única definição oficial.

---

✅ SYNC_HISTORY.md

Registro oficial de sincronizações (Pacotes de Sincronização).

---

📄 PROJECT_BOOTSTRAP.md

Documento de inicialização rápida. Memória executiva resumida para continuidade entre chats.

---

📄 09_STRATEGIC_BACKLOG.md (architecture-lab)

Repositório oficial de melhorias estratégicas aprovadas para implementação futura.

---

📄 EWO-002-COVERAGE.md (architecture-lab)

Relatório de Cobertura Arquitetural da EWO-002. v1.0 (APROVADO). 12/12 DAs materializadas, 11/13 Invariantes validadas, 9/9 Slices.

---

📄 PI-004.md (architecture-lab)

Engineering Specification oficial do Modelo Patrimonial do Lio Feliz. v1.0 (Approved). 12 Decisões Arquiteturais (DA-001 a DA-012), 13 Invariantes (I-001 a I-013). Define Portfolio como Aggregate Root, Financial Events como mecanismo de evolução, Projections como visões derivadas. Personal Finance Domain e Decision Support como módulos complementares. **✅ Concluído — implementado via EWO-002.**

---

📄 ER-004.md (architecture-lab)

Engineering Review da PI-004. v1.0 (Approved). Gap analysis completo, validação de aderência ao Core Foundation, 8-11 slices estimadas para EWO-002. Aprovada para materialização via EWO-002. **✅ Concluído — EWO-002 implementada e encerrada.**

---

📄 PI-005.md (architecture-lab)

Engineering Specification oficial da Application Layer do Lio Feliz. v1.0 (Approved). 14 Serviços de Aplicação, 9 Portas de saída. Define Service Layer, Use Cases, Ports & Adapters. **✅ Concluído — implementado via EWO-003.**

---

📄 ER-005.md (architecture-lab)

Engineering Review da PI-005. v1.0 (Approved). Gap analysis completo, validação de aderência ao Domínio Patrimonial. **✅ Concluído — EWO-003 implementada e encerrada.**

---

📄 EWO-003.md (architecture-lab)

Engineering Work Order oficial da Implementação da Application Layer. Concluído — 8 Slices, 528 testes, 14 Services, 9 Ports, zero regressões.

---

📄 PI-006.md (architecture-lab)

Engineering Specification oficial da Infrastructure Layer do Lio Feliz. v1.0 (Approved). 10+ Portas de infraestrutura (Repository, UnitOfWork, DataGateway, Notification, EventPublisher, Subscription, Permission, Authorization, TransactionManager, ImportInterpreter), 14+ Adapters (Supabase, Postgres, Redis, HTTP, WebSocket), Cross-Cutting (Logging, Retry, Configuration, ErrorMapping). **✅ Concluído — implementado via EWO-004.**

---

📄 ER-006.md (architecture-lab)

Engineering Review da PI-006. v1.0 (Approved). Gap analysis completo, validação de aderência à Application Layer. **✅ Concluído — EWO-004 implementada e encerrada.**

---

📄 EWO-004.md (architecture-lab)

Engineering Work Order oficial da Implementação da Infrastructure Layer. Concluído — 7 Slices, 630 testes, 10+ Ports → 14+ Adapters, infraestrutura integrada, zero regressões.

📄 EWO-005.md (architecture-lab)

Engineering Work Order oficial da Implementação da Presentation Layer. Plano de execução incremental por Slices (Foundation, Autenticação, Dashboard, Portfolio, Operações, Importação, Performance, Rebalanceamento, IR, Configurações, Integração Geral, Engineering Closure). Baseado na PI-007 v1.2 Approved e ER-007 v1.0 Approved. **🟢 Em execução — Slices 1-4 (Foundation, Autenticação, Dashboard, Portfolio) CLOSED.**

---

📄 PI-007.md (architecture-lab)

Engineering Specification oficial da Presentation Layer do Lio Feliz. v1.2 (Approved). Define arquitetura da camada de apresentação: Feature-First structure, TanStack Start + Tailwind + shadcn/ui, comunicação exclusiva via Dispatcher (Commands/Queries/DTOs), gerenciamento de estado (TanStack Query + React Context), 13 features funcionais mapeadas aos 14 UCs e 34 FRs. Refinamentos R-06 a R-13 incorporados: Fonte Oficial da Verdade, Composition Components, Convenção de Hooks, Estratégia TanStack Start, Architecture Tests, Performance Guidelines, Error Handling, Loading Strategy. **✅ Approved — ER-007 concluída, pronta para EWO-005.**

---

📄 ER-007.md (architecture-lab)

Engineering Review da PI-007 v1.2. v1.0 (Approved). Auditoria completa dos 15 critérios obrigatórios: consistência arquitetural (Clean Architecture, Dependency Rule, Dispatcher Pattern), compatibilidade com 4 camadas-base congeladas, organização Feature-First, gerenciamento de estado (Server/Client/Form/Auth), comunicação exclusiva via Dispatcher (5 Commands, 9 Queries, 13+ DTOs, 5 Errors, IDispatcher), estratégia TanStack Start (SSR, Client Components, Server Functions, Hydration, Streaming), testabilidade (Unit/Component/Integration/E2E + Architecture Tests), performance (lazy loading, code splitting, virtualização, prefetch, Suspense), UX (Loading/Error/Empty states, Toast/Banner/Modal/Retry/Error Boundary), acessibilidade (WCAG 2.1 AA), governança (GOV-M01-M06, Baseline Lock), riscos (0 críticos, 0 altos, 5 médios, 2 baixos), prontidão para implementação confirmada. **Veredito: APPROVED — PI-007 autorizada para EWO-005.**

---

📄 PI-003.md (architecture-lab)

Engineering Specification oficial da Canonical Operations & Event Flow Architecture. v1.0 (Approved). Consolida a Trindade Arquitetural do Engineering N1.

---

📄 EWO-001.md (architecture-lab)

Engineering Work Order oficial da Implementação do Núcleo Arquitetural (C-001 + C-002). Concluído — 10 Slices, 175 testes, zero regressões.

---

📄 ER-C001-C002-001

Engineering Review de Consolidação da Core Foundation. Classificação: Excelente. Nenhuma divergência encontrada. Core API Frozen.

---

📄 PROJECT_BOOTSTRAP.md (seção "Fluxo Oficial da Engenharia")

Fluxo oficial do projeto: PROJECT_BOOTSTRAP → PI (define arquitetura) → ER (valida) → EWO (materializa) → Slices → Validação → Commit → Report → GOV → PROJECT_STATUS. Mapa de Dependências Documentais e Regra de Precedência (GOV-007). PI é fonte exclusiva de arquitetura; EWO não define arquitetura.

---

📄 PI-002.md (architecture-lab)

Engineering Specification oficial do Canonical Investment Model. v1.0 (Approved). Fonte Canônica da ontologia do domínio financeiro.

---

📄 PI-001.md (architecture-lab)

Engineering Specification oficial da Interpretation Layer. v1.0 (Approved). Fonte Canônica de engenharia da camada de interpretação.

---

📄 DOCUMENTACAO_COMPLETA.md

Artefato derivado. Consolidação da documentação para leitura e consulta. Fonte de verdade são os documentos individuais.

---

📄 `tools/workspace-check.ps1`

Workspace Guard oficial — guardião bloqueante. Valida diretório, git, remote, HEAD, branch, working tree, fingerprint e detecta clones duplicados. Exit Code 0 = OK, 1 = bloqueado. (GOV-011)

---

📄 `tools/start-opencode.ps1`

Script oficial de inicialização do projeto. Executa Workspace Guard e abre o OpenCode. Bloqueia se o Guard falhar. (GOV-011)

---

📄 `tools/start-opencode.bat`

Equivalente CMD do script de inicialização. (GOV-011)

---

📄 `project-context/WORKSPACE_FINGERPRINT.md`

Identidade oficial do workspace. Sua existência é validada pelo Workspace Guard em toda inicialização. (GOV-011)

---

📄 `project-context/EWO_EXECUTION_STANDARD.md`

Padrão oficial de execução de Engineering Work Orders. Consolida a experiência de EWO-002 (Domínio Patrimonial — 9 Slices, 362 testes), EWO-003 (Application Layer — 8 Slices, 528 testes) e EWO-004 (Infrastructure Layer — 7 Slices, 630 testes). Define: princípios, fluxo oficial, estrutura de EWO, definição de Slice, critérios de entrada/saída, relatório de Slice, auditoria, Engineering Closure, sincronização documental e lições aprendidas.

---

📄 `project-context/PRESENTATION_SLICE_TEMPLATE.md`

Template Oficial de execução de Slice da Presentation Layer. v1.0 (Oficial). Define o procedimento operacional para materializar cada Slice da EWO-005: entrada (PI/ER/EWO aprovadas, baseline lock, working tree limpa), identificação da Slice, regras obrigatórias (Clean Architecture, componentes, hooks, estado, error handling, loading, acessibilidade), Architecture Guard, testes (cobertura >90%), critérios de saída e relatório obrigatório. Não cria arquitetura nem altera decisões aprovadas. Complementa o EWO_EXECUTION_STANDARD no escopo da EWO-005.

---

# 5. Decisões Arquiteturais

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

# 6. Anexos Técnicos

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

03_REBALANCING_ALGORITHMS.md 🔴

04_IR_CALCULATIONS.md 🔴

05_CORPORATE_ACTION_EXAMPLES.md 🔴

06_CURRENCY_CONVERSION.md 🔴

07_PERFORMANCE_GUIDELINES.md 🔴

---

# Legenda

✅ Concluído

🟡 Em desenvolvimento

🔴 Planejado

---

# Regras

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

# Histórico

## Versão 1.52

- **EWO-005 Slice 9 — Gestão Fiscal (IR) CLOSED.** Feature `tax` da Presentation Layer materializada: TaxPage, TaxSummary, TaxReportCard, TaxYearSelector, TaxFilters, TaxTable, TaxExportPanel, TaxLoading, TaxEmpty, TaxError; hook `useTaxReportQuery` (→ `GerarRelatorioFiscalQuery`); `presentation-dispatcher.ts` registra `GerarRelatorioFiscalQuery` via `GerarRelatorioFiscalService` (consome `IProjectionRepository`); rota `/portfolio/:portfolioId/tax`. 24 testes novos (21 feature + 3 architecture R-10), 830 totais, zero regressões. Build verde (exit 0). PROJECT_STATUS v1.68.

## Versão 1.51

- **EWO-005 Slice 8 — Rebalanceamento CLOSED.** Feature `rebalancing` da Presentation Layer materializada: RebalancingPage, AllocationChart (recharts), AllocationComparison, SuggestedContribution, RebalancingTable, RebalancingFilters, RebalancingLoading, RebalancingEmpty, RebalancingError; hook `useRebalancingQuery` (→ `CalcularRebalanceamentoQuery`); `presentation-dispatcher.ts` registra `CalcularRebalanceamentoQuery` via `CalcularRebalanceamentoService` (consome `IProjectionRepository` + `IConfigurationRepository`); `__root.tsx` injeta `SupabaseConfigurationRepository`; rota `/portfolio/:portfolioId/rebalancing`. 23 testes novos (20 feature + 3 architecture R-10), 806 totais, zero regressões. Build verde (exit 0). PROJECT_STATUS v1.67.

## Versão 1.50

- **EWO-005 Slice 7 — Histórico e Rentabilidade CLOSED.** Feature `history` da Presentation Layer materializada: HistoryPage, PerformanceSummary, PerformanceChart (recharts), BenchmarkComparison, HistoryTable, HistoryFilters, HistoryLoading, HistoryEmpty, HistoryError; hooks `useHistoricoQuery` (→ `ObterHistoricoPatrimonialQuery`) e `useRentabilidadeQuery` (→ `ConsultarRentabilidadeQuery`); `presentation-dispatcher.ts` registra `ConsultarRentabilidadeQuery` via `ConsultarRentabilidadeService`; rota `/portfolio/:portfolioId/history`. 22 testes novos (19 feature + 3 architecture R-10), 783 totais, zero regressões. Build verde (exit 0). PROJECT_STATUS v1.66.

## Versão 1.49

- **EWO-005 Slice 6 — Proventos CLOSED.** Feature `dividends` da Presentation Layer materializada: DividendsPage, DividendsSummary, DividendsTable, DividendCard, DividendFilters, DividendDetails, DividendsLoading, DividendsEmpty, DividendsError; hook `useDividendsQuery` (TanStack Query + `useDispatcher` → `ObterProventosQuery`); `presentation-dispatcher.ts` registra `ObterProventosQuery` via `AcompanharProventosService`; rota `/portfolio/:portfolioId/dividends`. 24 testes novos (21 feature + 3 architecture R-10), 761 totais, zero regressões. Build verde (exit 0). PROJECT_STATUS v1.65.

## Versão 1.48

- **EWO-005 Slice 5 — Operations CLOSED.** Feature `operations` da Presentation Layer materializada: OperationPage, OperationForm (RHF+zod), OperationHistory, OperationTable, OperationFilters, OperationLoading, OperationEmpty, OperationError; hooks (useRegisterOperationMutation → `RegistrarOperacaoCommand`, useOperations estado client-side); ViewModels; `presentation-dispatcher.ts` registra `RegistrarOperacaoCommand` quando `portfolioRepository`+`eventPublisher` injetados; `__root.tsx` injeta `SupabasePortfolioRepository`+`InProcessEventPublisher`; rota `/portfolio/:portfolioId/operations`. 20 testes novos (17 feature + 3 architecture R-10), 737 totais, zero regressões. Build verde (exit 0). PROJECT_STATUS v1.64.

## Versão 1.47

- **EWO-005 Slice 4 — Portfolio CLOSED.** Feature `portfolio` da Presentation Layer materializada: PortfolioPage, PortfolioSummary, PortfolioTable, PortfolioCard, PortfolioFilters, AssetDetailsPanel, PositionRow, AllocationBadge, PortfolioLoading, PortfolioError, EmptyPortfolio; hooks (usePortfolioQuery/usePortfolioSummaryQuery/useAssetDetailsQuery); ViewModels; dispatcher adapter estendido com `ConsultarPosicaoQuery`; rota `/portfolio/:portfolioId`. 25 testes novos, 717 totais, zero regressões. Build verde. PROJECT_STATUS v1.63.

## Versão 1.46

- **EWO-005 Slice 3 — Dashboard CLOSED.** Feature `dashboard` da Presentation Layer materializada: DashboardView, KpiCards, PatrimonioConsolidado, AlocacaoChart, EvolucaoChart, hooks (usePatrimonioQuery/useHistoricoQuery/useDashboardQuery), ViewModels, dispatcher adapter em `src/integrations` (Composition Root, fora da presentation), rota `/dashboard`. 22 testes novos, 692 totais, zero regressões. Build verde. PROJECT_STATUS v1.62.

## Versão 1.45

- `project-context/PRESENTATION_SLICE_TEMPLATE.md` (v1.0, Oficial) adicionado ao índice. Template operacional para execução de Slices da Presentation Layer (EWO-005). Complementa o EWO_EXECUTION_STANDARD no escopo da EWO-005.

## Versão 1.44

- ER-007 (Approved) — Engineering Review da PI-007 v1.2. Auditoria completa dos 15 critérios: Clean Architecture, Dependency Rule, Dispatcher Pattern, Feature-First, gerenciamento de estado, comunicação via Dispatcher, estratégia TanStack Start, testabilidade (incl. Architecture Tests), performance, UX, acessibilidade (WCAG 2.1 AA), governança (GOV-M01-M06, Baseline Lock), riscos (0 críticos, 0 altos). Veredito: **APPROVED — PI-007 autorizada para EWO-005**. PI-007 promovida a Approved.

## Versão 1.43

- PI-007 atualizada para v1.2 (Draft). Refinamentos R-06 a R-13 incorporados: Fonte Oficial da Verdade, Composition Components, Convenção de Hooks, Estratégia TanStack Start oficial, Architecture Tests, Performance Guidelines, Error Handling Strategy, Loading Strategy. PI-007 pronta para ER-007.

## Versão 1.42

- PI-007 (Draft) — Presentation Layer adicionada ao índice. Arquitetura da camada de apresentação: Feature-First, TanStack Start + Tailwind + shadcn/ui, Dispatcher-only communication, 13 features, 14 UCs, 34 FRs. Aguarda ER-007 e EWO-005.

## Versão 1.41

- EWO-004 Engineering Closure concluído. PI-006, ER-006, EWO-004 adicionados ao índice. Infrastructure Layer finalizada (7 Slices, 630 testes). PI-005, ER-005, EWO-003 adicionados retroativamente. Application Layer registrada (8 Slices, 528 testes).

## Versão 1.40

- GOV-021 — 21_FUNCTIONAL_SPECIFICATION.md adicionado. Especificação funcional oficial criada (34 FRs, 14 UCs, 15 NFRs).

## Versão 1.39

- GOV-020 — 20_PROJECT_MAP.md adicionado. Project Map oficial institucionalizado como visão macro do projeto.

## Versão 1.38

- EWO-002 Engineering Closure concluído. EWO-002-COVERAGE.md adicionado ao índice. PI-004, ER-004, EWO-002 marcados como ✅ Concluídos. Domínio Patrimonial finalizado.

## Versão 1.37

- Sprint Documental GOV-010: Consolidação final da governança. AI_CONTEXT atualizado (Objetivo: EWO-002). PROJECT_BOOTSTRAP limpo (removidos resumos PI-001/002/003 históricos, Technical Roadmap movido, Precedência corrigida para Bootstrap #1). ER-004 marcada ✅ em Próximos Documentos. DOCUMENTATION_INDEX limpo (removidos 9 docs inexistentes). 09_STRATEGIC_BACKLOG BK-010/011/012 fechados. AI_OPERATION_CHECKLIST verificado sem redundâncias. DEVELOPMENT_METHODOLOGY: seção Engineering Audit adicionada, seção 13 obsoleta removida. ER-C001-C002-001.md criada. Engenharia apta para EWO-002.

## Versão 1.36

- PI-004 aprovada e integrada ao índice oficial. ER-004 criada (Approved). Documentação do domínio patrimonial consolidada. Próxima etapa: EWO-002.

## Versão 1.35

- SYNC-001 implementado. Bootstrap consolidado como Runtime Operacional permanente. Engineering Outlook em PARTE A. Regra de Promoção de Conhecimento Permanente. AI_OPERATION_CHECKLIST expandido com Qualidade de Prompts. Bootstrap v2.33.

## Versão 1.34

- GOV-009 implementado. Sincronização Operacional obrigatória. Ciclo completo de 8 etapas, regra de consistência do estado, bloco de relatório expandido. Bootstrap v2.32.

## Versão 1.33

- GOV-008 refinado. PASSO 0 generalizado para Agente Executor. Fluxo da Engenharia atualizado: PI define arquitetura, EWO apenas materializa. Bootstrap v2.31.

## Versão 1.32

- GOV-011 implementado. Entradas atualizadas para tools/ (GOV-011). WORKSPACE_FINGERPRINT.md adicionado. Bootstrap v2.30.

## Versão 1.31

- GOV-010 implementado. Entradas adicionadas para tools/workspace-check.ps1, start-opencode.ps1 e start-opencode.bat. Bootstrap v2.29.

## Versão 1.30

- GOV-007 implementado. Fluxo Oficial da Engenharia e Mapa de Dependências Documentais referenciados. Entrada adicionada para a seção Fluxo Oficial. Bootstrap v2.26.

## Versão 1.29

- GOV-006 implementado. C-001 + C-002 concluídos (10 Slices, 175 testes). ER-C001-C002-001 aprovada. Core API Frozen. Entradas adicionadas para EWO-001.md e ER-C001-C002-001. Bootstrap v2.24.

## Versão 1.28

- OP-015 + Baseline Arquitetural. Bootstrap v2.20. Custo documental como requisito arquitetural.

## Versão 1.27

- ER-003 — Engineering Review da PI-003 aprovada. PI-003 v1.0 (Approved). Engineering N1 consolidado. Bootstrap v2.19.

## Versão 1.26

- G-001 — Sprint de Governança. GOV-001, GOV-002, padronização de relatórios. Bootstrap v2.18.

## Versão 1.25

- PI-003 definida: Canonical Operations & Event Flow Architecture. Bootstrap v2.17.

## Versão 1.24

- ER-002 — Engineering Review da PI-002 aprovada. PI-002 v1.0 (Approved). Bootstrap v2.16.

## Versão 1.23

- PI-002 v0.1 (Draft) — Canonical Investment Model materializada. Bootstrap v2.14.

## Versão 1.22

- Ajuste Metodológico — Prioridade Arquitetural. PI-002 antes de EWO-001. Bootstrap v2.12.

## Versão 1.21

- ER-001 — Engineering Review aprovada. PI-001 v1.0 Approved. Bootstrap v2.11.

## Versão 1.20

- Engineering Outlook (EO-001). Seção padronizada de planejamento da próxima PI no Bootstrap. Bootstrap v2.10.

## Versão 1.19

- Consolidação Arquitetural — Classificação das Decisões Estratégicas. Universalidade e Multi-Mercado como Princípios Arquiteturais. BK-006 e BK-007. IA-036. DEVELOPMENT_METHODOLOGY.md v2.3. Bootstrap v2.9.

## Versão 1.18

- Consolidação Metodológica — Governança das PI e Gestão de Backlog. Papéis das Ferramentas formalizados. IA-033/034/035. DEVELOPMENT_METHODOLOGY.md v2.2. Bootstrap v2.8.

## Versão 1.17

- PI-001 v0.1 (Draft) — Interpretation Layer materializada. Bootstrap v2.7.

## Versão 1.16

## Versão 1.15

- Versionamento e Imutabilidade das PI. DEVELOPMENT_METHODOLOGY.md v2.1.

## Versão 1.14

- Fluxo de Engenharia (PI → EWO → ER) formalizado. DEVELOPMENT_METHODOLOGY.md v2.0.

## Versão 1.13

- OP-002 consolidado como Fonte Canônica exclusiva da ❤️ Saúde do Chat.

## Versão 1.12

- OP-002 evoluído (GS-001.1). ❤️ Saúde do Chat classificado 🟢🟡🔴. IA-031 Gatilhos renumerado para IA-032.

## Versão 1.11

- Continuidade Arquitetural formalizada (IA-031). Resumo Operacional Canônico obrigatório. Bootstrap v2.1 com PI-001 completo.

## Versão 1.10

- Auditoria de Runtime concluída. Bootstrap v2.0 comprovadamente autossuficiente. PROJECT_BOOTSTRAP.md v2.0.

## Versão 1.9

- Marco Documentação Consolidada registrado. Ciclo metodológico encerrado.

## Versão 1.8

- Adicionada entrada para 09_STRATEGIC_BACKLOG.md (PS#032 — Consolidação Metodológica).

## Versão 1.7

- Adicionada entrada para PROJECT_BOOTSTRAP.md (PS#031 — Bootstrap do Projeto).

## Versão 1.6

- Atualização de vigência documental (Emenda Final ao PS#030D).

## Versão 1.5

- Atualização de vigência documental (Emenda ao PS#030D).

## Versão 1.4

- Atualização de vigência documental (PS#030D — Prompt 1).

## Versão 1.3

- Adicionada entrada para SYNC_HISTORY.md.
- Adicionada entrada para DOCUMENTACAO_COMPLETA.md (artefato derivado).

## Versão 1.2

- Adicionada entrada para 19_GLOSSARY.md.
- Removida entrada para 12_GLOSSARY.md (conceito migrado para 19_GLOSSARY.md).

## Versão 1.1

- Adicionada entrada para 16_PRODUCT_BACKLOG.md.
- Adicionada entrada para 17_TRACEABILITY_MATRIX.md.
- Adicionada seção 5: Decisões Arquiteturais (18_ARCHITECTURAL_DECISIONS/).

## Versão 1.0

- Criação do índice oficial da documentação.
- Definição da estrutura inicial dos documentos.
