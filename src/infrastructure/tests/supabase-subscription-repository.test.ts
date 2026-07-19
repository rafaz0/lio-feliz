import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Assinatura, PlanoDto } from "@/application/ports";
import { SupabaseSubscriptionRepository } from "@/infrastructure/repositories/supabase-subscription-repository";

function createMockSupabase() {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  };
  const mockFrom = vi.fn().mockReturnValue(mockQuery);
  return { supabase: { from: mockFrom } as unknown as SupabaseClient, mockQuery };
}

describe("SupabaseSubscriptionRepository", () => {
  let repo: SupabaseSubscriptionRepository;
  let mockQuery: ReturnType<typeof createMockSupabase>["mockQuery"];

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabaseSubscriptionRepository(mock.supabase);
    mockQuery = mock.mockQuery;
  });

  describe("ObterPlanoAtivo", () => {
    it("retorna null quando assinatura nao encontrada", async () => {
      mockQuery.single.mockResolvedValue({ data: null, error: { message: "not found" } });

      const result = await repo.ObterPlanoAtivo("user-1");

      expect(result).toBeNull();
      expect(mockQuery.eq).toHaveBeenCalledWith("usuario_id", "user-1");
    });

    it("retorna assinatura quando encontrada", async () => {
      mockQuery.single.mockResolvedValue({
        data: {
          usuario_id: "user-1",
          plano: "premium",
          data_ativacao: "2026-01-01T00:00:00.000Z",
          data_expiracao: null,
          recursos_liberados: ["import", "rebalance"],
        },
        error: null,
      });

      const result = await repo.ObterPlanoAtivo("user-1");

      expect(result).not.toBeNull();
      expect(result!.usuarioId).toBe("user-1");
      expect(result!.plano).toBe("premium");
      expect(result!.recursosLiberados).toEqual(["import", "rebalance"]);
      expect(result!.dataExpiracao).toBeNull();
    });
  });

  describe("Salvar", () => {
    it("executa upsert com dados da assinatura", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const assinatura: Assinatura = {
        usuarioId: "user-1",
        plano: "basic",
        dataAtivacao: new Date("2026-01-01"),
        dataExpiracao: new Date("2027-01-01"),
        recursosLiberados: ["import"],
      };

      await repo.Salvar(assinatura);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.usuario_id).toBe("user-1");
      expect(arg.plano).toBe("basic");
      expect(arg.recursos_liberados).toEqual(["import"]);
    });

    it("lanca erro quando upsert falha", async () => {
      mockQuery.upsert.mockResolvedValue({ error: { message: "db error" } });

      const assinatura: Assinatura = {
        usuarioId: "user-1", plano: "basic",
        dataAtivacao: new Date(), dataExpiracao: null,
        recursosLiberados: [],
      };

      await expect(repo.Salvar(assinatura)).rejects.toThrow("db error");
    });
  });

  describe("ListarPlanosDisponiveis", () => {
    it("retorna planos quando encontrados", async () => {
      mockQuery.select.mockResolvedValue({
        data: [
          { plano_id: "p1", nome: "Basic", descricao: "Basico", preco_mensal: 0, recursos: ["import"] },
          { plano_id: "p2", nome: "Premium", descricao: "Completo", preco_mensal: 29.90, recursos: ["import", "rebalance"] },
        ],
        error: null,
      });

      const result = await repo.ListarPlanosDisponiveis();

      expect(result).toHaveLength(2);
      expect(result[0].planoId).toBe("p1");
      expect(result[1].precoMensal).toBe(29.90);
    });

    it("retorna array vazio quando sem dados", async () => {
      mockQuery.select.mockResolvedValue({ data: null, error: { message: "no data" } });

      const result = await repo.ListarPlanosDisponiveis();

      expect(result).toEqual([]);
    });
  });
});
