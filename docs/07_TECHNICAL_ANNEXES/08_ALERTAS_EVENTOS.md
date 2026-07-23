# 08_ALERTAS_EVENTOS.md — Eventos de Alerta

**Versão:** 1.0
**Status:** APROVADO
**Classificação:** Technical Annex

---

## 1. Objetivo

Definir os tipos de evento monitorados pelo módulo de Alertas, suas fontes de dados e critérios de disparo.

---

## 2. Fontes de Dados

| Fonte       | Dados                         | API/Módulo               |
| ----------- | ----------------------------- | ------------------------ |
| Proventos   | Dividendos, JCP, rendimentos  | BRAPI / Yahoo Finance    |
| Datas Ex    | Data ex de proventos          | BRAPI quote endpoint     |
| Vencimentos | Vencimento de títulos, opções | IProjectionRepository    |
| Resultados  | Próximas divulgações          | Yahoo Finance (earnings) |

---

## 3. Critérios de Disparo por Evento

### 3.1 Dividendo / JCP

```
trigger:
  eventType: "dividend"
  daysBefore: N (configurável, 1-30)

condicoes:
  - ativo está na posição do usuário
  - data ex está a N dias da data atual
  - ainda não existe alerta com (rule_id, run_id, asset, event_date)

severidade:
  - "warning" para dividendos regulares
  - "critical" se valor estimado > 5% da posição
```

### 3.2 Data Ex

```
trigger:
  eventType: "exDate"
  daysBefore: N (configurável, 1-15)

condicoes:
  - ativo está na watchlist ou posição do usuário
  - data ex está a N dias da data atual
  - ainda não existe alerta duplicado

severidade:
  - "info" para ativos na watchlist
  - "warning" para ativos em posição
```

### 3.3 Vencimento

```
trigger:
  eventType: "maturity"
  daysBefore: N (configurável, 5-30)

condicoes:
  - ativo está na posição do usuário
  - data de vencimento está a N dias
  - ainda não existe alerta duplicado

severidade:
  - "critical" se vencimento em < 7 dias
  - "warning" se vencimento em 7-30 dias
```

### 3.4 Resultado Trimestral

```
trigger:
  eventType: "earnings"
  daysBefore: N (configurável, 1-7)

condicoes:
  - ativo está na watchlist ou posição
  - data de divulgação está a N dias
  - ainda não existe alerta duplicado

severidade: "info"
```

---

## 4. Estrutura de Dados do Alerta

```typescript
interface AlertOutput {
  id: string;
  ruleId: string;
  runId: string;
  assetTicker: string;
  eventDate: string; // ISO
  message: string; // ex: "PETR4 ex-dividend em 3 dias (R$ 0,35/cota)"
  severity: "info" | "warning" | "critical";
  createdAt: string;
  delivery: {
    channel: { type: string; destination: string };
    ack: boolean;
  };
}
```

---

## 5. Regras de Idempotência (R-012)

O identificador único de um alerta é composto por:

```
(rule_id, run_id, asset_ticker, event_date)
```

- `rule_id`: ID da regra que gerou o alerta
- `run_id`: ID da execução do `AlertEvaluator`
- `asset_ticker`: Ticker do ativo
- `event_date`: Data do evento (ISO date)

Se um alerta com a mesma chave já existir no repositório, o novo é ignorado (duplicata silenciosa).

---

## 6. Canais de Entrega

| Canal | Implementação              | Ack possível                     |
| ----- | -------------------------- | -------------------------------- |
| inApp | Notificação no dashboard   | Sim (via ConfirmarAlertaCommand) |
| email | Envio via serviço de email | Não (ack apenas inApp)           |
| push  | Push notification          | Não (ack apenas inApp)           |
