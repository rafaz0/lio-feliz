# EWO_EXECUTION_STANDARD.md — Padrão de Execução de Engineering Work Orders

**Documento:** EWO_EXECUTION_STANDARD.md

**Versão:** 1.0

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 19/07/2026

---

## 1. Objetivo

Este documento consolida a experiência adquirida durante a implementação das **EWO-002** (Domínio Patrimonial — 9 Slices, 362 testes), **EWO-003** (Application Layer — 8 Slices, 528 testes) e **EWO-004** (Infrastructure Layer — 7 Slices, 630 testes).

Define o padrão operacional permanente para execução de **qualquer Engineering Work Order** futura no projeto Lio Feliz.

**Não cria nova metodologia.** Apenas formaliza o procedimento já utilizado com sucesso.

---

## 2. Princípios

Os princípios abaixo foram observados em todas as EWOs concluídas e devem ser preservados:

| Princípio | Descrição |
|-----------|-----------|
| **Implementação Incremental** | Cada Slice produz um incremento completo, compilável e testável. |
| **Slice Pequena** | Escopo limitado a um conjunto coeso de componentes arquiteturais. |
| **Slice Independente** | Não depende de Slices futuras; apenas das concluídas. |
| **Slice Testável** | Cobertura de testes obrigatória (unitários + integração quando aplicável). |
| **Slice Reversível** | Rollback trivial via Git (commit por Slice). |
| **Zero Quebra Arquitetural** | PI referenciada é fonte exclusiva de arquitetura; EWO não cria nem modifica arquitetura. |
| **Baseline Lock Obrigatório** | PI, ER e EWO entram em congelamento no Gate de Entrada (GOV-M06). |
| **Clean Architecture Preservada** | Dependency Rule, DDD, Ports & Adapters, Dispatcher Pattern inalterados. |

---

## 3. Fluxo Oficial

```mermaid
PI (Approved)
    ↓
ER (Approved)
    ↓
EWO (Aprovada) ← Gate de Entrada → Baseline Lock (GOV-M06)
    ↓
Slice 1
    ↓
Auditoria ChatGPT (arquitetura, contratos, regressões, governança)
    ↓
Slice 2
    ↓
Auditoria ChatGPT
    ↓
...
    ↓
Slice N
    ↓
Engineering Closure
    ↓
GOV-M01–M06 (Sincronização Documental)
    ↓
Commit + Push
    ↓
Baseline Atualizada
```

**Regra:** Sem auditoria da Slice anterior, **não há autorização** para iniciar a próxima.

---

## 4. Estrutura Oficial de uma EWO

Toda EWO deve conter, obrigatoriamente, as seções abaixo:

| Seção | Obrigatória | Conteúdo |
|-------|-------------|----------|
| **Identificação** | ✅ | Documento, Versão, Status, Categoria |
| **PI Referenciada** | ✅ | PI-XXX vX.X (Approved) — fonte arquitetural exclusiva |
| **Engineering Review Referenciada** | ✅ | ER-XXX vX.X (Approved) — validação assumida integralmente |
| **Objetivo** | ✅ | O que a EWO materializa (uma camada/domínio específico) |
| **Escopo** | ✅ | Inclui / Não contempla (limites claros) |
| **Princípios Obrigatórios** | ✅ | Regras inegociáveis durante a implementação |
| **Princípio da Neutralidade** | ✅ | EWO organiza implementação; não define detalhes concretos |
| **Estratégia Geral** | ✅ | Ordem de dependências (não prioridade funcional) |
| **Referências Normativas** | ✅ | PIs, ERs, Bootstrap, Checklist — ordem de precedência |
| **Estrutura Oficial de uma Slice** | ✅ | Template padronizado (ver Seção 5) |
| **Fluxo Oficial de Execução** | ✅ | 11 etapas obrigatórias (ver Seção 5) |
| **Planejamento Executivo das Slices** | ✅ | Lista de Slices com objetivo, arquivos, testes, critérios |
| **Critérios de Entrada** | ✅ | Checklist (ver Seção 6) |
| **Critérios de Saída** | ✅ | Checklist (ver Seção 7) |
| **Engineering Closure** | ✅ | Quando emitir, conteúdo mínimo, aprovação final |

