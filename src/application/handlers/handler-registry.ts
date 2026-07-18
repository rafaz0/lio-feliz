import type { DomainEvent } from "@/core/domain";
import type { IDomainEventHandler } from "./domain-event-handler";

export class DomainEventHandlerRegistry {
  private handlerMap: Map<string, IDomainEventHandler[]> = new Map();

  register(handler: IDomainEventHandler): void {
    const handlers = this.handlerMap.get(handler.eventName) ?? [];
    handlers.push(handler);
    this.handlerMap.set(handler.eventName, handlers);
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlerMap.get(event.eventName);
    if (!handlers || handlers.length === 0) return;

    await Promise.all(handlers.map((h) => h.Handle(event)));
  }

  getHandlers(eventName: string): readonly IDomainEventHandler[] {
    return this.handlerMap.get(eventName) ?? [];
  }

  hasHandlers(eventName: string): boolean {
    return (this.handlerMap.get(eventName)?.length ?? 0) > 0;
  }
}
