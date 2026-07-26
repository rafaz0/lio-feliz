# Lio Feliz - Documentação Oficial

# ADR-019-001: Sistema de Assinaturas e Monetização

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-019 (Plataforma Administrativa e Comercial, Onda 13) definiu a arquitetura para planos, assinaturas, billing, recursos premium e comercialização. A ER-019 aprovou a arquitetura e recomendou a formalização do sistema de assinaturas e monetização em ADR próprio (R01).

Atualmente, a plataforma Lio Feliz não possui qualquer modelo de planos ou assinaturas. Todos os usuários têm acesso irrestrito a todas as funcionalidades. A Carteira, a Gestão Financeira, os relatórios e demais módulos não possuem diferenciação de acesso.

Este ADR formaliza a arquitetura para monetização, estabelecendo como planos, assinaturas, billing e recursos premium se relacionam sem criar acoplamento com os domínios de negócio existentes.

---

## Problema

Como implementar um sistema de assinaturas e monetização que:

- preserve o isolamento dos domínios existentes (Carteira, Gestão Financeira, Dashboard);
- não crie dependência de gateway de pagamento específico;
- permita múltiplos planos com limites diferentes;
- suporte trial, upgrade, downgrade e cancelamento;
- evolua para múltiplos provedores de pagamento sem modificar a arquitetura;
- mantenha compatibilidade com o sistema de feature flags (ADR-017-002);
- respeite a separação por perfil de usuário (ADR-018-001, ADR-018-002).

---

## Decisão

### Decisão 1: Subscription como Domínio Independente

Assinatura é um domínio de suporte independente. Ela não pertence à autenticação, ao comercial nem ao billing. Sua única responsabilidade é gerenciar o ciclo de vida da assinatura do usuário em um plano.

```
Motivação: Manter a assinatura desacoplada de planos (que podem mudar)
e de billing (que pode ter múltiplos gateways).
```

### Decisão 2: Billing Desacoplado por Interfaces

Billing define interfaces para faturamento, mas não implementa gateway de pagamento concreto. A implementação do gateway é postergada (EWO-051).

```
Motivação: Evitar dependência de provedor (Stripe, ASAAS, Mercado Pago).
O gateway pode ser adicionado sem modificar assinaturas ou planos.
```

### Decisão 3: Gateway de Pagamento Abstrato

```
interface PaymentGateway {
  createCheckout(subscription: Subscription): Promise<CheckoutUrl>;
  processWebhook(payload: unknown): Promise<WebhookEvent>;
  cancelSubscription(externalId: string): Promise<void>;
  getSubscriptionStatus(externalId: string): Promise<PaymentStatus>;
}
```

```
Motivação: Suporte futuro a múltiplos provedores sem modificar o domínio
Subscription. Cada gateway implementa a interface.
```

### Decisão 4: Feature Gates Controlados pelo Plano Ativo

O acesso a recursos premium é controlado por `canAccess(featureId, userId)`, que consulta o plano ativo do usuário e verifica se a feature está incluída e dentro dos limites.

```
Motivação: Centralizar a lógica de autorização em um único ponto
(PermissionService), evitando condicionais espalhadas pelos módulos.
```

### Decisão 5: Trial como Estado da Assinatura

Trial é um estado da Subscription, não um plano separado. Durante o trial, o plano associado é o Pro, mas sem cobrança.

```
Motivação: Simplificar a lógica de upgrade (trial → ativo não requer
troca de plano). O término do trial pode ativar a cobrança ou fazer
downgrade para Free.
```

### Decisão 6: Upgrade Imediato

O upgrade para um plano superior é processado instantaneamente. O período de faturamento é proporcional (prorata) ou inicia na data do upgrade, conforme regra de negócio.

### Decisão 7: Downgrade Controlado

O downgrade só é efetivado ao final do período vigente. Durante o período, o usuário mantém acesso ao plano atual. Dados que excedem os limites do plano destino são preservados mas não acessíveis.

### Decisão 8: Cancelamento sem Perda de Dados

O cancelamento não remove dados do usuário. A assinatura transita para o estado `Canceled` e, ao final do período pago, para `Expired`. O usuário pode reativar mantendo todos os dados.

### Decisão 9: Expiração Automática

Assinaturas expiradas transitam automaticamente para `Expired` ao final do período sem renovação. Usuários com assinatura expirada passam a ter acesso equivalente ao plano Free.

### Decisão 10: Evolução Futura sem Alterar Domínios Existentes

Planos, features e limites são dados de configuração (tabelas), não código. A adição de um novo plano ou a alteração de limites não requer modificação em módulos existentes.

### Regras da Decisão (R-SUB)

