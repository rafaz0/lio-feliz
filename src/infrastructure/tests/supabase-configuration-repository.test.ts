import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { EstrategiaConfiguracao, MetaFinanceira } from "@/application/ports";
import { SupabaseConfigurationRepository } from "@/infrastructure/repositories/supabase-configuration-repository";

function createMockSupabase() {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  };

  const mockFrom = vi.fn().mockReturnValue(mockQuery);
  const supabase = { from: mockFrom } as unknown as SupabaseClient;

  return { supabase, mockQuery };
}

describe("SupabaseConfigurationRepository", () => {
  let repo: SupabaseConfigurationRepository;
  let mockQuery: ReturnType<typeof createMockSupabase>["mockQuery"];

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabaseConfigurationRepository(mock.supabase);
    mockQuery = mock.mockQuery;
  });

  const estrategia: EstrategiaConfiguracao = {
    usuarioId: "user-1",
    percentuais: { acoes: 60, fiis: 30, renda_fixa: 10 },
    moeda: "BRL",
    toleranciaRebalanceamento: 5,
  };

  describe("ObterEstrategia", () => {
    it("retorna null quando estrategia nao encontrada", async () => {
      mockQuery.single.mockResolvedValue({ data: null, error: { message: "not found" } });

      const result = await repo.ObterEstrategia("user-1");

      expect(result).toBeNull();
    });

    it("retorna estrategia quando encontrada", async () => {
      mockQuery.single.mockResolvedValue({
        data: { dados: estrategia },
        error: null,
      });

      const result = await repo.ObterEstrategia("user-1");

      expect(result).not.toBeNull();
      expect(result!.usuarioId).toBe("user-1");
      expect(result!.percentuais.acoes).toBe(60);
    });
  });

  describe("SalvarEstrategia", () => {
    it("executa upsert com dados da estrategia", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      await repo.SalvarEstrategia("user-1", estrategia);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.usuario_id).toBe("user-1");
      expect(arg.dados.percentuais.acoes).toBe(60);
    });
  });

  describe("ObterMetas", () => {
    it("retorna metas do usuario", async () => {
      const now = new Date();
      mockQuery.eq.mockReturnValue({
        data: [
          { usuario_id: "user-1", meta_id: "m1", nome: "Aposentadoria", valor_alvo: 1000000, prazo: now.toISOString() },
          { usuario_id: "user-1", meta_id: "m2", nome: "Reserva", valor_alvo: 50000, prazo: now.toISOString() },
        ],
        error: null,
      } as never);

      const result = await repo.ObterMetas("user-1");

      expect(result).toHaveLength(2);
      expect(result[0].nome).toBe("Aposentadoria");
      expect(result[0].valorAlvo).toBe(1000000);
    });
  });

  describe("SalvarMetas", () => {
    it("executa upsert com metas", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const metas: MetaFinanceira[] = [
        { metaId: "m1", usuarioId: "user-1", nome: "Aposentadoria", valorAlvo: 1000000, prazo: new Date() },
      ];

      await repo.SalvarMetas("user-1", metas);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      expect(mockQuery.upsert.mock.calls[0][0]).toHaveLength(1);
    });
  });
});
