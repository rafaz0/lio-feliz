import type { ListarAlertasAtivosQuery } from "@/application/queries/listar-alertas-ativos";
import type { AlertRuleListDto } from "@/application/dtos/alerta";
import type { IApplicationService } from "@/application/application-service";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListarAlertasAtivosService
  implements IApplicationService<ListarAlertasAtivosQuery, AlertRuleListDto>
{
  constructor(private readonly alertRepo: IAlertRepository) {}

  async Execute(query: ListarAlertasAtivosQuery): Promise<AlertRuleListDto | ApplicationError> {
    const rules = await this.alertRepo.findRulesByUser(query.userId);

    return {
      rules: rules.map((r) => ({
        id: r.id.value,
        name: r.name,
        triggerWhen: { daysBefore: r.triggerWhen.daysBefore, eventType: r.triggerWhen.eventType },
        assetFilter: r.assetFilter,
        channel: { type: r.channel.type, destination: r.channel.destination },
        enabled: r.enabled,
        userId: r.userId,
        createdAt: r.createdAt.toISOString(),
        lastTriggeredAt: r.lastTriggeredAt?.toISOString(),
      })),
    };
  }
}
