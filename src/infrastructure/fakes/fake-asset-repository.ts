import type { IAssetRepository } from "@/application/ports";
import type { Asset, AssetId, Ticker } from "@/core/domain";

export class FakeAssetRepository implements IAssetRepository {
  private assets = new Map<string, Asset>();

  async ObterPorId(assetId: AssetId): Promise<Asset | null> {
    return this.assets.get(assetId.value) ?? null;
  }

  async ObterPorTicker(ticker: Ticker): Promise<Asset | null> {
    for (const asset of this.assets.values()) {
      if (asset.ticker.equals(ticker)) {
        return asset;
      }
    }
    return null;
  }

  async Salvar(asset: Asset): Promise<void> {
    this.assets.set(asset.id.value, asset);
  }

  async Listar(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  reset(): void {
    this.assets.clear();
  }
}
