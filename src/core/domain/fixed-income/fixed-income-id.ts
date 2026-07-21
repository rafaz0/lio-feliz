import { EntityId } from "@/core/domain";

export class FixedIncomeId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): FixedIncomeId {
    return new FixedIncomeId(value);
  }

  getValue(): string {
    return this.value;
  }
}
