import type { IDataGateway } from "@/application/ports";
import { YahooFinanceGateway } from "./yahoo-finance-gateway";
import { CoingeckoGateway } from "./coingecko-gateway";
import { ExchangeRateGateway } from "./exchange-rate-gateway";
import { B3CsvGateway } from "./b3-csv-gateway";

type GatewayMap = {
  yahoo: YahooFinanceGateway;
  coingecko: CoingeckoGateway;
  exchange: ExchangeRateGateway;
  b3: B3CsvGateway;
};

export class DataGatewayFactory {
  private readonly gateways: GatewayMap;

  constructor(
    yahooGateway?: YahooFinanceGateway,
    coingeckoGateway?: CoingeckoGateway,
    exchangeRateGateway?: ExchangeRateGateway,
    b3CsvGateway?: B3CsvGateway,
  ) {
    this.gateways = {
      yahoo: yahooGateway ?? new YahooFinanceGateway(),
      coingecko: coingeckoGateway ?? new CoingeckoGateway(),
      exchange: exchangeRateGateway ?? new ExchangeRateGateway(),
      b3: b3CsvGateway ?? new B3CsvGateway(),
    };
  }

  create(origem: string): IDataGateway {
    if (origem.startsWith("yahoo")) return this.gateways.yahoo;
    if (origem.startsWith("coingecko")) return this.gateways.coingecko;
    if (origem === "exchange-rate" || origem === "awesomeapi") return this.gateways.exchange;
    if (origem === "b3-csv" || origem === "csv" || origem === "b3") return this.gateways.b3;
    return this.gateways.b3;
  }

  get yahoo(): YahooFinanceGateway {
    return this.gateways.yahoo;
  }

  get coingecko(): CoingeckoGateway {
    return this.gateways.coingecko;
  }

  get exchange(): ExchangeRateGateway {
    return this.gateways.exchange;
  }

  get b3(): B3CsvGateway {
    return this.gateways.b3;
  }
}
