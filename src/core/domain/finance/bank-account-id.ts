import { EntityId } from "@/core/domain";

export class BankAccountId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): BankAccountId {
    return new BankAccountId(value);
  }

  static generate(): BankAccountId {
    return new BankAccountId(crypto.randomUUID());
  }
}
