import type { ObterTemaQuery } from "@/application/queries/obter-tema";
import type { ThemeConfigDto } from "@/application/dtos/preferencias";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterTemaService implements IApplicationService<ObterTemaQuery, ThemeConfigDto> {
  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(query: ObterTemaQuery): Promise<ThemeConfigDto | ApplicationError> {
    const data = await this.configRepo.findOnboardingProgress(query.userId);
    if (!data) return new NotFoundError("Theme", query.userId);

    const parsed = JSON.parse(data);
    return { theme: parsed.theme ?? "SYSTEM" };
  }
}
