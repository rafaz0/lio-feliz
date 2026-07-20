import { DomainEvent } from "@/core/domain";

export class GoalCompletedEvent extends DomainEvent {
  public readonly finalAmount: number;
  public readonly targetAmount: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    finalAmount: number,
    targetAmount: number,
  ) {
    super(aggregateId, correlationId, "GOAL_COMPLETED");
    this.finalAmount = finalAmount;
    this.targetAmount = targetAmount;
    this.finalize();
  }
}
