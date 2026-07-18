import { describe, it, expect, vi } from "vitest";
import { ConsultarProgressoMetasService } from "@/application/services/consultar-progresso-metas-service";
import type { ConsultarProgressoMetasQuery } from "@/application/queries/consultar-progresso-metas";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(
  projectionRepo?: IProjectionRepository,
  configRepo?: IConfigurationRepository,
): ConsultarProgressoMetasService {
  return new ConsultarProgressoMetasService(
    projectionRepo ?? {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    },
    configRepo ?? {
      ObterEstrategia: vi.fn(),
      SalvarEstrategia: vi.fn(),
      ObterMetas: vi.fn(),
      SalvarMetas: vi.fn(),
    },
  );
}

function createQuery(
  overrides?: Partial<ConsultarProgressoMetasQuery>,
): ConsultarProgressoMetasQuery {
  return {
    type: "ConsultarProgressoMetasQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ...overrides,
  };
}

describe("ConsultarProgressoMetasService", () => {
  describe("Execute", () => {
    it("returns ProgressoMetasDto with goal progress", async () => {
      const projectionRepo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue({
          portfolioId: FIXTURA_PORTFOLIO,
          patrimonioTotal: 50000,
          patrimonioInvestido: 40000,
          saldoDisponivel: 2000,
          moeda: "BRL",
          dataReferencia: new Date("2026-06-30"),
          alocacao: [],
          evolucaoMensal: 1.5,
        }),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const configRepo: IConfigurationRepository = {
        ObterEstrategia: vi.fn(),
        SalvarEstrategia: vi.fn(),
        ObterMetas: vi.fn().mockResolvedValue([
          {
            metaId: "m1",
            usuarioId: "user1",
            nome: "Reserva de Emergencia",
            valorAlvo: 100000,
            prazo: new Date("2027-12-31"),
          },
          {
            metaId: "m2",
            usuarioId: "user1",
            nome: "Aposentadoria",
            valorAlvo: 1000000,
            prazo: new Date("2040-12-31"),
          },
        ]),
        SalvarMetas: vi.fn(),
      };
      const service = createService(projectionRepo, configRepo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").ProgressoMetasDto;
      expect(dto.metas).toHaveLength(2);
      expect(dto.metas[0].nome).toBe("Reserva de Emergencia");
      expect(dto.metas[0].valorAtual).toBe(50000);
      expect(dto.metas[0].percentualConcluido).toBe(50);
      expect(dto.progressoGeral).toBeGreaterThan(0);
    });

    it("returns empty metas when no goals configured", async () => {
      const projectionRepo: IProjectionRepository = {
        ObterPatrimonio: vi.fn().mockResolvedValue(null),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn(),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const configRepo: IConfigurationRepository = {
        ObterEstrategia: vi.fn(),
        SalvarEstrategia: vi.fn(),
        ObterMetas: vi.fn().mockResolvedValue([]),
        SalvarMetas: vi.fn(),
      };
      const service = createService(projectionRepo, configRepo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").ProgressoMetasDto;
      expect(dto.metas).toHaveLength(0);
      expect(dto.progressoGeral).toBe(0);
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const query = createQuery({ portfolioId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
