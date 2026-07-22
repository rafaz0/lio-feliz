import { ValueObject } from "../value-object";
import { AlertRuleId, type TriggerWhen, type AlertChannel } from "./alert-types";

export type AlertRuleProps = {
  id: AlertRuleId;
  name: string;
  triggerWhen: TriggerWhen;
  assetFilter: string[];
  channel: AlertChannel;
  enabled: boolean;
  userId: string;
  createdAt: Date;
  lastTriggeredAt?: Date;
};

export class AlertRule extends ValueObject<AlertRuleProps> {
  private constructor(props: AlertRuleProps) {
    super(props);
  }

  static create(props: AlertRuleProps): AlertRule {
    return new AlertRule(props);
  }

  get id(): AlertRuleId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get triggerWhen(): TriggerWhen {
    return this.props.triggerWhen;
  }

  get assetFilter(): string[] {
    return this.props.assetFilter;
  }

  get channel(): AlertChannel {
    return this.props.channel;
  }

  get enabled(): boolean {
    return this.props.enabled;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get lastTriggeredAt(): Date | undefined {
    return this.props.lastTriggeredAt;
  }

  enable(): AlertRule {
    return AlertRule.create({ ...this.props, enabled: true });
  }

  disable(): AlertRule {
    return AlertRule.create({ ...this.props, enabled: false });
  }

  markTriggered(): AlertRule {
    return AlertRule.create({ ...this.props, lastTriggeredAt: new Date() });
  }
}
