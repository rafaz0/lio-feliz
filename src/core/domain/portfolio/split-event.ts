import { FinancialEvent, FinancialEventType } from "./financial-event";

export class SplitEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly oldQuantity: number;
  public readonly newQuantity: number;
  public readonly splitFactor: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    oldQuantity: number,
    newQuantity: number,
  ) {
    super(aggregateId, correlationId, FinancialEventType.SPLIT);
    this.assetId = assetId;
    this.oldQuantity = oldQuantity;
    this.newQuantity = newQuantity;
    this.splitFactor = newQuantity / oldQuantity;
    this.finalize();
  }
}
