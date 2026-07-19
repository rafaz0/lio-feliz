import { describe, it, expect, vi } from "vitest";
import { ExportarDadosService } from "@/application/services/exportar-dados-service";
import type { ExportarDadosQuery } from "@/application/queries/exportar-dados";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(projectionRepo?: IProjectionRepository): ExportarDadosService {
  return new ExportarDadosService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(overrides?: Partial<ExportarDadosQuery>): ExportarDadosQuery {
  return {
    type: "ExportarDadosQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    formato: "json",
    ...overrides,
  };
}

describe("ExportarDadosService", () => {
  describe("Execute", () => {
    it("returns JSON export when formato is json", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue({
          portfolioId: FIXTURA_PORTFOLIO,
          patrimonioTotal: 100000,
          patrimonioInvestido: 80000,
          saldoDisponivel: 5000,
          moeda: "BRL",
          dataReferencia: new Date("2026-06-30"),
          alocacao: [],
          evolucaoMensal: 2.5,
        }),
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
            rentabilidade: { valorizacao: 500, rentabilidadeTotal: 10, rentabilidadePeriodo: 2 },
          },
        ]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/exportacao").DadosExportadosDto;
      expect(dto.formato).toBe("json");
      expect(dto.nomeArquivo).toContain(FIXTURA_PORTFOLIO);
      const parsed = JSON.parse(dto.conteudo);
      expect(parsed.patrimonio.total).toBe(100000);
      expect(parsed.posicoes).toHaveLength(1);
    });

    it("returns CSV export when formato is csv", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue(null),
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
            rentabilidade: { valorizacao: 500, rentabilidadeTotal: 10, rentabilidadePeriodo: 2 },
          },
        ]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery({ formato: "csv" });

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/exportacao").DadosExportadosDto;
      expect(dto.formato).toBe("csv");
      expect(dto.conteudo).toContain("ticker,nome,classe,quantidade,precoMedio,valorTotal");
      expect(dto.conteudo).toContain("PETR4");
    });

    it("returns ValidationError for unsupported format", async () => {
      const service = createService();
      const query = createQuery({ formato: "xml" });

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
