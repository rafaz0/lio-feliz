import { describe, it, expect, beforeEach } from "vitest";
import { B3CsvGateway } from "@/infrastructure/gateways/b3-csv-gateway";

describe("B3CsvGateway", () => {
  let gateway: B3CsvGateway;

  beforeEach(() => {
    gateway = new B3CsvGateway();
  });

  it("retorna operacoes vazias quando nenhum arquivo fornecido", async () => {
    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
    });

    expect(result.operacoes).toHaveLength(0);
    expect(result.metadados.error).toBe("no file provided");
  });

  it("parse CSV com cabecalho e operacoes", async () => {
    const csv = [
      "tipo,ativo,quantidade,preco,data",
      "COMPRA,PETR4,100,25.50,15/01/2026",
      "VENDA,VALE3,50,78.30,20/01/2026",
    ].join("\n");

    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
      arquivo: csv,
    });

    expect(result.operacoes).toHaveLength(2);
    expect(result.operacoes[0].tipo).toBe("BUY");
    expect(result.operacoes[0].ativo).toBe("PETR4");
    expect(result.operacoes[0].quantidade).toBe(100);
    expect(result.operacoes[0].valor).toBe(25.5);
    expect(result.operacoes[1].tipo).toBe("SELL");
    expect(result.operacoes[1].ativo).toBe("VALE3");
  });

  it("parse CSV sem cabecalho", async () => {
    const csv = ["COMPRA,PETR4,50,30.00,15/01/2026", "DIVIDENDO,PETR4,1,2.50,20/01/2026"].join(
      "\n",
    );

    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
      arquivo: csv,
    });

    expect(result.operacoes).toHaveLength(2);
    expect(result.operacoes[0].tipo).toBe("BUY");
    expect(result.operacoes[1].tipo).toBe("DIVIDEND");
  });

  it("parse CSV com valores em formato brasileiro", async () => {
    const csv = 'COMPRA,PETR4,10,"25,50",15/01/2026';

    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
      arquivo: csv,
    });

    expect(result.operacoes).toHaveLength(1);
    expect(result.operacoes[0].valor).toBe(25.5);
  });

  it("mapeia tipos de operacao corretamente", async () => {
    const csv = [
      "JCP,PETR4,100,1.50,15/01/2026",
      "AMORTIZACAO,PETR4,100,0.50,20/01/2026",
      "DESDOBRAMENTO,PETR4,1,0,01/02/2026",
    ].join("\n");

    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
      arquivo: csv,
    });

    expect(result.operacoes).toHaveLength(3);
    expect(result.operacoes[0].tipo).toBe("JCP");
    expect(result.operacoes[1].tipo).toBe("AMORTIZATION");
    expect(result.operacoes[2].tipo).toBe("SPLIT");
  });

  it("retorna erro quando CSV e invalido", async () => {
    const result = await gateway.ObterDadosImportacao("b3-csv", {
      origem: "b3-csv",
      arquivo: "",
    });

    expect(result.operacoes).toHaveLength(0);
  });
});
