import { AggregateRoot } from "@/core/domain";
import type { AssetId } from "@/core/domain";
import type { Ticker } from "@/core/domain";

export class Asset extends AggregateRoot<AssetId> {
  public readonly ticker: Ticker;
  public readonly name: string;
  public readonly assetType: string;
  public isActive: boolean;

  constructor(
    id: AssetId,
    ticker: Ticker,
    name: string,
    assetType: string,
    isActive: boolean = true,
  ) {
    super(id);
    this.ticker = ticker;
    this.name = name;
    this.assetType = assetType;
    this.isActive = isActive;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
