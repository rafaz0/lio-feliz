import type { AtualizarTemaCommand } from "@/application/commands/atualizar-tema";
import type { ThemeConfigDto } from "@/application/dtos/preferencias";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { PreferencesService } from "@/core/domain/preferences";

export class AtualizarTemaService implements IApplicationService<AtualizarTemaCommand, ThemeConfigDto> {
  private readonly prefsService = new PreferencesService();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(command: AtualizarTemaCommand): Promise<ThemeConfigDto | ApplicationError> {
    if (!this.prefsService.validateTheme(command.theme)) {
      return new ValidationError("VALID_ERROR", `Tema invalido: ${command.theme}`);
    }

    await this.configRepo.saveOnboardingProgress(command.userId, JSON.stringify({ theme: command.theme }));
    return { theme: command.theme };
  }
}