| Regra | Descrição |
|-------|-----------|
| **R-SUB-001** — Subscription domínio independente | Subscription não conhece PaymentGateway. Billing não conhece Subscription diretamente — apenas via interfaces. |
| **R-SUB-002** — Billing por interface | Nenhum código de domínio depende de um gateway concreto. A implementação do gateway é injetada na Application Layer. |
| **R-SUB-003** — Feature Gate centralizado | `canAccess()` é o único ponto de verificação de acesso premium. Nenhum módulo faz essa verificação diretamente. |
| **R-SUB-004** — Trial sem plano especial | Trial usa o plano Pro, mas com `billingEnabled = false`. No término, pode ativar cobrança ou fazer downgrade. |
| **R-SUB-005** — Dados preservados no downgrade | Nenhuma operação deDELETE é executada durante downgrade ou cancelamento. Apenas o acesso é restrito. |
| **R-SUB-006** — Notificações em eventos | Mudanças de estado da Subscription emitem eventos (SubscriptionActivated, SubscriptionCanceled, etc.) para outros contextos via InProcessEventPublisher. |

---

## Responsabilidades

### Subscription

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Sim — tabela `subscription_subscriptions` |
| **O que faz** | Gerencia ciclo de vida (ativação, renovação, cancelamento, expiração). |
| **O que não faz** | Não processa pagamentos. Não define planos. Não verifica limites. |

### Billing

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Sim — tabelas `billing_invoices`, `billing_transactions` |
| **O que faz** | Gera faturas, registra transações, comunica-se com gateways. |
| **O que não faz** | Não gerencia ciclo de vida da assinatura. Não define planos. |

### Payment Gateway

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Não — apenas processa pagamentos |
| **O que faz** | Cria checkout, processa webhooks, cancela assinatura no provedor. |
| **O que não faz** | Não armazena dados de faturamento. Não gerencia planos. |

### Feature Gate

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Lê de `commercial_*` + `subscription_*` |
| **O que faz** | Verifica se um usuário tem acesso a uma feature com base no plano ativo. |
| **O que não faz** | Não gerencia assinaturas. Não processa pagamentos. |

### Plano

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Sim — tabelas `commercial_plans`, `commercial_features`, `commercial_plan_features` |
| **O que faz** | Define features disponíveis e limites quantitativos. |
| **O que não faz** | Não gerencia assinaturas. Não processa pagamentos. |

### Dashboard

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Não — apenas consome |
| **O que faz** | Exibe plano atual, data de renovação, limites de uso. |
| **O que não faz** | Não modifica assinaturas. Não processa pagamentos. |

### Carteira

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Sim (dados da carteira) |
| **O que faz** | Expõe número de ativos para verificação de limites do plano. |
| **O que não faz** | Não conhece planos ou assinaturas. |

### Gestão Financeira

| Aspecto | Responsabilidade |
|---------|-----------------|
| **Dono dos dados** | Sim (dados financeiros) |
| **O que faz** | Expõe dados para verificação de limites (quando GF é feature premium). |
| **O que não faz** | Não conhece planos ou assinaturas. |

---

## Fluxos

### Criação da Assinatura

```
Usuário seleciona plano Pro
  → Frontend chama createSubscription(userId, planId)
  → SubscriptionService:
      1. Verifica se usuário já possui assinatura ativa
      2. Cria Subscription com status "PendingPayment"
      3. Chama BillingService.createInvoice(subscription)
      4. BillingService chama PaymentGateway.createCheckout()
      5. Retorna URL de checkout para o frontend
  → Usuário é redirecionado para o gateway
```

### Ativação

```
Gateway confirma pagamento (webhook)
  → BillingService.processWebhook(payload)
  → Identifica Subscription correspondente
  → Atualiza Invoice como "Paid"
  → Chama SubscriptionService.activate(subscriptionId)
  → SubscriptionService:
      1. Altera status para "Active"
      2. Define período de vigência
      3. Emite evento SubscriptionActivated
```

### Renovação

```
Próximo ao vencimento:
  → BillingService gera nova Invoice
  → PaymentGateway.processPayment(invoice)
  → Se sucesso:
      → Invoice marcada como "Paid"
      → SubscriptionService.renew(subscriptionId)
      → Período estendido
      → Evento SubscriptionRenewed
  → Se falha:
      → Invoice marcada como "Failed"
      → SubscriptionService.markPastDue(subscriptionId)
      → Evento SubscriptionPastDue
      → Inicia período de carência
```

### Cancelamento

```
Usuário solicita cancelamento
  → SubscriptionService.cancel(subscriptionId)
  → Altera status para "Canceled"
  → Define endDate como fim do período atual
  → Chama BillingService.cancelAtPeriodEnd(subscriptionId)
  → Emite evento SubscriptionCanceled
```

### Expiração

```
Ao atingir endDate sem renovação:
  → (automático, por scheduler ou trigger)
  → SubscriptionService.expire(subscriptionId)
  → Altera status para "Expired"
  → Emite evento SubscriptionExpired
  → Usuário perde acesso a recursos premium
  → Dados preservados (R-SUB-005)
```

### Upgrade