---

## 5. Definição Oficial de Slice

### 5.1 O que é

Uma **Slice** é a unidade oficial de execução de uma EWO. Representa um incremento completo de engenharia que:

- Materializa um conjunto coeso de componentes arquiteturais aprovados na PI
- Mantém o domínio íntegro ao final
- É completamente funcional, testável e compilável
- Serve de base para as Slices subsequentes

### 5.2 O que NÃO é

- Não é uma "feature" funcional isolada (features são consequência)
- Não é um "ticket" ou "task" genérico
- Não pode ser iniciada antes das dependências explícitas estarem concluídas
- Não introduz arquitetura (apenas materializa a aprovada)

### 5.3 Quando Dividir

Dividir em nova Slice quando:

- Conjunto de componentes arquiteturais tem coesão própria
- Dependências técnicas exigem ordem (ex.: base → aggregate → projeções)
- Escopo cabe em uma implementação + testes + revisão sem risco de regressão
- Permite auditoria isolada e significativa

### 5.4 Quando Unir

Unir componentes na mesma Slice quando:

- Têm dependência cíclica ou forte acoplamento interno
- São pequenos e complementares (ex.: value objects do mesmo aggregate)
- A separação criaria overhead de coordenação desnecessário

### 5.5 Granularidade Ideal

| Camada | Slices Típicas | Testes por Slice |
|--------|----------------|------------------|
| Domínio (EWO-002) | 8–10 | 30–50 |
| Application (EWO-003) | 7–9 | 50–80 |
| Infrastructure (EWO-004) | 6–8 | 70–100 |

**Regra prática:** 1 Slice ≈ 1 a 2 dias de implementação focada.

### 5.6 Independência

Cada Slice deve poder ser auditada, testada e revertida independentemente. Commits atômicos por Slice.

### 5.7 Reversibilidade

Rollback = `git revert <commit-da-slice>`. Sem migrações de banco, sem side effects externos.

### 5.8 Testabilidade

- Testes unitários: obrigatórios (cobertura >90% do código novo)
- Testes de integração: quando a Slice toca fronteiras (Ports, Dispatcher, DB)
- Testes de contrato: quando implementa Port ou DTO

---

## 6. Critérios de Entrada (Gate de Entrada)

Antes de iniciar **qualquer** EWO, validar **todos** os itens:

- [ ] **PI aprovada** — Existe, versão específica (PI-XXX vX.X), status **Approved**
- [ ] **ER aprovada** — Existe, versão específica (ER-XXX vX.X), status **Approved**
- [ ] **Baseline Lock** — GOV-M06 confirmado: PI, ER, EWO em regime de congelamento
- [ ] **Workspace sincronizado** — Working directory `H:\Lio Feliz\`, branch `main`, remote `git@github.com:rafaz0/lio-feliz.git`
- [ ] **Working Tree limpa** — `git status` sem alterações pendentes
- [ ] **Git sincronizado** — `origin/main` atualizado, sem divergências
- [ ] **Documentação consistente** — PROJECT_BOOTSTRAP, AI_CONTEXT, PROJECT_STATUS, DOCUMENTATION_INDEX alinhados
- [ ] **Engineering Outlook** — Próxima etapa no Bootstrap corresponde a esta EWO

**Se qualquer item falhar → interromper. Não prosseguir.**

---

## 7. Critérios de Saída (Gate de Saída por Slice)

Ao concluir **cada Slice**, validar **todos** os itens:

- [ ] **Implementação concluída** — Todos os arquivos previstos criados/alterados
- [ ] **Build verde** — `npm run build` sem erros
- [ ] **Testes verdes** — Suite completa passa (unit + integração da Slice)
- [ ] **Sem regressão** — Testes das Slices anteriores continuam passando
- [ ] **Lint aprovado** — `npm run lint` sem erros críticos
- [ ] **Commit criado** — Mensagem descritiva seguindo convenção do projeto
- [ ] **Push confirmado** — `origin/main` recebeu o commit
- [ ] **Relatório emitido** — Modelo oficial (ver Seção 8)
- [ ] **Working Tree limpa** — `git status` limpo após push
- [ ] **HEAD registrado** — Hash do commit no relatório

**Se qualquer item falhar → Slice não está concluída. Não iniciar próxima.**

---

## 8. Relatório Oficial da Slice

Todo relatório de Slice deve conter, **no mínimo**:

| Seção | Conteúdo |
|-------|----------|
| **Resumo Executivo** | O que foi implementado, status, evidência principal |
| **Arquivos** | Lista de arquivos criados/alterados com caminhos |
| **Testes** | Quantidade, tipo (unit/integração), cobertura, comando executado |
| **Build** | Resultado de `npm run build` |
| **Aderência Arquitetural** | Confirmação de que nenhum componente fora do escopo foi tocado; PI respeitada |
| **Pendências** | Lista com status (Implementada / Adiada / Rejeitada) — GOV-M04 |
| **Git** | Branch, HEAD, hash, push confirmado, working tree limpa |
| **Conclusão** | Slice CLOSED / Próxima Slice autorizada |

**Template de mensagem de commit:**
```
feat(ewo-XXX): conclui Slice N — <nome da slice>

