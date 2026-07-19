import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ISubscriptionRepository,
  Assinatura,
  PlanoDto,
} from "@/application/ports";

type AssinaturaRow = {
  usuario_id: string;
  plano: string;
  data_ativacao: string;
  data_expiracao: string | null;
  recursos_liberados: string[];
};

type PlanoRow = {
  plano_id: string;
  nome: string;
  descricao: string;
  preco_mensal: number;
  recursos: string[];
};

export class SupabaseSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async ObterPlanoAtivo(usuarioId: string): Promise<Assinatura | null> {
    const { data, error } = await this.supabase
      .from("assinaturas")
      .select("*")
      .eq("usuario_id", usuarioId)
      .single();

    if (error || !data) {
      return null;
    }

    const row = data as unknown as AssinaturaRow;
    return {
      usuarioId: row.usuario_id,
      plano: row.plano,
      dataAtivacao: new Date(row.data_ativacao),
      dataExpiracao: row.data_expiracao ? new Date(row.data_expiracao) : null,
      recursosLiberados: row.recursos_liberados,
    };
  }

  async Salvar(assinatura: Assinatura): Promise<void> {
    const { error } = await this.supabase.from("assinaturas").upsert(
      {
        usuario_id: assinatura.usuarioId,
        plano: assinatura.plano,
        data_ativacao: assinatura.dataAtivacao.toISOString(),
        data_expiracao: assinatura.dataExpiracao?.toISOString() ?? null,
        recursos_liberados: assinatura.recursosLiberados,
      },
      { onConflict: "usuario_id" },
    );

    if (error) {
      throw new Error(`Failed to save subscription: ${error.message}`);
    }
  }

  async ListarPlanosDisponiveis(): Promise<PlanoDto[]> {
    const { data, error } = await this.supabase.from("planos").select("*");

    if (error || !data) {
      return [];
    }

    return (data as unknown as PlanoRow[]).map((row) => ({
      planoId: row.plano_id,
      nome: row.nome,
      descricao: row.descricao,
      precoMensal: row.preco_mensal,
      recursos: row.recursos,
    }));
  }
}
