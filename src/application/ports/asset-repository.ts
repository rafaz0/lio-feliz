import type { Asset, AssetId, Ticker } from "@/core/domain";

export interface IAssetRepository {
  ObterPorId(assetId: AssetId): Promise<Asset | null>;
  ObterPorTicker(ticker: Ticker): Promise<Asset | null>;
  Salvar(asset: Asset): Promise<void>;
  Listar(): Promise<Asset[]>;
}
