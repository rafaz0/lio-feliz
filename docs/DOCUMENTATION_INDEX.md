# Lio Feliz - Documentação Oficial

# DOCUMENTATION_INDEX.md

**Projeto:** Lio Feliz

**Documento:** DOCUMENTATION_INDEX.md

**Versão da Documentação:** 1.34

**Status:** APROVADO

**Última atualização:** 17/07/2026

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

🟡 07_PROJECT_CONTEXT.md

Histórico do projeto.

---

🟡 08_FEATURES.md

Lista completa das funcionalidades.

---

🟡 09_ROADMAP.md

Planejamento futuro.

---

🟡 10_CHANGELOG.md

Registro oficial de alterações.

---

🟡 11_AI_INSTRUCTIONS.md

Instruções específicas para Inteligências Artificiais.
---

🟡 13_DECISIONS.md

Registro das decisões arquiteturais e estratégicas.

---

🟡 14_DESIGN_PRINCIPLES.md

Princípios de design e experiência do usuário.

---

🟡 15_PRODUCT_PHILOSOPHY.md

Princípios filosóficos do produto.

---

✅ 16_PRODUCT_BACKLOG.md

Backlog oficial do produto com funcionalidades aprovadas.

---

✅ 17_TRACEABILITY_MATRIX.md

Metodologia + matriz oficial de rastreabilidade: conecta features a Business Rules, Use Cases, Technical Annexes e ADRs.

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
