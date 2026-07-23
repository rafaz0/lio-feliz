# BR-12 — Integrações (Conexão com Corretoras e Plataformas Externas)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-008 (Onda 3 — Módulo 12)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Integrações** do Investidor Pro. O módulo permite conectar-se a corretoras, bancos e plataformas externas (BRAPI, Yahoo Finance, Banco Inter, XP Investimentos) para sincronização automática de operações, proventos, cotações e posições. A integração pode ocorrer via API direta, OAuth ou importação de arquivo.

---

## 2. Tipos de Integração Suportados

| Tipo                      | Mecanismo                      | Provedores Suportados              | Recursos                          |
| ------------------------- | ------------------------------ | ---------------------------------- | --------------------------------- |
| **API Direta**            | Chave de API (`API_KEY`)       | BRAPI, Yahoo Finance               | Cotações, dividendos, fundamentos |
| **OAuth 2.0**             | Fluxo OAuth (`OAUTH2`)         | Banco Inter, XP Investimentos      | Posição consolidada, extrato      |
| **Autenticação Básica**   | Login + Senha (`BASIC_AUTH`)   | Custom (self-hosted)               | Dados proprietários               |
| **Sem Autenticação**      | API pública (`NONE`)           | Yahoo Finance (pública), CoinGecko | Cotações públicas                 |
| **Importação de Arquivo** | Upload manual (Excel/CSV/JSON) | Corretoras sem API                 | Extrato de operações              |

---

## 3. Modelo de Domínio

### 3.1 `IntegrationConfig` (Entidade)

Configuração de uma conexão com provedor externo.

| Atributo       | Tipo                     | Regra                                                                   |
| -------------- | ------------------------ | ----------------------------------------------------------------------- |
| `id`           | `IntegrationConfigId`    | Identificador imutável                                                  |
| `provider`     | `IntegrationProvider`    | (`BRAPI`, `YAHOO_FINANCE`, `BANCO_INTER`, `XP_INVESTIMENTOS`, `CUSTOM`) |
| `name`         | `string`                 | Nome de exibição (ex: "Minha API BRAPI")                                |
| `authType`     | `IntegrationAuthType`    | (`API_KEY`, `OAUTH2`, `BASIC_AUTH`, `NONE`)                             |
| `status`       | `IntegrationStatus`      | (`ACTIVE`, `INACTIVE`, `ERROR`, `PENDING`)                              |
| `lastSyncAt`   | `Date`                   | Timestamp da última sincronização bem-sucedida                          |
| `errorMessage` | `string`                 | Mensagem do último erro (se `status === ERROR`)                         |
| `configData`   | `Record<string, string>` | Dados de configuração chave-valor (ex: `{ apiKey: "..." }`)             |
| `createdAt`    | `Date`                   | Data de criação                                                         |
| `updatedAt`    | `Date`                   | Data da última alteração                                                |

### 3.2 `SyncLog` (Entidade)

Registro de uma execução de sincronização.

| Atributo           | Tipo         | Regra                                       |
| ------------------ | ------------ | ------------------------------------------- |
| `id`               | `SyncLogId`  | Identificador imutável                      |
| `integrationId`    | `string`     | Integração que originou a sincronização     |
| `type`             | `SyncType`   | (`MANUAL`, `SCHEDULED`, `WEBHOOK`)          |
| `status`           | `SyncStatus` | (`RUNNING`, `SUCCESS`, `PARTIAL`, `FAILED`) |
| `startedAt`        | `Date`       | Início da sincronização                     |
| `completedAt`      | `Date`       | Término da sincronização                    |
| `recordsProcessed` | `number`     | Quantidade de registros processados         |
| `errors`           | `string[]`   | Lista de erros ocorridos                    |
| `message`          | `string`     | Mensagem de resumo                          |

### 3.3 `ConnectionStatus` (Value Object)

Status agregado de uma conexão, calculado a partir dos logs.

| Atributo      | Tipo           | Descrição                                     |
| ------------- | -------------- | --------------------------------------------- |
| `lastSync`    | `Date \| null` | Data da última sincronização                  |
| `status`      | `SyncStatus`   | Status atual (`SUCCESS`, `PARTIAL`, `FAILED`) |
| `totalErrors` | `number`       | Total de erros acumulados                     |

### 3.4 `IntegrationProvider` (Value Object)

```ts
export type IntegrationProvider =
  "BRAPI" | "YAHOO_FINANCE" | "BANCO_INTER" | "XP_INVESTIMENTOS" | "CUSTOM";
```

