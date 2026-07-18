import { describe, it, expect } from "vitest";
import {
  PortfolioHistoryCalculator,
  PortfolioProjector,
  BuyEvent,
  SellEvent,
  DividendEvent,
} from "@/core/domain/portfolio";

describe("PortfolioHistoryCalculator", () => {
  const calculator = new PortfolioHistoryCalculator();

  describe("empty events", () => {
    it("returns history with no snapshots", () => {
      const history = calculator.calculate([]);
      expect(history.snapshots).toEqual([]);
      expect(history.totalEvents).toBe(0);
    });
  });

  describe("single event", () => {
    it("creates one snapshot for one buy", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 25);
      const history = calculator.calculate([buy]);
      expect(history.totalEvents).toBe(1);
      expect(history.snapshots).toHaveLength(1);
      expect(history.snapshots[0].eventIndex).toBe(0);
      expect(history.snapshots[0].eventType).toBe(buy.type);
      expect(history.snapshots[0].totalInvested).toBe(2500);
      expect(history.snapshots[0].assetCount).toBe(1);
    });
  });

  describe("multiple events", () => {
    it("creates snapshots for each event in order", () => {
      const e1 = new BuyEvent("p1", "c1", "PETR4", 100, 25);
      const e2 = new BuyEvent("p1", "c2", "VALE3", 50, 60);
      const e3 = new SellEvent("p1", "c3", "PETR4", 30, 27);
      const history = calculator.calculate([e1, e2, e3]);
      expect(history.totalEvents).toBe(3);
      expect(history.snapshots).toHaveLength(3);

      expect(history.snapshots[0].totalInvested).toBe(2500);
      expect(history.snapshots[0].assetCount).toBe(1);

      expect(history.snapshots[1].totalInvested).toBe(2500 + 3000);
      expect(history.snapshots[1].assetCount).toBe(2);

      expect(history.snapshots[2].totalInvested).toBe(1750 + 3000);
      expect(history.snapshots[2].assetCount).toBe(2);
    });
  });

  describe("dividend impact on history", () => {
    it("reflects cost reduction after dividend", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 20);
      const div = new DividendEvent("p1", "c2", "PETR4", 100, 5);
      const history = calculator.calculate([buy, div]);
      expect(history.snapshots[0].totalInvested).toBe(2000);
      expect(history.snapshots[1].totalInvested).toBe(1500);
    });
  });

  describe("snapshot structure", () => {
    it("preserves positions in each snapshot", () => {
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 25);
      const history = calculator.calculate([buy]);
      const snapshot = history.snapshots[0];
      expect(snapshot.positions).toHaveLength(1);
      expect(snapshot.positions[0].getQuantity().getValue()).toBe(100);
      expect(snapshot.positions[0].getTotalCost().getValue()).toBe(2500);
    });
  });
});
