import { describe, it, expect } from "vitest";
import { GroupingEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("GroupingEvent", () => {
  describe("creation", () => {
    it("creates a grouping event with given properties", () => {
      const event = new GroupingEvent("portfolio-1", "corr-1", "PETR4", 1000, 100);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.oldQuantity).toBe(1000);
      expect(event.newQuantity).toBe(100);
    });

    it("sets type to GROUPING", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(event.type).toBe(FinancialEventType.GROUPING);
    });

    it("computes groupingFactor as oldQuantity / newQuantity", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(event.groupingFactor).toBe(10);
    });

    it("propagates type to eventName", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(event.eventName).toBe(FinancialEventType.GROUPING);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      const b = new GroupingEvent("p1", "c2", "VALE3", 500, 50);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 1000, 100);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles one-to-one grouping (no change)", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 100, 100);
      expect(event.groupingFactor).toBe(1);
      expect(event.oldQuantity).toBe(100);
      expect(event.newQuantity).toBe(100);
    });

    it("handles five-to-one grouping", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 500, 100);
      expect(event.groupingFactor).toBe(5);
    });

    it("handles fractional grouping factor", () => {
      const event = new GroupingEvent("p1", "c1", "PETR4", 100, 200);
      expect(event.groupingFactor).toBe(0.5);
    });
  });
});
