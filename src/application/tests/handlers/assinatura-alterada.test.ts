import { describe, it, expect, vi } from "vitest";
import { DomainEvent } from "@/core/domain";
import {
  AssinaturaAlteradaHandler,
  EVENT_NAME_ASSINATURA_ALTERADA,
} from "@/application/handlers/assinatura-alterada-handler";
import type { INotificationPort } from "@/application/ports/notification-port";

class AssinaturaEvent extends DomainEvent {
  constructor(aggregateId: string, correlationId: string) {
    super(aggregateId, correlationId, EVENT_NAME_ASSINATURA_ALTERADA);
    this.finalize();
  }
}

describe("AssinaturaAlteradaHandler", () => {
  it("sends notification when subscription changes", async () => {
    const notificar = vi.fn().mockResolvedValue(undefined);
    const notification: INotificationPort = {
      Notificar: notificar,
      NotificarEmail: vi.fn(),
    };
    const handler = new AssinaturaAlteradaHandler(notification);
    const event = new AssinaturaEvent("user-001", "corr-1");

    await handler.Handle(event);

    expect(notificar).toHaveBeenCalledWith(
      "user-001",
      "Assinatura Atualizada",
      expect.stringContaining("assinatura"),
    );
  });

  it("has the correct event name", () => {
    const notification: INotificationPort = { Notificar: vi.fn(), NotificarEmail: vi.fn() };
    const handler = new AssinaturaAlteradaHandler(notification);

    expect(handler.eventName).toBe(EVENT_NAME_ASSINATURA_ALTERADA);
  });

  it("does not throw when notification succeeds", async () => {
    const notificar = vi.fn().mockResolvedValue(undefined);
    const notification: INotificationPort = {
      Notificar: notificar,
      NotificarEmail: vi.fn(),
    };
    const handler = new AssinaturaAlteradaHandler(notification);
    const event = new AssinaturaEvent("user-001", "corr-3");

    await expect(handler.Handle(event)).resolves.toBeUndefined();
  });
});
