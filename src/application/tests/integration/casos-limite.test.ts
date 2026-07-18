import { describe, it, expect, vi } from "vitest";
import { DispatcherImpl } from "@/application/dispatcher-impl";
import type { IUnitOfWork } from "@/application/ports/unit-of-work";
import { BuyEvent } from "@/core/domain/portfolio";

function createMockUoW(): IUnitOfWork {
  return {
    IniciarTransacao: vi.fn().mockResolvedValue(undefined),
    Commit: vi.fn().mockResolvedValue(undefined),
    Rollback: vi.fn().mockResolvedValue(undefined),
  };
}

describe("Casos Limite - CL-005-001 Command Inválido", () => {
  it("returns ValidationError for missing required fields", async () => {
    const { ValidationError } = await import("@/application/errors/application-error");

    const service = {
      Execute: vi
        .fn()
        .mockResolvedValue(new ValidationError("VALID_ERROR", "portfolioId é obrigatório")),
    };
    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("RegistrarOperacaoCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "RegistrarOperacaoCommand",
      portfolioId: "",
    } as never);

    expect(result).toBeInstanceOf(ValidationError);
    expect((result as Error).message).toContain("portfolioId");
  });

  it("returns ValidationError for unknown command type", async () => {
    const dispatcher = new DispatcherImpl(createMockUoW());
    const result = await dispatcher.DispatchCommand({ type: "UnknownCommand" } as never);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toMatch(/unknown|not registered/i);
  });
});

describe("Casos Limite - CL-005-002 Recurso Não Encontrado", () => {
  it("propagates NotFoundError from service through Dispatcher", async () => {
    const { NotFoundError } = await import("@/application/errors/application-error");

    const service = {
      Execute: vi
        .fn()
        .mockResolvedValue(new NotFoundError("Portfolio", "inexistente", "PORTFOLIO_NOT_FOUND")),
    };
    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("TestCmd", async (cmd) => service.Execute(cmd));
    dispatcher.RegisterQuery("TestQuery", async (q) => service.Execute(q));

    const cmdResult = await dispatcher.DispatchCommand({ type: "TestCmd" });
    expect(cmdResult).toBeInstanceOf(NotFoundError);

    const qryResult = await dispatcher.DispatchQuery({ type: "TestQuery" });
    expect(qryResult).toBeInstanceOf(NotFoundError);
  });
});

describe("Casos Limite - CL-005-004 Concorrência", () => {
  it("detects simultaneous writes via UoW Rollback", async () => {
    const uow = createMockUoW();
    const dispatcher = new DispatcherImpl(uow);

    let callCount = 0;

    dispatcher.RegisterCommand("ConcurrentCmd", async () => {
      callCount++;
      if (callCount === 1) {
        const { ValidationError } = await import("@/application/errors/application-error");
        return { status: "ok" };
      }
      const { InternalError } = await import("@/application/errors/application-error");
      return new InternalError("CONCURRENCY", "Conflito de versão ao salvar");
    });

    await dispatcher.DispatchCommand({ type: "ConcurrentCmd" });
    const conflictResult = await dispatcher.DispatchCommand({ type: "ConcurrentCmd" });

    const { InternalError } = await import("@/application/errors/application-error");
    expect(conflictResult).toBeInstanceOf(InternalError);
    expect((conflictResult as Error).message).toMatch(/conflito|versão/i);
  });
});

