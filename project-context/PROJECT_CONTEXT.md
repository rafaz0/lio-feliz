# Project Context — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** PROJECT_CONTEXT.md

**Versão:** 1.4

**Status:** APROVADO

**Categoria:** Project Context

**Responsável:** Rafael Santos + IA

**Última atualização:** 12/07/2026

---

**Aviso:** Este documento é um resumo para inicialização de novas conversas. Deve permanecer pequeno e atualizado.

---

## Visão Geral

O Lio Feliz é um dashboard de investimentos para investidores de longo prazo. O sistema registra operações de compra/venda, calcula posição consolidada, rentabilidade, proventos recebidos, IRPF e oferece análises patrimoniais.

---

## Estado Atual da Documentação

- Estrutura oficial em `docs/`, indexada por `DOCUMENTATION_INDEX.md`.
- 35 documentos oficiais (Fundação, Produto, BRs, TAs, ADRs, Backlog, Traceability Matrix, Glossary).
- Consolidação nº 1 concluída. Sprint de Estabilização nº 1 concluída.

---

## Architecture Lab

- Pasta `architecture-lab/` — independente da documentação oficial.
- Contém: Constituição, Modelo Conceitual, Leis do Domínio, Fluxo de Conhecimento, Linguagem Canônica, Research Log, Ideas Backlog, Engineering Roadmap, Implementation Plan, Milestones.
- Metodologia de trabalho: Registro Contínuo de Conhecimento e Geração de Prompts Autossuficientes.

---

## Metodologia de Trabalho

1. Toda descoberta arquitetural relevante deve ser registrada no Architecture Lab.
2. Prompts para OpenCode devem ser autossuficientes — nunca referenciar histórico da conversa.
3. Ao final de cada sessão: Consolidação da Sessão (3 perguntas).
4. Hipóteses permanecem no lab; docs/ contém apenas decisões consolidadas.

---

## Principais Pendências

- `06_BUSINESS_RULES/02_TRANSACTIONS.md` — não criado.
- Documentos complementares (07 a 15) — pendentes.
- Technical Annexes (03 a 07) — pendentes.
- FEAT-014 (Template Oficial de Prompts) — não implementado.
- FEAT-015 (Fluxo Oficial de Auditoria) — não implementado.

---

## Próximos Passos

Retornar ao PS#030 — Convergência Arquitetural.

---

## Protocolos Metodológicos Ativos

Ver `DEVELOPMENT_METHODOLOGY.md` v1.6 para lista completa. Destaques:

- IA-015: Persistência Operacional — manter Estado Operacional durante toda a sessão
- IA-016: Relatórios Operacionais — Sugestões Técnicas e Oportunidades Futuras
- IA-025: Continuidade Operacional — objetivo atual permanece válido até evidência contrária
- IA-026: Autoverificação Operacional — verificar modo, DEC, evidência antes de responder
- IA-027: Tratamento de Evidências Externas
- IA-028: Agrupamento Inteligente de Execução
- IA-029: Baseline Operacional
- PG-019: Estabilidade das Decisões — DEC aprovada é válida; reavaliação só com evidência
- OP-002: Encerramento por Entrega Relevante
- OP-003: Formato Visual Padronizado
- OP-007: Classificação das Sugestões
- OP-008: Fluxo de Múltiplos Prompts
- OP-009: Estrutura Padrão de Prompts
- OP-010: Checklist Vinculado aos Protocolos
- OP-011: Template Vinculado aos Protocolos
- OP-012: Classificação Oficial das Pendências (Pendências da Sprint, Backlog Estratégico, Fila de Execução)
- Painel Operacional: layout, exibição, percentuais e fórmulas documentados
- PS_TEMPLATE.md: template oficial para Pacotes de Sincronização

---

## Backlog Estratégico

### BK-001 — Simplificar AI_CONTEXT

**Objetivo:** Reduzir tamanho do documento derivado mantendo apenas informações operacionais relevantes.

**Prioridade:** Baixa

### BK-002 — Verificar referências do último PS

**Objetivo:** Na próxima regeneração da documentação, verificar se todas as referências ao último PS refletem corretamente o estado atual do projeto.

**Prioridade:** Baixa

---

## Histórico

### Versão 1.4

Emenda Final ao PS#030D — OP-012 criado. IA-026 atualizada com Backlog Estratégico. BK-001 e BK-002 registrados.

### Versão 1.3

Emenda ao PS#030D — Ritual OP-002 inomitível. OP-010, OP-011. PS_TEMPLATE.md criado.

### Versão 1.2

PS#030D (Prompt 1) — Consolidação Operacional. IA-028, IA-029, OP-008, OP-009, Painel Operacional, AI_OPERATION_CHECKLIST.md criado.

### Versão 1.1

PS#030B concluído. Protocolos operacionais refinados. IA-015 fortalecido. IA-025, IA-026, PG-019, OP-002, OP-003 formalizados. AI_CONTEXT.md criado.

### Versão 1.0

Padronização oficial dos metadados do Project Context. Criação da estrutura de metadados (Versão, Status, Categoria, Responsável, Última atualização).
