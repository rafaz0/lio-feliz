import { AggregateRoot } from "../aggregate-root";
import { DomainEvent } from "../domain-event";
import { SubscriptionId, type SubscriptionStatus } from "./subscription-types";

export type SubscriptionProps = {
  id: SubscriptionId;
  planId: string;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  trialEndDate: Date | null;
  status: SubscriptionStatus;
};

type SubscriptionEventData = {
  subscriptionId: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  timestamp: Date;
};

export class SubscriptionActivated extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionActivated", data.subscriptionId, data);
  }
}

export class SubscriptionTrialStarted extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionTrialStarted", data.subscriptionId, data);
  }
}

export class SubscriptionCancelled extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionCancelled", data.subscriptionId, data);
  }
}

export class SubscriptionExpired extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionExpired", data.subscriptionId, data);
  }
}

export class SubscriptionRenewed extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionRenewed", data.subscriptionId, data);
  }
}

export class SubscriptionUpgraded extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionUpgraded", data.subscriptionId, data);
  }
}

export class SubscriptionDowngraded extends DomainEvent {
  constructor(data: SubscriptionEventData) {
    super("SubscriptionDowngraded", data.subscriptionId, data);
  }
}

export class Subscription extends AggregateRoot<SubscriptionId> {
  private readonly _planId: string;
  private readonly _userId: string;
  private readonly _startDate: Date;
  private readonly _endDate: Date | null;
  private readonly _trialEndDate: Date | null;
  private readonly _status: SubscriptionStatus;

  private constructor(props: SubscriptionProps) {
    super(props.id);
    this._planId = props.planId;
    this._userId = props.userId;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._trialEndDate = props.trialEndDate;
    this._status = props.status;
  }

  static create(props: SubscriptionProps): Subscription {
    return new Subscription(props);
  }

  static startTrial(params: {
    id: SubscriptionId;
    planId: string;
    userId: string;
    trialDurationDays: number;
  }): Subscription {
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + params.trialDurationDays);

    const sub = new Subscription({
      id: params.id,
      planId: params.planId,
      userId: params.userId,
      startDate: now,
      endDate: trialEnd,
      trialEndDate: trialEnd,
      status: "TRIAL",
    });

    sub.addDomainEvent(
      new SubscriptionTrialStarted({
        subscriptionId: params.id.value,
        userId: params.userId,
        planId: params.planId,
        status: "TRIAL",
        timestamp: now,
      }),
    );

    return sub;
  }

  get planId(): string {
    return this._planId;
  }
  get userId(): string {
    return this._userId;
  }
  get startDate(): Date {
    return this._startDate;
  }
  get endDate(): Date | null {
    return this._endDate;
  }
  get trialEndDate(): Date | null {
    return this._trialEndDate;
  }
  get status(): SubscriptionStatus {
    return this._status;
  }

  get isActive(): boolean {
    return this._status === "ACTIVE";
  }

  get isTrial(): boolean {
    return this._status === "TRIAL";
  }

  get isPastDue(): boolean {
    return this._status === "PAST_DUE";
  }

  get isCancelled(): boolean {
    return this._status === "CANCELLED";
  }

  get isExpired(): boolean {
    return this._status === "EXPIRED";
  }

  toProps(): SubscriptionProps {
    return {
      id: this.id,
      planId: this._planId,
      userId: this._userId,
      startDate: this._startDate,
      endDate: this._endDate,
      trialEndDate: this._trialEndDate,
      status: this._status,
    };
  }

  activate(): Subscription {
    const sub = new Subscription({
      ...this.toProps(),
      status: "ACTIVE",
      endDate: null,
    });

    sub.addDomainEvent(
      new SubscriptionActivated({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: this._planId,
        status: "ACTIVE",
        timestamp: new Date(),
      }),
    );

    return sub;
  }

  cancel(): Subscription {
    const now = new Date();
    const sub = new Subscription({
      ...this.toProps(),
      status: "CANCELLED",
      endDate: now,
    });

    sub.addDomainEvent(
      new SubscriptionCancelled({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: this._planId,
        status: "CANCELLED",
        timestamp: now,
      }),
    );

    return sub;
  }

  expire(): Subscription {
    const sub = new Subscription({
      ...this.toProps(),
      status: "EXPIRED",
      endDate: new Date(),
    });

    sub.addDomainEvent(
      new SubscriptionExpired({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: this._planId,
        status: "EXPIRED",
        timestamp: new Date(),
      }),
    );

    return sub;
  }

  renew(periodMonths: number = 1): Subscription {
    const now = new Date();
    const newEnd = new Date(now);
    newEnd.setMonth(newEnd.getMonth() + periodMonths);

    const sub = new Subscription({
      ...this.toProps(),
      status: "ACTIVE",
      startDate: now,
      endDate: newEnd,
    });

    sub.addDomainEvent(
      new SubscriptionRenewed({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: this._planId,
        status: "ACTIVE",
        timestamp: now,
      }),
    );

    return sub;
  }

  upgrade(newPlanId: string): Subscription {
    const sub = new Subscription({
      ...this.toProps(),
      planId: newPlanId,
    });

    sub.addDomainEvent(
      new SubscriptionUpgraded({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: newPlanId,
        status: this._status,
        timestamp: new Date(),
      }),
    );

    return sub;
  }

  downgrade(newPlanId: string, effectiveEndDate: Date): Subscription {
    const sub = new Subscription({
      ...this.toProps(),
      planId: newPlanId,
      endDate: effectiveEndDate,
    });

    sub.addDomainEvent(
      new SubscriptionDowngraded({
        subscriptionId: this.id.value,
        userId: this._userId,
        planId: newPlanId,
        status: this._status,
        timestamp: new Date(),
      }),
    );

    return sub;
  }

  markPastDue(): Subscription {
    return new Subscription({
      ...this.toProps(),
      status: "PAST_DUE",
    });
  }

  endTrial(convertToActive: boolean): Subscription {
    return convertToActive ? this.activate() : this.cancel();
  }
}