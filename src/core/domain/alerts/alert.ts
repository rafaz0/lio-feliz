import { ValueObject } from "../value-object";
import { AlertId, type AlertSeverityLevel } from "./alert-types";

export type AlertProps = {
  id: AlertId;
  ruleId: string;
  runId: string;
  assetTicker: string;
  eventDate: Date;
  message: string;
  severity: AlertSeverityLevel;
  createdAt: Date;
};

export class Alert extends ValueObject<AlertProps> {
  private constructor(props: AlertProps) {
    super(props);
  }

  static create(props: AlertProps): Alert {
    return new Alert(props);
  }

  get id(): AlertId {
    return this.props.id;
  }

  get ruleId(): string {
    return this.props.ruleId;
  }

  get runId(): string {
    return this.props.runId;
  }

  get assetTicker(): string {
    return this.props.assetTicker;
  }

  get eventDate(): Date {
    return this.props.eventDate;
  }

  get message(): string {
    return this.props.message;
  }

  get severity(): AlertSeverityLevel {
    return this.props.severity;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  dedupKey(): string {
    return `${this.props.ruleId}:${this.props.runId}:${this.props.assetTicker}:${this.props.eventDate.toISOString().split("T")[0]}`;
  }
}
