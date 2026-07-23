import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseUnitOfWork } from "@/infrastructure/unit-of-work/supabase-unit-of-work";
import { InProcessEventPublisher } from "@/infrastructure/publishers/in-process-event-publisher";
import { DomainEventHandlerRegistry } from "@/application/handlers/handler-registry";

function createMockSupabase(): SupabaseClient {
  const mockRpc = vi.fn().mockResolvedValue({ data: null, error: null });
  return { rpc: mockRpc } as unknown as SupabaseClient;
}

describe("SupabaseUnitOfWork", () => {
  let uow: SupabaseUnitOfWork;
  let mockSupabase: ReturnType<typeof createMockSupabase>;

  beforeEach(() => {
    mockSupabase = createMockSupabase();
    uow = new SupabaseUnitOfWork(mockSupabase);
  });

  describe("IniciarTransacao", () => {
    it("calls supabase.rpc begin_transaction", async () => {
      await uow.IniciarTransacao();

      expect(mockSupabase.rpc).toHaveBeenCalledWith("begin_transaction");
      expect(uow.isTransactionActive()).toBe(true);
    });

    it("does not begin twice when already active", async () => {
      await uow.IniciarTransacao();
      await uow.IniciarTransacao();

      expect(mockSupabase.rpc).toHaveBeenCalledTimes(1);
    });

    it("sets transaction active even when rpc fails (fallback)", async () => {
      const failingSupabase = {
        rpc: vi.fn().mockRejectedValue(new Error("RPC not found")),
      } as unknown as SupabaseClient;
      const fallbackUow = new SupabaseUnitOfWork(failingSupabase);

      await fallbackUow.IniciarTransacao();

      expect(fallbackUow.isTransactionActive()).toBe(true);
    });

    it("enters transaction mode on publisher when provided", async () => {
      const registry = new DomainEventHandlerRegistry();
      const publisher = new InProcessEventPublisher(registry);
      const publisherSpy = vi.spyOn(publisher, "enterTransactionMode");
      const uowWithPublisher = new SupabaseUnitOfWork(mockSupabase, publisher);

      await uowWithPublisher.IniciarTransacao();

      expect(publisherSpy).toHaveBeenCalledOnce();
    });
  });

  describe("Commit", () => {
    it("calls supabase.rpc commit_transaction", async () => {
      await uow.IniciarTransacao();
      await uow.Commit();

      expect(mockSupabase.rpc).toHaveBeenCalledWith("commit_transaction");
    });

    it("flushes publisher events after commit", async () => {
      const registry = new DomainEventHandlerRegistry();
      const publisher = new InProcessEventPublisher(registry);
      const flushSpy = vi.spyOn(publisher, "flush");
      const uowWithPublisher = new SupabaseUnitOfWork(mockSupabase, publisher);

      await uowWithPublisher.IniciarTransacao();
      await uowWithPublisher.Commit();

      expect(flushSpy).toHaveBeenCalledOnce();
    });

    it("does nothing when no active transaction", async () => {
      await uow.Commit();

      expect(mockSupabase.rpc).not.toHaveBeenCalledWith("commit_transaction");
    });
  });

  describe("Rollback", () => {
    it("calls supabase.rpc rollback_transaction", async () => {
      await uow.IniciarTransacao();
      await uow.Rollback();

      expect(mockSupabase.rpc).toHaveBeenCalledWith("rollback_transaction");
    });

    it("clears publisher events on rollback", async () => {
      const registry = new DomainEventHandlerRegistry();
      const publisher = new InProcessEventPublisher(registry);
      const clearSpy = vi.spyOn(publisher, "clear");
      const uowWithPublisher = new SupabaseUnitOfWork(mockSupabase, publisher);

      await uowWithPublisher.IniciarTransacao();
      await uowWithPublisher.Rollback();

      expect(clearSpy).toHaveBeenCalledOnce();
    });

    it("does nothing when no active transaction", async () => {
      await uow.Rollback();

      expect(mockSupabase.rpc).not.toHaveBeenCalledWith("rollback_transaction");
    });
  });

  describe("integration: publish after commit", () => {
    it("events queued during transaction are flushed on commit", async () => {
      const handler = { eventName: "TestEvent", Handle: vi.fn() };
      const registry = new DomainEventHandlerRegistry();
      registry.register(handler);
      const publisher = new InProcessEventPublisher(registry);
      const uowWithPublisher = new SupabaseUnitOfWork(mockSupabase, publisher);

      await uowWithPublisher.IniciarTransacao();
      await publisher.Publicar({
        eventName: "TestEvent",
        eventId: "1",
        occurredOn: new Date(),
        correlationId: "c1",
        aggregateId: "a1",
      });
      await publisher.Publicar({
        eventName: "TestEvent",
        eventId: "2",
        occurredOn: new Date(),
        correlationId: "c1",
        aggregateId: "a1",
      });
      await uowWithPublisher.Commit();

      expect(handler.Handle).toHaveBeenCalledTimes(2);
    });

    it("events queued during transaction are discarded on rollback", async () => {
      const handler = { eventName: "TestEvent", Handle: vi.fn() };
      const registry = new DomainEventHandlerRegistry();
      registry.register(handler);
      const publisher = new InProcessEventPublisher(registry);
      const uowWithPublisher = new SupabaseUnitOfWork(mockSupabase, publisher);

      await uowWithPublisher.IniciarTransacao();
      await publisher.Publicar({
        eventName: "TestEvent",
        eventId: "1",
        occurredOn: new Date(),
        correlationId: "c1",
        aggregateId: "a1",
      });
      await uowWithPublisher.Rollback();

      expect(handler.Handle).not.toHaveBeenCalled();
    });
  });

  describe("setConnection", () => {
    it("allows swapping the supabase connection", async () => {
      const newSupabase = createMockSupabase();
      uow.setConnection(newSupabase);

      await uow.IniciarTransacao();

      expect(newSupabase.rpc).toHaveBeenCalledWith("begin_transaction");
    });
  });
});
