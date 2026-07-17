import { FinancialEvent, FinancialEventType } from "./financial-event";

export class SellEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly quantity: number;
  public readonly price: number;
  public readonly totalCost: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    quantity: number,
    price: number,
  ) {
    super(aggregateId, correlationId, FinancialEventType.SELL);
    this.assetId = assetId;
    this.quantity = quantity;
    this.price = price;
    this.totalCost = quantity * price;
    this.finalize();
  }
}
