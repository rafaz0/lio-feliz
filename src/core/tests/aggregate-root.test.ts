import { describe, it, expect } from "vitest";
import { EntityId, AggregateRoot } from "@/core/domain";

class TestId extends EntityId<string> {
  constructor(value: string) {
    super(value);
  }
}

interface TestEvent {
  type: string;
  data: Record<string, unknown>;
}

class TestAggregate extends AggregateRoot<TestId, TestEvent> {
  constructor(id: TestId) {
    super(id);
  }

  doSomething(data: string): void {
    this.addDomainEvent({ type: "did_something", data: { value: data } });
  }

  triggerMultiple(): void {
    this.addDomainEvent({ type: "event_1", data: {} });
    this.addDomainEvent({ type: "event_2", data: {} });
    this.addDomainEvent({ type: "event_3", data: {} });
  }
}

class OtherAggregate extends AggregateRoot<TestId, TestEvent> {
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
      expect(events[0].type).toBe("did_something");
    });

    it("preserves event order", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.doSomething("first");
      agg.doSomething("second");
      agg.doSomething("third");
      const events = agg.getDomainEvents();
      expect(events[0].data.value).toBe("first");
      expect(events[1].data.value).toBe("second");
      expect(events[2].data.value).toBe("third");
    });

    it("preserves order with different event types", () => {
      const agg = new TestAggregate(new TestId("agg-1"));
      agg.triggerMultiple();
      const events = agg.getDomainEvents();
      expect(events[0].type).toBe("event_1");
      expect(events[1].type).toBe("event_2");
      expect(events[2].type).toBe("event_3");
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
      events.pop();
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
