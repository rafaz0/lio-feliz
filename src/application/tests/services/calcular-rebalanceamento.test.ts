import { describe, it, expect, vi } from "vitest";
import { CalcularRebalanceamentoService } from "@/application/services/calcular-rebalanceamento-service";
import type { CalcularRebalanceamentoQuery } from "@/application/queries/calcular-rebalanceamento";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(
  projectionRepo?: IProjectionRepository,
  configRepo?: IConfigurationRepository,
): CalcularRebalanceamentoService {
  return new CalcularRebalanceamentoService(
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
  overrides?: Partial<CalcularRebalanceamentoQuery>,
): CalcularRebalanceamentoQuery {
  return {
    type: "CalcularRebalanceamentoQuery",
    portfolioId: FIXTURA_PORTFOLIO,
    ...overrides,
  };
}

describe("CalcularRebalanceamentoService", () => {
  describe("Execute", () => {
    it("returns RebalanceamentoDto with allocation comparison", async () => {
      const projectionRepo: IProjectionRepository = {
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
            rentabilidade: { valorizacao: 500, rentabilidadeTotal: 10, rentabilidadePeriodo: 2 },
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "a2",
            ticker: "VALE3",
            nome: "Vale",
            classe: "stock",
            quantidade: 50,
            precoMedio: 60,
            valorTotal: 3500,
            rentabilidade: { valorizacao: 300, rentabilidadeTotal: 8, rentabilidadePeriodo: 1 },
          },
          {
            portfolioId: FIXTURA_PORTFOLIO,
            assetId: "a3",
            ticker: "HGLG11",
            nome: "CSHG Logistica",
            classe: "fii",
            quantidade: 200,
            precoMedio: 150,
            valorTotal: 2500,
            rentabilidade: { valorizacao: -200, rentabilidadeTotal: -5, rentabilidadePeriodo: -1 },
          },
        ]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const configRepo: IConfigurationRepository = {
        ObterEstrategia: vi.fn().mockResolvedValue({
          usuarioId: "user1",
          percentuais: { stock: 60, fii: 40 },
          moeda: "BRL",
          toleranciaRebalanceamento: 5,
        }),
        SalvarEstrategia: vi.fn(),
        ObterMetas: vi.fn(),
        SalvarMetas: vi.fn(),
      };
      const service = createService(projectionRepo, configRepo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/rebalanceamento").RebalanceamentoDto;
      expect(dto.alocacaoAtual).toHaveLength(2);
      expect(dto.alocacaoDesejada).toHaveLength(2);
      expect(dto.diferencas).toHaveLength(2);
      expect(dto.sugestaoAportes).toHaveLength(1);
    });

    it("returns alocacaoDesejada empty when no strategy configured", async () => {
      const projectionRepo: IProjectionRepository = {
        ObterPatrimonio: vi.fn(),
        ObterPosicao: vi.fn(),
        ObterPosicoes: vi.fn().mockResolvedValue([]),
        ObterHistorico: vi.fn(),
        ObterProventos: vi.fn(),
      };
      const configRepo: IConfigurationRepository = {
        ObterEstrategia: vi.fn().mockResolvedValue(null),
        SalvarEstrategia: vi.fn(),
        ObterMetas: vi.fn(),
        SalvarMetas: vi.fn(),
      };
      const service = createService(projectionRepo, configRepo);
      const query = createQuery();

      const result = await service.Execute(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/rebalanceamento").RebalanceamentoDto;
      expect(dto.alocacaoAtual).toHaveLength(0);
      expect(dto.alocacaoDesejada).toHaveLength(0);
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const query = createQuery({ portfolioId: "" });

      const result = await service.Execute(query);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
