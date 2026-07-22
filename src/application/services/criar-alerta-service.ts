import type { CriarAlertaCommand } from "@/application/commands/criar-alerta";
import type { AlertRuleDto } from "@/application/dtos/alerta";
import type { IApplicationService } from "@/application/application-service";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { AlertRule, AlertRuleId } from "@/core/domain/alerts";

export class CriarAlertaService implements IApplicationService<CriarAlertaCommand, AlertRuleDto> {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async Execute(command: CriarAlertaCommand): Promise<AlertRuleDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const rule = AlertRule.create({
      id: AlertRuleId.generate(),
      name: command.name,
      triggerWhen: command.triggerWhen,
      assetFilter: command.assetFilter,
      channel: command.channel,
      enabled: true,
      userId: command.userId,
      createdAt: new Date(),
    });

    await this.alertRepo.saveRule(rule);

    return {
      id: rule.id.value,
      name: rule.name,
      triggerWhen: { daysBefore: rule.triggerWhen.daysBefore, eventType: rule.triggerWhen.eventType },
      assetFilter: rule.assetFilter,
      channel: { type: rule.channel.type, destination: rule.channel.destination },
      enabled: rule.enabled,
      userId: rule.userId,
      createdAt: rule.createdAt.toISOString(),
    };
  }

  private validar(command: CriarAlertaCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.name) errors.name = ["Nome obrigatorio"];
    if (!command.triggerWhen) errors.triggerWhen = ["Gatilho obrigatorio"];
    if (command.triggerWhen) {
      if (command.triggerWhen.daysBefore < 0 || command.triggerWhen.daysBefore > 30) {
        errors.triggerWhen = ["daysBefore deve estar entre 0 e 30"];
      }
      if (!command.triggerWhen.eventType) {
        errors.triggerWhen = ["eventType obrigatorio"];
      }
    }
    if (!command.channel?.type) errors.channel = ["Canal obrigatorio"];
    if (!command.userId) errors.userId = ["Usuario obrigatorio"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
