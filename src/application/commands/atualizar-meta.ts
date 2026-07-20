import { GoalCategory } from "@/core/domain/financial-goal";

export interface AtualizarMetaCommand {
  readonly type: "AtualizarMetaCommand";
  readonly goalId: string;
  readonly portfolioId: string;
  readonly name?: string;
  readonly targetAmount?: number;
  readonly targetDate?: Date;
  readonly category?: GoalCategory;
}
