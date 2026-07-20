import { Entity, EntityId, DomainError, Result } from "@/core/domain";

export class ContributionId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ContributionId {
    return new ContributionId(value);
  }
}

export enum ContributionType {
  MANUAL = "MANUAL",
  RECURRING = "RECURRING",
}

export class GoalContribution extends Entity<ContributionId> {
  public readonly goalId: string;
  public readonly amount: number;
  public readonly date: Date;
  public readonly type: ContributionType;

  private constructor(
    id: ContributionId,
    goalId: string,
    amount: number,
    date: Date,
    type: ContributionType,
  ) {
    super(id);
    this.goalId = goalId;
    this.amount = amount;
    this.date = date;
    this.type = type;
    Object.freeze(this);
  }

  static create(
    id: ContributionId,
    goalId: string,
    amount: number,
    date: Date,
    type: ContributionType = ContributionType.MANUAL,
  ): Result<GoalContribution, DomainError> {
    if (amount <= 0) {
      return Result.fail(
        new DomainError(
          "INVALID_CONTRIBUTION_AMOUNT",
          "Contribution amount must be greater than zero",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const now = new Date();
    if (date.getTime() > now.getTime()) {
      return Result.fail(
        new DomainError(
          "FUTURE_CONTRIBUTION_DATE",
          "Contribution date cannot be in the future",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const roundedAmount = Math.round(amount * 100) / 100;
    const contribution = new GoalContribution(id, goalId, roundedAmount, date, type);
    return Result.ok(contribution);
  }
}
