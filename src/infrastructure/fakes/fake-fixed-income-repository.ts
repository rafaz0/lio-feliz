import type { IFixedIncomeRepository } from "@/application/ports/fixed-income-repository";
import type { FixedIncomeAsset } from "@/core/domain/fixed-income";

export class FakeFixedIncomeRepository implements IFixedIncomeRepository {
  private assets = new Map<string, FixedIncomeAsset>();

  async save(asset: FixedIncomeAsset): Promise<void> {
    this.assets.set(asset.id.value, asset);
  }

  async findById(assetId: string): Promise<FixedIncomeAsset | null> {
    return this.assets.get(assetId) ?? null;
  }

  async findAll(_portfolioId: string): Promise<FixedIncomeAsset[]> {
    return Array.from(this.assets.values());
  }

  async delete(assetId: string): Promise<void> {
    this.assets.delete(assetId);
  }

  reset(): void {
    this.assets.clear();
  }
}
