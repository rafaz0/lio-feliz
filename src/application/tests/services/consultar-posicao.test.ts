import { describe, it, expect, vi } from "vitest";
import { ConsultarPosicaoService } from "@/application/services/consultar-posicao-service";
import type { ConsultarPosicaoQuery } from "@/application/queries/consultar-posicao";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import {
  ApplicationError,
  NotFoundError,
  ValidationError,
} from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";
const FIXTURA_ATIVO = "0191c4e2-3a4b-5c6d-7e8f-9a0b1c2d3e4f";

function createService(projectionRepo?: IProjectionRepository): ConsultarPosicaoService {
  return new ConsultarPosicaoService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
  );
}

function createQuery(overrides?: Partial<ConsultarPosicaoQuery>): ConsultarPosicaoQuery {
  return {
    type: "ConsultarPosicaoQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ativoId: FIXTURA_ATIVO,
    ...overrides,
  };
}

describe("ConsultarPosicaoService", () => {
  describe("Execute", () => {
    it("returns PosicaoDetalhadaDto when position exists", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn().mockResolvedValue({
          portfolioId: FIXTURA_PORTFOLIO,
          assetId: FIXTURA_ATIVO,
          ticker: "PETR4",
          nome: "Petrobras PN",
          classe: "stock",
          quantidade: 100,
          precoMedio: 35.5,
          valorTotal: 4000,
          rentabilidade: {
            valorizacao: 500,
            rentabilidadeTotal: 12.5,
            rentabilidadePeriodo: 3.2,
          },
        }),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/posicao").PosicaoDetalhadaDto;
      expect(dto.ticker).toBe("PETR4");
      expect(dto.quantidade).toBe(100);
      expect(dto.precoMedio).toBe(35.5);
      expect(dto.rentabilidade.rentabilidadeTotal).toBe(12.5);
    });

    it("returns NotFoundError when position does not exist", async () => {
      const repo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn().mockResolvedValue(null),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const service = createService(repo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("returns ValidationError when ativoId is empty", async () => {
      const service = createService();
      const query = createQuery({ ativoId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
