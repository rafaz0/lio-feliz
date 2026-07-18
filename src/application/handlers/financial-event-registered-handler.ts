import type { DomainEvent } from "@/core/domain";
import { FinancialEventType } from "@/core/domain/portfolio";
import type { IDomainEventHandler } from "./domain-event-handler";
import type { IProjectionRepository } from "@/application/ports/projection-repository";

const FINANCIAL_EVENT_NAMES: readonly string[] = Object.values(FinancialEventType);

export class FinancialEventRegisteredHandler implements IDomainEventHandler {
  readonly eventName = "*";

  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Handle(event: DomainEvent): Promise<void> {
    if (!FINANCIAL_EVENT_NAMES.includes(event.eventName)) return;

    const portfolioId = event.aggregateId;

    await this.projectionRepo.ObterPatrimonio(portfolioId);
    await this.projectionRepo.ObterPosicoes(portfolioId);
  }
}
