import type { SupabaseClient } from "@supabase/supabase-js";
import { AssetId, Ticker } from "@/core/domain";
import { Asset } from "@/core/domain/entities/asset";
import type { IAssetRepository } from "@/application/ports";

type AssetRow = {
  id: string;
  ticker: string;
  name: string;
  asset_type: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseAssetRepository implements IAssetRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async ObterPorId(assetId: AssetId): Promise<Asset | null> {
    const { data, error } = await this.supabase
      .from("assets")
      .select("*")
      .eq("id", assetId.value)
      .single();

    if (error || !data) {
      return null;
    }

    return this.rowToAsset(data as AssetRow);
  }

  async ObterPorTicker(ticker: Ticker): Promise<Asset | null> {
    const { data, error } = await this.supabase
      .from("assets")
      .select("*")
      .eq("ticker", ticker.props.value)
      .single();

    if (error || !data) {
      return null;
    }

    return this.rowToAsset(data as AssetRow);
  }

  async Salvar(asset: Asset): Promise<void> {
    const { error } = await this.supabase.from("assets").upsert(
      {
        id: asset.id.value,
        ticker: asset.ticker.props.value,
        name: asset.name,
        asset_type: asset.assetType,
        is_active: asset.isActive,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save asset: ${error.message}`);
    }
  }

  async Listar(): Promise<Asset[]> {
    const { data, error } = await this.supabase.from("assets").select("*");

    if (error || !data) {
      return [];
    }

    return data.map((row) => this.rowToAsset(row as AssetRow));
  }

  private rowToAsset(row: AssetRow): Asset {
    const id = AssetId.create(row.id);
    const ticker = Ticker.create(row.ticker);
    const asset = new Asset(id, ticker, row.name, row.asset_type, row.is_active);
    return asset;
  }
}
