import { describe, it, expect } from "vitest";
import { BonusEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("BonusEvent", () => {
  describe("creation", () => {
    it("creates a bonus event with given properties", () => {
      const event = new BonusEvent("portfolio-1", "corr-1", "PETR4", 100, 0.10);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.sharesHeld).toBe(100);
      expect(event.bonusRatio).toBe(0.10);
    });

    it("sets type to BONUS", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(event.type).toBe(FinancialEventType.BONUS);
    });

    it("computes bonusShares as sharesHeld * bonusRatio", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(event.bonusShares).toBe(10);
    });

    it("propagates type to eventName", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(event.eventName).toBe(FinancialEventType.BONUS);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      const b = new BonusEvent("p1", "c2", "VALE3", 50, 0.05);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0.10);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles zero shares held", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 0, 0.10);
      expect(event.sharesHeld).toBe(0);
      expect(event.bonusShares).toBe(0);
    });

    it("handles zero bonus ratio", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 100, 0);
      expect(event.bonusRatio).toBe(0);
      expect(event.bonusShares).toBe(0);
    });

    it("handles fractional bonus", () => {
      const event = new BonusEvent("p1", "c1", "PETR4", 10, 0.333);
      expect(event.bonusShares).toBe(3.33);
    });
  });
});
