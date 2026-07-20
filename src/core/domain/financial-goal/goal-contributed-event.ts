import { DomainEvent } from "@/core/domain";

export class GoalContributedEvent extends DomainEvent {
  public readonly amount: number;
  public readonly currentAmount: number;
  public readonly targetAmount: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    amount: number,
    currentAmount: number,
    targetAmount: number,
  ) {
    super(aggregateId, correlationId, "GOAL_CONTRIBUTED");
    this.amount = amount;
    this.currentAmount = currentAmount;
    this.targetAmount = targetAmount;
    this.finalize();
  }
}
