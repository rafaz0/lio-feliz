# Lio Feliz - Documentação Oficial

# ADR-019-002: Arquitetura do Gateway de Pagamentos

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-019 (Plataforma Administrativa e Comercial, Onda 13) definiu a arquitetura do contexto de Billing e a necessidade de interfaces de gateway de pagamento. A ER-019 aprovou a arquitetura e recomendou a formalização das interfaces de gateway antes da implementação (R03).

O ADR-019-001 estabeleceu o sistema de assinaturas e monetização, definindo a interface `PaymentGateway` como abstração para processamento de pagamentos. Este ADR detalha a arquitetura completa do gateway de pagamentos, aprofundando a relação entre Billing, gateway externo, webhooks e os demais contextos.

Atualmente, a plataforma não possui qualquer integração com gateways de pagamento. A cobrança é simulada (BillingSimulator). A preparação arquitetural para gateways reais é necessária antes da EWO-051.

---

## Problema

Como definir a arquitetura de gateways de pagamento que:

- preserve o desacoplamento entre Billing e provedores de pagamento externos;
- permita a adição de múltiplos gateways (Stripe, ASAAS, Mercado Pago, etc.) sem modificar módulos existentes;
- trate webhooks de forma segura, idempotente e rastreável;
- suporte processamento síncrono (checkout) e assíncrono (renovação automática);
- garanta idempotência nas confirmações de pagamento para evitar duplicidade;
- isole o domínio de negócio (Subscription, Planos, Feature Gate) dos detalhes de cobrança;
- mantenha compatibilidade com ADR-019-001, ADR-017-002 e ADR-018-001/002.

---

## Decisão

### Decisão 1: Payment Gateway como Interface de Application Layer

`PaymentGateway` é uma interface definida na Application Layer, não no domínio. A implementação concreta é injetada via Composition Root.

```
Motivação: O domínio Subscription não deve conhecer detalhes de pagamento.
A interface pertence à Application Layer, que orquestra o fluxo.
```

### Decisão 2: Billing como Orquestrador, não Executor

BillingService orquestra o ciclo de cobrança: cria faturas, chama o gateway, registra transações. Ele não implementa comunicação direta com provedores externos — delega ao `PaymentGateway`.

```
Motivação: Billing gerencia o ciclo financeiro (faturas, transações, status).
O gateway é um detalhe substituível.
```

### Decisão 3: Suporte a Múltiplos Gateways por Estratégia

A seleção do gateway é feita por configuração (`PAYMENT_GATEWAY_PROVIDER`). Cada provedor implementa a mesma interface. Novos provedores são adicionados criando uma nova implementação e registrando-a no Composition Root.

```
Motivação: Evitar condicionais de provedor no código de orquestração.
A escolha do gateway é uma decisão de deploy/infraestrutura.
```

### Decisão 4: Processamento Assíncrono para Renovações

Renovações recorrentes são processadas de forma assíncrona (fila ou scheduler). O gateway é chamado sem bloqueio da requisição do usuário. Checkouts de primeira assinatura são síncronos (redirecionamento).

```
Motivação: Renovações não devem bloquear a UX. O processamento
assíncrono permite retry, logging e auditoria sem impacto ao usuário.
```

### Decisão 5: Webhooks Centralizados com Segurança por Provedor

Todos os webhooks de gateway chegam a um único endpoint `/api/billing/webhook`. O roteamento para o handler correto é feito pelo identificador do provedor no payload ou header. Cada implementação de gateway valida a autenticidade do webhook (assinatura HMAC, token ou IP whitelist).

```
Motivação: Um único endpoint simplifica roteamento e logging.
Cada provedor é responsável por sua própria validação de segurança.
```

### Decisão 6: Idempotência Obrigatória nas Confirmações

Toda confirmação de pagamento (webhook ou callback) é processada com chave de idempotência. O identificador único da transação no provedor (`transactionId` externo) é usado para garantir que o mesmo evento não seja processado duas vezes.

```
Motivação: Webhooks podem ser entregues múltiplas vezes (retry do
provedor). A idempotência evita duplicidade de faturas e ativações.
```

### Decisão 7: Contexto de Transação Preservado

Cada transação registra: `transactionId` (interno), `gatewayTransactionId` (externo), `gatewayProvider`, `amount`, `currency`, `status`, `metadata`. O histórico é imutável — transações não são alteradas, apenas criadas com novo status.

```
Motivação: Rastreabilidade financeira total. Transações imutáveis
garantem audit trail completo.
```

