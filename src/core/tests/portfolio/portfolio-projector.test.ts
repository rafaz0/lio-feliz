import { describe, it, expect } from "vitest";
import {
  PortfolioProjector,
  BuyEvent,
  SellEvent,
  DividendEvent,
  JcpEvent,
  BonusEvent,
  SplitEvent,
  GroupingEvent,
  AmortizationEvent,
  AdjustmentEvent,
  Position,
} from "@/core/domain/portfolio";

function projection(events: Parameters<PortfolioProjector["project"]>[0]) {
  const projector = new PortfolioProjector();
  return projector.project(events);
}

function findPosition(positions: Position[], ticker: string): Position | undefined {
  return positions.find((p) => p.getTicker().getValue() === ticker);
}

describe("PortfolioProjector", () => {
  describe("empty", () => {
    it("projects empty events to empty positions", () => {
      const positions = projection([]);
      expect(positions).toEqual([]);
    });
  });

  describe("BuyEvent", () => {
    it("creates a position with correct quantity and cost", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.50);
      const positions = projection([event]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(2550);
      expect(pos.getAvgCost().getValue()).toBe(25.50);
    });

    it("accumulates multiple buys of the same asset", () => {
      const e1 = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const e2 = new BuyEvent("p1", "c2", "PETR4", 50, 30);
      const positions = projection([e1, e2]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(150);
      expect(pos.getTotalCost().getValue()).toBe(3500);
      expect(pos.getAvgCost().getValue()).toBe(23.33);
    });

    it("tracks multiple assets independently", () => {
      const e1 = new BuyEvent("p1", "c1", "PETR4", 100, 25);
      const e2 = new BuyEvent("p1", "c2", "VALE3", 50, 60);
      const positions = projection([e1, e2]);
      expect(positions).toHaveLength(2);
      expect(findPosition(positions, "PETR4")!.getTotalCost().getValue()).toBe(2500);
      expect(findPosition(positions, "VALE3")!.getTotalCost().getValue()).toBe(3000);
    });
  });

  describe("SellEvent", () => {
    it("reduces quantity and cost proportionally", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const sell = new SellEvent("p1", "c2", "PETR4", 40, 25);
      const positions = projection([buy, sell]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(60);
      expect(pos.getTotalCost().getValue()).toBe(1200);
      expect(pos.getAvgCost().getValue()).toBe(20);
    });

    it("resets cost to zero when selling all shares", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const sell = new SellEvent("p1", "c2", "PETR4", 100, 25);
      const positions = projection([buy, sell]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(0);
      expect(pos.getTotalCost().getValue()).toBe(0);
    });
  });

  describe("DividendEvent", () => {
    it("reduces totalCost by totalAmount", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const div = new DividendEvent("p1", "c2", "PETR4", 100, 2);
      const positions = projection([buy, div]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(1800);
      expect(pos.getAvgCost().getValue()).toBe(18);
    });
  });

  describe("JcpEvent", () => {
    it("reduces totalCost by totalAmount like dividend", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const jcp = new JcpEvent("p1", "c2", "PETR4", 100, 1.50);
      const positions = projection([buy, jcp]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(1850);
      expect(pos.getAvgCost().getValue()).toBe(18.50);
    });
  });

  describe("BonusEvent", () => {
    it("increases quantity by bonus shares", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const bonus = new BonusEvent("p1", "c2", "PETR4", 100, 0.10);
      const positions = projection([buy, bonus]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(110);
      expect(pos.getTotalCost().getValue()).toBe(2000);
      expect(pos.getAvgCost().getValue()).toBe(18.18);
    });
  });

  describe("SplitEvent", () => {
    it("multiplies quantity by split factor", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const split = new SplitEvent("p1", "c2", "PETR4", 100, 200);
      const positions = projection([buy, split]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(200);
      expect(pos.getTotalCost().getValue()).toBe(2000);
      expect(pos.getAvgCost().getValue()).toBe(10);
    });
  });

  describe("GroupingEvent", () => {
    it("divides quantity by grouping factor", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 1000, 20);
      const group = new GroupingEvent("p1", "c2", "PETR4", 1000, 100);
      const positions = projection([buy, group]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(20000);
      expect(pos.getAvgCost().getValue()).toBe(200);
    });
  });

  describe("AmortizationEvent", () => {
    it("reduces totalCost by amortization amount", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const amort = new AmortizationEvent("p1", "c2", "PETR4", 100, 2);
      const positions = projection([buy, amort]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(1800);
      expect(pos.getAvgCost().getValue()).toBe(18);
    });
  });

  describe("AdjustmentEvent", () => {
    it("increases totalCost by positive adjustment", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const adj = new AdjustmentEvent("p1", "c2", "PETR4", 100, 500, "correcao");
      const positions = projection([buy, adj]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getTotalCost().getValue()).toBe(2500);
    });

    it("decreases totalCost by negative adjustment", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const adj = new AdjustmentEvent("p1", "c2", "PETR4", 100, -300, "ajuste");
      const positions = projection([buy, adj]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getTotalCost().getValue()).toBe(1700);
    });
  });

  describe("multi-event sequence", () => {
    it("reconstructs full portfolio state", () => {
      const events = [
        new BuyEvent("p1", "c1", "PETR4", 100, 25.50),
        new BuyEvent("p1", "c2", "VALE3", 200, 60),
        new DividendEvent("p1", "c3", "PETR4", 100, 2),
        new BuyEvent("p1", "c4", "PETR4", 50, 30),
        new SellEvent("p1", "c5", "VALE3", 50, 65),
        new JcpEvent("p1", "c6", "PETR4", 150, 1),
        new BonusEvent("p1", "c7", "PETR4", 150, 0.05),
      ];

      const positions = projection(events);
      expect(positions).toHaveLength(2);

      const petr4 = findPosition(positions, "PETR4")!;
      expect(petr4.getQuantity().getValue()).toBe(157.5);
      expect(petr4.getTotalCost().getValue()).toBe(3700);
      expect(petr4.getAvgCost().getValue()).toBe(23.49);

      const vale3 = findPosition(positions, "VALE3")!;
      expect(vale3.getQuantity().getValue()).toBe(150);
      expect(vale3.getTotalCost().getValue()).toBe(9000);
      expect(vale3.getAvgCost().getValue()).toBe(60);
    });

    it("preserves event order (buy before sell)", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const sell = new SellEvent("p1", "c2", "PETR4", 30, 22);
      const positions = projection([buy, sell]);
      expect(findPosition(positions, "PETR4")!.getQuantity().getValue()).toBe(70);
    });

    it("handles sell before buy (negative quantity)", () => {
      const sell = new SellEvent("p1", "c1", "PETR4", 100, 20);
      const buy = new BuyEvent("p1", "c2", "PETR4", 200, 25);
      const positions = projection([sell, buy]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(5000);
    });

    it("handles dividends exceeding cost basis", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 10);
      const div1 = new DividendEvent("p1", "c2", "PETR4", 100, 6);
      const div2 = new DividendEvent("p1", "c3", "PETR4", 100, 6);
      const positions = projection([buy, div1, div2]);
      const pos = findPosition(positions, "PETR4")!;
      expect(pos.getQuantity().getValue()).toBe(100);
      expect(pos.getTotalCost().getValue()).toBe(-200);
    });

    it("applies all corporate event types", () => {
      const events = [
        new BuyEvent("p1", "c1", "TEST4", 1000, 10),
        new SplitEvent("p1", "c2", "TEST4", 1000, 2000),
        new BonusEvent("p1", "c3", "TEST4", 2000, 0.50),
        new GroupingEvent("p1", "c4", "TEST4", 3000, 1000),
        new AmortizationEvent("p1", "c5", "TEST4", 1000, 3),
        new AdjustmentEvent("p1", "c6", "TEST4", 1000, 200, "correcao"),
      ];

      const positions = projection(events);
      const pos = findPosition(positions, "TEST4")!;
      expect(pos.getQuantity().getValue()).toBe(1000);
      expect(pos.getTotalCost().getValue()).toBe(7200);
    });
  });
});
