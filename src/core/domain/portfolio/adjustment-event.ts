import { FinancialEvent, FinancialEventType } from "./financial-event";

export class AdjustmentEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly shares: number;
  public readonly amount: number;
  public readonly description: string;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    shares: number,
    amount: number,
    description: string,
  ) {
    super(aggregateId, correlationId, FinancialEventType.ADJUSTMENT);
    this.assetId = assetId;
    this.shares = shares;
    this.amount = amount;
    this.description = description;
    this.finalize();
  }
}