### Decisão 8: Isolamento entre Cobrança e Domínio de Negócio

A assinatura (`Subscription`) não conhece transações individuais. Ela apenas recebe comandos do BillingService: `activate()`, `renew()`, `cancel()`, `expire()`. A correlação entre pagamento e assinatura é mantida pelo BillingService.

```
Motivação: Subscription não precisa saber se o pagamento veio de
cartão, boleto ou PIX. Ela só reage a mudanças de estado autorizadas.
```

### Decisão 9: Reembolso como Evento de Negócio

Reembolso é tratado como evento de negócio, não como operação de exclusão. O BillingService registra a transação de reembolso (valor negativo) e, se aplicável, notifica a Subscription para ajuste de período.

```
Motivação: Reembolso não deve apagar histórico. Um evento de
reembolso preserva a trilha de auditoria.
```

### Decisão 10: Evolução sem Alterar Contextos Existentes

Novos provedores de pagamento são adicionados sem modificar BillingService, SubscriptionService, Planos, Feature Gate ou Dashboard.

```
Motivação: Gateway é um plug-in de infraestrutura. A troca de
provedor não requer alteração em nenhum módulo de domínio.
```

### Regras da Decisão (R-PGW)

| Regra                                               | Descrição                                                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **R-PGW-001** — Gateway como interface              | PaymentGateway é interface na Application Layer. Domínio não conhece gateway.                        |
| **R-PGW-002** — Billing orquestrador                | BillingService orquestra cobrança. Gateway executa comunicação externa.                              |
| **R-PGW-003** — Gateway por configuração            | `PAYMENT_GATEWAY_PROVIDER` define o provedor ativo. Sem condicionais em código de orquestração.      |
| **R-PGW-004** — Idempotência obrigatória            | `gatewayTransactionId` é a chave de idempotência. Nenhuma confirmação é processada sem deduplicação. |
| **R-PGW-005** — Transações imutáveis                | Transações são append-only. Nenhuma transação é alterada — apenas criadas com novo status.           |
| **R-PGW-006** — Webhook validado por provedor       | Cada implementação de gateway valida seus próprios webhooks.                                         |
| **R-PGW-007** — Renovação assíncrona                | Renovações recorrentes usam fila/scheduler. Checkouts de primeira assinatura são síncronos.          |
| **R-PGW-008** — Subscription não conhece transações | Subscription reage apenas a comandos de BillingService. Sem dependência de PaymentGateway.           |
| **R-PGW-009** — Reembolso preserva histórico        | Reembolso é transação de valor negativo. Dados originais não são alterados.                          |

---

## Responsabilidades

### Billing

| Aspecto            | Responsabilidade                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Dono dos dados** | Sim — tabelas `billing_invoices`, `billing_transactions`, `billing_webhook_logs`                             |
| **O que faz**      | Orquestra cobrança: cria faturas, chama gateway, registra transações, gerencia retry e períodos de carência. |
| **O que não faz**  | Não implementa comunicação direta com provedores externos. Não gerencia ciclo de vida da assinatura.         |

### Payment Gateway

| Aspecto            | Responsabilidade                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dono dos dados** | Não — apenas media comunicação com provedor externo                                                                               |
| **O que faz**      | Implementa a interface `PaymentGateway`: criação de checkout, processamento de webhook, cancelamento externo, consulta de status. |
| **O que não faz**  | Não orquestra cobrança. Não gerencia faturas. Não define regras de negócio.                                                       |

### Webhook Handler

| Aspecto            | Responsabilidade                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dono dos dados** | Não — registra logs em `billing_webhook_logs`                                                                                 |
| **O que faz**      | Recebe webhooks, roteia para o handler do provedor correto, valida autenticidade, aplica idempotência, invoca BillingService. |
| **O que não faz**  | Não processa lógica de negócio. Não modifica assinaturas diretamente.                                                         |

### Subscription

| Aspecto            | Responsabilidade                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Dono dos dados** | Sim — `subscription_subscriptions`                                                                         |
| **O que faz**      | Gerencia ciclo de vida da assinatura. Recebe comandos de BillingService (activate, renew, cancel, expire). |
| **O que não faz**  | Não conhece transações. Não conhece gateway.                                                               |

### Plano

| Aspecto            | Responsabilidade                                   |
| ------------------ | -------------------------------------------------- |
| **Dono dos dados** | Sim — `commercial_plans`, `commercial_prices`      |
| **O que faz**      | Define preço, ciclo de cobrança e moeda.           |
| **O que não faz**  | Não processa pagamentos. Não gerencia assinaturas. |

