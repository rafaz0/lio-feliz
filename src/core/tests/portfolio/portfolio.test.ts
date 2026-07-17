import { describe, it, expect, vi, afterEach } from "vitest";
import { Portfolio, BuyEvent } from "@/core/domain/portfolio";
import { PortfolioId, Result, DomainError } from "@/core/domain";

function createPortfolio(id = "00000000-0000-7000-8000-000000000001"): Portfolio {
  return Portfolio.create(PortfolioId.create(id));
}

function makeBuyEvent(
  aggregateId: string,
  assetId: string,
  quantity = 100,
  price = 10,
  correlationId = "corr-1",
): BuyEvent {
  return new BuyEvent(aggregateId, correlationId, assetId, quantity, price);
}

describe("Portfolio", () => {
  afterEach(() => {
    vi.useRealTimers();
  });
  describe("creation", () => {
    it("creates a portfolio with the given id", () => {
      const id = PortfolioId.create("00000000-0000-7000-8000-000000000001");
      const portfolio = Portfolio.create(id);
      expect(portfolio.id.equals(id)).toBe(true);
    });

    it("starts with no financial events", () => {
      const portfolio = createPortfolio();
      expect(portfolio.financialEvents).toEqual([]);
    });

    it("starts with no pending domain events", () => {
      const portfolio = createPortfolio();
      expect(portfolio.getDomainEvents()).toEqual([]);
    });
  });

  describe("equality", () => {
    it("equals another portfolio with the same id", () => {
      const a = createPortfolio();
      const b = createPortfolio();
      expect(a.equals(b)).toBe(true);
    });

    it("does not equal a portfolio with a different id", () => {
      const a = createPortfolio("00000000-0000-7000-8000-000000000001");
      const b = createPortfolio("00000000-0000-7000-8000-000000000002");
      expect(a.equals(b)).toBe(false);
    });

    it("events do not affect equality", () => {
      const a = createPortfolio();
      const b = createPortfolio();
      a.applyEvent(makeBuyEvent(a.id.value, "PETR4"));
      expect(a.equals(b)).toBe(true);
    });
  });

  describe("applyEvent", () => {
    it("applies a valid event", () => {
      const portfolio = createPortfolio();
      const event = makeBuyEvent(portfolio.id.value, "PETR4");
      const result = portfolio.applyEvent(event);
      expect(result.isSuccess).toBe(true);
      expect(portfolio.financialEvents).toHaveLength(1);
      expect(portfolio.financialEvents[0]).toBe(event);
    });

    it("applies multiple events in order", () => {
      const portfolio = createPortfolio();
      const e1 = makeBuyEvent(portfolio.id.value, "PETR4", 100, 10, "corr-1");
      const e2 = makeBuyEvent(portfolio.id.value, "VALE3", 50, 20, "corr-2");
      portfolio.applyEvent(e1);
      portfolio.applyEvent(e2);
      expect(portfolio.financialEvents).toHaveLength(2);
      expect(portfolio.financialEvents[0].correlationId).toBe("corr-1");
      expect(portfolio.financialEvents[1].correlationId).toBe("corr-2");
    });

    it("returns a copy of the financial events array", () => {
      const portfolio = createPortfolio();
      portfolio.applyEvent(makeBuyEvent(portfolio.id.value, "PETR4"));
      const events = portfolio.financialEvents;
      expect(events).toHaveLength(1);
      (events as unknown[]).pop();
      expect(portfolio.financialEvents).toHaveLength(1);
    });
  });

  describe("invariants", () => {
    it("rejects event with mismatched aggregateId (I-001)", () => {
      const portfolio = createPortfolio();
      const event = makeBuyEvent("wrong-portfolio", "PETR4");
      const result = portfolio.applyEvent(event);
      expect(result.isFailure).toBe(true);
      expect(result.error?.code).toBe("PORTFOLIO_EVENT_MISMATCH");
      expect(portfolio.financialEvents).toHaveLength(0);
    });

    it("rejects event out of temporal order (I-006)", () => {
      vi.useFakeTimers();
      const portfolio = createPortfolio();

      vi.setSystemTime(new Date("2026-07-18T12:00:00Z"));
      const later = makeBuyEvent(portfolio.id.value, "PETR4", 100, 10);

      portfolio.applyEvent(later);
      expect(portfolio.financialEvents).toHaveLength(1);

      vi.setSystemTime(new Date("2026-07-17T12:00:00Z"));
      const early = makeBuyEvent(portfolio.id.value, "PETR4", 50, 20);

      const result = portfolio.applyEvent(early);
      expect(result.isFailure).toBe(true);
      expect(result.error?.code).toBe("PORTFOLIO_OUT_OF_ORDER");
      expect(portfolio.financialEvents).toHaveLength(1);
    });

    it("accepts events with same timestamp", () => {
      const portfolio = createPortfolio();
      const e1 = makeBuyEvent(portfolio.id.value, "PETR4", 100, 10, "corr-1");
      const e2 = makeBuyEvent(portfolio.id.value, "VALE3", 50, 20, "corr-2");
      const e3 = makeBuyEvent(portfolio.id.value, "ITUB4", 30, 30, "corr-3");

      portfolio.applyEvent(e1);
      portfolio.applyEvent(e2);
      portfolio.applyEvent(e3);
      expect(portfolio.financialEvents).toHaveLength(3);
    });
  });
});
