import { describe, it, expect, vi } from "vitest";
import { GerarRelatorioFiscalService } from "@/application/services/gerar-relatorio-fiscal-service";
import type { GerarRelatorioFiscalQuery } from "@/application/queries/gerar-relatorio-fiscal";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(projectionRepo?: IProjectionRepository): GerarRelatorioFiscalService {
  return new GerarRelatorioFiscalService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(overrides?: Partial<GerarRelatorioFiscalQuery>): GerarRelatorioFiscalQuery {
  return {
    type: "GerarRelatorioFiscalQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ano: 2026,
    ...overrides,
  };
}

describe("GerarRelatorioFiscalService", () => {
  describe("Execute", () => {
    it("returns RelatorioFiscalDto with positions and proventos", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn().mockResolvedValue([
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "a1",
            ticker: "PETR4",
            nome: "Petrobras",
            classe: "stock",
            quantidade: 100,
            precoMedio: 35,
            valorTotal: 4000,
            rentabilidade: { valorizacao: 0, rentabilidadeTotal: 0, rentabilidadePeriodo: 0 },
          },
        ]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn().mockResolvedValue([
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "a1",
            ticker: "PETR4",
            tipo: "dividendo",
            valor: 500,
            dataPagamento: new Date("2026-06-15"),
            dataBase: new Date("2026-06-01"),
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "a1",
            ticker: "PETR4",
            tipo: "JCP",
            valor: 300,
            dataPagamento: new Date("2026-05-10"),
            dataBase: new Date("2026-04-28"),
          },
        ]),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/relatorio-fiscal").RelatorioFiscalDto;
      expect(dto.ano).toBe(2026);
      expect(dto.posicao31Dez).toHaveLength(1);
      expect(dto.dividendosAno).toBe(500);
      expect(dto.jcpAno).toBe(300);
      expect(dto.posicao31Dez[0].ticker).toBe("PETR4");
    });

    it("returns relatorio with zero values when no positions exist", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn().mockResolvedValue([]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn().mockResolvedValue([]),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/relatorio-fiscal").RelatorioFiscalDto;
      expect(dto.dividendosAno).toBe(0);
      expect(dto.jcpAno).toBe(0);
      expect(dto.posicao31Dez).toHaveLength(0);
    });

    it("returns ValidationError when ano is invalid", async () => {
      const service = createService();
      const query = createQuery({ ano: 1800 });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const query = createQuery({ portfolioId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
