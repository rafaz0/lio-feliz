import type { ObterRelatoriosDisponiveisQuery } from "@/application/queries/obter-relatorios-disponiveis";
import type { ReportTemplateListDto, ReportTemplateDto } from "@/application/dtos/relatorio";
import type { IApplicationService } from "@/application/application-service";
import type { ApplicationError } from "@/application/errors/application-error";
import { ReportRenderingService } from "@/core/domain/reports";

export class ObterRelatoriosDisponiveisService
  implements IApplicationService<ObterRelatoriosDisponiveisQuery, ReportTemplateListDto>
{
  private readonly renderingService = new ReportRenderingService();

  async Execute(_query: ObterRelatoriosDisponiveisQuery): Promise<ReportTemplateListDto | ApplicationError> {
    const templates = this.renderingService.getBuiltInTemplates();

    return {
      templates: templates.map((t) => ({
        id: t.id.value,
        name: t.name,
        description: t.description,
        category: t.category,
        supportedFormats: t.supportedFormats,
        icon: t.icon,
        isBuiltIn: t.isBuiltIn,
      })),
    };
  }
}
