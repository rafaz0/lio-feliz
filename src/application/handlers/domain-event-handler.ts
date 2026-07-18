import type { DomainEvent } from "@/core/domain";

export interface IDomainEventHandler {
  readonly eventName: string;
  Handle(event: DomainEvent): Promise<void>;
}
