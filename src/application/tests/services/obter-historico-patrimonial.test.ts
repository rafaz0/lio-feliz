import { describe, it, expect, vi } from "vitest";
import { ObterHistoricoPatrimonialService } from "@/application/services/obter-historico-patrimonial-service";
import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(projectionRepo?: IProjectionRepository): ObterHistoricoPatrimonialService {
  return new ObterHistoricoPatrimonialService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(
  overrides?: Partial<ObterHistoricoPatrimonialQuery>,
): ObterHistoricoPatrimonialQuery {
  return {
    type: "ObterHistoricoPatrimonialQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-30") },
    ...overrides,
  };
}

describe("ObterHistoricoPatrimonialService", () => {
  describe("Execute", () => {
    it("returns HistoricoPatrimonialDto with history points", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn().mockResolvedValue([
          {
            portfolioId: FIXTURA_PORTFOLIO,
            data: new Date("2026-01-01"),
            patrimonioTotal: 50000,
            patrimonioInvestido: 45000,
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            data: new Date("2026-04-01"),
            patrimonioTotal: 75000,
            patrimonioInvestido: 60000,
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            data: new Date("2026-06-30"),
            patrimonioTotal: 100000,
            patrimonioInvestido: 80000,
          },
        ]),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/historico").HistoricoPatrimonialDto;
      expect(dto.portfolioId).toBe(FIXTURA_PORTFOLIO);
      expect(dto.pontos).toHaveLength(3);
      expect(dto.pontos[0].patrimonioTotal).toBe(50000);
      expect(dto.pontos[2].patrimonioTotal).toBe(100000);
    });

    it("returns empty pontos when no history exists (periodo sem dados -> CL-005-008)", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn().mockResolvedValue([]),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/historico").HistoricoPatrimonialDto;
      expect(dto.pontos).toHaveLength(0);
    });

    it("returns ValidationError when periodo is missing", async () => {
      const service = createService();
      const query = createQuery({ periodo: undefined as unknown as { inicio: Date; fim: Date } });

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
