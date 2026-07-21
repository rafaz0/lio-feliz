import type { FixedIncomeAsset } from "@/core/domain/fixed-income";

export interface IFixedIncomeRepository {
  save(asset: FixedIncomeAsset): Promise<void>;
  findById(assetId: string): Promise<FixedIncomeAsset | null>;
  findAll(portfolioId: string): Promise<FixedIncomeAsset[]>;
  delete(assetId: string): Promise<void>;
}
