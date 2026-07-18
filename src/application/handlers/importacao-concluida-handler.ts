import type { DomainEvent } from "@/core/domain";
import type { IDomainEventHandler } from "./domain-event-handler";
import type { INotificationPort } from "@/application/ports/notification-port";

export const EVENT_NAME_IMPORTACAO_CONCLUIDA = "IMPORTACAO_CONCLUIDA";

export class ImportacaoConcluidaHandler implements IDomainEventHandler {
  readonly eventName = EVENT_NAME_IMPORTACAO_CONCLUIDA;

  constructor(private readonly notificationPort: INotificationPort) {}

  async Handle(event: DomainEvent): Promise<void> {
    await this.notificationPort.Notificar(
      event.aggregateId,
      "Importação Concluída",
      `A importação de dados foi concluída com sucesso em ${event.occurredOn.toISOString()}.`,
    );
  }
}
