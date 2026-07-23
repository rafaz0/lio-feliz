import type { ObterModelosExportacaoQuery } from "@/application/queries/obter-modelos-exportacao";
import type { ModelosExportacaoDto } from "@/application/dtos/importacao";
import type { IApplicationService } from "@/application/application-service";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterModelosExportacaoService implements IApplicationService<
  ObterModelosExportacaoQuery,
  ModelosExportacaoDto
> {
  async Execute(
    _query: ObterModelosExportacaoQuery,
  ): Promise<ModelosExportacaoDto | ApplicationError> {
    return {
      modelos: [
        {
          id: "carteira-completa",
          nome: "Carteira Completa",
          descricao: "Exporta todas as posições da carteira",
          formato: "CSV",
        },
        {
          id: "proventos",
          nome: "Proventos Recebidos",
          descricao: "Exporta histórico de proventos",
          formato: "CSV",
        },
        {
          id: "operacoes",
          nome: "Operações Realizadas",
          descricao: "Exporta histórico de operações",
          formato: "CSV",
        },
        {
          id: "irpf",
          nome: "IRPF Anual",
          descricao: "Exporta relatório para declaração de IRPF",
          formato: "CSV",
        },
      ],
    };
  }
}
