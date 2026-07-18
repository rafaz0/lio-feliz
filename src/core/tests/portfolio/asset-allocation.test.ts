import { describe, it, expect } from "vitest";
import {
  AssetAllocationCalculator,
  BuyEvent,
  DividendEvent,
  PortfolioProjector,
} from "@/core/domain/portfolio";

function project(...buys: { assetId: string; quantity: number; price: number }[]) {
  const projector = new PortfolioProjector();
  const events = buys.map(
    (b, i) => new BuyEvent("p1", `c${i}`, b.assetId, b.quantity, b.price),
  );
  return projector.project(events);
}

describe("AssetAllocationCalculator", () => {
  const calculator = new AssetAllocationCalculator();

  describe("empty portfolio", () => {
    it("returns empty report for no positions", () => {
      const report = calculator.calculate([]);
      expect(report.assetCount).toBe(0);
      expect(report.totalInvested.getValue()).toBe(0);
      expect(report.items).toEqual([]);
    });
  });

  describe("single asset", () => {
    it("allocates 100% to the only asset", () => {
      const positions = project({ assetId: "PETR4", quantity: 100, price: 25 });
      const report = calculator.calculate(positions);
      expect(report.assetCount).toBe(1);
      expect(report.totalInvested.getValue()).toBe(2500);
      expect(report.items[0].allocation).toBe(100);
      expect(report.items[0].ticker.getValue()).toBe("PETR4");
    });
  });

  describe("multiple assets", () => {
    it("calculates proportional allocation", () => {
      const positions = project(
        { assetId: "PETR4", quantity: 100, price: 25 },
        { assetId: "VALE3", quantity: 50, price: 60 },
        { assetId: "ITUB4", quantity: 200, price: 30 },
      );
      const report = calculator.calculate(positions);
      expect(report.assetCount).toBe(3);
      expect(report.totalInvested.getValue()).toBe(2500 + 3000 + 6000);
      expect(report.items[0].allocation).toBe(21.74);
      expect(report.items[1].allocation).toBe(26.09);
      expect(report.items[2].allocation).toBe(52.17);
    });

    it("percentages sum to approximately 100", () => {
      const positions = project(
        { assetId: "A", quantity: 10, price: 100 },
        { assetId: "B", quantity: 20, price: 50 },
        { assetId: "C", quantity: 30, price: 33.33 },
      );
      const report = calculator.calculate(positions);
      const total = report.items.reduce((s, i) => s + i.allocation, 0);
      expect(total).toBeGreaterThan(99);
      expect(total).toBeLessThan(101);
    });
  });

  describe("edge cases", () => {
    it("handles zero-cost position after dividends", () => {
      const projector = new PortfolioProjector();
      const buy = new BuyEvent("p1", "c1", "PETR4", 100, 10);
      const div = new DividendEvent("p1", "c2", "PETR4", 100, 10);
      const positions = projector.project([buy, div]);
      const report = calculator.calculate(positions);
      expect(report.totalInvested.getValue()).toBe(0);
      expect(report.items[0].allocation).toBe(0);
    });
  });
});
