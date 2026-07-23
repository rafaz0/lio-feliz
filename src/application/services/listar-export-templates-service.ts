import type { ListarExportTemplatesQuery } from "@/application/queries/listar-export-templates";
import type { ExportTemplateDto, ExportJobListDto } from "@/application/dtos/exportacao-avancada";
import type { IApplicationService } from "@/application/application-service";
import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListarExportTemplatesService implements IApplicationService<
  ListarExportTemplatesQuery,
  ExportJobListDto
> {
  constructor(private readonly exportRepo: IExportTemplateRepository) {}

  async Execute(_query: ListarExportTemplatesQuery): Promise<ExportJobListDto | ApplicationError> {
    const templates = await this.exportRepo.findAllTemplates();

    return {
      jobs: templates.map((t) => ({
        id: t.id.value,
        templateId: t.id.value,
        portfolioId: "",
        status: "COMPLETED",
        requestedAt: new Date().toISOString(),
      })),
      total: templates.length,
    };
  }
}
