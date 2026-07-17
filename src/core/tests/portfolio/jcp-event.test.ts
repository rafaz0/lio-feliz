import { describe, it, expect } from "vitest";
import { JcpEvent } from "@/core/domain/portfolio";
import { FinancialEventType } from "@/core/domain/portfolio";

describe("JcpEvent", () => {
  describe("creation", () => {
    it("creates a JCP event with given properties", () => {
      const event = new JcpEvent("portfolio-1", "corr-1", "PETR4", 100, 0.85);
      expect(event.aggregateId).toBe("portfolio-1");
      expect(event.correlationId).toBe("corr-1");
      expect(event.assetId).toBe("PETR4");
      expect(event.shares).toBe(100);
      expect(event.amountPerShare).toBe(0.85);
    });

    it("sets type to JCP", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(event.type).toBe(FinancialEventType.JCP);
    });

    it("computes totalAmount as shares * amountPerShare", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(event.totalAmount).toBe(85);
    });

    it("propagates type to eventName", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(event.eventName).toBe(FinancialEventType.JCP);
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      const b = new JcpEvent("p1", "c2", "VALE3", 50, 1.20);
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically to current timestamp", () => {
      const before = new Date(Date.now() - 100);
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0.85);
      expect(() => {
        (event as unknown as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });

  describe("edge cases", () => {
    it("handles zero shares", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 0, 0.85);
      expect(event.shares).toBe(0);
      expect(event.totalAmount).toBe(0);
    });

    it("handles zero amount per share", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 100, 0);
      expect(event.amountPerShare).toBe(0);
      expect(event.totalAmount).toBe(0);
    });

    it("handles fractional shares", () => {
      const event = new JcpEvent("p1", "c1", "PETR4", 10.5, 0.85);
      expect(event.totalAmount).toBeCloseTo(8.925);
    });
  });
});
