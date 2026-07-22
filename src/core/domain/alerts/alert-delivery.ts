import { ValueObject } from "../value-object";
import { AlertDeliveryId, type AlertChannel } from "./alert-types";

export type AlertDeliveryProps = {
  id: AlertDeliveryId;
  alertId: string;
  channel: AlertChannel;
  sentAt: Date;
  ack: boolean;
};

export class AlertDelivery extends ValueObject<AlertDeliveryProps> {
  private constructor(props: AlertDeliveryProps) {
    super(props);
  }

  static create(props: AlertDeliveryProps): AlertDelivery {
    return new AlertDelivery(props);
  }

  get id(): AlertDeliveryId {
    return this.props.id;
  }

  get alertId(): string {
    return this.props.alertId;
  }

  get channel(): AlertChannel {
    return this.props.channel;
  }

  get sentAt(): Date {
    return this.props.sentAt;
  }

  get ack(): boolean {
    return this.props.ack;
  }

  confirm(): AlertDelivery {
    return AlertDelivery.create({ ...this.props, ack: true });
  }
}
