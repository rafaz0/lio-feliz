import { describe, it, expect, vi } from "vitest";
import { ExecutarRebalanceamentoService } from "@/application/services/executar-rebalanceamento-service";
import type { ExecutarRebalanceamentoCommand } from "@/application/commands/executar-rebalanceamento";
import type { ExecutarRebalanceamentoResult } from "@/application/services/executar-rebalanceamento-service";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import { ValidationError } from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

function createService(
  portfolioRepo?: IPortfolioRepository,
  eventPublisher?: IDomainEventPublisher,
): ExecutarRebalanceamentoService {
  return new ExecutarRebalanceamentoService(
    portfolioRepo ?? {
      ObterPorId: vi.fn(),
      Salvar: vi.fn(),
      ObterTodos: vi.fn(),
    },
    eventPublisher ?? {
      Publicar: vi.fn(),
      PublicarVarios: vi.fn(),
    },
  );
}

function createCommand(
  overrides?: Partial<ExecutarRebalanceamentoCommand>,
): ExecutarRebalanceamentoCommand {
  return {
    type: "ExecutarRebalanceamentoCommand",
    portfolioId: FIXTURA_PORTFOLIO,
    acoes: [{ classe: "etf", valor: 1000, tipo: "aporte" }],
    ...overrides,
  };
}

describe("ExecutarRebalanceamentoService", () => {
  describe("Execute", () => {
    it("returns success when rebalanceamento is executed", async () => {
      const portfolioRepo: IPortfolioRepository = {
        ObterPorId: vi.fn().mockResolvedValue({ id: FIXTURA_PORTFOLIO, nome: "Carteira" }),
        Salvar: vi.fn(),
        ObterTodos: vi.fn(),
      };
      const eventPublisher: IDomainEventPublisher = { Publicar: vi.fn(), PublicarVarios: vi.fn() };
      const service = createService(portfolioRepo, eventPublisher);

      const result = await service.Execute(createCommand());

      expect(result).not.toBeInstanceOf(ValidationError);
      if (!(result instanceof ValidationError)) {
        const r = result as ExecutarRebalanceamentoResult;
        expect(r.sucesso).toBe(true);
        expect(r.acoesProcessadas).toBe(1);
      }
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const result = await service.Execute(createCommand({ portfolioId: "" }));
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when no actions", async () => {
      const service = createService();
      const result = await service.Execute(createCommand({ acoes: [] }));
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when action value is zero", async () => {
      const service = createService();
      const result = await service.Execute(
        createCommand({
          acoes: [{ classe: "etf", valor: 0, tipo: "aporte" }],
        }),
      );
      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
