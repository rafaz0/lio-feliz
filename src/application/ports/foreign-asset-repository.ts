import type { ForeignAsset, ExchangeRate } from "@/core/domain/international";

export interface IForeignAssetRepository {
  saveAsset(asset: ForeignAsset): Promise<void>;
  findAssetById(assetId: string): Promise<ForeignAsset | null>;
  findAssetsByPortfolio(portfolioId: string): Promise<ForeignAsset[]>;
  deleteAsset(assetId: string): Promise<void>;

  saveExchangeRate(rate: ExchangeRate): Promise<void>;
  findExchangeRate(ticker: string, currency: string): Promise<ExchangeRate | null>;
  findExchangeRatesByTicker(ticker: string): Promise<ExchangeRate[]>;
  findLatestExchangeRate(ticker: string): Promise<ExchangeRate | null>;
}
