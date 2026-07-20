import { GoalCategory, GoalStatus } from "@/core/domain/financial-goal";

export interface ObterMetasQuery {
  readonly type: "ObterMetasQuery";
  readonly portfolioId: string;
  readonly status?: GoalStatus;
  readonly category?: GoalCategory;
}
