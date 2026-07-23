import type { SupabaseClient } from "@supabase/supabase-js";
import type { IForeignAssetRepository } from "@/application/ports/foreign-asset-repository";
import {
  ForeignAsset,
  ExchangeRate,
  CurrencyPair,
  ForeignAssetId,
} from "@/core/domain/international";
import type { CurrencyCode, ForeignAssetType } from "@/core/domain/international";

interface SerializedAsset {
  id: string;
  ticker: string;
  name: string;
  exchange: string;
  currency: string;
  assetType: string;
}

interface SerializedRate {
  ticker: string;
  currency: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  source: string;
  lastUpdated: string;
}

export class SupabaseForeignAssetRepository implements IForeignAssetRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveAsset(asset: ForeignAsset): Promise<void> {
    const s: SerializedAsset = {
      id: asset.id.value,
      ticker: asset.ticker,
      name: asset.name,
      exchange: asset.exchange,
      currency: asset.currency,
      assetType: asset.assetType,
    };
    const { error } = await this.supabase
      .from("foreign_assets")
      .upsert({ id: asset.id.value, dados: s }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar ativo: ${error.message}`);
  }

  async findAssetById(assetId: string): Promise<ForeignAsset | null> {
    const { data, error } = await this.supabase
      .from("foreign_assets")
      .select("dados")
      .eq("id", assetId)
      .single();
    if (error || !data) return null;
    return this.deserializeAsset(data.dados as SerializedAsset);
  }

  async findAssetsByPortfolio(_portfolioId: string): Promise<ForeignAsset[]> {
    const { data, error } = await this.supabase.from("foreign_assets").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedAsset }) => this.deserializeAsset(d.dados));
  }

  async deleteAsset(assetId: string): Promise<void> {
    await this.supabase.from("foreign_assets").delete().eq("id", assetId);
  }

  async saveExchangeRate(rate: ExchangeRate): Promise<void> {
    const s: SerializedRate = {
      ticker: rate.ticker,
      currency: rate.currency,
      fromCurrency: rate.pair.from,
      toCurrency: rate.pair.to,
      rate: rate.rate,
      source: rate.source,
      lastUpdated: rate.lastUpdated.toISOString(),
    };
    const key = `${rate.ticker}:${rate.currency}`;
    const { error } = await this.supabase
      .from("exchange_rates")
      .upsert({ id: key, dados: s }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar taxa: ${error.message}`);
  }

  async findExchangeRate(ticker: string, currency: string): Promise<ExchangeRate | null> {
    const key = `${ticker}:${currency}`;
    const { data, error } = await this.supabase
      .from("exchange_rates")
      .select("dados")
      .eq("id", key)
      .single();
    if (error || !data) return null;
    return this.deserializeRate(data.dados as SerializedRate);
  }

  async findExchangeRatesByTicker(ticker: string): Promise<ExchangeRate[]> {
    const { data, error } = await this.supabase.from("exchange_rates").select("dados");
    if (error || !data) return [];
    return data
      .map((d: { dados: SerializedRate }) => d.dados)
      .filter((r: SerializedRate) => r.ticker === ticker)
      .map((r: SerializedRate) => this.deserializeRate(r));
  }

  async findLatestExchangeRate(ticker: string): Promise<ExchangeRate | null> {
    const rates = await this.findExchangeRatesByTicker(ticker);
    if (rates.length === 0) return null;
    return rates.reduce((a, b) => (a.lastUpdated > b.lastUpdated ? a : b));
  }

  private deserializeAsset(s: SerializedAsset): ForeignAsset {
    return ForeignAsset.create({
      id: ForeignAssetId.create(s.id),
      ticker: s.ticker,
      name: s.name,
      exchange: s.exchange,
      currency: s.currency,
      assetType: s.assetType as ForeignAssetType,
    });
  }

  private deserializeRate(s: SerializedRate): ExchangeRate {
    return ExchangeRate.create(
      s.ticker,
      s.currency,
      CurrencyPair.create(s.fromCurrency as CurrencyCode, s.toCurrency as CurrencyCode),
      s.rate,
      s.source,
      new Date(s.lastUpdated),
    );
  }
}
