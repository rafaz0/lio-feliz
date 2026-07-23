import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseProjectionRepository } from "@/infrastructure/repositories/supabase-projection-repository";

type QueryChain = Record<string, any> & { then?: Function };

function createMockSupabase() {
  const methods = ["select", "eq", "gte", "lte", "order", "single"];

  let _resolve: (value: unknown) => void;
  const chainPromise = new Promise((resolve) => {
    _resolve = resolve;
  });

  const query: QueryChain = {};
  for (const m of methods) {
    query[m] = vi.fn().mockReturnValue(query);
  }
  query.then = chainPromise.then.bind(chainPromise);
  query._resolve = _resolve;

  const mockFrom = vi.fn().mockReturnValue(query);
  return { supabase: { from: mockFrom } as unknown as SupabaseClient, query };
}

describe("SupabaseProjectionRepository", () => {
  let repo: SupabaseProjectionRepository;
  let query: Record<string, ReturnType<typeof vi.fn>>;

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabaseProjectionRepository(mock.supabase);
    query = mock.query;
  });

  describe("ObterPatrimonio", () => {
    it("retorna null quando nao encontrado", async () => {
      query.single.mockResolvedValue({ data: null, error: { message: "not found" } });

      const result = await repo.ObterPatrimonio("p1");

      expect(result).toBeNull();
      expect(query.eq).toHaveBeenCalledWith("portfolio_id", "p1");
    });

    it("retorna patrimonio quando encontrado", async () => {
      query.single.mockResolvedValue({
        data: {
          portfolio_id: "p1",
          patrimonio_total: 100000,
          patrimonio_investido: 80000,
          saldo_disponivel: 20000,
          moeda: "BRL",
          data_referencia: "2026-07-01T00:00:00.000Z",
          alocacao: [{ classe: "acoes", valor: 60000, percentual: 60 }],
          evolucao_mensal: 5.5,
        },
        error: null,
      });

      const result = await repo.ObterPatrimonio("p1");

      expect(result).not.toBeNull();
      expect(result!.patrimonioTotal).toBe(100000);
      expect(result!.alocacao).toHaveLength(1);
      expect(result!.alocacao[0].classe).toBe("acoes");
    });
  });

  describe("ObterPosicao", () => {
    it("retorna posicao quando encontrada", async () => {
      query.single.mockResolvedValue({
        data: {
          portfolio_id: "p1",
          asset_id: "a1",
          ticker: "PETR4",
          nome: "Petrobras",
          classe: "stock",
          quantidade: 100,
          preco_medio: 25.5,
          valor_total: 2550,
          valorizacao: 500,
          rentabilidade_total: 10.5,
          rentabilidade_periodo: 2.3,
        },
        error: null,
      });

      const result = await repo.ObterPosicao("p1", "a1");

      expect(result).not.toBeNull();
      expect(result!.ticker).toBe("PETR4");
      expect(result!.rentabilidade.rentabilidadeTotal).toBe(10.5);
      expect(query.eq).toHaveBeenCalledWith("asset_id", "a1");
    });
  });

  describe("ObterPosicoes", () => {
    it("retorna todas as posicoes do portfolio", async () => {
      query._resolve({
        data: [
          {
            portfolio_id: "p1",
            asset_id: "a1",
            ticker: "PETR4",
            nome: "Petrobras",
            classe: "stock",
            quantidade: 100,
            preco_medio: 25.5,
            valor_total: 2550,
            valorizacao: 500,
            rentabilidade_total: 10,
            rentabilidade_periodo: 2,
          },
          {
            portfolio_id: "p1",
            asset_id: "a2",
            ticker: "VALE3",
            nome: "Vale",
            classe: "stock",
            quantidade: 50,
            preco_medio: 68,
            valor_total: 3400,
            valorizacao: 200,
            rentabilidade_total: 8,
            rentabilidade_periodo: 1.5,
          },
        ],
        error: null,
      });

      const result = await repo.ObterPosicoes("p1");

      expect(result).toHaveLength(2);
      expect(query.eq).toHaveBeenCalledWith("portfolio_id", "p1");
    });
  });

  describe("ObterHistorico", () => {
    it("retorna historico filtrado por periodo", async () => {
      query._resolve({
        data: [
          {
            portfolio_id: "p1",
            data: "2026-01-01T00:00:00.000Z",
            patrimonio_total: 50000,
            patrimonio_investido: 40000,
          },
          {
            portfolio_id: "p1",
            data: "2026-06-01T00:00:00.000Z",
            patrimonio_total: 80000,
            patrimonio_investido: 65000,
          },
        ],
        error: null,
      });

      const result = await repo.ObterHistorico("p1", {
        inicio: new Date("2026-01-01"),
        fim: new Date("2026-12-31"),
      });

      expect(result).toHaveLength(2);
      expect(result[0].patrimonioTotal).toBe(50000);
      expect(query.gte).toHaveBeenCalled();
      expect(query.lte).toHaveBeenCalled();
    });
  });

  describe("ObterProventos", () => {
    it("retorna proventos filtrados por ano e ticker", async () => {
      query._resolve({
        data: [
          {
            portfolio_id: "p1",
            asset_id: "a1",
            ticker: "PETR4",
            tipo: "DIVIDEND",
            valor: 500,
            data_pagamento: "2026-06-15T00:00:00.000Z",
            data_base: "2026-06-01T00:00:00.000Z",
          },
        ],
        error: null,
      });

      const result = await repo.ObterProventos("p1", { ano: 2026, ticker: "PETR4" });

      expect(result).toHaveLength(1);
      expect(result[0].valor).toBe(500);
      expect(result[0].dataPagamento).toBeInstanceOf(Date);
    });

    it("retorna array vazio quando sem dados", async () => {
      query._resolve({ data: null, error: { message: "no data" } });

      const result = await repo.ObterProventos("p1", {});

      expect(result).toEqual([]);
    });
  });
});
