import type { DomainEvent } from "@/core/domain";
import type { IDomainEventPublisher } from "@/application/ports";
import { DomainEventHandlerRegistry } from "@/application/handlers/handler-registry";

export class InProcessEventPublisher implements IDomainEventPublisher {
  private pendingQueue: DomainEvent[] = [];
  private transactionMode = false;

  constructor(private readonly handlerRegistry?: DomainEventHandlerRegistry) {}

  async Publicar(event: DomainEvent): Promise<void> {
    if (this.transactionMode) {
      this.pendingQueue.push(event);
      return;
    }
    await this.dispatch(event);
  }

  async PublicarVarios(events: DomainEvent[]): Promise<void> {
    if (this.transactionMode) {
      this.pendingQueue.push(...events);
      return;
    }
    await Promise.all(events.map((e) => this.dispatch(e)));
  }

  enterTransactionMode(): void {
    this.transactionMode = true;
  }

  async flush(): Promise<void> {
    this.transactionMode = false;
    const events = this.pendingQueue;
    this.pendingQueue = [];
    await Promise.all(events.map((e) => this.dispatch(e)));
  }

  clear(): void {
    this.transactionMode = false;
    this.pendingQueue = [];
  }

  get pendingCount(): number {
    return this.pendingQueue.length;
  }

  private async dispatch(event: DomainEvent): Promise<void> {
    if (!this.handlerRegistry) return;
    await this.handlerRegistry.dispatch(event);
  }
}
