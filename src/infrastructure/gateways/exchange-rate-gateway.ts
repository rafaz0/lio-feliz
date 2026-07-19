import type { IDataGateway, ParametrosImportacao, DadosImportacao } from "@/application/ports";
import { getUsdBrlRate } from "@/lib/exchange.server";

export class ExchangeRateGateway implements IDataGateway {
  async ObterDadosImportacao(origem: string, _parametros: ParametrosImportacao): Promise<DadosImportacao> {
    try {
      const rate = await getUsdBrlRate();

      return {
        fonte: origem,
        operacoes: [
          {
            tipo: "EXCHANGE",
            ativo: "USD-BRL",
            quantidade: 1,
            valor: rate,
            data: new Date(),
          },
        ],
        dataImportacao: new Date(),
        metadados: {
          provider: "awesomeapi",
          from: "USD",
          to: "BRL",
          rate: String(rate),
        },
      };
    } catch {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { provider: "awesomeapi", error: "failed to fetch exchange rate" },
      };
    }
  }
}
