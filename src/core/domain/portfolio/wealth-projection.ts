import { Money } from "@/core/domain";
import { AssetAllocationReport } from "./asset-allocation";
import { PerformanceReport } from "./performance";
import { Position } from "./position";
import { FinancialEvent, FinancialEventType } from "./financial-event";

export class WealthProjection {
  public readonly totalInvested: Money;
  public readonly assetCount: number;
  public readonly diversificationIndex: number;
  public readonly allocationSummary: readonly { ticker: string; allocation: number }[];
  public readonly eventSummary: { type: FinancialEventType; count: number }[];
  public readonly createdAt: Date;

  constructor(
    totalInvested: Money,
    assetCount: number,
    diversificationIndex: number,
    allocationSummary: { ticker: string; allocation: number }[],
    eventSummary: { type: FinancialEventType; count: number }[],
  ) {
    this.totalInvested = totalInvested;
    this.assetCount = assetCount;
    this.diversificationIndex = diversificationIndex;
    this.allocationSummary = Object.freeze([...allocationSummary]);
    this.eventSummary = Object.freeze([...eventSummary]);
    this.createdAt = new Date();
    Object.freeze(this);
  }
}

export class WealthProjectionCalculator {
  calculate(
    positions: Position[],
    allocation: AssetAllocationReport,
    performance: PerformanceReport,
    events: FinancialEvent[],
  ): WealthProjection {
    const totalInvested = positions.reduce(
      (sum, p) => sum + p.getTotalCost().getValue(),
      0,
    );

    const eventCounts = new Map<FinancialEventType, number>();
    for (const ev of events) {
      eventCounts.set(ev.type, (eventCounts.get(ev.type) ?? 0) + 1);
    }
    const eventSummary = Array.from(eventCounts.entries()).map(([type, count]) => ({
      type,
      count,
    }));

    const allocationSummary = allocation.items.map((item) => ({
      ticker: item.ticker.getValue(),
      allocation: item.allocation,
    }));

    return new WealthProjection(
      Money.create(Math.round(totalInvested * 100) / 100),
      allocation.assetCount,
      performance.concentrationIndex,
      allocationSummary,
      eventSummary,
    );
  }
}
