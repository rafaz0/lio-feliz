import { EntityId } from "@/core/domain";

export class TransactionId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TransactionId {
    return new TransactionId(value);
  }

  static generate(): TransactionId {
    return new TransactionId(crypto.randomUUID());
  }
}
