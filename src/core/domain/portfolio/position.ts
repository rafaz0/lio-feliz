import { ValueObject, Ticker, Quantity, Money } from "@/core/domain";

export interface PositionProps {
  ticker: Ticker;
  quantity: Quantity;
  avgCost: Money;
  totalCost: Money;
}

export class Position extends ValueObject<{
  ticker: Ticker;
  quantity: Quantity;
  avgCost: Money;
  totalCost: Money;
}> {
  private constructor(ticker: Ticker, quantity: Quantity, avgCost: Money, totalCost: Money) {
    super({ ticker, quantity, avgCost, totalCost });
  }

  static create(ticker: Ticker, quantity: Quantity, avgCost: Money, totalCost: Money): Position {
    return new Position(ticker, quantity, avgCost, totalCost);
  }

  getTicker(): Ticker {
    return this.props.ticker;
  }

  getQuantity(): Quantity {
    return this.props.quantity;
  }

  getAvgCost(): Money {
    return this.props.avgCost;
  }

  getTotalCost(): Money {
    return this.props.totalCost;
  }
}
