import type { FinancialGoal } from "@/core/domain/financial-goal";
import { GoalCategory, GoalStatus } from "@/core/domain/financial-goal";

export interface IFinancialGoalRepository {
  save(goal: FinancialGoal): Promise<void>;
  findById(goalId: string): Promise<FinancialGoal | null>;
  findAll(portfolioId: string): Promise<FinancialGoal[]>;
  findByCategory(portfolioId: string, category: GoalCategory): Promise<FinancialGoal[]>;
  findByStatus(portfolioId: string, status: GoalStatus): Promise<FinancialGoal[]>;
  delete(goalId: string): Promise<void>;
}
