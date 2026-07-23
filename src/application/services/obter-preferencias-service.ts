import type { ObterPreferenciasQuery } from "@/application/queries/obter-preferencias";
import type { UserPreferencesDto } from "@/application/dtos/preferencias";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { PreferencesService } from "@/core/domain/preferences";

export class ObterPreferenciasService implements IApplicationService<
  ObterPreferenciasQuery,
  UserPreferencesDto
> {
  private readonly prefsService = new PreferencesService();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(query: ObterPreferenciasQuery): Promise<UserPreferencesDto | ApplicationError> {
    const data = await this.configRepo.findOnboardingProgress(query.userId);
    if (!data) return new NotFoundError("Preferences", query.userId);

    const parsed = JSON.parse(data);
    const merged = this.prefsService.mergeDefaults({
      theme: parsed.theme,
      notifications: parsed.notifications,
      language: parsed.language,
    });

    return {
      theme: merged.theme,
      notifications: merged.notifications,
      language: merged.language,
      layout: merged.dashboardLayout,
    };
  }
}
