# BR-19 — Assinaturas e Planos

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-011 (Onda 6 — Módulo 19)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Assinaturas e Planos** do Lio Feliz. O módulo gerencia planos de assinatura, controle de acesso por capabilities e ciclo de cobrança simulado.

O `AuthorizationService` centraliza as regras de autorização via **Plan Capabilities** — um conjunto de permissões associadas a cada plano, evitando verificações distribuídas pelo código (REC-011-002).

---

## 2. Modelo de Domínio

### 2.1 `Plan` (Entidade)

Define um plano de assinatura.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `PlanId` | Identificador único |
| `name` | `string` | Nome de exibição (ex: "Premium") |
| `tier` | `PlanTier` | FREE, BASIC, PREMIUM |
| `monthlyPrice` | `number` | Preço mensal em centavos (0 para FREE) |
| `description` | `string` | Descrição do plano |
| `capabilities` | `string[]` | Lista de capabilities liberadas |

### 2.2 `Subscription` (Entidade)

Assinatura de um usuário a um plano.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `SubscriptionId` | Identificador único |
| `planId` | `string` | Plano contratado |
| `userId` | `string` | Usuário assinante |
| `startDate` | `Date` | Início da vigência |
| `endDate` | `Date` | Fim da vigência |
| `status` | `SubscriptionStatus` | ACTIVE, CANCELLED, EXPIRED |

### 2.3 `BillingCycle` (Entidade)

Ciclo de cobrança simulado.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `BillingCycleId` | Identificador único |
| `subscriptionId` | `string` | Assinatura de origem |
| `periodStart` | `Date` | Início do período |
| `periodEnd` | `Date` | Fim do período |
| `amount` | `number` | Valor cobrado |
| `status` | `BillingStatus` | PENDING, PAID, FAILED |
| `simulatedAt` | `Date` | Data da simulação |

### 2.4 Value Objects

**PlanTier**: `FREE`, `BASIC`, `PREMIUM`

**AccessLevel**: `read`, `write`, `admin`

**SubscriptionStatus**: `ACTIVE`, `CANCELLED`, `EXPIRED`

**BillingStatus**: `PENDING`, `PAID`, `FAILED`

---

## 3. Plan Capabilities (REC-011-002)

Cada plano possui uma lista de `capabilities` (strings). Exemplo:

```typescript
const PLAN_CAPABILITIES = {
  FREE: ["carteira:read", "dashboard:basic", "proventos:read"],
  BASIC: ["carteira:read", "carteira:write", "dashboard:full", "proventos:read", "relatorios:csv"],
  PREMIUM: ["*"], // acesso total
};
```

O `AuthorizationService.checkAccess(userId, requiredCapability)`:
1. Obtém a subscription ativa do usuário
2. Identifica o plano
3. Verifica se a capability está na lista do plano
4. Se `"*"` estiver na lista, retorna true
5. Se não encontrar subscription ativa, usa plano FREE como fallback

---

## 4. Billing Simulado (R-015)

O `BillingSimulator` mocka o ciclo de cobrança com interface idêntica a um futuro gateway real:

- `simulateBilling(subscription)` → gera `BillingCycle` com status PAID
- `cancelSubscription(subscription)` → gera ciclo final com status PAID
- Interface substituível por gateway real via injeção de dependência

---

## 5. Invariantes

- **I-001 (Capabilities centralizadas):** Toda verificação de acesso passa por `AuthorizationService`. Nenhuma capability é verificada diretamente no código da Presentation.
- **I-002 (Fallback FREE):** Usuário sem subscription ativa tem acesso apenas ao plano FREE.
- **I-003 (Billing desacoplado):** `BillingSimulator` não depende de gateway externo — interface substituível.
- **I-004 (Status mutuamente exclusivo):** Subscription pode ter apenas um status ativo por vez.

---

## 6. Não-escopo

- Gateway de pagamento real (mock via BillingSimulator — R-015)
- Envio de email de confirmação (via INotificationPort — consumo, não estensão)
- Cupons e descontos (futuro)

---

## 7. Dependências

- `ISubscriptionRepository` — extensão com 5 novos métodos (Decisão O1 / ADR-011-001)
- `INotificationPort` — consumo para notificações de assinatura (NC-011-001)