- <componente 1>
- <componente 2>
- Testes: <N> unit + <M> integração
- Build: OK | Lint: OK
- Auditoria: pendente ChatGPT
```

---

## 9. Auditoria da Slice

**Responsável:** ChatGPT (Arquiteto / Auditor / Revisor)

**Valida obrigatoriamente:**

| Dimensão | Verificação |
|----------|-------------|
| **Arquitetura** | Clean Architecture, Dependency Rule, DDD, Ports & Adapters, Dispatcher |
| **Contratos** | Commands, Queries, DTOs, Ports, Errors idênticos à PI/ER |
| **Regressões** | Testes anteriores passam; nenhuma quebra silenciosa |
| **Governança** | GOV-M01 a GOV-M06, Baseline Lock, sincronização Git |
| **Aderência Metodológica** | Fluxo oficial, critérios de entrada/saída, relatório padrão |

**Resultado:** `APROVADA` (próxima Slice autorizada) ou `CHANGES REQUIRED` (correções obrigatórias antes de prosseguir).

---

## 10. Engineering Closure

### 10.1 Quando Emitir

Ao concluir a **última Slice** da EWO, após auditoria final aprovada.

### 10.2 Conteúdo Mínimo

| Seção | Obrigatória |
|-------|-------------|
| **Identificação** | EWO-XXX, data, status final |
| **Resumo Executivo** | Objetivo, Slices executadas, testes totais, regressões |
| **Cobertura Arquitetural** | Tabela DA × Status, Tabela Invariante × Status (se domínio) |
| **Cobertura de Slices** | Slice × Componentes × Status × Commits |
| **Verificação de Coesão** | Critérios de integridade do domínio/camada |
| **Estatísticas Finais** | Slices, testes, arquivos, regressões (zero) |
| **Conhecimento Consolidado** | KCs, KBs, BKs, TDs, melhorias (GOV-M03) |
| **Aprovação Final** | 🟢 CONCLUÍDA / 🔴 REJEITADA |

### 10.3 Critérios de Aprovação

- Todas as Slices `CLOSED`
- 100% das DAs materializadas
- 100% das Invariantes verificáveis validadas
- Zero regressões
- Documentação sincronizada (GOV-M01–M06)
- Git sincronizado (commit + push + working tree limpa)

---

## 11. Sincronização Documental (GOV-M01–M06)

Após Engineering Closure aprovada, executar **obrigatoriamente**:

```mermaid
Engineering Closure
    ↓
GOV-M01–M06 (Atualização documental)
    ↓
PROJECT_BOOTSTRAP (se houver decisão permanente — SYNC-001)
    ↓
AI_OPERATION_CHECKLIST (se novo protocolo — OP-010)
    ↓
DOCUMENTATION_INDEX (nova entrada + versão)
    ↓
PROJECT_STATUS (tabela Architecture Lab + Últimas Consolidações)
    ↓