```
Usuário seleciona plano superior
  → SubscriptionService.upgrade(subscriptionId, newPlanId)
  → Se assinatura ativa:
      → Mantém mesma Subscription
      → Altera planId para o novo plano
      → BillingService.calculateProrata(subscriptionId, newPlanId)
      → Gera Invoice com valor proporcional
      → Retorna URL de checkout (ou processa imediatamente)
      → Emite evento SubscriptionUpgraded
```

### Downgrade

```
Usuário seleciona plano inferior
  → SubscriptionService.downgrade(subscriptionId, newPlanId)
  → Agenda alteração para o final do período atual
  → Mantém plano atual até periodEnd
  → Em periodEnd:
      → Altera planId
      → Emite evento SubscriptionDowngraded
  → Dados que excedem novo limite: preservados, não acessíveis
```

### Trial

```
Usuário inicia trial:
  → SubscriptionService.createTrial(userId, planId)
  → Cria Subscription com status "Trial"
  → Plano associado = Pro
  → BillingService marca como "sem cobrança" até trialEnd
  → Ao atingir trialEnd:
      → Se usuário configurou pagamento:
          → Ativa assinatura (status "Active")
          → Gera primeira Invoice
      → Se não configurou:
          → Downgrade para Free
```

### Desbloqueio de Funcionalidades por Plano

```
Usuário tenta acessar recurso premium:
  → Componente ou server function chama canAccess(featureId, userId)
  → FeatureGateService:
      1. Obtém Subscription ativa do usuário
      2. Se não tem assinatura ativa:
          → Verifica plano Free (padrão)
      3. Obtém Plan correspondente
      4. Verifica se Feature está associada ao Plan
      5. Se sim, verifica UsageCounter (limite quantitativo)
      6. Retorna true/false com motivo
  → Se false:
      → UI exibe upgrade CTA
      → Server function retorna erro "feature_not_available"
```

---

## Consequências

### Positivas

- **Baixo acoplamento**: Subscription, Billing e Feature Gate são independentes entre si.
- **Alta extensibilidade**: Novos planos são dados (tabelas), não código. Novos gateways implementam interface.
- **Múltiplos gateways suportados**: A interface PaymentGateway permite Stripe, ASAAS, Mercado Pago ou qualquer outro provedor.
- **Evolução futura simplificada**: Billing pode ser implementado em etapas sem modificar Subscription ou Planos.
- **Dados preservados**: Usuários podem cancelar e retornar sem perder histórico.
- **Consistência com ADR-017-002**: Feature flags são o mecanismo de controle de acesso premium.

### Negativas

- **Aumento de componentes**: SubscriptionService, BillingService, FeatureGateService, PaymentGateway (interface), mais 10 tabelas no banco.
- **Coordenação entre módulos**: Mudanças de estado da Subscription disparam eventos que afetam Feature Gate, Dashboard, e possivelmente UI.
- **Scheduler necessário**: Expiração, renovação e trial end exigem processamento temporal (cron, trigger ou polling).

### Neutras

- **Configuração por ambiente**: Planos e limites podem variar entre dev, staging e produção.
- **Feature flags como mecanismo**: ADR-017-002 é estendido com as flags PREMIUM_FEATURES, FREE_PLAN_LIMITS, BILLING_ENABLED.
- **Parametrização dos planos**: Preço, ciclo e features são configuráveis via admin — sem deploy.

---

## Compatibilidade

| Documento | Compatibilidade |
|-----------|----------------|
| **PI-019** | ✅ ADR formaliza a arquitetura definida na PI-019, seções 4 a 13. |
| **ER-019** | ✅ ADR atende à recomendação R01 (criar ADR-019-001 antes da EWO-048). |
| **ADR-017-001** | ✅ Integração Carteira/GF preservada. Planos não alteram o mecanismo de integração. |
| **ADR-017-002** | ✅ Feature flags expandidas com PREMIUM_FEATURES, FREE_PLAN_LIMITS, BILLING_ENABLED. R-FF-001 a R-FF-006 mantidas. |
| **ADR-018-001** | ✅ Modo Demo ignora planos — recursos demo são fixos e não dependem de assinatura. |
| **ADR-018-002** | ✅ Perfil Admin mantido. Administradores têm acesso total independentemente do plano. |
| **PI-001 a PI-018** | ✅ Nenhuma decisão arquitetural existente é alterada ou invalidada. |

---

## Referências

- `architecture-lab/PI-019.md` — Plataforma Administrativa e Comercial (§4 Bounded Contexts, §5 Entidades, §7 Integração, §8 Persistência, §10 Feature Flags, §12 Segurança, §13 Comercialização).
- `architecture-lab/ER-019.md` — Engineering Review (R01 — criar ADR-019-001).
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-017-002_FEATURE_FLAGS_AND_FINANCE_INTEGRATION_CONFIG.md` — Feature flags.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-018-002_ADMIN_PROFILE.md` — Perfil Administrador.
- R-SUB-001 a R-SUB-006 — Regras do Sistema de Assinaturas (este ADR).
- R-FF-001 a R-FF-006 — Política de Feature Flags (ADR-017-002).
