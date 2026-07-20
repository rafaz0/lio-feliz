import { FinancialGoal } from "./financial-goal";
import { GoalStatus } from "./goal-status";
import { GoalProgress } from "./goal-progress";

export interface GoalsSummary {
  total: number;
  active: number;
  completed: number;
  paused: number;
  cancelled: number;
  totalTargetAmount: number;
  totalCurrentAmount: number;
  overallPercentage: number;
}

export class FinancialGoalService {
  calculateProgress(goal: FinancialGoal): GoalProgress {
    return goal.calculateProgress();
  }

  calculateSummary(goals: FinancialGoal[]): GoalsSummary {
    const total = goals.length;
    const active = goals.filter((g) => g.status === GoalStatus.ACTIVE).length;
    const completed = goals.filter((g) => g.status === GoalStatus.COMPLETED).length;
    const paused = goals.filter((g) => g.status === GoalStatus.PAUSED).length;
    const cancelled = goals.filter((g) => g.status === GoalStatus.CANCELLED).length;
    const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);
    const overallPercentage =
      totalTargetAmount > 0
        ? Math.round((totalCurrentAmount / totalTargetAmount) * 10000) / 100
        : 0;

    return {
      total,
      active,
      completed,
      paused,
      cancelled,
      totalTargetAmount: Math.round(totalTargetAmount * 100) / 100,
      totalCurrentAmount: Math.round(totalCurrentAmount * 100) / 100,
      overallPercentage,
    };
  }

  findGoalsByCategory(goals: FinancialGoal[], category: string): FinancialGoal[] {
    return goals.filter((g) => g.category === category);
  }

  findGoalsNearDeadline(goals: FinancialGoal[], monthsThreshold: number = 3): FinancialGoal[] {
    const now = new Date();
    const thresholdDate = new Date(now);
    thresholdDate.setMonth(thresholdDate.getMonth() + monthsThreshold);

    return goals.filter(
      (g) =>
        g.status === GoalStatus.ACTIVE &&
        g.targetDate.getTime() <= thresholdDate.getTime() &&
        g.targetDate.getTime() >= now.getTime(),
    );
  }

  findOverdueGoals(goals: FinancialGoal[]): FinancialGoal[] {
    const now = new Date();
    return goals.filter(
      (g) =>
        (g.status === GoalStatus.ACTIVE || g.status === GoalStatus.PAUSED) &&
        g.targetDate.getTime() < now.getTime() &&
        g.currentAmount < g.targetAmount,
    );
  }
}