### Feature Gate

| Aspecto            | Responsabilidade                                          |
| ------------------ | --------------------------------------------------------- |
| **Dono dos dados** | Lê de `commercial_*` + `subscription_*`                   |
| **O que faz**      | Verifica acesso a recursos premium. Independe do gateway. |
| **O que não faz**  | Não conhece pagamentos ou transações.                     |

### Dashboard

| Aspecto            | Responsabilidade                                                                        |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Dono dos dados** | Não — apenas consome                                                                    |
| **O que faz**      | Exibe status de pagamento, próxima cobrança, método de pagamento, histórico de faturas. |
| **O que não faz**  | Não modifica assinaturas. Não processa pagamentos.                                      |

---

## Fluxos

### Criação da Cobrança

```
Usuário finaliza checkout
  → BillingService.createInvoice(subscription)
  → Cria Invoice com status "Pending"
  → PaymentGateway.createCheckout(invoice):
       1. Prepara payload do provedor (valor, descrição, metadata)
       2. Chama API externa do provedor
       3. Retorna URL de checkout
  → Invoice atualizada com gatewayCheckoutUrl
  → Usuário redirecionado para o gateway
```

### Pagamento Aprovado

```
Gateway confirma pagamento (redirect ou webhook)
  → WebhookHandler.receive(payload)
  → Identifica provedor (header ou campo no payload)
  → Valida autenticidade (HMAC, token ou IP)
  → Aplica idempotência (gatewayTransactionId já processado?)
  → Se duplicado: retorna 200 OK (sem processar)
  → Se novo:
      1. BillingService.confirmPayment(invoiceId, gatewayTransactionId)
      2. Invoice atualizada para "Paid"
      3. BillingService.notifySubscription(invoiceId)
      4. SubscriptionService.activate(subscriptionId) ou renew()
      5. Emite evento PaymentConfirmed
```

### Pagamento Recusado

```
Gateway notifica recusa
  → WebhookHandler.receive(payload)
  → Valida autenticidade
  → Aplica idempotência
  → BillingService.declinePayment(invoiceId, reason)
  → Invoice atualizada para "Failed"
  → Se tentativas restantes:
      → Billing agenda retry (nova tentativa)
  → Se sem tentativas:
      → BillingService.notifySubscription(invoiceId)
      → SubscriptionService.markPastDue(subscriptionId)
      → Emite evento PaymentDeclined
      → Inicia período de carência
```

### Cancelamento

```
Cancelamento solicitado (usuário ou admin)
  → BillingService.cancelSubscription(subscriptionId)
  → PaymentGateway.cancelSubscription(externalId):
       1. Chama API do provedor para cancelar cobranças futuras
       2. Confirma cancelamento externo
  → BillingService.finalizeCancel(invoiceId)
  → Invoice(s) pendentes marcadas como "Voided"
  → Emite evento BillingCanceled
```

### Renovação

```
Scheduler dispara renovação (próximo ao vencimento)
  → BillingService.createRenewalInvoice(subscription)
  → Cria nova Invoice com status "Pending"
  → PaymentGateway.processRecurringPayment(invoice):
       1. Chaga API do provedor com token de pagamento salvo
       2. Retorna resultado (aprovado/recusado)
  → Se aprovado:
      → Fluxo de pagamento aprovado
  → Se recusado:
      → Fluxo de pagamento recusado
  → Processamento assíncrono (R-PGW-007)
```

### Webhook

```
Provedor externo envia webhook
  → POST /api/billing/webhook
  → WebhookHandler.receive(rawPayload):
       1. Log do payload bruto em billing_webhook_logs
       2. Extrai provider do header ou payload
       3. Roteia para implementação específica do provedor
       4. Provedor valida assinatura HMAC / token
       5. Extrai evento (payment_intent.succeeded, invoice.paid, etc.)
       6. Aplica idempotência
       7. Invoca BillingService conforme tipo de evento
  → Sempre retorna 200 OK (evita retry desnecessário do provedor)
```

### Reembolso

```
Admin solicita reembolso
  → BillingService.refund(invoiceId, amount?)
  → PaymentGateway.refundPayment(gatewayTransactionId, amount):
       1. Chama API de reembolso do provedor
       2. Retorna confirmação
  → BillingService:
       1. Cria Transaction com valor negativo
       2. Invoice atualizada para "Refunded"
       3. Se reembolso total e assinatura ativa:
            → SubscriptionService.cancel(subscriptionId)
       4. Emite evento PaymentRefunded
```

