import { DomainEvent } from "@/core/domain";

export enum FinancialEventType {
  BUY = "BUY",
  SELL = "SELL",
  DIVIDEND = "DIVIDEND",
  JCP = "JCP",
  BONUS = "BONUS",
  SPLIT = "SPLIT",
  GROUPING = "GROUPING",
  AMORTIZATION = "AMORTIZATION",
  ADJUSTMENT = "ADJUSTMENT",
}

export abstract class FinancialEvent extends DomainEvent {
  public readonly type: FinancialEventType;

  constructor(aggregateId: string, correlationId: string, type: FinancialEventType) {
    super(aggregateId, correlationId, type);
    this.type = type;
  }

  protected finalize(): void {
    Object.freeze(this);
  }
}
