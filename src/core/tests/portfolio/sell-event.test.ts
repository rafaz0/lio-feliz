import { describe, it, expect } from "vitest";
import { SellEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("SellEvent", () => {
  describe("creation", () => {
    it("creates a sell event with given properties", () => {
      const event = new SellEvent("portfolio-1", "corr-1", "PETR4", 50, 30.0);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.quantity).toBe(50);
      expect(event.price).toBe(30.0);
    });

    it("sets type to SELL", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(event.type).toBe(FinancialEventType.SELL);
    });

    it("computes totalCost as quantity * price", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(event.totalCost).toBe(1500);
    });

    it("propagates type to eventName", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(event.eventName).toBe(FinancialEventType.SELL);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      const b = new SellEvent("p1", "c2", "VALE3", 30, 65.0);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 30.0);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles zero quantity", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 0, 30.0);
      expect(event.quantity).toBe(0);
      expect(event.totalCost).toBe(0);
    });

    it("handles zero price", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 50, 0);
      expect(event.price).toBe(0);
      expect(event.totalCost).toBe(0);
    });

    it("handles fractional quantities", () => {
      const event = new SellEvent("p1", "c1", "PETR4", 10.5, 30.0);
      expect(event.totalCost).toBe(315);
    });
  });
});
