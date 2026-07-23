# Template Oficial — Execução de Slice da Presentation Layer

**Versão:** v1.0  
**Status:** Oficial  
**Categoria:** Template Operacional

---

# Objetivo

Executar uma Slice da Presentation Layer conforme:

- PROJECT_BOOTSTRAP.md
- AI_OPERATION_CHECKLIST.md
- EWO_EXECUTION_STANDARD.md
- PI-007 (Approved)
- ER-007 (Approved)
- EWO-005

Este template define apenas o procedimento operacional.

Não cria arquitetura.

Não altera decisões aprovadas.

---

# Entrada

Antes de iniciar a Slice confirmar:

- PI aprovada
- ER aprovada
- EWO aprovada
- Baseline Lock preservado
- Working Tree limpa
- Branch sincronizada
- Última Slice aprovada pelo ChatGPT

---

# Identificação da Slice

**Número da Slice:**

**Nome da Slice:**

**Objetivo:**

**Escopo:**

---

# Implementação

Implementar apenas os itens pertencentes ao escopo desta Slice.

Não implementar funcionalidades futuras.

Não antecipar outras Slices.

Toda comunicação deve respeitar:

Dispatcher

Application Layer

Ports

DTOs

Commands

Queries

Nunca acessar:

Infrastructure

Domain

Supabase

Serviços concretos

---

# Regras obrigatórias

## Clean Architecture

- Dependency Rule
- Ports & Adapters
- Dispatcher Only
- Feature-First
- Baseline Lock

---

## Componentes

Utilizar apenas as categorias oficiais:

- UI
- Feature
- Layout
- Shared
- Providers
- Composition

---

## Hooks

Seguir:

use<Recurso>Query()

use<Acao><Recurso>Mutation()

---

## Estado

Server State

TanStack Query

Client State

React Context

Forms

React Hook Form

---

## Error Handling

Result<T>

Application Errors

Toast

Retry

Error Boundary

Nunca interpretar exceções da Infrastructure.

---

## Loading

Skeleton

Spinner

Suspense

Optimistic Update

Placeholder

---

## Acessibilidade

WCAG 2.1 AA

Keyboard

Focus

ARIA

---

# Architecture Guard

Executar:

- ESLint
- Architecture Tests
- Dependency Tests
- Imports proibidos
- Dispatcher Only

Nenhuma violação é permitida.

---

# Testes

Executar conforme aplicável.

## Unit

## Component

## Integration

## Architecture Tests

## E2E (quando previsto)

Cobertura mínima:

> 90%

---

# Critérios de saída

A Slice somente poderá ser encerrada quando possuir:

- Build verde
- ESLint verde
- TypeCheck verde
- Testes verdes
- Zero regressões
- Working Tree limpa
- Commit realizado
- Push realizado

---

# Relatório obrigatório

Ao concluir emitir:

## Resumo Executivo

## Objetivo

## Componentes implementados

## Hooks implementados

## Providers atualizados

## Rotas implementadas

## Arquivos criados

## Arquivos modificados

## Testes

Quantidade

Cobertura

Architecture Tests

Build

Lint

TypeCheck

## Pendências

Classificadas em:

- GOV-M04
- GOV-M05
- Backlog Técnico

## Git

Branch

HEAD

Commit

Push

Working Tree

## Conformidade metodológica

Confirmar aderência à:

- PROJECT_BOOTSTRAP
- AI_OPERATION_CHECKLIST
- PI
- ER
- EWO
- EWO_EXECUTION_STANDARD

---

# Encerramento

Parar imediatamente após concluir esta Slice.

Não iniciar a próxima.

Aguardar auditoria do ChatGPT.
