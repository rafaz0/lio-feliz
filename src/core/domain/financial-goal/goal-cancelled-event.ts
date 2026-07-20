import { DomainEvent } from "@/core/domain";

export class GoalCancelledEvent extends DomainEvent {
  public readonly currentAmount: number;
  public readonly reason: string;

  constructor(
    aggregateId: string,
    correlationId: string,
    currentAmount: number,
    reason: string = "USER_CANCELLED",
  ) {
    super(aggregateId, correlationId, "GOAL_CANCELLED");
    this.currentAmount = currentAmount;
    this.reason = reason;
    this.finalize();
  }
}
