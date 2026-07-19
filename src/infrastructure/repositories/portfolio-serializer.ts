import type { DomainEvent } from "@/core/domain";
import { PortfolioId } from "@/core/domain";
import { Portfolio } from "@/core/domain/portfolio";
import { BuyEvent } from "@/core/domain/portfolio";
import { SellEvent } from "@/core/domain/portfolio";
import { DividendEvent } from "@/core/domain/portfolio";
import { JcpEvent } from "@/core/domain/portfolio";
import { BonusEvent } from "@/core/domain/portfolio";
import { SplitEvent } from "@/core/domain/portfolio";
import { GroupingEvent } from "@/core/domain/portfolio";
import { AmortizationEvent } from "@/core/domain/portfolio";
import { AdjustmentEvent } from "@/core/domain/portfolio";

type SerializedEvent = {
  eventName: string;
  aggregateId: string;
  correlationId: string;
  eventId: string;
  occurredOn: string;
  [key: string]: unknown;
};

export type SerializedPortfolio = {
  id: string;
  events: SerializedEvent[];
};

function serializeDomainEvent(event: DomainEvent): SerializedEvent {
  const base = {
    eventName: (event as { eventName?: string }).eventName ?? event.constructor.name,
    aggregateId: event.aggregateId,
    correlationId: event.correlationId,
    eventId: event.eventId,
    occurredOn: event.occurredOn.toISOString(),
  };
  const extra: Record<string, unknown> = {};
  for (const key of Object.keys(event as Record<string, unknown>)) {
    if (!(key in base)) {
      const val = (event as Record<string, unknown>)[key];
      extra[key] = val instanceof Date ? val.toISOString() : val;
    }
  }
  return { ...base, ...extra };
}

function deserializeEvent(raw: SerializedEvent): DomainEvent {
  const aggregateId = raw.aggregateId;
  const correlationId = raw.correlationId;
  const eventName = raw.eventName;

  switch (eventName) {
    case "BUY": {
      const e = new BuyEvent(aggregateId, correlationId, raw.assetId as string, raw.quantity as number, raw.price as number);
      return e;
    }
    case "SELL": {
      const e = new SellEvent(aggregateId, correlationId, raw.assetId as string, raw.quantity as number, raw.price as number);
      return e;
    }
    case "DIVIDEND": {
      const e = new DividendEvent(aggregateId, correlationId, raw.assetId as string, raw.shares as number, raw.amountPerShare as number);
      return e;
    }
    case "JCP": {
      const e = new JcpEvent(aggregateId, correlationId, raw.assetId as string, raw.shares as number, raw.amountPerShare as number);
      return e;
    }
    case "BONUS": {
      const e = new BonusEvent(aggregateId, correlationId, raw.assetId as string, raw.sharesHeld as number, raw.bonusRatio as number);
      return e;
    }
    case "SPLIT": {
      const e = new SplitEvent(aggregateId, correlationId, raw.assetId as string, raw.oldQuantity as number, raw.newQuantity as number);
      return e;
    }
    case "GROUPING": {
      const e = new GroupingEvent(aggregateId, correlationId, raw.assetId as string, raw.oldQuantity as number, raw.newQuantity as number);
      return e;
    }
    case "AMORTIZATION": {
      const e = new AmortizationEvent(aggregateId, correlationId, raw.assetId as string, raw.shares as number, raw.amountPerShare as number);
      return e;
    }
    case "ADJUSTMENT": {
      const e = new AdjustmentEvent(aggregateId, correlationId, raw.assetId as string, raw.shares as number, raw.amount as number, raw.description as string);
      return e;
    }
    default:
      throw new Error(`Unknown event type: ${eventName}`);
  }
}

export function serializePortfolio(portfolio: Portfolio): SerializedPortfolio {
  return {
    id: portfolio.id.value,
    events: portfolio.financialEvents.map(serializeDomainEvent),
  };
}

export function deserializePortfolio(data: SerializedPortfolio): Portfolio {
  const id = PortfolioId.create(data.id);
  const portfolio = Portfolio.create(id);
  for (const raw of data.events) {
    const event = deserializeEvent(raw);
    portfolio.applyEvent(event as import("@/core/domain/portfolio").FinancialEvent);
  }
  return portfolio;
}
