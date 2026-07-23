import { ValueObject } from "../value-object";
import { SubscriptionId, type SubscriptionStatus } from "./subscription-types";

export type SubscriptionProps = {
  id: SubscriptionId;
  planId: string;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  status: SubscriptionStatus;
};

export class Subscription extends ValueObject<SubscriptionProps> {
  private constructor(props: SubscriptionProps) {
    super(props);
  }
  static create(props: SubscriptionProps): Subscription {
    return new Subscription(props);
  }

  get id(): SubscriptionId {
    return this.props.id;
  }
  get planId(): string {
    return this.props.planId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get startDate(): Date {
    return this.props.startDate;
  }
  get endDate(): Date | null {
    return this.props.endDate;
  }
  get status(): SubscriptionStatus {
    return this.props.status;
  }

  get isActive(): boolean {
    return this.props.status === "ACTIVE";
  }

  cancel(): Subscription {
    return Subscription.create({ ...this.props, status: "CANCELLED", endDate: new Date() });
  }

  expire(): Subscription {
    return Subscription.create({ ...this.props, status: "EXPIRED", endDate: new Date() });
  }
}
