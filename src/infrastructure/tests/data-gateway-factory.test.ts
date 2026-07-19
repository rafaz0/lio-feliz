import { describe, it, expect } from "vitest";
import { DataGatewayFactory } from "@/infrastructure/gateways/data-gateway-factory";
import { YahooFinanceGateway } from "@/infrastructure/gateways/yahoo-finance-gateway";
import { CoingeckoGateway } from "@/infrastructure/gateways/coingecko-gateway";
import { ExchangeRateGateway } from "@/infrastructure/gateways/exchange-rate-gateway";
import { B3CsvGateway } from "@/infrastructure/gateways/b3-csv-gateway";

describe("DataGatewayFactory", () => {
  it("seleciona YahooFinanceGateway para origem yahoo", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("yahoo");
    expect(gateway).toBeInstanceOf(YahooFinanceGateway);
  });

  it("seleciona YahooFinanceGateway para origem yahoo-dividends", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("yahoo-dividends");
    expect(gateway).toBeInstanceOf(YahooFinanceGateway);
  });

  it("seleciona CoingeckoGateway para origem coingecko", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("coingecko");
    expect(gateway).toBeInstanceOf(CoingeckoGateway);
  });

  it("seleciona ExchangeRateGateway para origem exchange-rate", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("exchange-rate");
    expect(gateway).toBeInstanceOf(ExchangeRateGateway);
  });

  it("seleciona ExchangeRateGateway para origem awesomeapi", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("awesomeapi");
    expect(gateway).toBeInstanceOf(ExchangeRateGateway);
  });

  it("seleciona B3CsvGateway para origem b3-csv", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("b3-csv");
    expect(gateway).toBeInstanceOf(B3CsvGateway);
  });

  it("seleciona B3CsvGateway para origem csv", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("csv");
    expect(gateway).toBeInstanceOf(B3CsvGateway);
  });

  it("seleciona B3CsvGateway como fallback padrao", () => {
    const factory = new DataGatewayFactory();
    const gateway = factory.create("unknown-source");
    expect(gateway).toBeInstanceOf(B3CsvGateway);
  });

  it("aceita gateways customizados no construtor", () => {
    const mockYahoo = new YahooFinanceGateway();
    const factory = new DataGatewayFactory(mockYahoo);
    expect(factory.create("yahoo")).toBe(mockYahoo);
  });

  it("expoe gateways como propriedades", () => {
    const factory = new DataGatewayFactory();
    expect(factory.yahoo).toBeInstanceOf(YahooFinanceGateway);
    expect(factory.coingecko).toBeInstanceOf(CoingeckoGateway);
    expect(factory.exchange).toBeInstanceOf(ExchangeRateGateway);
    expect(factory.b3).toBeInstanceOf(B3CsvGateway);
  });
});
