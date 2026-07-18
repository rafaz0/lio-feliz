import { describe, it, expect, vi } from "vitest";
import { AcompanharProventosService } from "@/application/services/acompanhar-proventos-service";
import type { ObterProventosQuery } from "@/application/queries/obter-proventos";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(projectionRepo?: IProjectionRepository): AcompanharProventosService {
  return new AcompanharProventosService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(overrides?: Partial<ObterProventosQuery>): ObterProventosQuery {
  return {
    type: "ObterProventosQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ...overrides,
  };
}

describe("AcompanharProventosService", () => {
  describe("Execute", () => {
    it("returns ProventosDto with proventos list", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn().mockResolvedValue([
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "asset-petr4",
            ticker: "PETR4",
            tipo: "dividendo",
            valor: 500,
            dataPagamento: new Date("2026-06-15"),
            dataBase: new Date("2026-06-01"),
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "asset-vale3",
            ticker: "VALE3",
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
      const dto = result as import("@/application/dtos/proventos").ProventosDto;
      expect(dto.proventos).toHaveLength(2);
      expect(dto.totalPeriodo).toBe(800);
      expect(dto.totalAcumulado).toBe(800);
      expect(dto.proventos[0].ticker).toBe("PETR4");
    });

    it("returns empty ProventosDto when no proventos exist", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn().mockResolvedValue([]),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/proventos").ProventosDto;
      expect(dto.proventos).toHaveLength(0);
      expect(dto.totalPeriodo).toBe(0);
    });

    it("filters by ano when provided", async () => {
      const mockFn = vi.fn().mockResolvedValue([]);
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: mockFn,
      };
      const service = createService(repo);
      const query = createQuery({ ano: 2025 });

      await service.Execute(query);

      expect(mockFn).toHaveBeenCalledWith(FIXTURA_PORTFOLIO, { ano: 2025, ticker: undefined });
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const query = createQuery({ portfolioId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
