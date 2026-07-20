import { DomainEvent } from "@/core/domain";

export class GoalCreatedEvent extends DomainEvent {
  public readonly goalName: string;
  public readonly targetAmount: number;
  public readonly targetDate: Date;
  public readonly category: string;

  constructor(
    aggregateId: string,
    correlationId: string,
    goalName: string,
    targetAmount: number,
    targetDate: Date,
    category: string,
  ) {
    super(aggregateId, correlationId, "GOAL_CREATED");
    this.goalName = goalName;
    this.targetAmount = targetAmount;
    this.targetDate = targetDate;
    this.category = category;
    this.finalize();
  }
}
