import type { IDataGateway, ParametrosImportacao, DadosImportacao } from "@/application/ports";
import {
  fetchYahooFundamentals,
  fetchYahooHistory,
  fetchYahooDividends,
  fetchYahooQuotes,
} from "@/lib/yahoo.server";

export class YahooFinanceGateway implements IDataGateway {
  async ObterDadosImportacao(origem: string, parametros: ParametrosImportacao): Promise<DadosImportacao> {
    const ticker = this.extractTicker(origem, parametros);

    if (origem === "yahoo-fundamentals" || origem === "yahoo") {
      return this.obterFundamentals(ticker, origem);
    }

    if (origem === "yahoo-dividends") {
      return this.obterDividendos(ticker, origem);
    }

    if (origem === "yahoo-history") {
      return this.obterHistorico(ticker, origem, parametros);
    }

    if (origem === "yahoo-quotes") {
      return this.obterCotacoes(ticker, origem);
    }

    return this.obterFundamentals(ticker, origem);
  }

  private async obterDividendos(ticker: string, origem: string): Promise<DadosImportacao> {
    try {
      const dividends = await fetchYahooDividends(ticker);
      const operacoes = (dividends ?? []).map((d) => ({
        tipo: "DIVIDEND",
        ativo: ticker,
        quantidade: 1,
        valor: d.amount,
        data: new Date(d.paidAt),
      }));

      return {
        fonte: origem,
        operacoes,
        dataImportacao: new Date(),
        metadados: { ticker, provider: "yahoo" },
      };
    } catch {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { ticker, provider: "yahoo", error: "failed to fetch dividends" },
      };
    }
  }

  private async obterHistorico(ticker: string, origem: string, parametros: ParametrosImportacao): Promise<DadosImportacao> {
    try {
      const range = parametros.metadados?.range ?? "1y";
      const interval = parametros.metadados?.interval ?? "1wk";
      const history = await fetchYahooHistory(ticker, range, interval);
      const operacoes = (history ?? []).map((h) => ({
        tipo: "PRICE",
        ativo: ticker,
        quantidade: 1,
        valor: h.close,
        data: new Date(h.date),
      }));

      return {
        fonte: origem,
        operacoes,
        dataImportacao: new Date(),
        metadados: { ticker, range, interval, provider: "yahoo" },
      };
    } catch {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { ticker, provider: "yahoo", error: "failed to fetch history" },
      };
    }
  }

  private async obterCotacoes(ticker: string, origem: string): Promise<DadosImportacao> {
    try {
      const quotes = await fetchYahooQuotes([ticker]);
      const quote = quotes[ticker.toUpperCase()];
      const operacoes = quote
        ? [{ tipo: "QUOTE", ativo: ticker, quantidade: 1, valor: quote.price, data: new Date() }]
        : [];

      return {
        fonte: origem,
        operacoes,
        dataImportacao: new Date(),
        metadados: {
          ticker,
          provider: "yahoo",
          ...(quote ? { changePct: String(quote.changePct) } : {}),
        },
      };
    } catch {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { ticker, provider: "yahoo", error: "failed to fetch quotes" },
      };
    }
  }

  private async obterFundamentals(ticker: string, origem: string): Promise<DadosImportacao> {
    try {
      const fundamentals = await fetchYahooFundamentals(ticker);
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: {
          ticker,
          provider: "yahoo",
          ...(fundamentals
            ? {
                price: String(fundamentals.price),
                name: fundamentals.name,
                sector: fundamentals.sector,
                pl: String(fundamentals.pl),
                pvp: String(fundamentals.pvp ?? ""),
                dy: String(fundamentals.dy),
                marketCap: String(fundamentals.marketCap),
              }
            : { error: "fundamentals not found" }),
        },
      };
    } catch {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { ticker, provider: "yahoo", error: "failed to fetch fundamentals" },
      };
    }
  }

  private extractTicker(origem: string, parametros: ParametrosImportacao): string {
    if (parametros.conexao?.ticker) return parametros.conexao.ticker;
    if (parametros.arquivo) return parametros.arquivo.replace(/\.csv$/i, "");
    return "PETR4";
  }
}