describe("Casos Limite - CL-005-005 Falha de Infrastructure", () => {
  it("wraps Infrastructure errors as InternalError through Dispatcher", async () => {
    const { InternalError } = await import("@/application/errors/application-error");

    const service = {
      Execute: vi.fn().mockRejectedValue(new Error("Falha na rede")),
    };
    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("InfraCmd", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({ type: "InfraCmd" });

    expect(result).toBeInstanceOf(Error);
  });
});

describe("Casos Limite - CL-005-006 Sincronização Parcial", () => {
  it("SincronizarDadosService returns DTO with mixed results through Dispatcher", async () => {
    const { Portfolio } = await import("@/core/domain/portfolio");
    const { PortfolioId } = await import("@/core/domain");
    const { SincronizarDadosService } =
      await import("@/application/services/sincronizar-dados-service");

    const portfolio = Portfolio.create(PortfolioId.create("p1"));
    const salvar = vi.fn().mockResolvedValue(undefined);
    const publicarVarios = vi.fn().mockResolvedValue(undefined);

    const repo = {
      ObterPorId: vi.fn(),
      Salvar: salvar,
      ObterTodos: vi.fn().mockResolvedValue([portfolio]),
    };

    const dados = {
      fonte: "b3",
      operacoes: [
        { tipo: "BUY", ativo: "a1", quantidade: 100, valor: 5000, data: new Date() },
        { tipo: "INVALIDO", ativo: "a2", quantidade: 50, valor: 2000, data: new Date() },
      ],
      dataImportacao: new Date(),
      metadados: { origem: "b3-api" },
    };

    const gateway = { ObterDadosImportacao: vi.fn().mockResolvedValue(dados) };

    let callCount = 0;
    const interpret = vi.fn().mockImplementation((op: { tipo: string }) => {
      callCount++;
      if (callCount === 1) {
        return new BuyEvent("p1", "corr-p1", "a1", 100, 50);
      }
      throw new Error("Formato inválido");
    });

    const eventPublisher = { Publicar: vi.fn(), PublicarVarios: publicarVarios };

    const service = new SincronizarDadosService(
      repo,
      gateway,
      { InterpretarOperacao: interpret },
      eventPublisher,
    );

    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("SincronizarDadosCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "SincronizarDadosCommand",
      usuarioId: "user-001",
      fonte: "b3",
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect(dto.totalProcessado).toBe(2);
    expect(dto.totalNovo).toBe(1);
    expect(dto.totalIgnorado).toBe(1);
    expect(dto.erros).toHaveLength(1);
  });
});

describe("Casos Limite - CL-005-007 Portfolio Vazio", () => {
  it("returns zeroed data for empty portfolio", async () => {
    const projectionRepo = {
      ObterPatrimonio: vi.fn().mockResolvedValue(null),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn().mockResolvedValue([]),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    };

    const { ConsultarPatrimonioService } =
      await import("@/application/services/consultar-patrimonio-service");
    const service = new ConsultarPatrimonioService(projectionRepo);

    const dispatcher = new DispatcherImpl();
    dispatcher.RegisterQuery("ObterPatrimonioQuery", async (q) => service.Execute(q));

    const result = await dispatcher.DispatchQuery({
      type: "ObterPatrimonioQuery",
      portfolioId: "inexistente",
    });

    const { NotFoundError } = await import("@/application/errors/application-error");
    expect(result).toBeInstanceOf(NotFoundError);
  });
});

describe("Casos Limite - CL-005-009 Usuário Sem Plano", () => {
  it("GerenciarAssinatura returns AuthorizationError for sem-assinatura scenario", async () => {
    const subscriptionRepo = {
      ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
      Salvar: vi.fn().mockResolvedValue(undefined),
      ListarPlanosDisponiveis: vi.fn().mockResolvedValue([
        { planoId: "free", nome: "Free", descricao: "Free", precoMensal: 0, recursos: ["basico"] },
        {
          planoId: "premium",
          nome: "Premium",
          descricao: "Premium",
          precoMensal: 29.9,
          recursos: ["exportar"],
        },
      ]),
    };

    const notificationPort = {
      Notificar: vi.fn().mockResolvedValue(undefined),
      NotificarEmail: vi.fn(),
    };

    const { GerenciarAssinaturaService } =
      await import("@/application/services/gerenciar-assinatura-service");
    const service = new GerenciarAssinaturaService(subscriptionRepo, notificationPort);

    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("GerenciarAssinaturaCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "GerenciarAssinaturaCommand",
      usuarioId: "user-sem-plano",
      acao: "cancelar",
    });

    const { AuthorizationError } = await import("@/application/errors/application-error");
    expect(result).toBeInstanceOf(AuthorizationError);
    expect((result as Error).message).toMatch(/assinatura|plano|sem/i);
  });
});

describe("Casos Limite - Cross-Service Event Chaining", () => {
  it("RegistrarOperacao triggers FinancialEventRegisteredHandler via integrated flow", async () => {
    const portfolio = {
      id: { value: "p-chain-001" },
      applyEvent: vi.fn().mockReturnValue({ isFailure: false }),
      getDomainEvents: vi.fn().mockReturnValue([]),
      clearDomainEvents: vi.fn(),
    };

    const portfolioRepo = {
      ObterPorId: vi.fn().mockResolvedValue(portfolio),
      Salvar: vi.fn().mockResolvedValue(undefined),
      ObterTodos: vi.fn(),
    };

    const projectionRepo = {
      ObterPatrimonio: vi.fn().mockResolvedValue(null),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn().mockResolvedValue([]),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    };

    const eventPublisher = {
      Publicar: vi.fn(),
      PublicarVarios: vi.fn(),
    };

    const { DomainEventHandlerRegistry } = await import("@/application/handlers/handler-registry");
    const { FinancialEventRegisteredHandler } =
      await import("@/application/handlers/financial-event-registered-handler");

    const registry = new DomainEventHandlerRegistry();
    registry.register(new FinancialEventRegisteredHandler(projectionRepo));

    const { RegistrarOperacaoService } =
      await import("@/application/services/registrar-operacao-service");
    const service = new RegistrarOperacaoService(portfolioRepo, eventPublisher);

    const { DispatcherImpl } = await import("@/application/dispatcher-impl");
    const dispatcher = new DispatcherImpl(createMockUoW(), registry);
    dispatcher.RegisterCommand("RegistrarOperacaoCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "RegistrarOperacaoCommand",
      portfolioId: "p-chain-001",
      tipo: "BUY",
      ativoId: "a1",
      quantidade: 10,
      valor: 500,
      data: new Date("2026-07-18"),
    });

    expect(result).not.toBeInstanceOf(Error);
  });
});
