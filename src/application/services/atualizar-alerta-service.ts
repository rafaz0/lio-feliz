import type { AtualizarAlertaCommand } from "@/application/commands/atualizar-alerta";
import type { AlertRuleDto } from "@/application/dtos/alerta";
import type { IApplicationService } from "@/application/application-service";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import { NotFoundError, InternalError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { AlertRule, AlertRuleId } from "@/core/domain/alerts";

export class AtualizarAlertaService implements IApplicationService<
  AtualizarAlertaCommand,
  AlertRuleDto
> {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async Execute(command: AtualizarAlertaCommand): Promise<AlertRuleDto | ApplicationError> {
    const existing = await this.alertRepo.findRuleById(command.ruleId);
    if (!existing) {
      return new NotFoundError("AlertRule", command.ruleId);
    }

    const updated = AlertRule.create({
      id: existing.id,
      name: command.name ?? existing.name,
      triggerWhen: command.triggerWhen ?? existing.triggerWhen,
      assetFilter: command.assetFilter ?? existing.assetFilter,
      channel: command.channel ?? existing.channel,
      enabled: command.enabled ?? existing.enabled,
      userId: existing.userId,
      createdAt: existing.createdAt,
      lastTriggeredAt: existing.lastTriggeredAt,
    });

    await this.alertRepo.saveRule(updated);

    return {
      id: updated.id.value,
      name: updated.name,
      triggerWhen: {
        daysBefore: updated.triggerWhen.daysBefore,
        eventType: updated.triggerWhen.eventType,
      },
      assetFilter: updated.assetFilter,
      channel: { type: updated.channel.type, destination: updated.channel.destination },
      enabled: updated.enabled,
      userId: updated.userId,
      createdAt: updated.createdAt.toISOString(),
      lastTriggeredAt: updated.lastTriggeredAt?.toISOString(),
    };
  }
}
