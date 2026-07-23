import type { ConfigurarIntegracaoCommand } from "@/application/commands/configurar-integracao";
import type { IntegracaoConfiguradaDto } from "@/application/dtos/integracao";
import type { IApplicationService } from "@/application/application-service";
import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { IntegrationConfig } from "@/core/domain/integrations";

export class ConfigurarIntegracaoService implements IApplicationService<
  ConfigurarIntegracaoCommand,
  IntegracaoConfiguradaDto
> {
  constructor(private readonly integrationRepo: IIntegrationRepository) {}

  async Execute(
    command: ConfigurarIntegracaoCommand,
  ): Promise<IntegracaoConfiguradaDto | ApplicationError> {
    if (!command.provider || !command.name) {
      return new ValidationError("VALID_ERROR", "Provider e name são obrigatórios");
    }

    const config = IntegrationConfig.create({
      provider: command.provider as any,
      name: command.name,
      authType: command.authType as any,
      configData: command.configData,
    });

    await this.integrationRepo.save(config);

    return {
      id: config.id.value,
      provider: config.provider,
      name: config.name,
      status: config.status,
    };
  }
}
