import { describe, it, expect, vi } from "vitest";
import { SincronizarDadosService } from "@/application/services/sincronizar-dados-service";
import type { SincronizarDadosCommand } from "@/application/commands/sincronizar-dados";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDataGateway, DadosImportacao } from "@/application/ports/data-gateway";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import type { IImportInterpreterPort } from "@/application/ports/import-interpreter";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import { BuyEvent, SellEvent } from "@/core/domain/portfolio";
import {
  ApplicationError,
  NotFoundError,
  ValidationError,
  InternalError,
} from "@/application/errors/application-error";

const FIXTURA_USUARIO = "0190b4c2-5d6e-7f8a-9b0c-1d2e3f4a5b6c";
const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";
const FIXTURA_ATIVO = "0191c4e2-3a4b-5c6d-7e8f-9a0b1c2d3e4f";

function createPortfolio(): Portfolio {
  return Portfolio.create(PortfolioId.create(FIXTURA_PORTFOLIO));
}

function createDadosImportacao(): DadosImportacao {
  return {
    fonte: "b3",
    operacoes: [
      {
        tipo: "BUY",
        ativo: FIXTURA_ATIVO,
        quantidade: 100,
        valor: 5000,
        data: new Date("2026-01-15"),
      },
      {
        tipo: "SELL",
        ativo: FIXTURA_ATIVO,
        quantidade: 50,
        valor: 3000,
        data: new Date("2026-02-01"),
      },
      {
        tipo: "BUY",
        ativo: FIXTURA_ATIVO,
        quantidade: 200,
        valor: 11000,
        data: new Date("2026-03-10"),
      },
    ],
    dataImportacao: new Date(),
    metadados: { origem: "b3-api" },
  };
}

function createService(
  portfolioRepo?: IPortfolioRepository,
  dataGateway?: IDataGateway,
  importInterpreter?: IImportInterpreterPort,
  eventPublisher?: IDomainEventPublisher,
): SincronizarDadosService {
  return new SincronizarDadosService(
    portfolioRepo ?? { ObterPorId: vi.fn(), Salvar: vi.fn(), ObterTodos: vi.fn() },
    dataGateway ?? { ObterDadosImportacao: vi.fn() },
    importInterpreter ?? { InterpretarOperacao: vi.fn() },
    eventPublisher ?? { Publicar: vi.fn(), PublicarVarios: vi.fn() },
  );
}

function createCommand(overrides?: Partial<SincronizarDadosCommand>): SincronizarDadosCommand {
  return {
    type: "SincronizarDadosCommand",
    usuarioId: FIXTURA_USUARIO,
    fonte: "b3",
    ...overrides,
  };
}

describe("SincronizarDadosService", () => {
  describe("Execute", () => {
    it("syncs all operations and returns summary", async () => {
      const portfolio = createPortfolio();
      const dados = createDadosImportacao();
      const salvar = vi.fn().mockResolvedValue(undefined);
      const publicarVarios = vi.fn().mockResolvedValue(undefined);
      const interpret = vi
        .fn()
        .mockImplementation((_op: { tipo: string }, portfolioId: string, correlationId: string) => {
          return _op.tipo === "BUY"
            ? new BuyEvent(portfolioId, correlationId, FIXTURA_ATIVO, 100, 50)
            : new SellEvent(portfolioId, correlationId, FIXTURA_ATIVO, 50, 60);
        });

      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn(),
        Salvar: salvar,
        ObterTodos: vi.fn().mockResolvedValue([portfolio]),
      };
      const gateway: IDataGateway = {
        ObterDadosImportacao: vi.fn().mockResolvedValue(dados),
      };

      const service = createService(
        repo,
        gateway,
        { InterpretarOperacao: interpret },
        { Publicar: vi.fn(), PublicarVarios: publicarVarios },
      );

      const result = await service.Execute(createCommand());

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/sincronizacao").SincronizacaoRealizadaDto;
      expect(dto.totalProcessado).toBe(3);
      expect(dto.totalNovo).toBe(3);
      expect(dto.totalIgnorado).toBe(0);
      expect(dto.erros).toHaveLength(0);
      expect(dto.fonte).toBe("b3");
      expect(salvar).toHaveBeenCalledOnce();
      expect(publicarVarios).toHaveBeenCalledOnce();
    });

    it("returns NotFoundError when user has no portfolio", async () => {
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn(),
        Salvar: vi.fn(),
        ObterTodos: vi.fn().mockResolvedValue([]),
      };
      const service = createService(repo);

      const result = await service.Execute(createCommand());

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("returns ValidationError when usuarioId is empty", async () => {
      const service = createService();
      const result = await service.Execute(createCommand({ usuarioId: "" }));
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when fonte is empty", async () => {
      const service = createService();
      const result = await service.Execute(createCommand({ fonte: "" }));
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns InternalError when IDataGateway throws", async () => {
      const portfolio = createPortfolio();
      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn(),
        Salvar: vi.fn(),
        ObterTodos: vi.fn().mockResolvedValue([portfolio]),
      };
      const gateway: IDataGateway = {
        ObterDadosImportacao: vi.fn().mockRejectedValue(new Error("Conexão falhou")),
      };
      const service = createService(repo, gateway);

      const result = await service.Execute(createCommand());

      expect(result).toBeInstanceOf(InternalError);
    });

    it("handles mixed results with domain errors", async () => {
      const portfolio = createPortfolio();
      const dados = createDadosImportacao();
      let callCount = 0;
      const interpret = vi
        .fn()
        .mockImplementation((_op: unknown, portfolioId: string, correlationId: string) => {
          callCount++;
          if (callCount <= 2) {
            return new BuyEvent(portfolioId, correlationId, FIXTURA_ATIVO, 100, 50);
          }
          throw new Error("Formato inválido");
        });

      const repo: IPortfolioRepository = {
        ObterPorId: vi.fn(),
        Salvar: vi.fn().mockResolvedValue(undefined),
        ObterTodos: vi.fn().mockResolvedValue([portfolio]),
      };
      const gateway: IDataGateway = {
        ObterDadosImportacao: vi.fn().mockResolvedValue(dados),
      };

      const service = createService(repo, gateway, { InterpretarOperacao: interpret });

      const result = await service.Execute(createCommand());

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/sincronizacao").SincronizacaoRealizadaDto;
      expect(dto.totalProcessado).toBe(3);
      expect(dto.totalNovo).toBe(2);
      expect(dto.totalIgnorado).toBe(1);
      expect(dto.erros).toHaveLength(1);
    });
  });
});
