import { describe, it, expect } from "vitest";
import {
  WealthProjectionCalculator,
  PortfolioProjector,
  AssetAllocationCalculator,
  PerformanceCalculator,
  BuyEvent,
  DividendEvent,
  Money,
  Ticker,
} from "@/core/domain/portfolio";

describe("WealthProjectionCalculator", () => {
  const calculator = new WealthProjectionCalculator();

  describe("empty portfolio", () => {
    it("returns projection with zeros", () => {
      const allocation = new AssetAllocationCalculator().calculate([]);
      const performance = new PerformanceCalculator().calculate([]);
      const projection = calculator.calculate([], allocation, performance, []);
      expect(projection.totalInvested.getValue()).toBe(0);
      expect(projection.assetCount).toBe(0);
      expect(projection.diversificationIndex).toBe(0);
      expect(projection.allocationSummary).toEqual([]);
      expect(projection.eventSummary).toEqual([]);
    });
  });

  describe("single asset portfolio", () => {
    it("consolidates allocation and event data", () => {
      const projector = new PortfolioProjector();
      const events = [new BuyEvent("p1", "c1", "PETR4", 100, 25)];
      const positions = projector.project(events);
      const allocation = new AssetAllocationCalculator().calculate(positions);
      const performance = new PerformanceCalculator().calculate(positions);

      const projection = calculator.calculate(positions, allocation, performance, events);

      expect(projection.totalInvested.getValue()).toBe(2500);
      expect(projection.assetCount).toBe(1);
      expect(projection.allocationSummary).toHaveLength(1);
      expect(projection.allocationSummary[0].ticker).toBe("PETR4");
      expect(projection.allocationSummary[0].allocation).toBe(100);
      expect(projection.eventSummary).toHaveLength(1);
      expect(projection.eventSummary[0].type).toBe("BUY");
      expect(projection.eventSummary[0].count).toBe(1);
    });
  });

  describe("multi-asset portfolio", () => {
    it("summarizes event counts by type", () => {
      const projector = new PortfolioProjector();
      const events = [
        new BuyEvent("p1", "c1", "PETR4", 100, 25),
        new BuyEvent("p1", "c2", "VALE3", 50, 60),
        new DividendEvent("p1", "c3", "PETR4", 100, 2),
      ];
      const positions = projector.project(events);
      const allocation = new AssetAllocationCalculator().calculate(positions);
      const performance = new PerformanceCalculator().calculate(positions);

      const projection = calculator.calculate(positions, allocation, performance, events);

      expect(projection.totalInvested.getValue()).toBe(5300);
      expect(projection.assetCount).toBe(2);
      expect(projection.eventSummary).toHaveLength(2);
      const buyEntry = projection.eventSummary.find((e) => e.type === "BUY")!;
      expect(buyEntry.count).toBe(2);
      const divEntry = projection.eventSummary.find((e) => e.type === "DIVIDEND")!;
      expect(divEntry.count).toBe(1);
    });
  });
});
