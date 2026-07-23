import type { IForeignAssetRepository } from "@/application/ports/foreign-asset-repository";
import {
  ForeignAsset,
  ExchangeRate,
  CurrencyPair,
  ForeignAssetId,
} from "@/core/domain/international";
import type { CurrencyCode } from "@/core/domain/international";

export class FakeForeignAssetRepository implements IForeignAssetRepository {
  private assets = new Map<string, ForeignAsset>();
  private rates = new Map<string, ExchangeRate>();

  async saveAsset(asset: ForeignAsset): Promise<void> {
    this.assets.set(asset.id.value, asset);
  }
  async findAssetById(assetId: string): Promise<ForeignAsset | null> {
    return this.assets.get(assetId) ?? null;
  }
  async findAssetsByPortfolio(_portfolioId: string): Promise<ForeignAsset[]> {
    return Array.from(this.assets.values());
  }
  async deleteAsset(assetId: string): Promise<void> {
    this.assets.delete(assetId);
  }

  async saveExchangeRate(rate: ExchangeRate): Promise<void> {
    this.rates.set(`${rate.ticker}:${rate.currency}`, rate);
  }

  async findExchangeRate(ticker: string, currency: string): Promise<ExchangeRate | null> {
    return this.rates.get(`${ticker}:${currency}`) ?? null;
  }

  async findExchangeRatesByTicker(ticker: string): Promise<ExchangeRate[]> {
    return Array.from(this.rates.values()).filter((r) => r.ticker === ticker);
  }

  async findLatestExchangeRate(ticker: string): Promise<ExchangeRate | null> {
    const tickerRates = Array.from(this.rates.values()).filter((r) => r.ticker === ticker);
    if (tickerRates.length === 0) return null;
    return tickerRates.reduce((a, b) => (a.lastUpdated > b.lastUpdated ? a : b));
  }

  reset(): void {
    this.assets.clear();
    this.rates.clear();
  }
}
