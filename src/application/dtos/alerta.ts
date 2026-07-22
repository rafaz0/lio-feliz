export interface AlertaDto {
  readonly id: string;
  readonly ruleId: string;
  readonly runId: string;
  readonly assetTicker: string;
  readonly eventDate: string;
  readonly message: string;
  readonly severity: string;
  readonly createdAt: string;
  readonly ack: boolean;
}

export interface AlertRuleDto {
  readonly id: string;
  readonly name: string;
  readonly triggerWhen: {
    daysBefore: number;
    eventType: string;
  };
  readonly assetFilter: string[];
  readonly channel: {
    type: string;
    destination: string;
  };
  readonly enabled: boolean;
  readonly userId: string;
  readonly createdAt: string;
  readonly lastTriggeredAt?: string;
}

export interface AlertDeliveryDto {
  readonly id: string;
  readonly alertId: string;
  readonly channel: {
    type: string;
    destination: string;
  };
  readonly sentAt: string;
  readonly ack: boolean;
}

export interface AlertListDto {
  readonly alerts: AlertaDto[];
}

export interface AlertRuleListDto {
  readonly rules: AlertRuleDto[];
}
