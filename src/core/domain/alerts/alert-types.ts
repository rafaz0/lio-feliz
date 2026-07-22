import { EntityId } from "../entity-id";

export class AlertId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AlertId {
    return new AlertId(value);
  }

  static generate(): AlertId {
    return new AlertId(`alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class AlertRuleId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AlertRuleId {
    return new AlertRuleId(value);
  }

  static generate(): AlertRuleId {
    return new AlertRuleId(`rule-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class AlertDeliveryId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AlertDeliveryId {
    return new AlertDeliveryId(value);
  }

  static generate(): AlertDeliveryId {
    return new AlertDeliveryId(`del-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type AlertSeverityLevel = "info" | "warning" | "critical";

export type AlertEventType = "dividend" | "exDate" | "earnings" | "maturity";

export type AlertChannelType = "inApp" | "email" | "push";

export type AlertChannel = {
  type: AlertChannelType;
  destination: string;
};

export type TriggerWhen = {
  daysBefore: number;
  eventType: AlertEventType;
};
