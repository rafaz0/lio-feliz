import { describe, it, expect, vi, beforeEach } from "vitest";
import type { DomainEvent, IDomainEventHandler } from "@/core/domain";
import { DomainEventHandlerRegistry } from "@/application/handlers/handler-registry";
import { InProcessEventPublisher } from "@/infrastructure/publishers/in-process-event-publisher";

class TestEvent implements DomainEvent {
  readonly eventId = "e1";
  readonly occurredOn = new Date();
  readonly correlationId = "corr-1";
  readonly aggregateId = "agg-1";
  readonly eventName = "TestEvent";
}

describe("InProcessEventPublisher", () => {
  let publisher: InProcessEventPublisher;
  let registry: DomainEventHandlerRegistry;

  beforeEach(() => {
    registry = new DomainEventHandlerRegistry();
    publisher = new InProcessEventPublisher(registry);
  });

  describe("Publicar", () => {
    it("dispatches event to registered handler", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };
      registry.register(handler);

      await publisher.Publicar(new TestEvent());

      expect(handler.Handle).toHaveBeenCalledOnce();
      expect((handler.Handle as ReturnType<typeof vi.fn>).mock.calls[0][0].eventName).toBe(
        "TestEvent",
      );
    });

    it("does nothing when no handler registered", async () => {
      await expect(publisher.Publicar(new TestEvent())).resolves.toBeUndefined();
    });

    it("queues event when in transaction mode", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };
      registry.register(handler);

      publisher.enterTransactionMode();
      await publisher.Publicar(new TestEvent());

      expect(handler.Handle).not.toHaveBeenCalled();
      expect(publisher.pendingCount).toBe(1);
    });
  });

  describe("PublicarVarios", () => {
    it("dispatches multiple events", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };
      registry.register(handler);

      await publisher.PublicarVarios([new TestEvent(), new TestEvent()]);

      expect(handler.Handle).toHaveBeenCalledTimes(2);
    });

    it("queues events when in transaction mode", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };

      publisher.enterTransactionMode();
      await publisher.PublicarVarios([new TestEvent(), new TestEvent()]);

      expect(handler.Handle).not.toHaveBeenCalled();
      expect(publisher.pendingCount).toBe(2);
    });
  });

  describe("flush", () => {
    it("dispatches queued events and clears queue", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };
      registry.register(handler);

      publisher.enterTransactionMode();
      await publisher.PublicarVarios([new TestEvent(), new TestEvent()]);
      await publisher.flush();

      expect(handler.Handle).toHaveBeenCalledTimes(2);
      expect(publisher.pendingCount).toBe(0);
    });

    it("exits transaction mode after flush", async () => {
      publisher.enterTransactionMode();
      await publisher.Publicar(new TestEvent());
      await publisher.flush();

      expect(publisher.pendingCount).toBe(0);
    });
  });

  describe("clear", () => {
    it("discards queued events without dispatching", async () => {
      const handler: IDomainEventHandler = { eventName: "TestEvent", Handle: vi.fn() };
      registry.register(handler);

      publisher.enterTransactionMode();
      await publisher.Publicar(new TestEvent());
      publisher.clear();

      expect(handler.Handle).not.toHaveBeenCalled();
      expect(publisher.pendingCount).toBe(0);
    });
  });

  describe("pendingCount", () => {
    it("returns number of queued events", async () => {
      expect(publisher.pendingCount).toBe(0);

      publisher.enterTransactionMode();
      await publisher.Publicar(new TestEvent());
      expect(publisher.pendingCount).toBe(1);

      await publisher.Publicar(new TestEvent());
      expect(publisher.pendingCount).toBe(2);
    });
  });
});
