import { describe, it, expect } from "vitest";
import { DomainEvent } from "@/core/domain";

class TestEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    correlationId: string,
    public readonly data: string,
  ) {
    super(aggregateId, correlationId, "TEST_EVENT");
    this.finalize();
  }
}

class CustomNameEvent extends DomainEvent {
  constructor(aggregateId: string, correlationId: string) {
    super(aggregateId, correlationId);
    this.finalize();
  }
}

describe("DomainEvent", () => {
  describe("creation", () => {
    it("creates an event with given aggregateId and correlationId", () => {
      const event = new TestEvent("agg-1", "corr-1", "hello");
      expect(event.aggregateId).toBe("agg-1");
      expect(event.correlationId).toBe("corr-1");
    });

    it("preserves custom data from subclass", () => {
      const event = new TestEvent("agg-1", "corr-1", "hello");
      expect(event.data).toBe("hello");
    });

    it("preserves the event name", () => {
      const event = new TestEvent("agg-1", "corr-1", "hello");
      expect(event.eventName).toBe("TEST_EVENT");
    });

    it("uses class name as default event name", () => {
      const event = new CustomNameEvent("agg-1", "corr-1");
      expect(event.eventName).toBe("CustomNameEvent");
    });
  });

  describe("eventId", () => {
    it("is generated automatically", () => {
      const event = new TestEvent("agg-1", "corr-1", "a");
      expect(event.eventId).toBeDefined();
      expect(typeof event.eventId).toBe("string");
      expect(event.eventId.length).toBeGreaterThan(0);
    });

    it("is unique across instances", () => {
      const a = new TestEvent("agg-1", "corr-1", "a");
      const b = new TestEvent("agg-1", "corr-2", "b");
      expect(a.eventId).not.toBe(b.eventId);
    });
  });

  describe("occurredOn", () => {
    it("is set automatically", () => {
      const before = new Date(Date.now() - 100);
      const event = new TestEvent("agg-1", "corr-1", "a");
      const after = new Date(Date.now() + 100);
      expect(event.occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(event.occurredOn.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const event = new TestEvent("agg-1", "corr-1", "a");
      expect(() => {
        (event as { aggregateId: string }).aggregateId = "changed";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const event = new TestEvent("agg-1", "corr-1", "a");
      expect(() => {
        (event as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });
});
