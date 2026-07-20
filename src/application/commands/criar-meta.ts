import { GoalCategory } from "@/core/domain/financial-goal";

export interface CriarMetaCommand {
  readonly type: "CriarMetaCommand";
  readonly portfolioId: string;
  readonly name: string;
  readonly targetAmount: number;
  readonly targetDate: Date;
  readonly category: GoalCategory;
}
