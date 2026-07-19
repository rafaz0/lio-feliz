import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  IConfigurationRepository,
  EstrategiaConfiguracao,
  MetaFinanceira,
} from "@/application/ports";

type EstrategiaRow = {
  usuario_id: string;
  dados: EstrategiaConfiguracao;
  created_at?: string;
  updated_at?: string;
};

type MetaRow = {
  id?: string;
  usuario_id: string;
  meta_id: string;
  nome: string;
  valor_alvo: number;
  prazo: string;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseConfigurationRepository implements IConfigurationRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async ObterEstrategia(usuarioId: string): Promise<EstrategiaConfiguracao | null> {
    const { data, error } = await this.supabase
      .from("estrategias_configuracao")
      .select("dados")
      .eq("usuario_id", usuarioId)
      .single();

    if (error || !data) {
      return null;
    }

    return data.dados as unknown as EstrategiaConfiguracao;
  }

  async SalvarEstrategia(usuarioId: string, config: EstrategiaConfiguracao): Promise<void> {
    const { error } = await this.supabase.from("estrategias_configuracao").upsert(
      {
        usuario_id: usuarioId,
        dados: config,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "usuario_id" },
    );

    if (error) {
      throw new Error(`Failed to save estrategia: ${error.message}`);
    }
  }

  async ObterMetas(usuarioId: string): Promise<MetaFinanceira[]> {
    const { data, error } = await this.supabase
      .from("metas_financeiras")
      .select("*")
      .eq("usuario_id", usuarioId);

    if (error || !data) {
      return [];
    }

    return (data as MetaRow[]).map((row) => ({
      metaId: row.meta_id,
      usuarioId: row.usuario_id,
      nome: row.nome,
      valorAlvo: row.valor_alvo,
      prazo: new Date(row.prazo),
    }));
  }

  async SalvarMetas(usuarioId: string, metas: MetaFinanceira[]): Promise<void> {
    const rows: MetaRow[] = metas.map((meta) => ({
      usuario_id: usuarioId,
      meta_id: meta.metaId,
      nome: meta.nome,
      valor_alvo: meta.valorAlvo,
      prazo: meta.prazo.toISOString(),
    }));

    const { error } = await this.supabase.from("metas_financeiras").upsert(rows, {
      onConflict: "usuario_id,meta_id",
    });

    if (error) {
      throw new Error(`Failed to save metas: ${error.message}`);
    }
  }
}
