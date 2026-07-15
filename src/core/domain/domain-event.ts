export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly correlationId: string;
  public readonly aggregateId: string;
  public readonly eventName: string;

  constructor(aggregateId: string, correlationId: string, eventName?: string) {
    this.eventId = DomainEvent.generateId();
    this.occurredOn = new Date();
    this.correlationId = correlationId;
    this.aggregateId = aggregateId;
    this.eventName = eventName ?? this.constructor.name;
  }

  protected finalize(): void {
    Object.freeze(this);
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
}
