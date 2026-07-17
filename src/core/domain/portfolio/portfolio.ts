import { AggregateRoot, PortfolioId, Result, DomainError } from "@/core/domain";
import { FinancialEvent } from "./financial-event";

export class Portfolio extends AggregateRoot<PortfolioId> {
  private readonly _financialEvents: FinancialEvent[];

  private constructor(id: PortfolioId) {
    super(id);
    this._financialEvents = [];
  }

  static create(id: PortfolioId): Portfolio {
    return new Portfolio(id);
  }

  applyEvent(event: FinancialEvent): Result<void, DomainError> {
    if (event.aggregateId !== this.id.value) {
      return Result.fail(
        new DomainError(
          "PORTFOLIO_EVENT_MISMATCH",
          `Event aggregateId (${event.aggregateId}) does not match Portfolio id (${this.id.value})`,
          "INVARIANT_VIOLATION",
        ),
      );
    }

    if (this._financialEvents.length > 0) {
      const last = this._financialEvents[this._financialEvents.length - 1];
      if (event.occurredOn.getTime() < last.occurredOn.getTime()) {
        return Result.fail(
          new DomainError(
            "PORTFOLIO_OUT_OF_ORDER",
            `Event occurredOn (${event.occurredOn.toISOString()}) is before last event (${last.occurredOn.toISOString()})`,
            "INVARIANT_VIOLATION",
          ),
        );
      }
    }

    this._financialEvents.push(event);
    return Result.ok(undefined);
  }

  get financialEvents(): readonly FinancialEvent[] {
    return [...this._financialEvents];
  }
}