### 3.5 `IntegrationAuthType` (Value Object)

```ts
export type IntegrationAuthType = "API_KEY" | "OAUTH2" | "BASIC_AUTH" | "NONE";
```

### 3.6 `IntegrationStatus` (Value Object)

```ts
export type IntegrationStatus = "ACTIVE" | "INACTIVE" | "ERROR" | "PENDING";
```

### 3.7 `SyncStatus` (Value Object)

```ts
export type SyncStatus = "RUNNING" | "SUCCESS" | "PARTIAL" | "FAILED";
```

### 3.8 `SyncType` (Value Object)

```ts
export type SyncType = "MANUAL" | "SCHEDULED" | "WEBHOOK";
```

### 3.9 `SyncOrchestrationService` (Serviço de Domínio)

Orquestra o ciclo de vida da sincronização, garantindo que não haja concorrência de syncs para a mesma integração e calculando o status consolidado.

---

## 4. Invariantes (domínio)

- **I-001 (Ids únicos):** Toda `IntegrationConfig` deve ter `id` único.
- **I-002 (Dados de configuração obrigatórios):** Se `authType` for `API_KEY` ou `BASIC_AUTH`, `configData` deve conter as chaves necessárias para o provedor (`apiKey` para BRAPI, `clientId`/`clientSecret` para OAuth2).
- **I-003 (Sem concorrência de sync):** Uma integração não pode ter mais de uma sincronização em execução simultaneamente.
- **I-004 (Log imutável após conclusão):** Uma vez que um `SyncLog` é concluído (`SUCCESS`, `FAILED`, `PARTIAL`), seu status não pode ser alterado.
- **I-005 (Provider suportado):** `provider` deve ser um dos valores definidos em `IntegrationProvider`.

---

## 5. Fluxo de Sincronização (`SyncOrchestrationService`)

1. **Início:** Usuário ou scheduler dispara sincronização via `integrationId`.
2. **Verificação de concorrência:** `SyncOrchestrationService.canStartSync(id)` verifica se já existe sync ativa. Se sim, retorna `SyncInProgressError`.
3. **Criação do log:** `SyncLog.create({ integrationId, type })` com status `RUNNING`.
4. **Execução:** Conector específico do provedor executa a sincronização (consulta API, parseia resposta, persiste dados).
5. **Atualização do `IntegrationConfig`:**
   - Sucesso: `config.recordSync()` atualiza `lastSyncAt`, status `ACTIVE`, limpa `errorMessage`.
   - Erro: `config.markError(message)` atualiza status `ERROR`.
6. **Finalização do log:**
   - `SyncLog.complete(recordsProcessed)` para sucesso total.
   - `SyncLog.partial(recordsProcessed, errors)` para sucesso parcial.
   - `SyncLog.fail(errors)` para falha total.
7. **Liberação:** `SyncOrchestrationService.finishSync(id)` remove o bloqueio de concorrência.

---

## 6. Tratamento de Erros e Retry

| Erro                            | Causa                                | Ação                                                                                                                    |
| ------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `InvalidIntegrationConfigError` | Configuração com dados insuficientes | Notificar usuário para revisar configuração                                                                             |
| `IntegrationNotFoundError`      | `integrationId` não encontrado       | Retornar 404                                                                                                            |
| `SyncInProgressError`           | Sync já em andamento                 | Informar usuário que sync já está rodando                                                                               |
| `ConnectionFailedError`         | Falha de rede ou autenticação        | Registrar erro, marcar integração como `ERROR`, agendar retry com backoff exponencial (3 tentativas: 1min, 5min, 15min) |
| `InvalidSyncScheduleError`      | Expressão cron inválida              | Notificar usuário                                                                                                       |

### Política de Retry

- **Falha de rede:** Retry automático com backoff exponencial (1min, 5min, 15min) até 3 tentativas.
- **Falha de autenticação:** Não fazer retry automático — notificar usuário para reautenticar.
- **Timeout:** `AbortSignal.timeout(10000)` em chamadas de API, registrar como `ConnectionFailedError`.

---

## 7. Não-escopo

- Armazenamento de senhas em texto plano (credenciais devem ser cifradas na camada de infraestrutura)
- Interface de usuário para configuração de integrações (apenas regras de domínio)
- Webhook server (apenas detecção de tipo `WEBHOOK`; implementação na infraestrutura)
- Suporte a múltiplas contas do mesmo provedor (apenas uma integração por provedor nesta versão)
