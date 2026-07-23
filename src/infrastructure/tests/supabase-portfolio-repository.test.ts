import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import { BuyEvent } from "@/core/domain/portfolio";
import { SupabasePortfolioRepository } from "@/infrastructure/repositories/supabase-portfolio-repository";
import { serializePortfolio } from "@/infrastructure/repositories/portfolio-serializer";

function createMockSupabase() {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    order: vi.fn().mockReturnThis(),
  };

  const mockFrom = vi.fn().mockReturnValue(mockQuery);

  const supabase = {
    from: mockFrom,
  } as unknown as SupabaseClient;

  return { supabase, mockQuery };
}

describe("SupabasePortfolioRepository", () => {
  let repo: SupabasePortfolioRepository;
  let mockQuery: ReturnType<typeof createMockSupabase>["mockQuery"];

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabasePortfolioRepository(mock.supabase);
    mockQuery = mock.mockQuery;
  });

  describe("ObterPorId", () => {
    it("retorna null quando portfolio nao encontrado", async () => {
      mockQuery.single.mockResolvedValue({ data: null, error: { message: "not found" } });

      const result = await repo.ObterPorId(PortfolioId.create("id-1"));

      expect(result).toBeNull();
      expect(mockQuery.eq).toHaveBeenCalledWith("id", "id-1");
    });

    it("retorna portfolio quando encontrado", async () => {
      const portfolioId = PortfolioId.create("portfolio-1");
      const portfolio = Portfolio.create(portfolioId);
      const buyEvent = new BuyEvent("portfolio-1", "corr-1", "asset-1", 100, 25.5);
      portfolio.applyEvent(buyEvent);

      const serialized = serializePortfolio(portfolio);
      mockQuery.single.mockResolvedValue({ data: { dados: serialized }, error: null });

      const result = await repo.ObterPorId(portfolioId);

      expect(result).not.toBeNull();
      expect(result!.id.value).toBe("portfolio-1");
      expect(result!.financialEvents).toHaveLength(1);
    });
  });

  describe("Salvar", () => {
    it("executa upsert com dados serializados", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const portfolioId = PortfolioId.create("portfolio-1");
      const portfolio = Portfolio.create(portfolioId);
      const buyEvent = new BuyEvent("portfolio-1", "corr-1", "asset-1", 50, 30.0);
      portfolio.applyEvent(buyEvent);

      await repo.Salvar(portfolio);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      const callArg = mockQuery.upsert.mock.calls[0][0];
      expect(callArg.id).toBe("portfolio-1");
      expect(callArg.dados.id).toBe("portfolio-1");
      expect(callArg.dados.events).toHaveLength(1);
    });

    it("lanca erro quando upsert falha", async () => {
      mockQuery.upsert.mockResolvedValue({ error: { message: "db error" } });

      const portfolio = Portfolio.create(PortfolioId.create("p1"));

      await expect(repo.Salvar(portfolio)).rejects.toThrow("db error");
    });
  });

  describe("ObterTodos", () => {
    it("retorna portfolios do usuario", async () => {
      const portfolioId = PortfolioId.create("p1");
      const portfolio = Portfolio.create(portfolioId);
      const buyEvent = new BuyEvent("p1", "corr-1", "asset-1", 10, 50.0);
      portfolio.applyEvent(buyEvent);
      const serialized = serializePortfolio(portfolio);

      mockQuery.eq.mockReturnValue({
        data: [{ dados: serialized }, { dados: serialized }],
        error: null,
      } as never);

      const result = await repo.ObterTodos("user-1");

      expect(result).toHaveLength(2);
    });
  });
});
