import type { SupabaseClient } from "@supabase/supabase-js";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { GoalCategory, GoalStatus, FinancialGoal } from "@/core/domain/financial-goal";
import type { FinancialGoalId } from "@/core/domain/financial-goal";

interface SerializedFinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  contributions: SerializedContribution[];
}

interface SerializedContribution {
  id: string;
  goalId: string;
  amount: number;
  date: string;
  type: string;
}

export class SupabaseFinancialGoalRepository implements IFinancialGoalRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async save(goal: FinancialGoal): Promise<void> {
    const serialized = this.serialize(goal);
    const { error } = await this.supabase
      .from("financial_goals")
      .upsert(
        { id: goal.id.value, dados: serialized, updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );

    if (error) {
      throw new Error(`Failed to save financial goal: ${error.message}`);
    }
  }

  async findById(goalId: string): Promise<FinancialGoal | null> {
    const { data, error } = await this.supabase
      .from("financial_goals")
      .select("dados")
      .eq("id", goalId)
      .single();

    if (error || !data) {
      return null;
    }

    return this.deserialize(data.dados as unknown as SerializedFinancialGoal);
  }

  async findAll(_portfolioId: string): Promise<FinancialGoal[]> {
    const { data, error } = await this.supabase.from("financial_goals").select("dados");

    if (error || !data) {
      return [];
    }

    return data.map((row) => this.deserialize(row.dados as unknown as SerializedFinancialGoal));
  }

  async findByCategory(_portfolioId: string, category: GoalCategory): Promise<FinancialGoal[]> {
    const { data, error } = await this.supabase
      .from("financial_goals")
      .select("dados")
      .eq("dados->>category", category);

    if (error || !data) {
      return [];
    }

    return data.map((row) => this.deserialize(row.dados as unknown as SerializedFinancialGoal));
  }

  async findByStatus(_portfolioId: string, status: GoalStatus): Promise<FinancialGoal[]> {
    const { data, error } = await this.supabase
      .from("financial_goals")
      .select("dados")
      .eq("dados->>status", status);

    if (error || !data) {
      return [];
    }

    return data.map((row) => this.deserialize(row.dados as unknown as SerializedFinancialGoal));
  }

  async delete(goalId: string): Promise<void> {
    const { error } = await this.supabase.from("financial_goals").delete().eq("id", goalId);

    if (error) {
      throw new Error(`Failed to delete financial goal: ${error.message}`);
    }
  }

  private serialize(goal: FinancialGoal): SerializedFinancialGoal {
    return {
      id: goal.id.value,
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      targetDate: goal.targetDate.toISOString(),
      category: goal.category,
      status: goal.status,
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
      contributions: goal.contributions.map((c) => ({
        id: c.id.value,
        goalId: c.goalId,
        amount: c.amount,
        date: c.date.toISOString(),
        type: c.type,
      })),
    };
  }

  private deserialize(data: SerializedFinancialGoal): FinancialGoal {
    const FinancialGoalClass = FinancialGoal as unknown as {
      new (
        id: FinancialGoalId,
        name: string,
        targetAmount: number,
        targetDate: Date,
        category: GoalCategory,
        status: GoalStatus,
        currentAmount: number,
        createdAt: Date,
        updatedAt: Date,
        contributions: unknown[],
      ): FinancialGoal;
    };

    const goalId = FinancialGoalId.create(data.id);

    return new FinancialGoalClass(
      goalId,
      data.name,
      data.targetAmount,
      new Date(data.targetDate),
      data.category as GoalCategory,
      data.status as GoalStatus,
      data.currentAmount,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      [],
    );
  }
}
