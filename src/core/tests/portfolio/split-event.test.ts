import { describe, it, expect } from "vitest";
import { SplitEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("SplitEvent", () => {
  describe("creation", () => {
    it("creates a split event with given properties", () => {
      const event = new SplitEvent("portfolio-1", "corr-1", "PETR4", 100, 200);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.oldQuantity).toBe(100);
      expect(event.newQuantity).toBe(200);
    });

    it("sets type to SPLIT", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(event.type).toBe(FinancialEventType.SPLIT);
    });

    it("computes splitFactor as newQuantity / oldQuantity", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(event.splitFactor).toBe(2);
    });

    it("propagates type to eventName", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(event.eventName).toBe(FinancialEventType.SPLIT);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      const b = new SplitEvent("p1", "c2", "VALE3", 50, 150);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 200);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles one-to-one split (no change)", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 100);
      expect(event.splitFactor).toBe(1);
      expect(event.oldQuantity).toBe(100);
      expect(event.newQuantity).toBe(100);
    });

    it("handles three-to-one split", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 100, 300);
      expect(event.splitFactor).toBe(3);
    });

    it("handles fractional split factor", () => {
      const event = new SplitEvent("p1", "c1", "PETR4", 200, 100);
      expect(event.splitFactor).toBe(0.5);
    });
  });
});
