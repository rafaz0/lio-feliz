# Lio Feliz — Project Map

**Documento:** 20_PROJECT_MAP.md

**Versão:** 1.0

**Status:** APROVADO

**Categoria:** Documentação Oficial

**Última atualização:** 18/07/2026

---

> **Este documento é a visão macro oficial do projeto.**
>
> Ele não substitui nenhum documento existente — apenas conecta todos eles.
>
> Consulte `DOCUMENTATION_INDEX.md` para o índice completo.

---

# 1. Visão Geral

O Lio Feliz é uma plataforma de gestão patrimonial para investidores de longo prazo.

Seu objetivo é automatizar tarefas operacionais, centralizar informações financeiras e auxiliar o investidor a executar sua própria estratégia de forma organizada, simples e eficiente.

**Público-alvo:** investidores de longo prazo (ações, FIIs, ETFs, BDRs, renda fixa, ativos internacionais, fundos, REITs).

**Stack:** TanStack Start, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL), Cloudflare Module Worker.

**Princípio fundamental:** o sistema não recomenda investimentos — apenas organiza, calcula e automatiza.

---

# 2. Arquitetura Geral

```
Produto (visão, requisitos, backlog)
    ↓
Arquitetura (PIs, ERs, decisões arquiteturais)
    ↓
Domínio (regras de negócio, eventos, projeções)
    ↓
Application Layer (serviços, orquestração)
    ↓
Infrastructure (repositórios, APIs, persistência)
    ↓
Frontend (UI, dashboard, UX)
    ↓
Release (MVP → Versão 1.0)
```

**Produto** — define o que o sistema faz, para quem e por quê.

**Arquitetura** — define como o sistema é construído, suas camadas e contratos.

**Domínio** — implementa as regras de negócio de forma pura, sem dependências externas.

**Application Layer** — orquestra o domínio, coordena transações, expõe portas para infraestrutura.

**Infrastructure** — implementa persistência, APIs externas, autenticação, filas.

**Frontend** — interface com o usuário, dashboards, formulários.

---

# 3. Estrutura da Documentação

```
00_START_HERE
    ↓
01_VISION
    ↓
02_PROJECT_RULES
    ↓
03_PRODUCT_REQUIREMENTS
    ↓
04_DATA_MODEL
    ↓
05_SYSTEM_ARCHITECTURE
    ↓
06_BUSINESS_RULES/  (7/15 regras)
    ↓
07_TECHNICAL_ANNEXES/  (8/13 anexos)
    ↓
16_PRODUCT_BACKLOG
    ↓
17_TRACEABILITY_MATRIX
    ↓
18_ARCHITECTURAL_DECISIONS/  (ADRs)
    ↓
19_GLOSSARY
    ↓
20_PROJECT_MAP  ← você está aqui
```

**Documentos de Engenharia:**

```
PI-001, PI-002, PI-003  — Engineering N1 (aprovados)
PI-004                   — Domínio Patrimonial (concluído)
ER-001 a ER-004          — Engineering Reviews (aprovadas)
EWO-001                  — Core Foundation (concluído)
EWO-002                  — Domínio Patrimonial (concluído)
```

**Documentos de Governança:**

```
PROJECT_BOOTSTRAP   — Runtime Operacional
AI_CONTEXT          — Estado Operacional
AI_OPERATION_CHECKLIST — Checklist executável
DEVELOPMENT_METHODOLOGY — Metodologia detalhada
DOCUMENTATION_INDEX — Índice mestre da documentação
SYNC_HISTORY        — Histórico de sincronizações
KNOWLEDGE_BACKLOG   — Conhecimento pendente

PROJECT_STATUS      — Histórico do projeto
PROJECT_STATE       — Snapshot do estado atual
STRATEGIC_BACKLOG   — Melhorias estratégicas
AGENTS.md           — Configuração dos agentes
```

---

# 4. Roadmap da Engenharia

```
EWO-001 — Core Foundation + Modelo Canônico
    Status: ✅ DONE (10 slices, 175 testes)

EWO-002 — Domínio Patrimonial
    Status: ✅ DONE (9 slices, 362 testes, 12/12 DAs)

EWO-003 — Application Layer
    Status: ⏳ TODO (próxima etapa)

EWO-004 — Infrastructure
    Status: 🔲 PLANNED

EWO-005 — Frontend
    Status: 🔲 PLANNED

EWO-006 — Integração B3
    Status: 🔲 PLANNED
```

---

# 5. Estado Atual

```
Produto (visão, requisitos, backlog)
    ██████████ 100%

Arquitetura (PIs, ERs, ADRs)
    ██████████ 100%

Domínio (código do domínio patrimonial)
    ██████████ 100%

Application Layer (serviços, orquestração)
    ░░░░░░░░░░   0%

Infrastructure (repositórios, APIs, banco)
    ░░░░░░░░░░   0%

Frontend (UI, dashboards, UX)
    ░░░░░░░░░░   0%

Release (MVP, deploy, versão 1.0)
    ░░░░░░░░░░   0%
```

