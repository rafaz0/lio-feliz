import { describe, it, expect, vi } from "vitest";
import { DomainEvent } from "@/core/domain";
import { FinancialEventRegisteredHandler } from "@/application/handlers/financial-event-registered-handler";
import type { IProjectionRepository } from "@/application/ports/projection-repository";

class TestFinancialEvent extends DomainEvent {
  constructor(aggregateId: string, correlationId: string, eventName: string) {
    super(aggregateId, correlationId, eventName);
    this.finalize();
  }
}

const FIXTURA_PORTFOLIO = "portfolio-001";

function createRepo(): IProjectionRepository {
  return {
    ObterPatrimonio: vi.fn().mockResolvedValue(null),
    ObterPosicao: vi.fn(),
    ObterPosicoes: vi.fn().mockResolvedValue([]),
    ObterHistorico: vi.fn(),
    ObterProventos: vi.fn(),
  };
}

describe("FinancialEventRegisteredHandler", () => {
  it("updates projections when receiving a BUY event", async () => {
    const repo = createRepo();
    const handler = new FinancialEventRegisteredHandler(repo);
    const event = new TestFinancialEvent(FIXTURA_PORTFOLIO, "corr-1", "BUY");

    await handler.Handle(event);

    expect(repo.ObterPatrimonio).toHaveBeenCalledWith(FIXTURA_PORTFOLIO);
    expect(repo.ObterPosicoes).toHaveBeenCalledWith(FIXTURA_PORTFOLIO);
  });

  it("updates projections when receiving a DIVIDEND event", async () => {
    const repo = createRepo();
    const handler = new FinancialEventRegisteredHandler(repo);
    const event = new TestFinancialEvent(FIXTURA_PORTFOLIO, "corr-2", "DIVIDEND");

    await handler.Handle(event);

    expect(repo.ObterPatrimonio).toHaveBeenCalled();
    expect(repo.ObterPosicoes).toHaveBeenCalled();
  });

  it("ignores non-financial events", async () => {
    const repo = createRepo();
    const handler = new FinancialEventRegisteredHandler(repo);
    const event = new TestFinancialEvent(FIXTURA_PORTFOLIO, "corr-3", "ASSINATURA_ALTERADA");

    await handler.Handle(event);

    expect(repo.ObterPatrimonio).not.toHaveBeenCalled();
    expect(repo.ObterPosicoes).not.toHaveBeenCalled();
  });

  it("covers all FinancialEventType values", async () => {
    const types = [
      "BUY",
      "SELL",
      "DIVIDEND",
      "JCP",
      "BONUS",
      "SPLIT",
      "GROUPING",
      "AMORTIZATION",
      "ADJUSTMENT",
    ];
    const repo = createRepo();
    const handler = new FinancialEventRegisteredHandler(repo);

    for (const type of types) {
      const event = new TestFinancialEvent(FIXTURA_PORTFOLIO, `corr-${type}`, type);
      await handler.Handle(event);
    }

    expect(repo.ObterPatrimonio).toHaveBeenCalledTimes(9);
  });

  it("is registered for all events (eventName = '*')", () => {
    const repo = createRepo();
    const handler = new FinancialEventRegisteredHandler(repo);

    expect(handler.eventName).toBe("*");
  });
});
