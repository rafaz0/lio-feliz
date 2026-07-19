import { describe, it, expect } from "vitest";
import { BuyEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("BuyEvent", () => {
  describe("creation", () => {
    it("creates a buy event with given properties", () => {
      const event = new BuyEvent("portfolio-1", "corr-1", "PETR4", 100, 25.5);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.quantity).toBe(100);
      expect(event.price).toBe(25.5);
    });

    it("sets type to BUY", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(event.type).toBe(FinancialEventType.BUY);
    });

    it("computes totalCost as quantity * price", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(event.totalCost).toBe(2550);
    });

    it("propagates type to eventName", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(event.eventName).toBe(FinancialEventType.BUY);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      const b = new BuyEvent("p1", "c2", "VALE3", 50, 60.0);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 25.5);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles zero quantity", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 0, 25.5);
      expect(event.quantity).toBe(0);
      expect(event.totalCost).toBe(0);
    });

    it("handles zero price", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 100, 0);
      expect(event.price).toBe(0);
      expect(event.totalCost).toBe(0);
    });

    it("handles fractional quantities", () => {
      const event = new BuyEvent("p1", "c1", "PETR4", 10.5, 25.5);
      expect(event.totalCost).toBe(267.75);
    });
  });
});
