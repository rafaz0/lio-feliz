import { FinancialEvent, FinancialEventType } from "./financial-event";

export class BonusEvent extends FinancialEvent {
  public readonly assetId: string;
  public readonly sharesHeld: number;
  public readonly bonusRatio: number;
  public readonly bonusShares: number;

  constructor(
    aggregateId: string,
    correlationId: string,
    assetId: string,
    sharesHeld: number,
    bonusRatio: number,
  ) {
    super(aggregateId, correlationId, FinancialEventType.BONUS);
    this.assetId = assetId;
    this.sharesHeld = sharesHeld;
    this.bonusRatio = bonusRatio;
    this.bonusShares = sharesHeld * bonusRatio;
    this.finalize();
  }
}
