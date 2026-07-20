import { describe, it, expect } from "vitest";
import { RebalancingService } from "@/core/domain/rebalancing/rebalancing-service";
import {
  AllocationTarget,
  AllocationTargetCollection,
  normalisePercentages,
} from "@/core/domain/rebalancing/allocation-target";
import {
  NoAllocationTargetsError,
  NoPositionsForRebalancingError,
  InvalidAllocationPercentageError,
  AllocationTotalMustSum100Error,
} from "@/core/domain/rebalancing/errors";

describe("RebalancingService", () => {
  const service = new RebalancingService();

  describe("calculateCurrentAllocation", () => {
    it("calculates allocation from positions", () => {
      const positions = [
        { className: "stock", value: 6000 },
        { className: "fii", value: 3000 },
        { className: "etf", value: 1000 },
      ];
      const result = service.calculateCurrentAllocation(positions);
      expect(result.totalValue).toBe(10000);
      expect(result.allocations).toHaveLength(3);
      expect(result.allocations[0].className).toBe("stock");
      expect(result.allocations[0].percentage).toBe(60);
    });

    it("returns empty when no positions", () => {
      const result = service.calculateCurrentAllocation([]);
      expect(result.totalValue).toBe(0);
      expect(result.allocations).toHaveLength(0);
    });
  });

  describe("calculateDifferences", () => {
    it("calculates correct differences", () => {
      const current = [
        { className: "stock", percentage: 60, value: 6000 },
        { className: "fii", percentage: 30, value: 3000 },
        { className: "etf", percentage: 10, value: 1000 },
      ];
      const targets = [
        new AllocationTarget("stock", 50),
        new AllocationTarget("fii", 30),
        new AllocationTarget("etf", 20),
      ];
      const diffs = service.calculateDifferences(current, targets, 5);
      expect(diffs).toHaveLength(3);
      expect(diffs.find((d) => d.className === "stock")?.difference).toBe(10);
      expect(diffs.find((d) => d.className === "stock")?.withinTolerance).toBe(false);
      expect(diffs.find((d) => d.className === "fii")?.difference).toBe(0);
      expect(diffs.find((d) => d.className === "fii")?.withinTolerance).toBe(true);
      expect(diffs.find((d) => d.className === "etf")?.difference).toBe(-10);
      expect(diffs.find((d) => d.className === "etf")?.withinTolerance).toBe(false);
    });

    it("includes extra classes not in targets", () => {
      const current = [
        { className: "stock", percentage: 70, value: 7000 },
        { className: "crypto", percentage: 30, value: 3000 },
      ];
      const targets = [new AllocationTarget("stock", 100)];
      const diffs = service.calculateDifferences(current, targets, 5);
      expect(diffs).toHaveLength(2);
      expect(diffs.find((d) => d.className === "crypto")?.withinTolerance).toBe(false);
    });
  });

  describe("generateProposal", () => {
    it("generates proposal with contribution-based suggestions", () => {
      const current = [
        { className: "stock", percentage: 60, value: 6000 },
        { className: "fii", percentage: 30, value: 3000 },
        { className: "etf", percentage: 10, value: 1000 },
      ];
      const proposal = service.generateProposal(current, { stock: 50, fii: 30, etf: 20 }, 5, 2000);
      expect(proposal.needsRebalancing).toBe(true);
      expect(proposal.method).toBe("by_contribution");
      expect(proposal.totalPortfolioValue).toBe(10000);
      const etfSuggestion = proposal.suggestions.find((s) => s.className === "etf");
      expect(etfSuggestion?.action).toBe("APORTE");
      expect(etfSuggestion!.suggestedValue).toBeGreaterThan(0);
    });

    it("generates proposal with sell-based suggestions when no contribution", () => {
      const current = [
        { className: "stock", percentage: 60, value: 6000 },
        { className: "fii", percentage: 30, value: 3000 },
        { className: "etf", percentage: 10, value: 1000 },
      ];
      const proposal = service.generateProposal(current, { stock: 50, fii: 30, etf: 20 }, 5);
      expect(proposal.needsRebalancing).toBe(true);
      expect(proposal.method).toBe("by_sell");
      const stockSuggestion = proposal.suggestions.find((s) => s.className === "stock");
      expect(stockSuggestion?.action).toBe("VENDER");
    });

    it("throws when no targets", () => {
      expect(() => service.generateProposal([], {}, 5)).toThrow(NoAllocationTargetsError);
    });

    it("throws when no positions", () => {
      expect(() => service.generateProposal([], { stock: 100 }, 5)).toThrow(
        NoPositionsForRebalancingError,
      );
    });

    it("throws on invalid tolerance", () => {
      expect(() =>
        service.generateProposal(
          [{ className: "stock", percentage: 100, value: 1000 }],
          { stock: 100 },
          25,
        ),
      ).toThrow();
    });
  });

  describe("checkNeedsRebalancing", () => {
    it("returns false when within tolerance", () => {
      const current = [
        { className: "stock", percentage: 51, value: 5100 },
        { className: "fii", percentage: 49, value: 4900 },
      ];
      const targets = [new AllocationTarget("stock", 50), new AllocationTarget("fii", 50)];
      expect(service.checkNeedsRebalancing(current, targets, 5)).toBe(false);
    });

    it("returns true when outside tolerance", () => {
      const current = [
        { className: "stock", percentage: 60, value: 6000 },
        { className: "fii", percentage: 40, value: 4000 },
      ];
      const targets = [new AllocationTarget("stock", 50), new AllocationTarget("fii", 50)];
      expect(service.checkNeedsRebalancing(current, targets, 5)).toBe(true);
    });
  });
});

