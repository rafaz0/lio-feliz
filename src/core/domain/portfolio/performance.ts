import { Ticker, Money } from "@/core/domain";
import { Position } from "./position";

export class AssetPerformance {
  public readonly ticker: Ticker;
  public readonly totalCost: Money;
  public readonly totalInvested: Money;
  public readonly weight: number;

  constructor(ticker: Ticker, totalCost: Money, totalInvested: Money, weight: number) {
    this.ticker = ticker;
    this.totalCost = totalCost;
    this.totalInvested = totalInvested;
    this.weight = weight;
    Object.freeze(this);
  }
}

export class PerformanceReport {
  public readonly totalInvested: Money;
  public readonly totalCurrentCost: Money;
  public readonly assetCount: number;
  public readonly weightedAvgCost: number;
  public readonly assets: readonly AssetPerformance[];
  public readonly concentrationIndex: number;

  constructor(
    totalInvested: Money,
    totalCurrentCost: Money,
    assetCount: number,
    weightedAvgCost: number,
    assets: AssetPerformance[],
    concentrationIndex: number,
  ) {
    this.totalInvested = totalInvested;
    this.totalCurrentCost = totalCurrentCost;
    this.assetCount = assetCount;
    this.weightedAvgCost = weightedAvgCost;
    this.assets = Object.freeze([...assets]);
    this.concentrationIndex = concentrationIndex;
    Object.freeze(this);
  }
}

export class PerformanceCalculator {
  calculate(positions: Position[]): PerformanceReport {
    const totalInvested = positions.reduce(
      (sum, p) => sum + p.getTotalCost().getValue(),
      0,
    );

    const totalQuantity = positions.reduce(
      (sum, p) => sum + p.getQuantity().getValue(),
      0,
    );

    const weightedAvgCost = totalQuantity > 0
      ? Math.round((totalInvested / totalQuantity) * 100) / 100
      : 0;

    const assets = positions
      .filter((p) => p.getTotalCost().getValue() > 0 || p.getQuantity().getValue() > 0)
      .map((p) => {
        const weight = totalInvested > 0
          ? Math.round((p.getTotalCost().getValue() / totalInvested) * 10000) / 100
          : 0;
        return new AssetPerformance(p.getTicker(), p.getTotalCost(), Money.create(totalInvested), weight);
      });

    const concentrationIndex = assets.length > 0
      ? Math.round(assets.reduce((sum, a) => sum + (a.weight / 100) * (a.weight / 100), 0) * 10000) / 10000
      : 0;

    return new PerformanceReport(
      Money.create(totalInvested),
      Money.create(totalInvested),
      assets.length,
      weightedAvgCost,
      assets,
      concentrationIndex,
    );
  }
}
