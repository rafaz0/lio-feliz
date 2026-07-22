import { ValueObject } from "../value-object";
import type { ExchangeRate } from "./exchange-rate";

export type CurrencyConversionProps = {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  rate: number;
  date: Date;
};

export class CurrencyConversion extends ValueObject<CurrencyConversionProps> {
  private constructor(props: CurrencyConversionProps) { super(props); }
  static create(props: CurrencyConversionProps): CurrencyConversion { return new CurrencyConversion(props); }
  get fromAmount(): number { return this.props.fromAmount; }
  get fromCurrency(): string { return this.props.fromCurrency; }
  get toAmount(): number { return this.props.toAmount; }
  get rate(): number { return this.props.rate; }
  get date(): Date { return this.props.date; }
}

export class CurrencyConversionService {
  convert(amount: number, fromCurrency: string, rate: ExchangeRate): CurrencyConversion {
    return CurrencyConversion.create({
      fromAmount: amount,
      fromCurrency,
      toAmount: +(amount * rate.rate).toFixed(2),
      rate: rate.rate,
      date: new Date(),
    });
  }

  getFreshRate(pair: string, rates: ExchangeRate[]): ExchangeRate | null {
    const fresh = rates.filter((r) => r.isFresh && r.ticker === pair);
    if (fresh.length === 0) return null;
    return fresh.reduce((a, b) => (a.lastUpdated > b.lastUpdated ? a : b));
  }

  convertViaUSD(
    amount: number,
    fromCurrency: string,
    rateToUSD: ExchangeRate,
    rateUSDtoBRL: ExchangeRate,
  ): CurrencyConversion {
    const amountInUSD = amount * rateToUSD.rate;
    return this.convert(amountInUSD, fromCurrency, rateUSDtoBRL);
  }
}