describe("AllocationTarget", () => {
  it("creates valid target", () => {
    const target = new AllocationTarget("stock", 50);
    expect(target.className).toBe("stock");
    expect(target.percentage).toBe(50);
  });

  it("rejects invalid percentage", () => {
    expect(() => new AllocationTarget("stock", 150)).toThrow(InvalidAllocationPercentageError);
    expect(() => new AllocationTarget("stock", -10)).toThrow(InvalidAllocationPercentageError);
  });
});

describe("AllocationTargetCollection", () => {
  it("creates valid collection", () => {
    const collection = new AllocationTargetCollection([
      new AllocationTarget("stock", 60),
      new AllocationTarget("fii", 40),
    ]);
    expect(collection.targets).toHaveLength(2);
  });

  it("rejects collection not summing to 100", () => {
    expect(
      () =>
        new AllocationTargetCollection([
          new AllocationTarget("stock", 50),
          new AllocationTarget("fii", 30),
        ]),
    ).toThrow(AllocationTotalMustSum100Error);
  });

  it("finds target by class name", () => {
    const collection = new AllocationTargetCollection([
      new AllocationTarget("stock", 60),
      new AllocationTarget("fii", 40),
    ]);
    expect(collection.getTargetForClass("stock")?.percentage).toBe(60);
    expect(collection.getTargetForClass("crypto")).toBeUndefined();
  });

  it("checks class inclusion", () => {
    const collection = new AllocationTargetCollection([new AllocationTarget("stock", 100)]);
    expect(collection.includesClass("stock")).toBe(true);
    expect(collection.includesClass("fii")).toBe(false);
  });
});

describe("normalisePercentages", () => {
  it("returns same when already summing 100", () => {
    const result = normalisePercentages({ stock: 60, fii: 40 });
    expect(result.stock).toBe(60);
    expect(result.fii).toBe(40);
  });

  it("normalises when not summing 100", () => {
    const result = normalisePercentages({ stock: 50, fii: 30 });
    const sum = Object.values(result).reduce((s, v) => s + v, 0);
    expect(Math.abs(sum - 100)).toBeLessThanOrEqual(0.01);
  });
});
