import { Ticker, Quantity, Money } from "@/core/domain";
import { Position } from "./position";

export class AssetAllocationItem {
  public readonly ticker: Ticker;
  public readonly quantity: Quantity;
  public readonly totalCost: Money;
  public readonly allocation: number;

  constructor(ticker: Ticker, quantity: Quantity, totalCost: Money, allocation: number) {
    this.ticker = ticker;
    this.quantity = quantity;
    this.totalCost = totalCost;
    this.allocation = allocation;
    Object.freeze(this);
  }
}

export class AssetAllocationReport {
  public readonly items: readonly AssetAllocationItem[];
  public readonly totalInvested: Money;
  public readonly assetCount: number;

  constructor(items: AssetAllocationItem[], totalInvested: Money, assetCount: number) {
    this.items = Object.freeze([...items]);
    this.totalInvested = totalInvested;
    this.assetCount = assetCount;
    Object.freeze(this);
  }
}

export class AssetAllocationCalculator {
  calculate(positions: Position[]): AssetAllocationReport {
    const totalInvested = positions.reduce((sum, p) => sum + p.getTotalCost().getValue(), 0);

    const items = positions
      .filter((p) => p.getTotalCost().getValue() > 0 || p.getQuantity().getValue() > 0)
      .map((p) => {
        const allocation =
          totalInvested > 0
            ? Math.round((p.getTotalCost().getValue() / totalInvested) * 10000) / 100
            : 0;
        return new AssetAllocationItem(
          p.getTicker(),
          p.getQuantity(),
          p.getTotalCost(),
          allocation,
        );
      });

    return new AssetAllocationReport(items, Money.create(totalInvested), items.length);
  }
}
