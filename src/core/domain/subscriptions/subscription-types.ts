import { EntityId } from "../entity-id";

export class PlanId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): PlanId {
    return new PlanId(value);
  }
  static generate(): PlanId {
    return new PlanId(`plan-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class SubscriptionId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): SubscriptionId {
    return new SubscriptionId(value);
  }
  static generate(): SubscriptionId {
    return new SubscriptionId(`sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class BillingCycleId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): BillingCycleId {
    return new BillingCycleId(value);
  }
  static generate(): BillingCycleId {
    return new BillingCycleId(`bill-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type PlanTier = "FREE" | "BASIC" | "PREMIUM";
export type AccessLevel = "read" | "write" | "admin";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";
export type BillingStatus = "PENDING" | "PAID" | "FAILED";
