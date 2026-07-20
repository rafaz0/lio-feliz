import { describe, it, expect, vi, afterEach } from "vitest";
import {
  FinancialGoal,
  FinancialGoalId,
  GoalCategory,
  GoalStatus,
  FinancialGoalService,
} from "@/core/domain";

function futureDate(daysFromNow: number = 365): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d;
}

function createGoal(
  id: string,
  name: string,
  targetAmount: number,
  category: GoalCategory = GoalCategory.OTHER,
): FinancialGoal {
  const result = FinancialGoal.create(
    FinancialGoalId.create(id),
    name,
    targetAmount,
    futureDate(),
    category,
    "corr-" + id,
  );
  return result.value!;
}

function createGoalWithAmount(
  id: string,
  name: string,
  targetAmount: number,
  currentAmount: number,
  category: GoalCategory = GoalCategory.OTHER,
): FinancialGoal {
  const goal = createGoal(id, name, targetAmount, category);
  goal.clearDomainEvents();
  const contributed = goal.contribute(currentAmount, new Date(), "corr-init");
  contributed.value!.clearDomainEvents();
  return contributed.value!;
}

describe("FinancialGoalService", () => {
  const service = new FinancialGoalService();

  describe("calculateSummary", () => {
    it("returns empty summary for no goals", () => {
      const summary = service.calculateSummary([]);
      expect(summary.total).toBe(0);
      expect(summary.active).toBe(0);
      expect(summary.completed).toBe(0);
      expect(summary.totalTargetAmount).toBe(0);
      expect(summary.totalCurrentAmount).toBe(0);
      expect(summary.overallPercentage).toBe(0);
    });

    it("counts goals by status", () => {
      const g1 = createGoal("g1", "A", 1000);
      const g2 = createGoal("g2", "B", 1000);
      const g3 = createGoal("g3", "C", 1000);

      const paused = g1.pause("c1").value!;
      const completed = g2.contribute(1000, new Date(), "c2").value!;
      const cancelled = g3.cancel("c3").value!;

      const goals = [g1, paused, completed, cancelled];
      const summary = service.calculateSummary(goals);
      expect(summary.total).toBe(4);
      expect(summary.active).toBe(1);
      expect(summary.completed).toBe(1);
      expect(summary.paused).toBe(1);
      expect(summary.cancelled).toBe(1);
    });

    it("calculates total target and current amounts", () => {
      const g1 = createGoalWithAmount("g1", "Meta 1", 1000, 500);
      const g2 = createGoalWithAmount("g2", "Meta 2", 2000, 1000);

      const summary = service.calculateSummary([g1, g2]);
      expect(summary.totalTargetAmount).toBe(3000);
      expect(summary.totalCurrentAmount).toBe(1500);
      expect(summary.overallPercentage).toBe(50);
    });
  });

  describe("findGoalsByCategory", () => {
    it("filters goals by category", () => {
      const g1 = createGoal("g1", "Emergência", 10000, GoalCategory.EMERGENCY);
      const g2 = createGoal("g2", "Aposentadoria", 500000, GoalCategory.RETIREMENT);
      const g3 = createGoal("g3", "Faculdade", 50000, GoalCategory.EDUCATION);

      const emergencies = service.findGoalsByCategory([g1, g2, g3], GoalCategory.EMERGENCY);
      expect(emergencies).toHaveLength(1);
      expect(emergencies[0].id.value).toBe("g1");

      const retirements = service.findGoalsByCategory([g1, g2, g3], GoalCategory.RETIREMENT);
      expect(retirements).toHaveLength(1);
      expect(retirements[0].id.value).toBe("g2");
    });

    it("returns empty array when no match", () => {
      const g1 = createGoal("g1", "Teste", 1000, GoalCategory.OTHER);
      const result = service.findGoalsByCategory([g1], GoalCategory.TRAVEL);
      expect(result).toEqual([]);
    });
  });

  describe("findGoalsNearDeadline", () => {
    it("finds goals with deadline within threshold", () => {
      const nearFuture = new Date();
      nearFuture.setDate(nearFuture.getDate() + 30);

      const farFuture = new Date();
      farFuture.setFullYear(farFuture.getFullYear() + 5);

      const g1Result = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "Próximo",
        1000,
        nearFuture,
        GoalCategory.OTHER,
        "c1",
      );
      const g2Result = FinancialGoal.create(
        FinancialGoalId.create("g2"),
        "Longe",
        1000,
        farFuture,
        GoalCategory.OTHER,
        "c2",
      );

      const near = service.findGoalsNearDeadline([g1Result.value!, g2Result.value!], 2);
      expect(near).toHaveLength(1);
      expect(near[0].id.value).toBe("g1");
    });
  });

  describe("findOverdueGoals", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("finds overdue active goals", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-06-01T12:00:00Z"));

      const mid2025 = new Date("2025-12-01T12:00:00Z");
      const farFuture = new Date("2030-01-01T12:00:00Z");

      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "Atrasada",
        1000,
        mid2025,
        GoalCategory.OTHER,
        "c1",
      ).value!;

      const g2 = FinancialGoal.create(
        FinancialGoalId.create("g2"),
        "Futura",
        1000,
        farFuture,
        GoalCategory.OTHER,
        "c2",
      ).value!;

      vi.setSystemTime(new Date("2026-07-01T12:00:00Z"));

      const overdue = service.findOverdueGoals([g1, g2]);
      expect(overdue).toHaveLength(1);
      expect(overdue[0].id.value).toBe("g1");

      vi.useRealTimers();
    });
  });
});
