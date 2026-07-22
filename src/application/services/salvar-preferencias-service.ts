import type { SalvarPreferenciasCommand } from "@/application/commands/salvar-preferencias";
import type { UserPreferencesDto } from "@/application/dtos/preferencias";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { PreferencesService } from "@/core/domain/preferences";

export class SalvarPreferenciasService
  implements IApplicationService<SalvarPreferenciasCommand, UserPreferencesDto>
{
  private readonly prefsService = new PreferencesService();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(command: SalvarPreferenciasCommand): Promise<UserPreferencesDto | ApplicationError> {
    const merged = this.prefsService.mergeDefaults({
      theme: command.theme,
      notifications: command.notifications,
      language: command.language,
    });

    const dto: UserPreferencesDto = {
      theme: merged.theme,
      notifications: merged.notifications,
      language: merged.language,
      layout: merged.dashboardLayout,
    };

    await this.configRepo.saveOnboardingProgress(command.userId, JSON.stringify(dto));
    return dto;
  }
}
