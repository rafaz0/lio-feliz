import type { DomainEvent } from "@/core/domain";
import type { IDomainEventHandler } from "./domain-event-handler";
import type { INotificationPort } from "@/application/ports/notification-port";

export const EVENT_NAME_ASSINATURA_ALTERADA = "ASSINATURA_ALTERADA";

export class AssinaturaAlteradaHandler implements IDomainEventHandler {
  readonly eventName = EVENT_NAME_ASSINATURA_ALTERADA;

  constructor(private readonly notificationPort: INotificationPort) {}

  async Handle(event: DomainEvent): Promise<void> {
    await this.notificationPort.Notificar(
      event.aggregateId,
      "Assinatura Atualizada",
      `Sua assinatura foi alterada. Plano: ${event.eventName}.`,
    );
  }
}