---

# 6. Fluxo Oficial da Engenharia

```
Produto (visão, necessidades)
    ↓
PI — Product Increment (define arquitetura)
    ↓
ER — Engineering Review (valida arquitetura)
    ↓
EWO — Engineering Work Order (materializa em slices)
    ↓
Implementação (código + testes)
    ↓
Engineering Review (valida implementação)
    ↓
Engineering Closure (encerra oficialmente)
    ↓
Consolidação (conhecimento + metodologia)
    ↓
Próxima EWO
```

**PI** — Documento arquitetural que especifica como construir. Fonte exclusiva de arquitetura.

**ER** — Revisão técnica que valida aderência à PI. Pode aprovar, aprovar com ajustes ou rejeitar.

**EWO** — Plano executivo que organiza a implementação em slices. Não cria arquitetura.

**Engineering Review** — Valida cada slice implementada antes do closure.

**Engineering Closure** — Registro oficial de encerramento de slice ou EWO.

---

# 7. Fluxo de Construção do Sistema

```
Requisitos (produto, usuário, regras de negócio)
    ↓
Domínio (regras de negócio puras, eventos, projeções)
    ↓
Application (serviços, orquestração, casos de uso)
    ↓
Infrastructure (repositórios, gateways, persistência)
    ↓
Frontend (UI, dashboards, interação)
    ↓
Integração (testes de ponta a ponta, validação)
    ↓
Release (deploy, MVP, versão 1.0)
```

Cada camada depende apenas da camada imediatamente inferior.

O domínio nunca depende de infraestrutura ou frontend.

---

# 8. Mapa do Domínio

```
Financial Events (Buy, Sell, Dividend, JCP, Bonus, Split, Grouping, Amortization, Adjustment)
    ↓
Portfolio (Aggregate Root — guardião das invariantes)
    ↓
PortfolioProjector (máquina de estados determinística)
    ↓
Positions (visão derivada: ticker, quantidade, custo)
    ↓
Asset Allocation (alocação por ativo/classe)
    ↓
Performance (rentabilidade, retorno)
    ↓
Portfolio History (evolução temporal, snapshots)
    ↓
Wealth Projection (visão consolidada cross-domain)
```

Tudo deriva de eventos. Nada é persistido como estado final.

O domínio é puro — zero dependências de infraestrutura.

---

# 9. Próximas Grandes Etapas

```
Application Layer (serviços, orquestração, casos de uso)
    ↓
Infrastructure (repositórios, Supabase, autenticação)
    ↓
Frontend (dashboards, carteira, formulários)
    ↓
Integração B3 (sincronização automática de dados)
    ↓
MVP (funcionalidades essenciais para lançamento)
    ↓
Versão 1.0 (plataforma estável completa)
```

---

# 10. Navegação Rápida

| Documento                    | Objetivo                               | Quando consultar                         |
| ---------------------------- | -------------------------------------- | ---------------------------------------- |
| `00_START_HERE.md`           | Regras fundamentais, fluxo de trabalho | Primeira leitura, dúvidas sobre processo |
| `01_VISION.md`               | Propósito, pilares, público-alvo       | Alinhamento estratégico                  |
| `02_PROJECT_RULES.md`        | Regras de desenvolvimento              | Antes de implementar                     |
| `03_PRODUCT_REQUIREMENTS.md` | Módulos, escopo, funcionalidades       | Entender o que o sistema faz             |
| `04_DATA_MODEL.md`           | Modelo conceitual do domínio           | Entender entidades e relações            |
| `05_SYSTEM_ARCHITECTURE.md`  | Arquitetura do sistema                 | Entender como o sistema é organizado     |
| `16_PRODUCT_BACKLOG.md`      | Todas as features aprovadas            | Priorização e planejamento               |
| `17_TRACEABILITY_MATRIX.md`  | Mapa de rastreabilidade                | Conectar features a regras e anexos      |
| `19_GLOSSARY.md`             | Vocabulário oficial                    | Dúvidas sobre terminologia               |
| `20_PROJECT_MAP.md`          | Visão macro do projeto                 | Orientação geral, primeiro contato       |
| `PROJECT_BOOTSTRAP.md`       | Runtime operacional                    | Iniciar sessão, continuar engenharia     |
| `PI-001` a `PI-004`          | Especificações arquiteturais           | Decisões de arquitetura                  |
| `EWO-001`, `EWO-002`         | Planos executivos                      | Entender o que foi implementado          |
| `DOCUMENTATION_INDEX.md`     | Índice mestre da documentação          | Localizar qualquer documento             |
| `SYNC_HISTORY.md`            | Histórico de sincronizações            | Verificar atividades recentes            |

---

# Histórico

## Versão 1.0

- Criação do documento.
- Definição das 10 seções oficiais.
- Institucionalizado via GOV-020.
