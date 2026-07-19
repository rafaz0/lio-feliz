import type { IDataGateway, DadosImportacao, ParametrosImportacao } from "@/application/ports";
import { DataGatewayFactory } from "./data-gateway-factory";

export class DataGatewayRouter implements IDataGateway {
  private readonly factory: DataGatewayFactory;

  constructor(factory?: DataGatewayFactory) {
    this.factory = factory ?? new DataGatewayFactory();
  }

  async ObterDadosImportacao(
    origem: string,
    parametros: ParametrosImportacao,
  ): Promise<DadosImportacao> {
    return this.factory.create(origem).ObterDadosImportacao(origem, parametros);
  }
}
