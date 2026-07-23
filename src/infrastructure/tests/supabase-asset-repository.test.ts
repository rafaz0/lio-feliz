import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AssetId, Ticker } from "@/core/domain";
import { Asset } from "@/core/domain/entities/asset";
import { SupabaseAssetRepository } from "@/infrastructure/repositories/supabase-asset-repository";

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

describe("SupabaseAssetRepository", () => {
  let repo: SupabaseAssetRepository;
  let mockQuery: ReturnType<typeof createMockSupabase>["mockQuery"];

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabaseAssetRepository(mock.supabase);
    mockQuery = mock.mockQuery;
  });

  describe("ObterPorId", () => {
    it("retorna null quando asset nao encontrado", async () => {
      mockQuery.single.mockResolvedValue({ data: null, error: { message: "not found" } });

      const result = await repo.ObterPorId(AssetId.create("asset-1"));

      expect(result).toBeNull();
    });

    it("retorna asset quando encontrado", async () => {
      mockQuery.single.mockResolvedValue({
        data: {
          id: "asset-1",
          ticker: "PETR4",
          name: "Petrobras",
          asset_type: "stock",
          is_active: true,
        },
        error: null,
      });

      const result = await repo.ObterPorId(AssetId.create("asset-1"));

      expect(result).not.toBeNull();
      expect(result!.ticker.props.value).toBe("PETR4");
      expect(result!.name).toBe("Petrobras");
    });
  });

  describe("ObterPorTicker", () => {
    it("retorna asset pelo ticker", async () => {
      mockQuery.single.mockResolvedValue({
        data: {
          id: "asset-1",
          ticker: "PETR4",
          name: "Petrobras PN",
          asset_type: "stock",
          is_active: true,
        },
        error: null,
      });

      const result = await repo.ObterPorTicker(Ticker.create("PETR4"));

      expect(result).not.toBeNull();
      expect(result!.id.value).toBe("asset-1");
    });
  });

  describe("Salvar", () => {
    it("executa upsert com dados do asset", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const asset = new Asset(AssetId.create("a1"), Ticker.create("VALE3"), "Vale", "stock");
      await repo.Salvar(asset);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.id).toBe("a1");
      expect(arg.ticker).toBe("VALE3");
    });
  });

  describe("Listar", () => {
    it("retorna todos os assets", async () => {
      mockQuery.select.mockResolvedValue({
        data: [
          { id: "a1", ticker: "PETR4", name: "Petrobras", asset_type: "stock", is_active: true },
          { id: "a2", ticker: "VALE3", name: "Vale", asset_type: "stock", is_active: true },
        ],
        error: null,
      });

      const result = await repo.Listar();

      expect(result).toHaveLength(2);
    });
  });
});
