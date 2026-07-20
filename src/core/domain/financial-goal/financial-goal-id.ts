import { EntityId } from "@/core/domain";

export class FinancialGoalId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): FinancialGoalId {
    return new FinancialGoalId(value);
  }

  static isValid(value: string): boolean {
    return typeof value === "string" && value.trim().length > 0;
  }
}
