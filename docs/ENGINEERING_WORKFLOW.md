# ENGINEERING_WORKFLOW.md

**Projeto:** Lio Feliz

**Categoria:** Engineering

**Versão:** 0.10

**Status:** Working Draft

**Maturidade:** N0 — Ideia

**Responsáveis:** Rafael Santos + IA

---

# 1. Objetivo

Este documento define o fluxo operacional utilizado para transformar decisões arquiteturais em código executável.

Seu objetivo é garantir que toda implementação siga um processo previsível, rastreável e alinhado à metodologia do projeto.

---

# 2. Visão Geral

Toda implementação deverá seguir obrigatoriamente o fluxo abaixo.

```

Nova Necessidade
        │
        ▼
Análise
        │
        ▼
Arquitetura
        │
        ▼
Engineering
        │
        ▼
Implementation Plan
        │
        ▼
Codificação
        │
        ▼
Validação
        │
        ▼
Pacote de Sincronização
        │
        ▼
Encerramento

```

Nenhuma etapa deverá ser ignorada sem decisão arquitetural explícita.

---

# 3. Etapas

## 3.1 Identificação

Uma necessidade pode surgir de:

- nova funcionalidade;
- inconsistência arquitetural;
- auditoria;
- refatoração;
- melhoria técnica.

Resultado esperado:

Necessidade claramente descrita.

---

## 3.2 Análise

A necessidade deverá ser analisada para responder:

- existe documentação relacionada?
- existe ADR correspondente?
- existe Business Rule?
- existe Working Draft?
- há impacto arquitetural?

Resultado esperado:

Escopo definido.

---

## 3.3 Arquitetura

Caso necessário:

- atualizar Architecture;
- criar ADR;
- revisar Working Drafts.

Nenhuma implementação deverá iniciar sem arquitetura aprovada.

---

## 3.4 Planejamento

Criar ou atualizar:

IMPLEMENTATION_PLAN_PSxxx.md

O plano deverá definir:

- objetivos;
- escopo;
- etapas;
- critérios de aceite;
- riscos;
- dependências.

---

## 3.5 Implementação

Executar exatamente o plano aprovado.

Durante esta etapa deverão ser evitadas decisões arquiteturais.

Caso novas decisões sejam necessárias, retornar à etapa de Arquitetura.

---

## 3.6 Validação

Validar:

- funcionamento;
- aderência arquitetural;
- documentação;
- compatibilidade.

Problemas encontrados retornam para Implementação.

---

## 3.7 Sincronização

Concluir o Pacote de Sincronização correspondente.

Atualizar:

- Knowledge Backlog;
- Working Drafts;
- documentação afetada.

---

## 3.8 Encerramento

Uma implementação somente poderá ser encerrada quando:

- objetivos concluídos;
- documentação atualizada;
- código validado;
- sincronização concluída.

---

# 4. Fluxos Especiais

## Correção Emergencial

Correções urgentes poderão seguir fluxo reduzido:

Necessidade

↓

Implementação

↓

Validação

↓

Sincronização

Toda decisão arquitetural deverá ser documentada posteriormente.

---

## Refatoração

Refatorações seguem o fluxo completo.

Mesmo sem alterar comportamento funcional, deverão possuir plano próprio.

---

# 5. Critérios de Qualidade

Toda implementação deverá:

- preservar rastreabilidade;
- respeitar Engineering Rules;
- respeitar a Arquitetura Oficial;
- possuir documentação correspondente.

---

# 6. Indicadores

Durante a evolução do projeto poderão ser medidos:

- tempo médio por PS;
- quantidade de ADRs;
- cobertura arquitetural;
- percentual de convergência;
- pendências abertas.

---

# Histórico

## v0.10

Criação inicial do fluxo operacional da Engenharia.
