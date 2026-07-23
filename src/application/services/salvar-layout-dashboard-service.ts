import type { SalvarLayoutDashboardCommand } from "@/application/commands/salvar-layout-dashboard";
import type { UserPreferencesDto } from "@/application/dtos/preferencias";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import type { ApplicationError } from "@/application/errors/application-error";
import { PreferencesService } from "@/core/domain/preferences";

export class SalvarLayoutDashboardService implements IApplicationService<
  SalvarLayoutDashboardCommand,
  UserPreferencesDto
> {
  private readonly prefsService = new PreferencesService();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(
    command: SalvarLayoutDashboardCommand,
  ): Promise<UserPreferencesDto | ApplicationError> {
    const merged = this.prefsService.mergeDefaults({ dashboardLayout: command.layout });

    await this.configRepo.saveOnboardingProgress(command.userId, JSON.stringify(merged));

    return {
      theme: merged.theme,
      notifications: merged.notifications,
      language: merged.language,
      layout: merged.dashboardLayout,
    };
  }
}