### Atualização da Assinatura

```
Mudança de plano com impacto no valor
  → BillingService.calculateChange(subscription, newPlanId):
       1. Calcula diferença (prorata ou imediata)
       2. Se upgrade com diferença a pagar:
            → Cria Invoice complementar
            → PaymentGateway.createCheckout(invoice)
       3. Se downgrade com crédito:
            → Registra crédito como Transaction positiva
            → Aplica na próxima Invoice
  → BillingService confirma alteração para SubscriptionService
```

---

## Consequências

### Positivas

- **Desacoplamento total**: Billing, Gateway e Subscription são independentes. A troca de provedor não afeta domínios de negócio.
- **Facilidade para adicionar provedores**: Nova implementação de `PaymentGateway` + registro no Composition Root. Sem alteração em orquestração ou domínio.
- **Alta extensibilidade**: Processamento assíncrono, retry e idempotência são mecanismos padrão, não exceções.
- **Audit trail completo**: Transações imutáveis e webhook logs preservam toda a trilha financeira.
- **Segurança por design**: Webhook validado por provedor, idempotência obrigatória, sem exposição de lógica de negócio ao gateway.

### Negativas

- **Maior número de componentes**: BillingService, PaymentGateway (interface + N implementações), WebhookHandler, InvoiceRepository, TransactionRepository, fila/scheduler para renovações.
- **Coordenação eventualmente consistente**: Webhooks e renovações assíncronas introduzem latência entre pagamento e ativação.
- **Complexidade de webhook**: Cada provedor tem formato de payload, autenticação e eventos diferentes — requer mapeamento por implementação.

### Neutras

- **Configuração por ambiente**: Provedor ativo (PAYMENT_GATEWAY_PROVIDER) e credenciais variam entre dev, staging e produção.
- **Credenciais externas**: Cada gateway requer chaves de API, webhook secrets e configuração de endpoints — gerenciamento via variáveis de ambiente ou secrets vault.
- **Simulador preservado**: FakePaymentGateway (ADR-019-001) permanece como default em dev/test, permitindo desenvolvimento sem dependência externa.

---

## Compatibilidade

| Documento       | Compatibilidade                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **PI-019**      | ✅ ADR detalha a arquitetura do contexto de Billing definido na PI-019, seções 4, 5, 7, 8 e 13.                 |
| **ER-019**      | ✅ ADR atende à recomendação R03 (formalizar interfaces de gateway antes da EWO-051).                           |
| **ADR-019-001** | ✅ Interface PaymentGateway (Decisão 3 do ADR-019-001) refinada em 10 decisões. R-SUB-001 e R-SUB-002 mantidas. |
| **ADR-017-001** | ✅ Integração Carteira/GF preservada. Gateway não conhece domínios financeiros.                                 |
| **ADR-017-002** | ✅ Feature flags BILLING_ENABLED, PAYMENT_GATEWAY_PROVIDER estendidas. R-FF-001 a R-FF-006 mantidas.            |
| **ADR-018-001** | ✅ Modo Demo ignora gateway — BillingSimulator permanece como fallback em sessões demo.                         |
| **ADR-018-002** | ✅ Perfil Admin mantido. Administradores podem reembolsar independentemente do gateway ativo.                   |

---

## Referências

- `architecture-lab/PI-019.md` — Plataforma Administrativa e Comercial (§4 Bounded Contexts, §5 Entidades, §7 Integração, §8 Persistência, §13 Comercialização).
- `architecture-lab/ER-019.md` — Engineering Review (R03 — formalizar interfaces de gateway antes da EWO-051).
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-019-001_SUBSCRIPTIONS_AND_MONETIZATION.md` — Sistema de Assinaturas e Monetização (Decisão 3: PaymentGateway, R-SUB-001, R-SUB-002).
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-017-002_FEATURE_FLAGS_AND_FINANCE_INTEGRATION_CONFIG.md` — Feature flags.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-018-002_ADMIN_PROFILE.md` — Perfil Administrador.
- R-PGW-001 a R-PGW-009 — Regras do Gateway de Pagamentos (este ADR).
- R-SUB-001 a R-SUB-006 — Regras do Sistema de Assinaturas (ADR-019-001).
- R-FF-001 a R-FF-006 — Política de Feature Flags (ADR-017-002).
