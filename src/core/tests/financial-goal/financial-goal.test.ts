import { describe, it, expect, vi, afterEach } from "vitest";
import {
  FinancialGoal,
  FinancialGoalId,
  GoalCategory,
  GoalStatus,
  ContributionType,
} from "@/core/domain";
import { DomainError, Result } from "@/core/domain";

function futureDate(daysFromNow: number = 365): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d;
}

function pastDate(daysAgo: number = 1): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

function createValidGoal(
  id?: string,
  name?: string,
  targetAmount?: number,
  targetDate?: Date,
  category?: GoalCategory,
  correlationId?: string,
): Result<FinancialGoal, DomainError> {
  return FinancialGoal.create(
    FinancialGoalId.create(id ?? "goal-001"),
    name ?? "Viagem para Europa",
    targetAmount ?? 50000,
    targetDate ?? futureDate(),
    category ?? GoalCategory.TRAVEL,
    correlationId ?? "corr-create",
  );
}

describe("FinancialGoal", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("creation", () => {
    it("creates a goal with the given id", () => {
      const id = FinancialGoalId.create("goal-001");
      const result = createValidGoal("goal-001");
      expect(result.isSuccess).toBe(true);
      expect(result.value!.id.equals(id)).toBe(true);
    });

    it("sets initial currentAmount to zero", () => {
      const result = createValidGoal();
      expect(result.value!.currentAmount).toBe(0);
    });

    it("sets status to ACTIVE", () => {
      const result = createValidGoal();
      expect(result.value!.status).toBe(GoalStatus.ACTIVE);
    });

    it("emits GoalCreatedEvent", () => {
      const result = createValidGoal("goal-002", "Teste", 1000, futureDate(), GoalCategory.OTHER, "corr-1");
      const events = result.value!.getDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0].eventName).toBe("GOAL_CREATED");
      expect(events[0].aggregateId).toBe("goal-002");
      expect(events[0].correlationId).toBe("corr-1");
    });

    it("rounds targetAmount to 2 decimal places", () => {
      const result = createValidGoal("g1", "Test", 99.999, futureDate());
      expect(result.value!.targetAmount).toBe(100);
    });

    it("starts with no contributions", () => {
      const result = createValidGoal();
      expect(result.value!.contributions).toEqual([]);
    });

    it("starts with no pending domain events after clear", () => {
      const result = createValidGoal();
      result.value!.clearDomainEvents();
      expect(result.value!.getDomainEvents()).toEqual([]);
    });
  });

  describe("creation validation (invariants)", () => {
    it("rejects empty name (I-005)", () => {
      const result = createValidGoal("g1", "", 1000, futureDate());
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("EMPTY_GOAL_NAME");
    });

    it("rejects whitespace-only name", () => {
      const result = createValidGoal("g1", "   ", 1000, futureDate());
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("EMPTY_GOAL_NAME");
    });

    it("rejects zero targetAmount (I-001)", () => {
      const result = createValidGoal("g1", "Teste", 0, futureDate());
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("INVALID_TARGET_AMOUNT");
    });

    it("rejects negative targetAmount", () => {
      const result = createValidGoal("g1", "Teste", -100, futureDate());
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("INVALID_TARGET_AMOUNT");
    });

    it("rejects past targetDate (I-004)", () => {
      const result = createValidGoal("g1", "Teste", 1000, pastDate(1));
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("INVALID_TARGET_DATE");
    });

    it("rejects targetDate equal to now", () => {
      const now = new Date();
      const result = createValidGoal("g1", "Teste", 1000, now);
      expect(result.isFailure).toBe(true);
      expect(result.error!.code).toBe("INVALID_TARGET_DATE");
    });
  });

  describe("contributions", () => {
    it("adds a contribution to currentAmount", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();

      const updated = goal.contribute(500, new Date(), "corr-contrib");
      expect(updated.isSuccess).toBe(true);
      expect(updated.value!.currentAmount).toBe(500);
    });

    it("accumulates multiple contributions", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;

      const step1 = goal.contribute(200, new Date(), "c1");
      const step2 = step1.value!.contribute(300, new Date(), "c2");
      expect(step2.value!.currentAmount).toBe(500);

      const step3 = step2.value!.contribute(250.5, new Date(), "c3");
      expect(step3.value!.currentAmount).toBe(750.5);
    });

    it("emits GoalContributedEvent on contribution", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();

      const updated = goal.contribute(500, new Date(), "corr-evt");
      const events = updated.value!.getDomainEvents();
      expect(events.some((e) => e.eventName === "GOAL_CONTRIBUTED")).toBe(true);
    });

    it("auto-completes goal when currentAmount reaches targetAmount", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();

      const updated = goal.contribute(500, new Date(), "c-final");
      expect(updated.value!.status).toBe(GoalStatus.COMPLETED);
      expect(updated.value!.currentAmount).toBe(500);

      const eventNames = updated.value!.getDomainEvents().map((e) => e.eventName);
      expect(eventNames).toContain("GOAL_CONTRIBUTED");
      expect(eventNames).toContain("GOAL_COMPLETED");
    });

    it("rounds contribution amount to 2 decimal places", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const updated = result.value!.contribute(100.456, new Date(), "c1");
      expect(updated.value!.currentAmount).toBe(100.46);
    });

    it("rejects zero contribution", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const updated = result.value!.contribute(0, new Date(), "c1");
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("INVALID_CONTRIBUTION_AMOUNT");
    });

    it("rejects negative contribution", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const updated = result.value!.contribute(-50, new Date(), "c1");
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("INVALID_CONTRIBUTION_AMOUNT");
    });

    it("rejects future-dated contribution", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const future = new Date();
      future.setDate(future.getDate() + 5);
      const updated = result.value!.contribute(100, future, "c1");
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("FUTURE_CONTRIBUTION_DATE");
    });

    it("rejects contribution exceeding targetAmount", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const updated = result.value!.contribute(600, new Date(), "c1");
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("CONTRIBUTION_EXCEEDS_TARGET");
    });

    it("records contribution in history", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-07-20T12:00:00Z"));

      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      result.value!.clearDomainEvents();

      const updated = result.value!.contribute(300, new Date(), "c1");
      expect(updated.value!.contributions).toHaveLength(1);
      expect(updated.value!.contributions[0].amount).toBe(300);
      expect(updated.value!.contributions[0].type).toBe(ContributionType.MANUAL);

      vi.useRealTimers();
    });

    it("allows recurring contributions", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const updated = result.value!.contribute(200, new Date(), "c1", ContributionType.RECURRING);
      expect(updated.value!.contributions[0].type).toBe(ContributionType.RECURRING);
    });
  });

  describe("status transitions", () => {
    it("pauses an active goal", () => {
      const result = createValidGoal();
      const paused = result.value!.pause("corr");
      expect(paused.value!.status).toBe(GoalStatus.PAUSED);
    });

    it("resumes a paused goal", () => {
      const result = createValidGoal();
      const paused = result.value!.pause("corr-p");
      const resumed = paused.value!.resume("corr-r");
      expect(resumed.value!.status).toBe(GoalStatus.ACTIVE);
    });

    it("rejects pause on non-active goal", () => {
      const result = createValidGoal();
      const paused = result.value!.pause("c1");
      const again = paused.value!.pause("c2");
      expect(again.isFailure).toBe(true);
      expect(again.error!.code).toBe("GOAL_NOT_ACTIVE");
    });

    it("rejects resume on non-paused goal", () => {
      const result = createValidGoal();
      const resumed = result.value!.resume("c1");
      expect(resumed.isFailure).toBe(true);
      expect(resumed.error!.code).toBe("GOAL_NOT_PAUSED");
    });

    it("completes a goal manually", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();

      const contributed = goal.contribute(800, new Date(), "c1");
      const completed = contributed.value!.complete("corr-complete");
      expect(completed.value!.status).toBe(GoalStatus.COMPLETED);
      expect(completed.value!.getDomainEvents().some((e) => e.eventName === "GOAL_COMPLETED")).toBe(true);
    });

    it("cancels an active goal", () => {
      const result = createValidGoal();
      const cancelled = result.value!.cancel("corr", "USER_CANCELLED");
      expect(cancelled.value!.status).toBe(GoalStatus.CANCELLED);
      expect(cancelled.value!.getDomainEvents().some((e) => e.eventName === "GOAL_CANCELLED")).toBe(true);
    });

    it("rejects cancel on a completed goal", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();
      const completed = goal.contribute(500, new Date(), "c1");
      const cancelled = completed.value!.cancel("corr");
      expect(cancelled.isFailure).toBe(true);
      expect(cancelled.error!.code).toBe("GOAL_ALREADY_COMPLETED");
    });

    it("rejects complete on a cancelled goal", () => {
      const result = createValidGoal();
      const cancelled = result.value!.cancel("c1");
      const completed = cancelled.value!.complete("c2");
      expect(completed.isFailure).toBe(true);
      expect(completed.error!.code).toBe("GOAL_ALREADY_CANCELLED");
    });

    it("rejects contribution on completed goal", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();
      const completed = goal.contribute(500, new Date(), "c1");
      const again = completed.value!.contribute(100, new Date(), "c2");
      expect(again.isFailure).toBe(true);
      expect(again.error!.code).toBe("GOAL_ALREADY_COMPLETED");
    });

    it("rejects contribution on cancelled goal", () => {
      const result = createValidGoal();
      const cancelled = result.value!.cancel("c1");
      const contribution = cancelled.value!.contribute(100, new Date(), "c2");
      expect(contribution.isFailure).toBe(true);
      expect(contribution.error!.code).toBe("GOAL_ALREADY_CANCELLED");
    });

    it("rejects contribution on paused goal", () => {
      const result = createValidGoal();
      const paused = result.value!.pause("c1");
      const contribution = paused.value!.contribute(100, new Date(), "c2");
      expect(contribution.isFailure).toBe(true);
      expect(contribution.error!.code).toBe("GOAL_IS_PAUSED");
    });
  });

  describe("updateDetails", () => {
    it("updates goal details", () => {
      const result = createValidGoal("g1", "Old Name", 1000, futureDate(365), GoalCategory.TRAVEL);
      const updated = result.value!.updateDetails("New Name", 2000, futureDate(730), GoalCategory.EDUCATION);
      expect(updated.value!.name).toBe("New Name");
      expect(updated.value!.targetAmount).toBe(2000);
      expect(updated.value!.category).toBe(GoalCategory.EDUCATION);
    });

    it("rejects update with empty name", () => {
      const result = createValidGoal();
      const updated = result.value!.updateDetails("", 2000, futureDate(730), GoalCategory.EDUCATION);
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("EMPTY_GOAL_NAME");
    });

    it("rejects update with zero targetAmount", () => {
      const result = createValidGoal();
      const updated = result.value!.updateDetails("Meta", 0, futureDate(730), GoalCategory.EDUCATION);
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("INVALID_TARGET_AMOUNT");
    });

    it("rejects update on completed goal", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();
      const completed = goal.contribute(500, new Date(), "c1");
      const updated = completed.value!.updateDetails("Novo", 1000, futureDate(365), GoalCategory.OTHER);
      expect(updated.isFailure).toBe(true);
      expect(updated.error!.code).toBe("GOAL_ALREADY_COMPLETED");
    });
  });

  describe("calculateProgress", () => {
    it("returns 0% for a goal with no contributions", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const progress = result.value!.calculateProgress();
      expect(progress.percentage).toBe(0);
      expect(progress.currentAmount).toBe(0);
      expect(progress.remainingAmount).toBe(1000);
      expect(progress.monthlyAverage).toBeNull();
      expect(progress.projectedDate).toBeNull();
    });

    it("returns correct percentage for partial progress", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;
      const updated = goal.contribute(250, new Date(), "c1");
      const progress = updated.value!.calculateProgress();
      expect(progress.percentage).toBe(25);
      expect(progress.currentAmount).toBe(250);
      expect(progress.remainingAmount).toBe(750);
    });

    it("returns 100% for completed goal", () => {
      const result = createValidGoal("g1", "Teste", 500, futureDate());
      const goal = result.value!;
      const updated = goal.contribute(500, new Date(), "c1");
      const progress = updated.value!.calculateProgress();
      expect(progress.percentage).toBe(100);
      expect(progress.remainingAmount).toBe(0);
    });

    it("calculates monthly average based on contributions", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-07-20T12:00:00Z"));

      const result = createValidGoal("g1", "Teste", 12000, futureDate());
      const goal = result.value!;

      const ninetyDaysAgo = new Date("2026-04-20T12:00:00Z");
      const sixtyDaysAgo = new Date("2026-05-20T12:00:00Z");
      const thirtyDaysAgo = new Date("2026-06-20T12:00:00Z");

      const s1 = goal.contribute(1000, ninetyDaysAgo, "c1");
      const s2 = s1.value!.contribute(1000, sixtyDaysAgo, "c2");
      const s3 = s2.value!.contribute(1000, thirtyDaysAgo, "c3");

      const progress = s3.value!.calculateProgress();
      expect(progress.monthlyAverage).not.toBeNull();
      expect(progress.monthlyAverage).toBeGreaterThan(0);

      vi.useRealTimers();
    });
  });

  describe("equality", () => {
    it("equals another goal with the same id", () => {
      const a = createValidGoal("g1");
      const b = createValidGoal("g1");
      expect(a.value!.equals(b.value!)).toBe(true);
    });

    it("does not equal a goal with different id", () => {
      const a = createValidGoal("g1");
      const b = createValidGoal("g2");
      expect(a.value!.equals(b.value!)).toBe(false);
    });

    it("events do not affect equality", () => {
      const a = createValidGoal("g1");
      const b = createValidGoal("g1");
      a.value!.contribute(100, new Date(), "c1");
      expect(a.value!.equals(b.value!)).toBe(true);
    });
  });

  describe("readonly arrays", () => {
    it("returns a copy of contributions array", () => {
      const result = createValidGoal("g1", "Teste", 1000, futureDate());
      const goal = result.value!;
      goal.clearDomainEvents();
      const updated = goal.contribute(100, new Date(), "c1");
      const contributions = updated.value!.contributions;
      (contributions as unknown[]).pop();
      expect(updated.value!.contributions).toHaveLength(1);
    });
  });
});
