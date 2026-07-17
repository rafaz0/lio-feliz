import { describe, it, expect } from "vitest";
import { FinancialEvent, FinancialEventType } from "@/core/domain/portfolio";

class TestFinancialEvent extends FinancialEvent {
  constructor(
    aggregateId: string,
    correlationId: string,
    type: FinancialEventType,
    public readonly amount: number,
  ) {
    super(aggregateId, correlationId, type);
    this.finalize();
  }
}

describe("FinancialEvent", () => {
  describe("creation", () => {
    it("creates an event with given aggregateId, correlationId and type", () => {
      const event = new TestFinancialEvent("portfolio-1", "corr-1", FinancialEventType.BUY, 100);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.type).toBe(FinancialEventType.BUY);
    });

    it("preserves custom data from subclass", () => {
      const event = new TestFinancialEvent("portfolio-1", "corr-1", FinancialEventType.SELL, 200);
      expect(event.amount).toBe(200);
    });

    it("propagates type to eventName", () => {
      const event = new TestFinancialEvent(
        "portfolio-1",
        "corr-1",
        FinancialEventType.DIVIDEND,
        50,
      );
      expect(event.eventName).toBe(FinancialEventType.DIVIDEND);
    });

    it("accepts all FinancialEventType values", () => {
      const types = Object.values(FinancialEventType);
      for (const type of types) {
        const event = new TestFinancialEvent("p1", "c1", type, 0);
        expect(event.type).toBe(type);
      }
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new TestFinancialEvent("p1", "c1", FinancialEventType.BUY, 100);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new TestFinancialEvent("p1", "c1", FinancialEventType.BUY, 100);
      const b = new TestFinancialEvent("p1", "c2", FinancialEventType.SELL, 200);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically", () => {
      const before = new Date(Date.now() - 100);
      const event = new TestFinancialEvent("p1", "c1", FinancialEventType.BUY, 100);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new TestFinancialEvent("p1", "c1", FinancialEventType.BUY, 100);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new TestFinancialEvent("p1", "c1", FinancialEventType.BUY, 100);
      expect(() => {
        (event as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });
});
