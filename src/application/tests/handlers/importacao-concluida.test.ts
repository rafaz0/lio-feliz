import { describe, it, expect, vi } from "vitest";
import { DomainEvent } from "@/core/domain";
import {
  ImportacaoConcluidaHandler,
  EVENT_NAME_IMPORTACAO_CONCLUIDA,
} from "@/application/handlers/importacao-concluida-handler";
import type { INotificationPort } from "@/application/ports/notification-port";

class ImportEvent extends DomainEvent {
  constructor(aggregateId: string, correlationId: string) {
    super(aggregateId, correlationId, EVENT_NAME_IMPORTACAO_CONCLUIDA);
    this.finalize();
  }
}

describe("ImportacaoConcluidaHandler", () => {
  it("sends notification when import is completed", async () => {
    const notificar = vi.fn().mockResolvedValue(undefined);
    const notification: INotificationPort = {
      Notificar: notificar,
      NotificarEmail: vi.fn(),
    };
    const handler = new ImportacaoConcluidaHandler(notification);
    const event = new ImportEvent("user-001", "corr-1");

    await handler.Handle(event);

    expect(notificar).toHaveBeenCalledWith(
      "user-001",
      "Importação Concluída",
      expect.stringContaining("concluída"),
    );
  });

  it("has the correct event name", () => {
    const notification: INotificationPort = { Notificar: vi.fn(), NotificarEmail: vi.fn() };
    const handler = new ImportacaoConcluidaHandler(notification);

    expect(handler.eventName).toBe(EVENT_NAME_IMPORTACAO_CONCLUIDA);
  });

  it("does not throw when notification fails", async () => {
    const notificar = vi.fn().mockRejectedValue(new Error("Falha na notificação"));
    const notification: INotificationPort = {
      Notificar: notificar,
      NotificarEmail: vi.fn(),
    };
    const handler = new ImportacaoConcluidaHandler(notification);
    const event = new ImportEvent("user-001", "corr-2");

    await expect(handler.Handle(event)).rejects.toThrow("Falha na notificação");
  });
});
