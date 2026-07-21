import type { SupabaseClient } from "@supabase/supabase-js";
import type { IFixedIncomeRepository } from "@/application/ports/fixed-income-repository";
import { FixedIncomeAsset, FixedIncomeId } from "@/core/domain/fixed-income";
import type { FixedIncomeType } from "@/core/domain/fixed-income";
import { Ticker } from "@/core/domain/value-objects/ticker";

interface SerializedFixedIncome {
  id: string;
  ticker: string;
  name: string;
  institution: string;
  productType: string;
  nominalValue: number;
  rate: number;
  rateType: string;
  issueDate: string;
  maturityDate: string;
}

export class SupabaseFixedIncomeRepository implements IFixedIncomeRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async save(asset: FixedIncomeAsset): Promise<void> {
    const serialized = this.serialize(asset);
    const { error } = await this.supabase.from("fixed_income").upsert(
      { id: asset.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save fixed income asset: ${error.message}`);
    }
  }

  async findById(assetId: string): Promise<FixedIncomeAsset | null> {
    const { data, error } = await this.supabase
      .from("fixed_income")
      .select("dados")
      .eq("id", assetId)
      .single();

    if (error || !data) {
      return null;
    }

    return this.deserialize(data.dados as unknown as SerializedFixedIncome);
  }

  async findAll(_portfolioId: string): Promise<FixedIncomeAsset[]> {
    const { data, error } = await this.supabase.from("fixed_income").select("dados");

    if (error || !data) {
      return [];
    }

    return data
      .map((row) => this.deserialize(row.dados as unknown as SerializedFixedIncome))
      .filter((asset): asset is FixedIncomeAsset => asset !== null);
  }

  async delete(assetId: string): Promise<void> {
    const { error } = await this.supabase.from("fixed_income").delete().eq("id", assetId);

    if (error) {
      throw new Error(`Failed to delete fixed income asset: ${error.message}`);
    }
  }

  private serialize(asset: FixedIncomeAsset): SerializedFixedIncome {
    return {
      id: asset.id.value,
      ticker: asset.ticker.getValue(),
      name: asset.name,
      institution: asset.institution,
      productType: asset.productType,
      nominalValue: asset.nominalValue,
      rate: asset.rate,
      rateType: asset.rateType,
      issueDate: asset.issueDate.toISOString(),
      maturityDate: asset.maturityDate.toISOString(),
    };
  }

  private deserialize(data: SerializedFixedIncome): FixedIncomeAsset | null {
    const tickerResult = Ticker.create(data.ticker);
    if (tickerResult instanceof Error) return null;

    const result = FixedIncomeAsset.create({
      id: FixedIncomeId.create(data.id),
      ticker: tickerResult,
      name: data.name,
      institution: data.institution,
      productType: data.productType as FixedIncomeType,
      nominalValue: data.nominalValue,
      rate: data.rate,
      rateType: data.rateType as "PRE" | "POS",
      issueDate: new Date(data.issueDate),
      maturityDate: new Date(data.maturityDate),
    });

    if (result.isFailure) return null;
    return result.value!;
  }
}
