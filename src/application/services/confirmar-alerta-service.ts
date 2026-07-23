import type { ConfirmarAlertaCommand } from "@/application/commands/confirmar-alerta";
import type { AlertaDto } from "@/application/dtos/alerta";
import type { IApplicationService } from "@/application/application-service";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConfirmarAlertaService implements IApplicationService<
  ConfirmarAlertaCommand,
  AlertaDto
> {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async Execute(command: ConfirmarAlertaCommand): Promise<AlertaDto | ApplicationError> {
    const alert = await this.alertRepo.findAlertById(command.alertId);
    if (!alert) {
      return new NotFoundError("Alert", command.alertId);
    }

    await this.alertRepo.updateDeliveryAck(command.alertId);

    const delivery = await this.alertRepo.findDeliveryByAlert(command.alertId);

    return {
      id: alert.id.value,
      ruleId: alert.ruleId,
      runId: alert.runId,
      assetTicker: alert.assetTicker,
      eventDate: alert.eventDate.toISOString(),
      message: alert.message,
      severity: alert.severity,
      createdAt: alert.createdAt.toISOString(),
      ack: delivery?.ack ?? true,
    };
  }
}
