import { EntityId } from "../entity-id";

export class ForeignAssetId extends EntityId {
  private constructor(value: string) { super(value); }
  static create(value: string): ForeignAssetId { return new ForeignAssetId(value); }
  static generate(): ForeignAssetId {
    return new ForeignAssetId(`fa-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type ForeignAssetType = "stock_us" | "reit" | "etf_internacional" | "bdr";
