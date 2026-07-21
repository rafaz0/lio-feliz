import { DomainError } from "../errors";

export class InvalidIntegrationConfigError extends DomainError {
  constructor(message = "Configuração de integração inválida") {
    super("INVALID_INTEGRATION_CONFIG", message);
  }
}

export class IntegrationNotFoundError extends DomainError {
  constructor(integrationId: string) {
    super("INTEGRATION_NOT_FOUND", `Integração '${integrationId}' não encontrada`);
  }
}

export class SyncInProgressError extends DomainError {
  constructor(integrationId: string) {
    super("SYNC_IN_PROGRESS", `Sincronização já em andamento para integração '${integrationId}'`);
  }
}

export class ConnectionFailedError extends DomainError {
  constructor(integrationId: string, reason: string) {
    super("CONNECTION_FAILED", `Conexão falhou para integração '${integrationId}': ${reason}`);
  }
}

export class InvalidSyncScheduleError extends DomainError {
  constructor(message = "Agendamento de sincronização inválido") {
    super("INVALID_SYNC_SCHEDULE", message);
  }
}
