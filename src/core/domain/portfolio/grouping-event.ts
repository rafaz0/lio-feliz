import { FinancialEvent, FinancialEventType } from "./financial-event";

export class GroupingEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly oldQuantity: number;
  public readonly newQuantity: number;
  public readonly groupingFactor: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    oldQuantity: number,
    newQuantity: number,
  ) {
    super(aggregateId, correlationId, FinancialEventType.GROUPING);
    this.assetId = assetId;
    this.oldQuantity = oldQuantity;
    this.newQuantity = newQuantity;
    this.groupingFactor = oldQuantity / newQuantity;
    this.finalize();
  }
}
