import type { IDataGateway, ParametrosImportacao, DadosImportacao } from "@/application/ports";
import { fetchCryptoQuotes } from "@/lib/coingecko.server";

export class CoingeckoGateway implements IDataGateway {
  async ObterDadosImportacao(_origem: string, parametros: ParametrosImportacao): Promise<DadosImportacao> {
    const tickers = this.extractTickers(parametros);

    try {
      const quotes = await fetchCryptoQuotes(tickers);
      const operacoes = Object.entries(quotes).map(([ticker, quote]) => ({
        tipo: "QUOTE",
        ativo: ticker,
        quantidade: 1,
        valor: quote.priceBrl,
        data: new Date(),
        observacao: `CoinGecko: ${quote.name}`,
      }));

      return {
        fonte: "coingecko",
        operacoes,
        dataImportacao: new Date(),
        metadados: {
          provider: "coingecko",
          tickers: tickers.join(","),
          count: String(Object.keys(quotes).length),
        },
      };
    } catch {
      return {
        fonte: "coingecko",
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { provider: "coingecko", error: "failed to fetch crypto quotes" },
      };
    }
  }

  private extractTickers(parametros: ParametrosImportacao): string[] {
    if (parametros.conexao?.tickers) {
      return parametros.conexao.tickers.split(",").map((t) => t.trim());
    }
    if (parametros.conexao?.ticker) {
      return [parametros.conexao.ticker];
    }
    return ["BTC-USD", "ETH-USD", "SOL-USD"];
  }
}
