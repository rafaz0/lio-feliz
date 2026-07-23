# BR-15 — Alertas (Notificações de Eventos Corporativos)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-009 (Onda 4 — Módulo 15)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Alertas** do Lio Feliz. O módulo permite ao usuário criar regras de notificação para eventos corporativos (proventos, datas ex, vencimentos) e receber alertas quando as condições forem atendidas.

Nenhum alerta é disparado sem regra explicitamente criada pelo usuário (`AlertRule`) e canal de entrega confirmado (R-012). O `AlertEvaluator` é stateless e idempotente.

---

## 2. Tipos de Evento Monitorados

| Evento         | Descrição                          | Gatilho                 |
| -------------- | ---------------------------------- | ----------------------- |
| **Dividendo**  | Distribuição de dividendos ou JCP  | X dias antes da data ex |
| **Data Ex**    | Data ex de provento                | X dias antes            |
| **Vencimento** | Vencimento de título ou opção      | X dias antes            |
| **Resultado**  | Divulgação de resultado trimestral | X dias antes            |

---

## 3. Modelo de Domínio

### 3.1 `AlertRule` (Entidade)

Define uma regra de notificação.

| Atributo          | Tipo           | Regra                                     |
| ----------------- | -------------- | ----------------------------------------- |
| `id`              | `AlertRuleId`  | Identificador único                       |
| `name`            | `string`       | Nome de exibição (ex: "PETR4 dividendos") |
| `triggerWhen`     | `TriggerWhen`  | Condições de disparo                      |
| `assetFilter`     | `string[]`     | Tickers monitorados (vazio = todos)       |
| `channel`         | `AlertChannel` | Canal de entrega                          |
| `enabled`         | `boolean`      | Se a regra está ativa                     |
| `userId`          | `string`       | ID do usuário proprietário                |
| `createdAt`       | `Date`         | Data de criação                           |
| `lastTriggeredAt` | `Date`         | Data do último disparo                    |

### 3.2 `Alert` (Entidade)

Um alerta disparado.

| Atributo      | Tipo            | Regra                       |
| ------------- | --------------- | --------------------------- |
| `id`          | `AlertId`       | Identificador único         |
| `ruleId`      | `string`        | Regra de origem             |
| `runId`       | `string`        | ID da execução de avaliação |
| `assetTicker` | `string`        | Ticker do ativo             |
| `eventDate`   | `Date`          | Data do evento              |
| `message`     | `string`        | Mensagem do alerta          |
| `severity`    | `AlertSeverity` | Nível de severidade         |
| `createdAt`   | `Date`          | Data de criação             |

### 3.3 `AlertDelivery` (Entidade)

Registro de entrega do alerta.

| Atributo  | Tipo              | Regra                                   |
| --------- | ----------------- | --------------------------------------- |
| `id`      | `AlertDeliveryId` | Identificador único                     |
| `alertId` | `string`          | Alerta de origem                        |
| `channel` | `AlertChannel`    | Canal usado                             |
| `sentAt`  | `Date`            | Data de envio                           |
| `ack`     | `boolean`         | Confirmado pelo usuário (default false) |

### 3.4 `AlertSeverity` (Value Object)

```typescript
type AlertSeverityLevel = "info" | "warning" | "critical";
```

### 3.5 `AlertChannel` (Value Object)

```typescript
type AlertChannelType = "inApp" | "email" | "push";

interface AlertChannel {
  type: AlertChannelType;
  destination: string; // email ou device token
}
```

### 3.6 `TriggerWhen` (Value Object)

```typescript
interface TriggerWhen {
  daysBefore: number; // dias de antecedência
  eventType: AlertEventType; // dividend, exDate, earnings, maturity
}
```

---

## 4. Invariantes (domínio)

- **I-001 (Consentimento):** Nenhum alerta é disparado sem `AlertRule` ativa e canal confirmado (R-012).
- **I-002 (Idempotência):** Mesma `(rule_id, run_id, asset, event_date)` não gera alerta duplicado.
- **I-003 (Ack padrão):** `AlertDelivery.ack` inicia como `false`.
- **I-004 (Severidade):** `AlertSeverity` é determinada pelo tipo de evento:
  - `critical`: vencimento de título, data ex de provento relevante (>5% da posição)
  - `warning`: dividendo, resultado trimestral
  - `info`: demais eventos
- **I-005 (Antecedência):** `daysBefore` deve estar entre 0 e 30.

---

## 5. Workflow de Avaliação (`AlertEvaluator`)

1. **Entrada:** Lista de `AlertRule` ativas + posições + projeções de eventos.
2. **Para cada regra ativa:**
   - Filtrar eventos aplicáveis (tickers, tipo de evento)
   - Verificar se evento está dentro do período `daysBefore`
   - Verificar se já existe alerta com mesmo `(rule_id, run_id, asset, event_date)` — pular se duplicado (I-002)
   - Se aprovado, gerar `Alert` + `AlertDelivery`
3. **Saída:** Lista de `Alert[]` com `AlertDelivery[]` correspondentes.

O `AlertEvaluator` é stateless: mesma entrada sempre produz a mesma saída (excluindo duplicatas já persistidas).

---

## 6. Não-escopo

- Envio real de email/push (apenas registro da intenção; envio é responsabilidade da infraestrutura)
- Alertas em tempo real via WebSocket (apenas avaliação periódica)
- Cancelamento de alertas já disparados
- Alertas baseados em preço ou variação de mercado (apenas eventos corporativos)
