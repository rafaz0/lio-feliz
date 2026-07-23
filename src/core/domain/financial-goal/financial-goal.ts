import { AggregateRoot, DomainError, Result } from "@/core/domain";
import { FinancialGoalId } from "./financial-goal-id";
import { GoalCategory } from "./goal-category";
import { GoalStatus } from "./goal-status";
import { GoalContribution, ContributionId, ContributionType } from "./goal-contribution";
import { GoalProgress } from "./goal-progress";
import { GoalCreatedEvent } from "./goal-created-event";
import { GoalContributedEvent } from "./goal-contributed-event";
import { GoalCompletedEvent } from "./goal-completed-event";
import { GoalCancelledEvent } from "./goal-cancelled-event";

export class FinancialGoal extends AggregateRoot<FinancialGoalId> {
  public readonly name: string;
  public readonly targetAmount: number;
  public readonly currentAmount: number;
  public readonly targetDate: Date;
  public readonly category: GoalCategory;
  public readonly status: GoalStatus;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  private readonly _contributions: GoalContribution[];

  private constructor(
    id: FinancialGoalId,
    name: string,
    targetAmount: number,
    targetDate: Date,
    category: GoalCategory,
    status: GoalStatus,
    currentAmount: number,
    createdAt: Date,
    updatedAt: Date,
    contributions: GoalContribution[],
  ) {
    super(id);
    this.name = name;
    this.targetAmount = targetAmount;
    this.currentAmount = currentAmount;
    this.targetDate = targetDate;
    this.category = category;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this._contributions = [...contributions];
  }

