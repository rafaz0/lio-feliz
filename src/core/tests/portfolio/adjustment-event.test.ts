import { describe, it, expect } from "vitest";
import { AdjustmentEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("AdjustmentEvent", () => {
  describe("creation", () => {
    it("creates an adjustment event with given properties", () => {
      const event = new AdjustmentEvent("portfolio-1", "corr-1", "PETR4", 100, 500, "correcao de custo");
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.shares).toBe(100);
      expect(event.amount).toBe(500);
      expect(event.description).toBe("correcao de custo");
    });

    it("sets type to ADJUSTMENT", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      expect(event.type).toBe(FinancialEventType.ADJUSTMENT);
    });

    it("propagates type to eventName", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      expect(event.eventName).toBe(FinancialEventType.ADJUSTMENT);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao a");
      const b = new AdjustmentEvent("p1", "c2", "VALE3", 50, 200, "correcao b");
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "correcao");
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles negative adjustment", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, -200, "ajuste negativo");
      expect(event.amount).toBe(-200);
    });

    it("handles zero adjustment", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 0, "ajuste zero");
      expect(event.amount).toBe(0);
    });

    it("handles empty description", () => {
      const event = new AdjustmentEvent("p1", "c1", "PETR4", 100, 500, "");
      expect(event.description).toBe("");
    });
  });
});
