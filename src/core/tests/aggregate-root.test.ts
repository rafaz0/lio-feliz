import { describe, it, expect } from "vitest";
import { EntityId, AggregateRoot, DomainEvent } from "@/core/domain";

class TestId extends EntityId<string> {
  constructor(value: string) {
    super(value);
  }
}

class TestEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    correlationId: string,
    public readonly data: string,
    public readonly eventType: string = "test",
  ) {
    super(aggregateId, correlationId, eventType);
    this.finalize();
  }
}

class TestAggregate extends AggregateRoot<TestId> {
  constructor(id: TestId) {
    super(id);
  }

  doSomething(data: string): void {
    this.addDomainEvent(new TestEvent(this.id.value, "corr-1", data, "did_something"));
  }

  triggerMultiple(): void {
    this.addDomainEvent(new TestEvent(this.id.value, "corr-1", "a", "event_1"));
    this.addDomainEvent(new TestEvent(this.id.value, "corr-1", "b", "event_2"));
    this.addDomainEvent(new TestEvent(this.id.value, "corr-1", "c", "event_3"));
  }
}

class OtherAggregate extends AggregateRoot<TestId> {
  constructor(id: TestId) {
    super(id);
  }
}

describe("AggregateRoot", () => {
  describe("events", () => {
    it("starts with no pending events", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      expect(agg.getDomainEvents()).toEqual([]);
    });

    it("adds a single event", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("hello");
      const events = agg.getDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0].eventName).toBe("did_something");
    });

    it("preserves event order", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("first");
      agg.doSomething("second");
      agg.doSomething("third");
      const events = agg.getDomainEvents();
      expect(events[0].data).toBe("first");
      expect(events[1].data).toBe("second");
      expect(events[2].data).toBe("third");
    });

    it("preserves order with different event types", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.triggerMultiple();
      const events = agg.getDomainEvents();
      expect(events[0].eventName).toBe("event_1");
      expect(events[1].eventName).toBe("event_2");
      expect(events[2].eventName).toBe("event_3");
    });

    it("clears events", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("hello");
      expect(agg.getDomainEvents()).toHaveLength(1);
      agg.clearDomainEvents();
      expect(agg.getDomainEvents()).toEqual([]);
    });

    it("supports multiple clear cycles", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("a");
      agg.clearDomainEvents();
      expect(agg.getDomainEvents()).toEqual([]);
      agg.doSomething("b");
      expect(agg.getDomainEvents()).toHaveLength(1);
      agg.clearDomainEvents();
      expect(agg.getDomainEvents()).toEqual([]);
    });

    it("returned events array does not affect internal state", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("hello");
      const events = agg.getDomainEvents();
      (events as unknown[]).pop();
      expect(agg.getDomainEvents()).toHaveLength(1);
    });
  });

  describe("entity equality", () => {
    it("equals by id", () => {
      const a = new TestAggregate(new TestId("agg-1"));
      const b = new TestAggregate(new TestId("agg-1"));
      expect(a.equals(b)).toBe(true);
    });

    it("not equals for different ids", () => {
      const a = new TestAggregate(new TestId("agg-1"));
      const b = new TestAggregate(new TestId("agg-2"));
      expect(a.equals(b)).toBe(false);
    });

    it("not equals for different aggregate types", () => {
      const a = new TestAggregate(new TestId("agg-1"));
      const b = new OtherAggregate(new TestId("agg-1"));
      expect(a.equals(b)).toBe(false);
    });

    it("events do not affect equality", () => {
      const a = new TestAggregate(new TestId("agg-1"));
      const b = new TestAggregate(new TestId("agg-1"));
      a.doSomething("hello");
      expect(a.equals(b)).toBe(true);
    });
  });
});