PROJECT_STATE (Timeline + versão)
    ↓
SYNC_HISTORY (PS#XXX registrado)
    ↓
Commit único "GOV-M01–M06: Sincronização Documental Pós-EWO-XXX"
    ↓
Push
```

**Regra:** Nenhuma atividade considerada concluída sem este ciclo completo.

---

## 12. Lições Aprendidas (EWO-002, EWO-003, EWO-004)

### 12.1 O que funcionou bem

| Prática | EWO-002 | EWO-003 | EWO-004 | Recomendação |
|---------|---------|---------|---------|--------------|
| **Fakes primeiro** | ✅ Slice 1 | — | ✅ Slice 1 | **Sempre iniciar com fakes/in-memory** para desacoplar testes de infra |
| **Order por dependência** | ✅ Base → Aggregate → Projections | ✅ Contratos → Dispatcher → Services → Handlers | ✅ Fakes → Repos → UoW → Gateways | **Ordem técnica > ordem funcional** |
| **Uma Slice = um commit** | ✅ 9 commits | ✅ 8 commits | ✅ 7 commits | **Manter atomicidade** |
| **Auditoria por Slice** | ✅ 9 auditorias | ✅ 8 auditorias | ✅ 7 auditorias | **Não pular** — evita acúmulo de NCs |
| **Barrel exports** | ✅ index.ts por módulo | ✅ | ✅ | **Facilita imports e refatoração** |
| **Zod para validação** | ✅ Domain events | ✅ DTOs/Commands | ✅ Repos/Gateways | **Padronizar validação de fronteira** |
| **Cobertura >90%** | ✅ 362 testes | ✅ 528 testes | ✅ 630 testes | **Exigir desde a Slice 1** |

### 12.2 Armadilhas evitadas

| Armadilha | Como foi evitada |
|-----------|------------------|
| Implementar infra antes do domínio | Ordem estrita: Domain → App → Infra |
| Criar arquitetura durante EWO | PI/ER congeladas (Baseline Lock) |
| Pular auditoria para "ganhar tempo" | Gate obrigatório: sem auditoria → sem próxima Slice |
| Testes apenas no final | Testes **dentro** da Slice (critério de saída) |
| Acúmulo de NCs | NCs corrigidas na Slice ou registradas para próxima |
| Working Tree suja entre Slices | Commit + Push obrigatórios por Slice |

### 12.3 Melhorias incorporadas

| Melhoria | Origem | Destino |
|----------|--------|---------|
| Architecture Tests (R-10) | Auditoria PI-007 | EWO-005 Slice 1 |
| ESLint `no-restricted-imports` | RA-007-001 | EWO-005 Slice 1 |
| `@tanstack/react-virtual` desde início | RA-007-004 | EWO-005 Slice 1 |
| `axe-core` no CI desde Slice 1 | RA-007-005 | EWO-005 Slice 1 |
| Mapeamento `Command → queryKeys` integral | RA-007-003 | EWO-005 Slice Dispatcher |

---

## 13. Referências Normativas

| Documento | Papel |
|-----------|-------|
| `PROJECT_BOOTSTRAP.md` | Runtime operacional (#1 precedência) |
| `AI_OPERATION_CHECKLIST.md` | Checklist executável obrigatório |
| `DEVELOPMENT_METHODOLOGY.md` | Metodologia detalhada |
| `PI-XXX (Approved)` | Fonte arquitetural exclusiva da EWO |
| `ER-XXX (Approved)` | Validação assumida integralmente |
| `EWO-XXX` | Este padrão + planejamento específico |
| `GOV-003, GOV-004, GOV-005, GOV-006, GOV-007, GOV-009, GOV-M01 a GOV-M06` | Regras de governança vinculantes |

---

## 14. Histórico

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0 | 19/07/2026 | Criação consolidando EWO-002, EWO-003, EWO-004 |

---

> **Nota:** Este documento é **vivo**. Melhorias identificadas durante futuras EWOs devem ser incorporadas via GOV-M03 (Política de Melhoria Contínua) e GOV-017 (Governança Evolutiva), mantendo o princípio da metodologia mínima.