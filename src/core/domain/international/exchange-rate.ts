import { ValueObject } from "../value-object";
import { CurrencyPair } from "./currency-pair";

export class ExchangeRate extends ValueObject<{ ticker: string; currency: string; pair: CurrencyPair; rate: number; source: string; lastUpdated: Date }> {
  private constructor(ticker: string, currency: string, pair: CurrencyPair, rate: number, source: string, lastUpdated: Date) {
    super({ ticker, currency, pair, rate, source, lastUpdated });
  }

  static create(ticker: string, currency: string, pair: CurrencyPair, rate: number, source: string, lastUpdated: Date): ExchangeRate {
    return new ExchangeRate(ticker, currency, pair, rate, source, lastUpdated);
  }

  get ticker(): string {
    return this.props.ticker;
  }

  get currency(): string {
    return this.props.currency;
  }

  get pair(): CurrencyPair {
    return this.props.pair;
  }

  get rate(): number {
    return this.props.rate;
  }

  get source(): string {
    return this.props.source;
  }

  get lastUpdated(): Date {
    return this.props.lastUpdated;
  }

  get isFresh(): boolean {
    const hoursSinceLastUpdate = (new Date().getTime() - this.props.lastUpdated.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastUpdate <= 24;
  }
}
