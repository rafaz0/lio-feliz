import type { ExportarRelatorioCommand } from "@/application/commands/exportar-relatorio";
import type { ExportJobDto } from "@/application/dtos/importacao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ExportJob } from "@/core/domain/import-export";

export class ExportarRelatorioService implements IApplicationService<
  ExportarRelatorioCommand,
  ExportJobDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(command: ExportarRelatorioCommand): Promise<ExportJobDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const positions = await this.projectionRepo.ObterPosicoes(command.portfolioId);
    if (!positions) {
      return new ValidationError(
        "PROJECTION_NOT_FOUND",
        "Posições não encontradas para o portfólio",
      );
    }

    const projections = { posicoes: positions };

    const exportJob = ExportJob.create({
      format: command.formato as any,
      fileName: `relatorio_${command.templateId}_${Date.now()}.${command.formato.toLowerCase()}`,
      metadata: {
        usuarioId: command.portfolioId,
        tipoRelatorio: command.templateId,
        filtros: command.parametros,
      },
    });

    exportJob.inProgress();

    const csvContent = this.gerarCsv(projections, command.templateId);
    const fileUrl = `/api/exports/${exportJob.id}/download`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    exportJob.complete(fileUrl, url);

    return {
      id: exportJob.id,
      templateId: command.templateId,
      formato: command.formato,
      status: exportJob.status,
      fileName: exportJob.fileName,
      fileUrl,
      createdAt: exportJob.createdAt.toISOString(),
      completedAt: exportJob.completedAt!.toISOString(),
    };
  }

  private gerarCsv(projections: any, templateId: string): string {
    const rows: string[][] = [];

    switch (templateId) {
      case "carteira-completa": {
        rows.push(["Ativo", "Tipo", "Quantidade", "Preço Médio", "Valor Atual", "Participação"]);
        if (projections.posicoes) {
          for (const pos of projections.posicoes) {
            rows.push([
              pos.ativo || "",
              pos.tipo || "",
              String(pos.quantidade ?? 0),
              String(pos.precoMedio ?? 0),
              String(pos.valorAtual ?? 0),
              String(pos.participacao ?? 0),
            ]);
          }
        }
        break;
      }
      case "proventos": {
        rows.push([
          "Ativo",
          "Data",
          "Tipo",
          "Valor por Cota",
          "Quantidade Cotas",
          "Total Recebido",
        ]);
        if (projections.proventos) {
          for (const prov of projections.proventos) {
            rows.push([
              prov.ativo || "",
              prov.data ? new Date(prov.data).toISOString().split("T")[0] : "",
              prov.tipo || "DIVIDENDO",
              String(prov.valorPorCota ?? 0),
              String(prov.quantidadeCotas ?? 0),
              String(prov.totalRecebido ?? 0),
            ]);
          }
        }
        break;
      }
      case "operacoes": {
        rows.push(["Ativo", "Data", "Tipo", "Quantidade", "Preço", "Total"]);
        if (projections.operacoes) {
          for (const op of projections.operacoes) {
            rows.push([
              op.ativo || "",
              op.data ? new Date(op.data).toISOString().split("T")[0] : "",
              op.tipo || "",
              String(op.quantidade ?? 0),
              String(op.preco ?? 0),
              String(op.total ?? 0),
            ]);
          }
        }
        break;
      }
      case "irpf": {
        rows.push(["Mês", "Tipo Operação", "Ativo", "Resultado", "IR Devido", "Base Cálculo"]);
        if (projections.fiscal) {
          for (const item of projections.fiscal) {
            rows.push([
              item.mes || "",
              item.tipoOperacao || "",
              item.ativo || "",
              String(item.resultado ?? 0),
              String(item.irDevido ?? 0),
              String(item.baseCalculo ?? 0),
            ]);
          }
        }
        break;
      }
      default: {
        rows.push(["template", "dados"]);
        rows.push([templateId, JSON.stringify(projections)]);
      }
    }

    return rows.map((row) => row.join(",")).join("\n");
  }

  private validar(command: ExportarRelatorioCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.formato) errors.formato = ["Formato é obrigatório"];
    if (!command.templateId) errors.templateId = ["Template é obrigatório"];
    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
