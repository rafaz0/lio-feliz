import type { DomainEvent } from "@/core/domain";
import type { IDomainEventPublisher } from "@/application/ports";

export class FakeDomainEventPublisher implements IDomainEventPublisher {
  private events: DomainEvent[] = [];

  async Publicar(event: DomainEvent): Promise<void> {
    this.events.push(event);
  }

  async PublicarVarios(events: DomainEvent[]): Promise<void> {
    this.events.push(...events);
  }

  getPublishedEvents(): DomainEvent[] {
    return this.events;
  }

  reset(): void {
    this.events = [];
  }
}
