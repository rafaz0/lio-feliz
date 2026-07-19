import { describe, it, expect, beforeEach } from "vitest";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import { FakePortfolioRepository } from "@/infrastructure/fakes/fake-portfolio-repository";
import { FakeProjectionRepository } from "@/infrastructure/fakes/fake-projection-repository";
import { FakeSubscriptionRepository } from "@/infrastructure/fakes/fake-subscription-repository";
import { FakeUnitOfWork } from "@/infrastructure/fakes/fake-unit-of-work";
import { FakeDomainEventPublisher } from "@/infrastructure/fakes/fake-domain-event-publisher";
import { FakeNotificationPort } from "@/infrastructure/fakes/fake-notification-port";
import { FakeDataGateway } from "@/infrastructure/fakes/fake-data-gateway";
import { FakeImportInterpreter } from "@/infrastructure/fakes/fake-import-interpreter";
import type {
  PatrimonioProjection,
  PosicaoProjection,
  HistoricoProjection,
  ProventoProjection,
} from "@/application/ports";

describe("Infrastructure Integration - Repository + UoW + Publisher", () => {
  let repo: FakePortfolioRepository;
  let uow: FakeUnitOfWork;
  let publisher: FakeDomainEventPublisher;

  beforeEach(() => {
    repo = new FakePortfolioRepository();
    uow = new FakeUnitOfWork();
    publisher = new FakeDomainEventPublisher();
  });

  it("saves portfolio and captures events through UoW", async () => {
    const portfolio = Portfolio.create(new PortfolioId("p1"));

    await uow.IniciarTransacao();
    await repo.Salvar(portfolio);
    await publisher.PublicarVarios(portfolio.getDomainEvents());
    await uow.Commit();

    const saved = await repo.ObterPorId(portfolio.id);
    expect(saved).not.toBeNull();
    expect(uow.wasCommitted()).toBe(true);
  });

  it("rolls back without publishing events on error", async () => {
    await uow.IniciarTransacao();
    await uow.Rollback();

    expect(uow.wasRolledBack()).toBe(true);
    expect(uow.wasCommitted()).toBe(false);
    expect(publisher.getPublishedEvents()).toHaveLength(0);
  });
});

describe("Infrastructure Integration - Subscription + Notification", () => {
  let subscriptionRepo: FakeSubscriptionRepository;
  let notificationPort: FakeNotificationPort;

  beforeEach(() => {
    subscriptionRepo = new FakeSubscriptionRepository();
    notificationPort = new FakeNotificationPort();
  });

  it("activates subscription and sends notification", async () => {
    await subscriptionRepo.Salvar({
      usuarioId: "user-1",
      plano: "premium",
      dataAtivacao: new Date(),
      dataExpiracao: null,
      recursosLiberados: ["carteira", "relatorios"],
    });

    const assinatura = await subscriptionRepo.ObterPlanoAtivo("user-1");
    expect(assinatura).not.toBeNull();
    expect(assinatura!.plano).toBe("premium");

    await notificationPort.Notificar("user-1", "Assinatura Atualizada", "mensagem");
    const notifs = notificationPort.getNotificacoes();
    expect(notifs).toHaveLength(1);
    expect(notifs[0].titulo).toBe("Assinatura Atualizada");
  });
});

describe("Infrastructure Integration - DataGateway + ImportInterpreter", () => {
  let gateway: FakeDataGateway;
  let interpreter: FakeImportInterpreter;

  beforeEach(() => {
    gateway = new FakeDataGateway();
    interpreter = new FakeImportInterpreter();
  });

  it("returns empty import when no data configured", async () => {
    const raw = await gateway.ObterDadosImportacao("csv", { portfolioId: "p1" });

    expect(raw.operacoes).toHaveLength(0);
    expect(raw.fonte).toBe("csv");
  });
});

describe("Infrastructure Integration - Projection Repository Fakes", () => {
  let projectionRepo: FakeProjectionRepository;

  beforeEach(() => {
    projectionRepo = new FakeProjectionRepository();
  });

  it("stores and retrieves patrimonio projection", async () => {
    const patrimonio: PatrimonioProjection = {
      portfolioId: "p1",
      patrimonioTotal: 100000,
      patrimonioInvestido: 75000,
      saldoDisponivel: 25000,
      moeda: "BRL",
      dataReferencia: new Date(),
      alocacao: [{ classe: "acoes", valor: 60000, percentual: 60 }],
      evolucaoMensal: 5.5,
    };
    projectionRepo.setPatrimonio("p1", patrimonio);

    const result = await projectionRepo.ObterPatrimonio("p1");
    expect(result).not.toBeNull();
    expect(result!.patrimonioTotal).toBe(100000);
  });

  it("stores and retrieves posicoes", async () => {
    const posicao: PosicaoProjection = {
      portfolioId: "p1",
      assetId: "a1",
      ticker: "PETR4",
      nome: "Petrobras",
      classe: "stock",
      quantidade: 100,
      precoMedio: 25.5,
      valorTotal: 2550,
      rentabilidade: { valorizacao: 500, rentabilidadeTotal: 10, rentabilidadePeriodo: 2 },
    };
    projectionRepo.setPosicao("p1", "a1", posicao);

    const result = await projectionRepo.ObterPosicoes("p1");
    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("PETR4");
  });

  it("stores and retrieves historico", async () => {
    const historico: HistoricoProjection = {
      portfolioId: "p1",
      data: new Date("2026-01-01"),
      patrimonioTotal: 50000,
      patrimonioInvestido: 40000,
    };
    projectionRepo.setHistorico(historico);

    const result = await projectionRepo.ObterHistorico("p1", {
      inicio: new Date("2025-01-01"),
      fim: new Date("2026-12-31"),
    });
    expect(result).toHaveLength(1);
    expect(result[0].patrimonioTotal).toBe(50000);
  });

  it("stores and retrieves proventos", async () => {
    const provento: ProventoProjection = {
      portfolioId: "p1",
      assetId: "a1",
      ticker: "PETR4",
      tipo: "DIVIDEND",
      valor: 500,
      dataPagamento: new Date("2026-06-15"),
      dataBase: new Date("2026-06-01"),
    };
    projectionRepo.setProvento(provento);

    const result = await projectionRepo.ObterProventos("p1", { ticker: "PETR4" });
    expect(result).toHaveLength(1);
    expect(result[0].valor).toBe(500);
  });
});

describe("Infrastructure Integration - Full Application Flow with Fakes", () => {
  let subscriptionRepo: FakeSubscriptionRepository;
  let notificationPort: FakeNotificationPort;

  beforeEach(() => {
    subscriptionRepo = new FakeSubscriptionRepository();
    notificationPort = new FakeNotificationPort();
  });

  it("GerenciarAssinatura flow: activate -> salva -> notifica", async () => {
    await subscriptionRepo.Salvar({
      usuarioId: "user-1",
      plano: "premium",
      dataAtivacao: new Date(),
      dataExpiracao: null,
      recursosLiberados: ["carteira", "relatorios"],
    });

    const assinatura = await subscriptionRepo.ObterPlanoAtivo("user-1");
    expect(assinatura).not.toBeNull();

    await notificationPort.Notificar("user-1", "Assinatura Atualizada", "teste");

    const notifs = notificationPort.getNotificacoes();
    expect(notifs).toHaveLength(1);
    expect(notifs[0].titulo).toBe("Assinatura Atualizada");
  });
});
