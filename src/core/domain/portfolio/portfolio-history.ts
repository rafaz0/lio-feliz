import { FinancialEvent, FinancialEventType } from "./financial-event";
import { PortfolioProjector } from "./portfolio-projector";
import { Position } from "./position";

export class PortfolioSnapshot {
  public readonly eventIndex: number;
  public readonly eventType: FinancialEventType;
  public readonly eventAssetId: string;
  public readonly occurredOn: Date;
  public readonly positions: readonly Position[];
  public readonly totalInvested: number;
  public readonly assetCount: number;

  constructor(
    eventIndex: number,
    eventType: FinancialEventType,
    eventAssetId: string,
    occurredOn: Date,
    positions: Position[],
    totalInvested: number,
    assetCount: number,
  ) {
    this.eventIndex = eventIndex;
    this.eventType = eventType;
    this.eventAssetId = eventAssetId;
    this.occurredOn = occurredOn;
    this.positions = Object.freeze([...positions]);
    this.totalInvested = totalInvested;
    this.assetCount = assetCount;
    Object.freeze(this);
  }
}

export class PortfolioHistory {
  public readonly snapshots: readonly PortfolioSnapshot[];
  public readonly totalEvents: number;

  constructor(snapshots: PortfolioSnapshot[], totalEvents: number) {
    this.snapshots = Object.freeze([...snapshots]);
    this.totalEvents = totalEvents;
    Object.freeze(this);
  }
}

export class PortfolioHistoryCalculator {
  calculate(events: FinancialEvent[]): PortfolioHistory {
    const projector = new PortfolioProjector();
    const snapshots: PortfolioSnapshot[] = [];

    for (let i = 0; i < events.length; i++) {
      const window = events.slice(0, i + 1);
      const positions = projector.project(window);
      const totalInvested = positions.reduce((sum, p) => sum + p.getTotalCost().getValue(), 0);
      const event = events[i];

      snapshots.push(
        new PortfolioSnapshot(
          i,
          event.type,
          (event as unknown as { assetId?: string }).assetId ?? "",
          event.occurredOn,
          positions,
          Math.round(totalInvested * 100) / 100,
          positions.length,
        ),
      );
    }

    return new PortfolioHistory(snapshots, events.length);
  }
}