  static create(
    id: FinancialGoalId,
    name: string,
    targetAmount: number,
    targetDate: Date,
    category: GoalCategory,
    correlationId: string,
  ): Result<FinancialGoal, DomainError> {
    if (!name || name.trim().length === 0) {
      return Result.fail(
        new DomainError("EMPTY_GOAL_NAME", "Goal name cannot be empty", "INVARIANT_VIOLATION"),
      );
    }

    if (targetAmount <= 0) {
      return Result.fail(
        new DomainError(
          "INVALID_TARGET_AMOUNT",
          "Target amount must be greater than zero",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const now = new Date();
    if (targetDate.getTime() <= now.getTime()) {
      return Result.fail(
        new DomainError(
          "INVALID_TARGET_DATE",
          "Target date must be in the future",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const roundedTarget = Math.round(targetAmount * 100) / 100;
    const goal = new FinancialGoal(
      id,
      name.trim(),
      roundedTarget,
      targetDate,
      category,
      GoalStatus.ACTIVE,
      0,
      now,
      now,
      [],
    );

    goal.addDomainEvent(
      new GoalCreatedEvent(
        id.value,
        correlationId,
        name.trim(),
        roundedTarget,
        targetDate,
        category,
      ),
    );

    return Result.ok(goal);
  }

  get contributions(): readonly GoalContribution[] {
    return [...this._contributions];
  }

  contribute(
    amount: number,
    date: Date,
    correlationId: string,
    type: ContributionType = ContributionType.MANUAL,
  ): Result<FinancialGoal, DomainError> {
    if (this.status === GoalStatus.COMPLETED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_COMPLETED",
          "Cannot contribute to a completed goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this.status === GoalStatus.CANCELLED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_CANCELLED",
          "Cannot contribute to a cancelled goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this.status === GoalStatus.PAUSED) {
      return Result.fail(
        new DomainError(
          "GOAL_IS_PAUSED",
          "Cannot contribute to a paused goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const contributionId = ContributionId.create(`${this.id.value}-${Date.now()}`);
    const contributionResult = GoalContribution.create(
      contributionId,
      this.id.value,
      amount,
      date,
      type,
    );

    if (contributionResult.isFailure) {
      return Result.fail(contributionResult.error!);
    }

    const contribution = contributionResult.value!;
    const roundedAmount = Math.round(amount * 100) / 100;
    const newAmount = Math.round((this.currentAmount + roundedAmount) * 100) / 100;

    if (newAmount > this.targetAmount && this.status !== GoalStatus.COMPLETED) {
      return Result.fail(
        new DomainError(
          "CONTRIBUTION_EXCEEDS_TARGET",
          "Contribution would exceed the target amount. Complete the goal first or reduce the contribution.",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const isNowCompleted = newAmount === this.targetAmount;
    const newStatus = isNowCompleted ? GoalStatus.COMPLETED : this.status;

    const goal = new FinancialGoal(
      this.id,
      this.name,
      this.targetAmount,
      this.targetDate,
      this.category,
      newStatus,
      newAmount,
      this.createdAt,
      new Date(),
      [...this._contributions, contribution],
    );

    goal.addDomainEvent(
      new GoalContributedEvent(
        this.id.value,
        correlationId,
        roundedAmount,
        newAmount,
        this.targetAmount,
      ),
    );

    if (isNowCompleted) {
      goal.addDomainEvent(
        new GoalCompletedEvent(this.id.value, correlationId, newAmount, this.targetAmount),
      );
    }

    return Result.ok(goal);
  }

  complete(correlationId: string): Result<FinancialGoal, DomainError> {
    if (this.status === GoalStatus.COMPLETED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_COMPLETED",
          "Goal is already completed",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this.status === GoalStatus.CANCELLED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_CANCELLED",
          "Cannot complete a cancelled goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const goal = new FinancialGoal(
      this.id,
      this.name,
      this.targetAmount,
      this.targetDate,
      this.category,
      GoalStatus.COMPLETED,
      this.currentAmount,
      this.createdAt,
      new Date(),
      this._contributions,
    );

    goal.addDomainEvent(
      new GoalCompletedEvent(this.id.value, correlationId, this.currentAmount, this.targetAmount),
    );

    return Result.ok(goal);
  }

  cancel(
    correlationId: string,
    reason: string = "USER_CANCELLED",
  ): Result<FinancialGoal, DomainError> {
    if (this.status === GoalStatus.COMPLETED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_COMPLETED",
          "Cannot cancel a completed goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this.status === GoalStatus.CANCELLED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_CANCELLED",
          "Goal is already cancelled",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const goal = new FinancialGoal(
      this.id,
      this.name,
      this.targetAmount,
      this.targetDate,
      this.category,
      GoalStatus.CANCELLED,
      this.currentAmount,
      this.createdAt,
      new Date(),
      this._contributions,
    );

    goal.addDomainEvent(
      new GoalCancelledEvent(this.id.value, correlationId, this.currentAmount, reason),
    );

    return Result.ok(goal);
  }

  pause(correlationId: string): Result<FinancialGoal, DomainError> {
    if (this.status !== GoalStatus.ACTIVE) {
      return Result.fail(
        new DomainError(
          "GOAL_NOT_ACTIVE",
          "Only active goals can be paused",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const goal = new FinancialGoal(
      this.id,
      this.name,
      this.targetAmount,
      this.targetDate,
      this.category,
      GoalStatus.PAUSED,
      this.currentAmount,
      this.createdAt,
      new Date(),
      this._contributions,
    );

    return Result.ok(goal);
  }

  resume(correlationId: string): Result<FinancialGoal, DomainError> {
    if (this.status !== GoalStatus.PAUSED) {
      return Result.fail(
        new DomainError(
          "GOAL_NOT_PAUSED",
          "Only paused goals can be resumed",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const goal = new FinancialGoal(
      this.id,
      this.name,
      this.targetAmount,
      this.targetDate,
      this.category,
      GoalStatus.ACTIVE,
      this.currentAmount,
      this.createdAt,
      new Date(),
      this._contributions,
    );

    return Result.ok(goal);
  }

  updateDetails(
    name: string,
    targetAmount: number,
    targetDate: Date,
    category: GoalCategory,
  ): Result<FinancialGoal, DomainError> {
    if (this.status === GoalStatus.COMPLETED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_COMPLETED",
          "Cannot update a completed goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this.status === GoalStatus.CANCELLED) {
      return Result.fail(
        new DomainError(
          "GOAL_ALREADY_CANCELLED",
          "Cannot update a cancelled goal",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (!name || name.trim().length === 0) {
      return Result.fail(
        new DomainError("EMPTY_GOAL_NAME", "Goal name cannot be empty", "INVARIANT_VIOLATION"),
      );
    }

    if (targetAmount <= 0) {
      return Result.fail(
        new DomainError(
          "INVALID_TARGET_AMOUNT",
          "Target amount must be greater than zero",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (targetDate.getTime() <= this.createdAt.getTime()) {
      return Result.fail(
        new DomainError(
          "INVALID_TARGET_DATE",
          "Target date must be after creation date",
          "INVARIANT_VIOLATION",
        ),
      );
    }

    const goal = new FinancialGoal(
      this.id,
      name.trim(),
      Math.round(targetAmount * 100) / 100,
      targetDate,
      category,
      this.status,
      this.currentAmount,
      this.createdAt,
      new Date(),
      this._contributions,
    );

    return Result.ok(goal);
  }

  calculateProgress(): GoalProgress {
    const percentage =
      this.targetAmount > 0
        ? Math.min(Math.round((this.currentAmount / this.targetAmount) * 10000) / 100, 100)
        : 0;

    const remainingAmount = Math.max(
      Math.round((this.targetAmount - this.currentAmount) * 100) / 100,
      0,
    );

    const monthlyAverage = this.calculateMonthlyAverage();
    let projectedDate: Date | null = null;
    let remainingMonths: number | null = null;
    let onTrack: boolean | null = null;

    if (monthlyAverage !== null && monthlyAverage > 0) {
      remainingMonths = Math.ceil(remainingAmount / monthlyAverage);
      projectedDate = new Date();
      projectedDate.setMonth(projectedDate.getMonth() + remainingMonths);

      const monthsUntilDeadline = this.monthsBetween(new Date(), this.targetDate);
      onTrack = remainingMonths <= monthsUntilDeadline;
    }

    return new GoalProgress(
      percentage,
      this.currentAmount,
      this.targetAmount,
      remainingAmount,
      projectedDate,
      monthlyAverage,
      remainingMonths,
      onTrack,
    );
  }

  private calculateMonthlyAverage(): number | null {
    if (this._contributions.length === 0) {
      return null;
    }

    const now = new Date();
    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const recentContributions = this._contributions.filter(
      (c) => c.date.getTime() >= twelveMonthsAgo.getTime(),
    );

    if (recentContributions.length === 0) {
      const allTotal = this._contributions.reduce((sum, c) => sum + c.amount, 0);
      const allMonths = Math.max(this.monthsBetween(this._contributions[0].date, now), 1);
      return Math.round((allTotal / allMonths) * 100) / 100;
    }

    const total = recentContributions.reduce((sum, c) => sum + c.amount, 0);
    return Math.round((total / 12) * 100) / 100;
  }

  private monthsBetween(start: Date, end: Date): number {
    return Math.max(
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()),
      1,
    );
  }
}
