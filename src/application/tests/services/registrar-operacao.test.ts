import { describe, it, expect, vi } from "vitest";
import { RegistrarOperacaoService } from "@/application/services/registrar-operacao-service";
import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import { BuyEvent, SellEvent } from "@/core/domain/portfolio";
import {
  ApplicationError,
  NotFoundError,
  ValidationError,
  InternalError,
} from "@/application/errors/application-error";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";
const FIXTURA_ATIVO = "0191c4e2-3a4b-5c6d-7e8f-9a0b1c2d3e4f";

function createPortfolio(): Portfolio {
  return Portfolio.create(PortfolioId.create(FIXTURA_PORTFOLIO));
}

function createService(
  portfolioRepo?: IPortfolioRepository,
  eventPublisher?: IDomainEventPublisher,
): RegistrarOperacaoService {
  return new RegistrarOperacaoService(
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

function createBuyCommand(overrides?: Partial<RegistrarOperacaoCommand>): RegistrarOperacaoCommand {
  return {
    type: "RegistrarOperacaoCommand",
    portfolioId: FIXTURA_PORTFOLIO,
    tipo: "BUY",
    ativoId: FIXTURA_ATIVO,
    quantidade: 100,
    valor: 5000,
    data: new Date("2026-01-15"),
    ...overrides,
  };
}

describe("RegistrarOperacaoService", () => {
  describe("Execute", () => {
    it("registers a Buy operation and returns DTO", async () => {
      const portfolio = createPortfolio();
      const salvar = vi.fn().mockResolvedValue(undefined);
      const publicarVarios = vi.fn().mockResolvedValue(undefined);
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn().mockResolvedValue(portfolio),
        Salvar: salvar,
        ObterTodos: vi.fn(),
      };
      const publisher: IDomainEventPublisher = {
        Publicar: vi.fn(),
        PublicarVarios: publicarVarios,
      };
      const service = createService(repo, publisher);
      const command = createBuyCommand();

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/operacao").OperacaoRegistradaDto;
      expect(dto.tipo).toBe("BUY");
      expect(dto.ativoId).toBe(FIXTURA_ATIVO);
      expect(dto.quantidade).toBe(100);
      expect(dto.valor).toBe(5000);
      expect(dto.status).toBe("CONFIRMED");
      expect(salvar).toHaveBeenCalledOnce();
      expect(publicarVarios).toHaveBeenCalledOnce();
    });

    it("registers a Sell operation and returns DTO", async () => {
      const portfolio = createPortfolio();
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn().mockResolvedValue(portfolio),
        Salvar: vi.fn().mockResolvedValue(undefined),
        ObterTodos: vi.fn(),
      };
      const publisher: IDomainEventPublisher = {
        Publicar: vi.fn(),
        PublicarVarios: vi.fn().mockResolvedValue(undefined),
      };
      const service = createService(repo, publisher);
      const command = createBuyCommand({ tipo: "SELL" });

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/operacao").OperacaoRegistradaDto;
      expect(dto.tipo).toBe("SELL");
    });

    it("returns NotFoundError when portfolio does not exist", async () => {
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn().mockResolvedValue(null),
        Salvar: vi.fn(),
        ObterTodos: vi.fn(),
      };
      const service = createService(repo);
      const command = createBuyCommand();

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(NotFoundError);
      expect((result as NotFoundError).resourceType).toBe("Portfolio");
    });

    it("returns InternalError when portfolio.applyEvent fails due to aggregateId mismatch", async () => {
      const portfolio = createPortfolio();
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn().mockImplementation(() => Promise.resolve(portfolio)),
        Salvar: vi.fn(),
        ObterTodos: vi.fn(),
      };
      const service = createService(repo);
      const command = createBuyCommand({ portfolioId: "wrong-id" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(InternalError);
    });

    it("returns ValidationError when portfolioId is empty", async () => {
      const service = createService();
      const command = createBuyCommand({ portfolioId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when tipo is unsupported", async () => {
      const service = createService();
      const command = createBuyCommand({ tipo: "OPTION" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when quantidade is zero", async () => {
      const service = createService();
      const command = createBuyCommand({ quantidade: 0 });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when valor is negative", async () => {
      const service = createService();
      const command = createBuyCommand({ valor: -100 });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when ativoId is missing", async () => {
      const service = createService();
      const command = createBuyCommand({ ativoId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
