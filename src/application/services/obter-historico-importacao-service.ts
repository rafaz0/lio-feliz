import type { ObterHistoricoImportacaoQuery } from "@/application/queries/obter-historico-importacao";
import type { HistoricoImportacaoDto } from "@/application/dtos/importacao";
import type { IApplicationService } from "@/application/application-service";
import type { IImportHistoryRepository } from "@/application/ports/import-history-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterHistoricoImportacaoService implements IApplicationService<
  ObterHistoricoImportacaoQuery,
  HistoricoImportacaoDto
> {
  constructor(private readonly importHistoryRepo: IImportHistoryRepository) {}

  async Execute(
    query: ObterHistoricoImportacaoQuery,
  ): Promise<HistoricoImportacaoDto | ApplicationError> {
    const jobs = await this.importHistoryRepo.findByUserId(query.usuarioId);
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const start = (page - 1) * pageSize;
    const paged = jobs.slice(start, start + pageSize);

    return {
      jobs: paged.map((j) => ({
        id: j.id.value,
        fileName: j.fileName,
        fileSize: j.fileSize,
        format: j.format,
        source: j.source,
        status: j.status,
        totalRecords: j.totalRecords,
        processedRecords: j.processedRecords,
        errorRecords: j.errorRecords,
        createdAt: j.createdAt.toISOString(),
        completedAt: j.completedAt?.toISOString(),
      })),
      total: jobs.length,
      page,
      pageSize,
    };
  }
}
