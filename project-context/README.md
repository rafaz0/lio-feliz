# Project Context — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** README.md

**Versão:** 1.17

**Status:** APROVADO

**Categoria:** Project Context

**Responsável:** Rafael Santos + IA

**Última atualização:** 10/07/2026

---

Esta pasta contém documentos de apoio ao desenvolvimento do projeto Lio Feliz, utilizados exclusivamente para facilitar a continuidade entre sessões de trabalho com IA.

## Relação com outras pastas

| Pasta | Propósito |
|-------|-----------|
| `docs/` | Documentação oficial do sistema. Fonte da verdade. |
| `architecture-lab/` | Descoberta e amadurecimento arquitetural. Hipóteses e pesquisas. |
| `project-context/` | Apoio ao desenvolvimento. Contexto para novas conversas. **Não é documentação oficial.** |

## Estrutura

| Arquivo | Finalidade |
|---------|-----------|
| `PROJECT_CONTEXT.md` | Resumo para iniciar novas conversas com ChatGPT. |
| `PROJECT_STATUS.md` | Estado completo do projeto. |
| `WORKFLOW.md` | Metodologia oficial de trabalho (fluxo operacional). |
| `DEVELOPMENT_METHODOLOGY.md` | Metodologia de desenvolvimento (regras IA, Ciclos de Maturidade). |
| `KNOWLEDGE_BACKLOG.md` | Registro de conhecimento não promovido (hipóteses, insights, evoluções). |
| `AI_CONTEXT.md` | Documento oficial de inicialização de conversas com IA (regenerado após cada PS). |
| `SYNC_HISTORY.md` | Histórico consolidado de todos os Pacotes de Sincronização. |
| Metodologia | Fluxo Oficial: Ideia → Classificação → Fila → Prompt → OpenCode → Documentação → Baseline. |

## Fluxo de Inicialização

O projeto utiliza um fluxo obrigatório de inicialização de conversas:

| Etapa | Documento | Descrição |
|-------|-----------|-----------|
| 1 | `AGENTS.md` | Ponto de entrada automático (injetado pelo OpenCode). Contém direcionamento para o AI_CONTEXT. |
| 2 | `AI_CONTEXT.md` | Documento oficial de reconstrução de contexto. Deve ser lido integralmente antes de qualquer resposta técnica. |
| 3 | `DEVELOPMENT_METHODOLOGY.md` | Define as regras oficiais do processo (IA-001 a IA-017). A Baseline da Conversa e o Protocolo de Pré-Resposta são executados após a leitura do AI_CONTEXT. |

---

## Padrão dos Documentos

Todos os documentos do **Project Context** deverão seguir a mesma estrutura documental utilizada pela documentação oficial.

Isso inclui:

- **Metadados** — Versão, Status, Categoria, Responsável, Última atualização.
- **Versionamento** — Cada documento possui versão semântica (X.Y).
- **Histórico** — Registro de alterações relevantes ao final de cada documento.
- **Rastreabilidade** — Referência cruzada entre documentos do Project Context e da documentação oficial quando aplicável.

O objetivo é manter consistência entre toda a documentação do projeto, independentemente de sua categoria.

---

## Histórico

### Versão 1.17

PS#019 Prompt A: 04_PORTFOLIO_LEDGER.md N0→N1 (v0.20).

### Versão 1.16

### Versão 1.9

PS#011 Prompt A: Inicialização de Conversas fortalecida. AGENTS.md direciona oficialmente para AI_CONTEXT. Fluxo de Inicialização documentado.

### Versão 1.8

PS#010 Prompt D (Final): Migração da Fonte Canônica para H:\Lio Feliz. Infraestrutura atualizada. Estruturas antigas removidas. PS#010 encerrado.

### Versão 1.7

PS#010 Prompt C: AI_CONTEXT formalizado como documento oficial de inicialização. IA-015 (Protocolo de Pré-Resposta) e IA-016 criadas. WORKFLOW.md v1.3.

### Versão 1.6

PS#010 Prompts A e B: AI_CONTEXT.md v1.1 com conteúdo consolidado (metodologia, regras IA, KB, WDs).

### Versão 1.5

PS#009 Prompt D: Ciclo de Vida do Conhecimento, KNOWLEDGE_BACKLOG v1.2 com status oficiais.

### Versão 1.4

PS#009 concluído. Baseline da Conversa (Fase 0) registrada na metodologia.

### Versão 1.3

Adicionada referência ao Fluxo Oficial de Preservação do Conhecimento. Sincronização do PS#009 Prompt B.

### Versão 1.2

Adicionada entrada para KNOWLEDGE_BACKLOG.md na tabela de estrutura. Sincronização do PS#009.

### Versão 1.1

Adicionada entrada para DEVELOPMENT_METHODOLOGY.md na tabela de estrutura. Sincronização do Pacote #007.

### Versão 1.0

Padronização oficial dos metadados do Project Context. Criação da estrutura de metadados (Versão, Status, Categoria, Responsável, Última atualização). Adicionada seção "Padrão dos Documentos".
