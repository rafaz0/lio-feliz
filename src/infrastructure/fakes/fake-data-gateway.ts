import type { IDataGateway, ParametrosImportacao, DadosImportacao } from "@/application/ports";

export class FakeDataGateway implements IDataGateway {
  private dados: Map<string, DadosImportacao> = new Map();

  async ObterDadosImportacao(
    origem: string,
    _parametros: ParametrosImportacao,
  ): Promise<DadosImportacao> {
    const cached = this.dados.get(origem);
    if (cached) {
      return cached;
    }
    return {
      fonte: origem,
      operacoes: [],
      dataImportacao: new Date(),
      metadados: {},
    };
  }

  setDados(origem: string, dados: DadosImportacao): void {
    this.dados.set(origem, dados);
  }

  reset(): void {
    this.dados.clear();
  }
}
