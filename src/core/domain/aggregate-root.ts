import type { EntityId } from "./entity-id";
import { Entity } from "./entity";

export abstract class AggregateRoot<TId extends EntityId, TEvent = unknown> extends Entity<TId> {
  private _domainEvents: TEvent[] = [];

  protected addDomainEvent(event: TEvent): void {
    this._domainEvents.push(event);
  }

  getDomainEvents(): readonly TEvent[] {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
