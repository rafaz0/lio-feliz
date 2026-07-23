# BR-21 — Onboarding Inteligente

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-012 (Onda 6 — Módulo 21)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Onboarding Inteligente** do Lio Feliz. O módulo guia o novo usuário pelos primeiros passos na plataforma, com máximo de 5 etapas e opção de pular a qualquer momento.

Onboarding é **orquestração** — consome conteúdo do módulo 17 (Educação) para tutoriais, e armazena estado exclusivamente via `IConfigurationRepository`. Nenhuma infraestrutura própria é criada (ADR-011-003 / R-016).

---

## 2. Modelo de Domínio

### 2.1 `OnboardingStep` (Entidade)

Define um passo do onboarding.

| Atributo      | Tipo               | Regra                                                      |
| ------------- | ------------------ | ---------------------------------------------------------- |
| `id`          | `OnboardingStepId` | Identificador único                                        |
| `stepType`    | `StepType`         | tutorial, config, first_operation, profile, glossary_intro |
| `title`       | `string`           | Título do passo                                            |
| `description` | `string`           | Descrição do passo                                         |
| `order`       | `number`           | Ordem do passo (1-5)                                       |
| `optional`    | `boolean`          | Se o passo pode ser pulado individualmente                 |

### 2.2 `UserProgress` (Entidade)

Progresso do usuário no onboarding.

| Atributo      | Tipo             | Regra                               |
| ------------- | ---------------- | ----------------------------------- |
| `id`          | `UserProgressId` | Identificador único                 |
| `userId`      | `string`         | ID do usuário                       |
| `currentStep` | `number`         | Passo atual (1-indexado)            |
| `status`      | `StepStatus`     | PENDING, ACTIVE, COMPLETED, SKIPPED |
| `startedAt`   | `Date`           | Data de início                      |
| `completedAt` | `Date`           | Data de conclusão                   |

### 2.3 Value Objects

**StepStatus**: `PENDING`, `ACTIVE`, `COMPLETED`, `SKIPPED`

**StepType**: `tutorial`, `config`, `first_operation`, `profile`, `glossary_intro`

---

## 3. Serviço de Domínio: `OnboardingFlow`

| Método                         | Descrição                                         |
| ------------------------------ | ------------------------------------------------- |
| `getNextStep(currentStep)`     | Retorna o próximo passo ou null se concluído      |
| `completeStep(progress, step)` | Marca passo como COMPLETED, avança para o próximo |
| `canSkip(step)`                | Retorna true se o passo é opcional                |
| `skipAll(progress)`            | Marca todos os passos como SKIPPED                |

### Passos Padrão (máximo 5)

```
1. tutorial      → "Boas-vindas ao Lio Feliz" (opcional)
2. config        → "Configure sua moeda e estratégia"
3. first_operation → "Faça seu primeiro lançamento"
4. profile       → "Responda ao questionário de perfil"
5. glossary_intro → "Conheça o glossário" (opcional)
```

---

## 4. Invariantes

- **I-001 (Máximo 5 passos):** O onboarding tem no máximo 5 passos (mitigação risco #3).
- **I-002 (Skip):** Todo passo pode ser pulado individualmente ou o onboarding inteiro pode ser pulado.
- **I-003 (Ordem sequencial):** Os passos são executados em ordem crescente (1→2→3→4→5).
- **I-004 (Sem infraestrutura própria — R-016):** Nenhum port de persistência é criado. Estado armazenado via `IConfigurationRepository`.

---

## 5. Não-escopo

- Conteúdo educacional (consome módulo 17 — Educação)
- Progresso do usuário em learning paths
- Gamificação

---

## 6. Dependências

- `IConfigurationRepository` — armazenamento de progresso (ADR-011-003)
- `IGlossaryRepository` (mód. 17) — conteúdo de passos tutorial/glossary (R-016)
