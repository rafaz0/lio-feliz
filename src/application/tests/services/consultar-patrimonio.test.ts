import { describe, it, expect, vi } from "vitest";
import { ConsultarPatrimonioService } from "@/application/services/consultar-patrimonio-service";
import type { ObterPatrimonioQuery } from "@/application/queries/obter-patrimonio";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import {
  ApplicationError,
  NotFoundError,
  ValidationError,
} from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(projectionRepo?: IProjectionRepository): ConsultarPatrimonioService {
  return new ConsultarPatrimonioService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(overrides?: Partial<ObterPatrimonioQuery>): ObterPatrimonioQuery {
  return {
    type: "ObterPatrimonioQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ...overrides,
  };
}

describe("ConsultarPatrimonioService", () => {
  describe("Execute", () => {
    it("returns PatrimonioDto when projection exists", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue({
          portfolioId: FIXTURA_PORTFOLIO,
          patrimonioTotal: 100000,
          patrimonioInvestido: 80000,
          saldoDisponivel: 5000,
          moeda: "BRL",
          dataReferencia: new Date("2026-06-30"),
          alocacao: [
            { classe: "Acoes", valor: 50000, percentual: 50 },
            { classe: "FIIs", valor: 30000, percentual: 30 },
          ],
          evolucaoMensal: 2.5,
        }),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/patrimonio").PatrimonioDto;
      expect(dto.patrimonioTotal).toBe(100000);
      expect(dto.patrimonioInvestido).toBe(80000);
      expect(dto.alocacao).toHaveLength(2);
      expect(dto.alocacao[0].classe).toBe("Acoes");
    });

    it("returns NotFoundError when portfolio does not exist", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue(null),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(NotFoundError);
      expect((result as NotFoundError).resourceType).toBe("Portfolio");
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const query = createQuery({ portfolioId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
