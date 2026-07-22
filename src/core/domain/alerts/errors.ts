import { DomainError } from "../errors";

export class AlertRuleNotFoundError extends DomainError {
  constructor(ruleId: string) {
    super("ALERT_RULE_NOT_FOUND", `Regra de alerta "${ruleId}" nao encontrada`);
  }
}

export class DuplicateAlertError extends DomainError {
  constructor(ruleId: string, assetTicker: string, eventDate: string) {
    super("DUPLICATE_ALERT", `Alerta ja existe para regra "${ruleId}", ativo "${assetTicker}", data "${eventDate}"`);
  }
}

export class InvalidTriggerError extends DomainError {
  constructor(message: string) {
    super("INVALID_TRIGGER", `Gatilho invalido: ${message}`);
  }
}

export class ChannelNotFoundError extends DomainError {
  constructor(channelType: string) {
    super("CHANNEL_NOT_FOUND", `Canal "${channelType}" nao configurado para entrega`);
  }
}

export class AlertNotFoundError extends DomainError {
  constructor(alertId: string) {
    super("ALERT_NOT_FOUND", `Alerta "${alertId}" nao encontrado`);
  }
}
