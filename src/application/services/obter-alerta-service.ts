import type { ObterAlertaQuery } from "@/application/queries/obter-alerta";
import type { AlertListDto } from "@/application/dtos/alerta";
import type { IApplicationService } from "@/application/application-service";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterAlertaService implements IApplicationService<ObterAlertaQuery, AlertListDto> {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async Execute(query: ObterAlertaQuery): Promise<AlertListDto | ApplicationError> {
    const alerts = await this.alertRepo.findAlertsByUser(query.userId);
    const deliveries = await this.alertRepo.findDeliveriesByUser(query.userId);

    const ackMap = new Map(deliveries.map((d) => [d.alertId, d.ack]));

    return {
      alerts: alerts.map((a) => ({
        id: a.id.value,
        ruleId: a.ruleId,
        runId: a.runId,
        assetTicker: a.assetTicker,
        eventDate: a.eventDate.toISOString(),
        message: a.message,
        severity: a.severity,
        createdAt: a.createdAt.toISOString(),
        ack: ackMap.get(a.id.value) ?? false,
      })),
    };
  }
}
