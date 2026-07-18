import { describe, it, expect } from "vitest";
import {
  PerformanceCalculator,
  BuyEvent,
  PortfolioProjector,
} from "@/core/domain/portfolio";

function project(...buys: { assetId: string; quantity: number; price: number }[]) {
  const projector = new PortfolioProjector();
  const events = buys.map(
    (b, i) => new BuyEvent("p1", `c${i}`, b.assetId, b.quantity, b.price),
  );
  return projector.project(events);
}

describe("PerformanceCalculator", () => {
  const calculator = new PerformanceCalculator();

  describe("empty portfolio", () => {
    it("returns zero metrics for empty positions", () => {
      const report = calculator.calculate([]);
      expect(report.assetCount).toBe(0);
      expect(report.totalInvested.getValue()).toBe(0);
      expect(report.totalCurrentCost.getValue()).toBe(0);
      expect(report.weightedAvgCost).toBe(0);
      expect(report.concentrationIndex).toBe(0);
      expect(report.assets).toEqual([]);
    });
  });

  describe("single asset", () => {
    it("reports single asset performance", () => {
      const positions = project({ assetId: "PETR4", quantity: 100, price: 25 });
      const report = calculator.calculate(positions);
      expect(report.assetCount).toBe(1);
      expect(report.totalInvested.getValue()).toBe(2500);
      expect(report.weightedAvgCost).toBe(25);
      expect(report.concentrationIndex).toBe(1);
      expect(report.assets[0].weight).toBe(100);
    });
  });

  describe("multiple assets", () => {
    it("calculates diversification metrics", () => {
      const positions = project(
        { assetId: "A", quantity: 10, price: 100 },
        { assetId: "B", quantity: 20, price: 50 },
      );
      const report = calculator.calculate(positions);
      expect(report.assetCount).toBe(2);
      expect(report.totalInvested.getValue()).toBe(2000);
      expect(report.weightedAvgCost).toBe(66.67);
      expect(report.concentrationIndex).toBe(0.5);
    });

    it("higher concentration index for less diversified portfolio", () => {
      const balanced = calculator.calculate(
        project(
          { assetId: "A", quantity: 10, price: 100 },
          { assetId: "B", quantity: 10, price: 100 },
          { assetId: "C", quantity: 10, price: 100 },
          { assetId: "D", quantity: 10, price: 100 },
        ),
      );
      const concentrated = calculator.calculate(
        project(
          { assetId: "A", quantity: 70, price: 100 },
          { assetId: "B", quantity: 10, price: 100 },
          { assetId: "C", quantity: 10, price: 100 },
          { assetId: "D", quantity: 10, price: 100 },
        ),
      );
      expect(concentrated.concentrationIndex).toBeGreaterThan(balanced.concentrationIndex);
    });
  });

  describe("deterministic", () => {
    it("produces same result for same input", () => {
      const positions = project(
        { assetId: "PETR4", quantity: 100, price: 25 },
        { assetId: "VALE3", quantity: 50, price: 60 },
      );
      const a = calculator.calculate(positions);
      const b = calculator.calculate(positions);
      expect(a.totalInvested.getValue()).toBe(b.totalInvested.getValue());
      expect(a.concentrationIndex).toBe(b.concentrationIndex);
      expect(a.weightedAvgCost).toBe(b.weightedAvgCost);
    });
  });
});
