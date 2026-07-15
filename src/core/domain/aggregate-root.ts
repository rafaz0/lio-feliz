import type { EntityId } from "./entity-id";
import { Entity } from "./entity";
import type { DomainEvent } from "./domain-event";

export abstract class AggregateRoot<TId extends EntityId> extends Entity<TId> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  getDomainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
