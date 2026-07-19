import { describe, it, expect } from "vitest";
import {
  Portfolio,
  PortfolioProjector,
  AssetAllocationCalculator,
  PerformanceCalculator,
  PortfolioHistoryCalculator,
  WealthProjectionCalculator,
  BuyEvent,
  SellEvent,
  DividendEvent,
  JcpEvent,
  BonusEvent,
  SplitEvent,
  GroupingEvent,
  AmortizationEvent,
  AdjustmentEvent,
} from "@/core/domain/portfolio";
import { PortfolioId } from "@/core/domain";

describe("EWO-002 Consolidation — Full Lifecycle", () => {
  it("complete cycle: events → portfolio → projection → analytics", () => {
    const pid = PortfolioId.create("p1");
    const portfolio = Portfolio.create(pid);

    const events = [
      new BuyEvent("p1", "c1", "PETR4", 100, 25),
      new SellEvent("p1", "c2", "PETR4", 30, 27),
      new BuyEvent("p1", "c3", "VALE3", 50, 60),
      new DividendEvent("p1", "c4", "PETR4", 70, 2),
      new JcpEvent("p1", "c5", "PETR4", 70, 1.5),
      new BonusEvent("p1", "c6", "PETR4", 70, 0.1),
      new BuyEvent("p1", "c7", "ITUB4", 200, 30),
      new AdjustmentEvent("p1", "c8", "PETR4", 77, 100, "correcao"),
    ];

    for (const ev of events) {
      expect(portfolio.applyEvent(ev).isSuccess).toBe(true);
    }

    const projector = new PortfolioProjector();
    const positions = projector.project(portfolio.financialEvents);
    expect(positions.length).toBeGreaterThan(0);

    const petr4 = positions.find((p) => p.getTicker().getValue() === "PETR4")!;
    expect(petr4.getQuantity().getValue()).toBeGreaterThan(0);

    const allocation = new AssetAllocationCalculator().calculate(positions);
    expect(allocation.assetCount).toBe(3);

    const performance = new PerformanceCalculator().calculate(positions);
    expect(performance.assetCount).toBe(3);

    const history = new PortfolioHistoryCalculator().calculate(portfolio.financialEvents);
    expect(history.totalEvents).toBe(8);
    expect(history.snapshots).toHaveLength(8);

    const wealth = new WealthProjectionCalculator().calculate(
      positions,
      allocation,
      performance,
      portfolio.financialEvents,
    );
    expect(wealth.assetCount).toBe(3);
    expect(wealth.eventSummary.length).toBeGreaterThanOrEqual(4);
  });

  it("I-003: event stream is source of truth", () => {
    const events = [
      new BuyEvent("p1", "c1", "PETR4", 100, 25),
      new BuyEvent("p1", "c2", "VALE3", 50, 60),
    ];
    const positions = new PortfolioProjector().project(events);
    expect(positions).toHaveLength(2);
    expect(positions[0].getTotalCost().getValue()).toBe(2500);
  });

  it("I-004: portfolios are independent", () => {
    const p1Pos = new PortfolioProjector().project([new BuyEvent("p1", "c1", "PETR4", 100, 25)]);
    const p2Pos = new PortfolioProjector().project([new BuyEvent("p2", "c2", "VALE3", 50, 60)]);
    expect(p1Pos[0].getTicker().getValue()).toBe("PETR4");
    expect(p2Pos[0].getTicker().getValue()).toBe("VALE3");
  });

  it("I-005: every event has identifiable origin", () => {
    const ev = new BuyEvent("p1", "c1", "PETR4", 100, 25);
    expect(ev.correlationId).toBe("c1");
    expect(ev.aggregateId).toBe("p1");
    expect(ev.occurredOn).toBeInstanceOf(Date);
  });

  it("I-007: adjustment preserves traceability", () => {
    const adj = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
    expect(adj.description).toBe("correcao");
    expect(adj.correlationId).toBe("c1");
  });

  it("I-008: projected total matches events", () => {
    const events = [
      new BuyEvent("p1", "c1", "PETR4", 100, 25),
      new BuyEvent("p1", "c2", "VALE3", 50, 60),
    ];
    const positions = new PortfolioProjector().project(events);
    const total = positions.reduce((s, p) => s + p.getTotalCost().getValue(), 0);
    expect(total).toBe(5500);
  });

  it("I-009: rebuild produces identical result", () => {
    const events = [
      new BuyEvent("p1", "c1", "PETR4", 100, 25),
      new SellEvent("p1", "c2", "PETR4", 30, 27),
    ];
    const projector = new PortfolioProjector();
    const r1 = projector.project(events);
    const r2 = projector.project(events);
    expect(r1[0].getQuantity().getValue()).toBe(r2[0].getQuantity().getValue());
  });

  it("I-010: projections cannot modify domain state", () => {
    const events = [new BuyEvent("p1", "c1", "PETR4", 100, 25)];
    const positions = new PortfolioProjector().project(events);
    expect(positions).toHaveLength(1);
    expect(events).toHaveLength(1);
  });

  it("I-013: analytics are read-only (frozen)", () => {
    const events = [new BuyEvent("p1", "c1", "PETR4", 100, 25)];
    const positions = new PortfolioProjector().project(events);
    const allocation = new AssetAllocationCalculator().calculate(positions);
    expect(Object.isFrozen(allocation)).toBe(true);
  });
});
