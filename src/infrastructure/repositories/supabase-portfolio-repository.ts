import type { SupabaseClient } from "@supabase/supabase-js";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import type { IPortfolioRepository } from "@/application/ports";
import { serializePortfolio, deserializePortfolio, type SerializedPortfolio } from "./portfolio-serializer";

export class SupabasePortfolioRepository implements IPortfolioRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async ObterPorId(portfolioId: PortfolioId): Promise<Portfolio | null> {
    const { data, error } = await this.supabase
      .from("portfolios")
      .select("dados")
      .eq("id", portfolioId.value)
      .single();

    if (error || !data) {
      return null;
    }

    return deserializePortfolio(data.dados as unknown as SerializedPortfolio);
  }

  async Salvar(portfolio: Portfolio): Promise<void> {
    const serialized = serializePortfolio(portfolio);
    const { error } = await this.supabase.from("portfolios").upsert(
      { id: portfolio.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save portfolio: ${error.message}`);
    }
  }

  async ObterTodos(usuarioId: string): Promise<Portfolio[]> {
    const { data, error } = await this.supabase
      .from("portfolios")
      .select("dados")
      .eq("usuario_id", usuarioId);

    if (error || !data) {
      return [];
    }

    return data.map((row) => deserializePortfolio(row.dados as unknown as SerializedPortfolio));
  }
}
