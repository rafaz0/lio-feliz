import { FinancialEvent, FinancialEventType } from "./financial-event";

export class DividendEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly shares: number;
  public readonly amountPerShare: number;
  public readonly totalAmount: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    shares: number,
    amountPerShare: number,
  ) {
    super(aggregateId, correlationId, FinancialEventType.DIVIDEND);
    this.assetId = assetId;
    this.shares = shares;
    this.amountPerShare = amountPerShare;
    this.totalAmount = shares * amountPerShare;
    this.finalize();
  }
}
