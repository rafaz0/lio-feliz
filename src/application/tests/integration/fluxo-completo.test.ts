import { describe, it, expect, vi } from "vitest";
import { DispatcherImpl } from "@/application/dispatcher-impl";
import { DomainEventHandlerRegistry } from "@/application/handlers/handler-registry";
import { FinancialEventRegisteredHandler } from "@/application/handlers/financial-event-registered-handler";
import type { IUnitOfWork } from "@/application/ports/unit-of-work";
import type { ApplicationError } from "@/application/errors/application-error";

function createMockUoW(): IUnitOfWork {
  return {
    IniciarTransacao: vi.fn().mockResolvedValue(undefined),
    Commit: vi.fn().mockResolvedValue(undefined),
    Rollback: vi.fn().mockResolvedValue(undefined),
  };
}

describe("Fluxo Completo - Command Services via Dispatcher", () => {
  it("UC-003 RegistrarOperacao: Dispatcher -> Service -> Domain -> DTO", async () => {
    const portfolio = {
      id: { value: "portfolio-001" },
      applyEvent: vi.fn().mockReturnValue({ isFailure: false }),
      getDomainEvents: vi.fn().mockReturnValue([]),
      clearDomainEvents: vi.fn(),
    };

    const portfolioRepo = {
      ObterPorId: vi.fn().mockResolvedValue(portfolio),
      Salvar: vi.fn().mockResolvedValue(undefined),
      ObterTodos: vi.fn(),
    };

    const eventPublisher = {
      Publicar: vi.fn(),
      PublicarVarios: vi.fn(),
    };

    const { RegistrarOperacaoService } =
      await import("@/application/services/registrar-operacao-service");
    const service = new RegistrarOperacaoService(portfolioRepo, eventPublisher);

    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("RegistrarOperacaoCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "RegistrarOperacaoCommand",
      portfolioId: "portfolio-001",
      tipo: "BUY",
      ativoId: "asset-001",
      quantidade: 100,
      valor: 5000,
      data: new Date("2026-01-15"),
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect(dto.status).toBe("CONFIRMED");
    expect(dto.tipo).toBe("BUY");
    expect(portfolioRepo.ObterPorId).toHaveBeenCalled();
    expect(portfolio.applyEvent).toHaveBeenCalled();
    expect(portfolioRepo.Salvar).toHaveBeenCalled();
    expect(eventPublisher.PublicarVarios).toHaveBeenCalled();
  });

  it("UC-001 ConsultarPatrimonio: Dispatcher -> Query -> DTO", async () => {
    const projectionRepo = {
      ObterPatrimonio: vi.fn().mockResolvedValue({
        portfolioId: "portfolio-001",
        patrimonioTotal: 500000,
        patrimonioInvestido: 450000,
        saldoDisponivel: 50000,
        moeda: "BRL",
        dataReferencia: new Date("2026-07-18"),
        alocacao: [{ classe: "acoes", valor: 300000, percentual: 60 }],
        evolucaoMensal: 2.5,
      }),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn(),
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
      portfolioId: "portfolio-001",
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect(dto.patrimonioTotal).toBe(500000);
    expect(dto.moeda).toBe("BRL");
    expect(projectionRepo.ObterPatrimonio).toHaveBeenCalledWith("portfolio-001");
  });

  it("UC-008 ConfigurarEstrategia: Command -> Service -> Repo -> DTO", async () => {
    const configRepo = {
      ObterEstrategia: vi.fn(),
      SalvarEstrategia: vi.fn().mockResolvedValue(undefined),
      ObterMetas: vi.fn(),
      SalvarMetas: vi.fn().mockResolvedValue(undefined),
    };

    const { ConfigurarEstrategiaService } =
      await import("@/application/services/configurar-estrategia-service");
    const service = new ConfigurarEstrategiaService(configRepo);

    const dispatcher = new DispatcherImpl(createMockUoW());
    dispatcher.RegisterCommand("ConfigurarEstrategiaCommand", async (cmd) => service.Execute(cmd));

    const result = await dispatcher.DispatchCommand({
      type: "ConfigurarEstrategiaCommand",
      usuarioId: "user-001",
      percentuais: { acoes: 60, renda_fixa: 30, fiis: 10 },
      moeda: "BRL",
      toleranciaRebalanceamento: 5,
      metas: [{ nome: "Reserva", valorAlvo: 100000, prazo: new Date("2027-12-31") }],
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect(dto.usuarioId).toBe("user-001");
    expect(configRepo.SalvarEstrategia).toHaveBeenCalled();
    expect(configRepo.SalvarMetas).toHaveBeenCalled();
  });

  it("UC-011 GerenciarAssinatura: Command -> Service -> Repo -> Notification -> DTO", async () => {
    const subscriptionRepo = {
      ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
      Salvar: vi.fn().mockResolvedValue(undefined),
      ListarPlanosDisponiveis: vi.fn().mockResolvedValue([
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
      usuarioId: "user-001",
      acao: "ativar",
      plano: "premium",
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect(dto.plano).toBe("premium");
    expect(subscriptionRepo.Salvar).toHaveBeenCalled();
    expect(notificationPort.Notificar).toHaveBeenCalled();
  });

  it("UC-006 CalcularRebalanceamento: Query -> Services -> DTO", async () => {
    const projectionRepo = {
      ObterPatrimonio: vi.fn(),
      ObterPosicao: vi.fn(),
      ObterPosicoes: vi.fn().mockResolvedValue([
        {
          portfolioId: "p1",
          assetId: "a1",
          ticker: "PETR4",
          nome: "Petrobras",
          classe: "acoes",
          quantidade: 100,
          precoMedio: 30,
          valorTotal: 3000,
          rentabilidade: { valorizacao: 0, rentabilidadeTotal: 0, rentabilidadePeriodo: 0 },
        },
        {
          portfolioId: "p1",
          assetId: "a2",
          ticker: "BBDC4",
          nome: "Bradesco",
          classe: "acoes",
          quantidade: 50,
          precoMedio: 20,
          valorTotal: 1000,
          rentabilidade: { valorizacao: 0, rentabilidadeTotal: 0, rentabilidadePeriodo: 0 },
        },
      ]),
      ObterHistorico: vi.fn(),
      ObterProventos: vi.fn(),
    };

    const configRepo = {
      ObterEstrategia: vi.fn().mockResolvedValue({
        usuarioId: "user-001",
        percentuais: { acoes: 70, renda_fixa: 30 },
        moeda: "BRL",
        toleranciaRebalanceamento: 5,
      }),
      SalvarEstrategia: vi.fn(),
      ObterMetas: vi.fn(),
      SalvarMetas: vi.fn(),
    };

    const { CalcularRebalanceamentoService } =
      await import("@/application/services/calcular-rebalanceamento-service");
    const service = new CalcularRebalanceamentoService(projectionRepo, configRepo);

    const dispatcher = new DispatcherImpl();
    dispatcher.RegisterQuery("CalcularRebalanceamentoQuery", async (q) => service.Execute(q));

    const result = await dispatcher.DispatchQuery({
      type: "CalcularRebalanceamentoQuery",
      portfolioId: "p1",
    });

    expect(result).not.toBeInstanceOf(Error);
    const dto = result as Record<string, unknown>;
    expect((dto as Record<string, unknown[]>).alocacaoAtual).toBeDefined();
    expect((dto as Record<string, unknown[]>).diferencas).toBeDefined();
  });
});

describe("Fluxo Completo - Domain Event Handlers via Registry", () => {
  it("ImportacaoConcluidaHandler sends notification via registry", async () => {
    const notificar = vi.fn().mockResolvedValue(undefined);
    const notificationPort = { Notificar: notificar, NotificarEmail: vi.fn() };

    const { ImportacaoConcluidaHandler, EVENT_NAME_IMPORTACAO_CONCLUIDA } =
      await import("@/application/handlers/importacao-concluida-handler");

    const registry = new DomainEventHandlerRegistry();
    const handler = new ImportacaoConcluidaHandler(notificationPort);
    registry.register(handler);

    const { DomainEvent } = await import("@/core/domain");
    const event = new (class extends DomainEvent {
      constructor() {
        super("user-001", "corr-int-2", EVENT_NAME_IMPORTACAO_CONCLUIDA);
        this.finalize();
      }
    })();

    await registry.dispatch(event);

    expect(notificar).toHaveBeenCalledWith("user-001", "Importação Concluída", expect.any(String));
  });
});

describe("Fluxo Completo - Unit of Work Integration", () => {
  it("Commit on successful command, Rollback on error", async () => {
    const uow = createMockUoW();
    const dispatcher = new DispatcherImpl(uow);

    dispatcher.RegisterCommand("SuccessCmd", async () => ({ ok: true }));
    dispatcher.RegisterCommand("FailCmd", async () => {
      const { ValidationError } = await import("@/application/errors/application-error");
      return new ValidationError("ERR", "Falhou");
    });

    await dispatcher.DispatchCommand({ type: "SuccessCmd" });

    expect(uow.IniciarTransacao).toHaveBeenCalledTimes(1);
    expect(uow.Commit).toHaveBeenCalledTimes(1);

    const failResult = await dispatcher.DispatchCommand({ type: "FailCmd" });

    expect(failResult).toBeInstanceOf(Error);
    expect(uow.Rollback).toHaveBeenCalledTimes(1);
  });

  it("Queries bypass Unit of Work", async () => {
    const uow = createMockUoW();
    const dispatcher = new DispatcherImpl(uow);

    dispatcher.RegisterQuery("TestQuery", async () => ({ data: "query-result" }));

    await dispatcher.DispatchQuery({ type: "TestQuery" });

    expect(uow.IniciarTransacao).not.toHaveBeenCalled();
    expect(uow.Commit).not.toHaveBeenCalled();
    expect(uow.Rollback).not.toHaveBeenCalled();
  });
});
