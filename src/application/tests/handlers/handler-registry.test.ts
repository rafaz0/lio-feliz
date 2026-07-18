import { describe, it, expect, vi } from "vitest";
import { DomainEvent } from "@/core/domain";
import { DomainEventHandlerRegistry } from "@/application/handlers/handler-registry";
import type { IDomainEventHandler } from "@/application/handlers/domain-event-handler";

class TestEvent extends DomainEvent {
  constructor(aggregateId: string, correlationId: string, eventName: string) {
    super(aggregateId, correlationId, eventName);
    this.finalize();
  }
}

describe("DomainEventHandlerRegistry", () => {
  it("dispatches event to registered handlers", async () => {
    const registry = new DomainEventHandlerRegistry();
    const handler: IDomainEventHandler = {
      eventName: "TEST_EVENT",
      Handle: vi.fn().mockResolvedValue(undefined),
    };
    registry.register(handler);
    const event = new TestEvent("agg-1", "corr-1", "TEST_EVENT");

    await registry.dispatch(event);

    expect(handler.Handle).toHaveBeenCalledWith(event);
  });

  it("dispatches to multiple handlers for the same event", async () => {
    const registry = new DomainEventHandlerRegistry();
    const h1: IDomainEventHandler = { eventName: "EVENT", Handle: vi.fn() };
    const h2: IDomainEventHandler = { eventName: "EVENT", Handle: vi.fn() };
    registry.register(h1);
    registry.register(h2);
    const event = new TestEvent("agg-1", "corr-1", "EVENT");

    await registry.dispatch(event);

    expect(h1.Handle).toHaveBeenCalled();
    expect(h2.Handle).toHaveBeenCalled();
  });

  it("does nothing when no handlers are registered", async () => {
    const registry = new DomainEventHandlerRegistry();
    const event = new TestEvent("agg-1", "corr-1", "UNREGISTERED");

    await expect(registry.dispatch(event)).resolves.toBeUndefined();
  });

  it("does not invoke handlers for different event names", async () => {
    const registry = new DomainEventHandlerRegistry();
    const handler: IDomainEventHandler = {
      eventName: "ALFA",
      Handle: vi.fn(),
    };
    registry.register(handler);
    const event = new TestEvent("agg-1", "corr-1", "BETA");

    await registry.dispatch(event);

    expect(handler.Handle).not.toHaveBeenCalled();
  });

  it("reports hasHandlers correctly", () => {
    const registry = new DomainEventHandlerRegistry();
    const handler: IDomainEventHandler = { eventName: "EXISTS", Handle: vi.fn() };
    registry.register(handler);

    expect(registry.hasHandlers("EXISTS")).toBe(true);
    expect(registry.hasHandlers("MISSING")).toBe(false);
  });

  it("returns registered handlers for an event", () => {
    const registry = new DomainEventHandlerRegistry();
    const handler: IDomainEventHandler = { eventName: "MY_EVENT", Handle: vi.fn() };
    registry.register(handler);

    const handlers = registry.getHandlers("MY_EVENT");

    expect(handlers).toHaveLength(1);
    expect(handlers[0]).toBe(handler);
  });
});
