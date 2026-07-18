import type { DomainEvent } from "@/core/domain";

export interface IDomainEventPublisher {
  Publicar(event: DomainEvent): Promise<void>;
  PublicarVarios(events: DomainEvent[]): Promise<void>;
}
