import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import type { FinancialGoal } from "@/core/domain/financial-goal";
import { GoalCategory, GoalStatus } from "@/core/domain/financial-goal";

export class FakeFinancialGoalRepository implements IFinancialGoalRepository {
  private goals = new Map<string, FinancialGoal>();

  async save(goal: FinancialGoal): Promise<void> {
    this.goals.set(goal.id.value, goal);
  }

  async findById(goalId: string): Promise<FinancialGoal | null> {
    return this.goals.get(goalId) ?? null;
  }

  async findAll(portfolioId: string): Promise<FinancialGoal[]> {
    return Array.from(this.goals.values());
  }

  async findByCategory(portfolioId: string, category: GoalCategory): Promise<FinancialGoal[]> {
    return Array.from(this.goals.values()).filter((g) => g.category === category);
  }

  async findByStatus(portfolioId: string, status: GoalStatus): Promise<FinancialGoal[]> {
    return Array.from(this.goals.values()).filter((g) => g.status === status);
  }

  async delete(goalId: string): Promise<void> {
    this.goals.delete(goalId);
  }

  reset(): void {
    this.goals.clear();
  }
}
