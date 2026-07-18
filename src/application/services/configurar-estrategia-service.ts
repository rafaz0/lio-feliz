import type { ConfigurarEstrategiaCommand } from "@/application/commands/configurar-estrategia";
import type { EstrategiaConfiguradaDto } from "@/application/dtos/estrategia";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConfigurarEstrategiaService implements IApplicationService<
  ConfigurarEstrategiaCommand,
  EstrategiaConfiguradaDto
> {
  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(
    command: ConfigurarEstrategiaCommand,
  ): Promise<EstrategiaConfiguradaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    await this.configRepo.SalvarEstrategia(command.usuarioId, {
      usuarioId: command.usuarioId,
      percentuais: command.percentuais,
      moeda: command.moeda,
      toleranciaRebalanceamento: command.toleranciaRebalanceamento,
    });

    if (command.metas && command.metas.length > 0) {
      const metas = command.metas.map((m, i) => ({
        metaId: `meta-${command.usuarioId}-${i}`,
        usuarioId: command.usuarioId,
        nome: m.nome,
        valorAlvo: m.valorAlvo,
        prazo: m.prazo,
      }));
      await this.configRepo.SalvarMetas(command.usuarioId, metas);
    }

    return {
      usuarioId: command.usuarioId,
      percentuais: command.percentuais,
      moeda: command.moeda,
      toleranciaRebalanceamento: command.toleranciaRebalanceamento,
      dataAtualizacao: new Date(),
    };
  }

  private validar(command: ConfigurarEstrategiaCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.usuarioId) errors.usuarioId = ["Campo obrigatório"];
    if (!command.percentuais || Object.keys(command.percentuais).length === 0)
      errors.percentuais = ["Pelo menos uma classe deve ser configurada"];
    if (!command.moeda) errors.moeda = ["Campo obrigatório"];
    if (
      command.toleranciaRebalanceamento == null ||
      command.toleranciaRebalanceamento < 0 ||
      command.toleranciaRebalanceamento > 100
    )
      errors.toleranciaRebalanceamento = ["Deve estar entre 0 e 100"];

    if (command.metas) {
      for (let i = 0; i < command.metas.length; i++) {
        if (!command.metas[i].nome) errors[`metas[${i}].nome`] = ["Nome é obrigatório"];
        if (!command.metas[i].valorAlvo || command.metas[i].valorAlvo <= 0)
          errors[`metas[${i}].valorAlvo`] = ["Deve ser maior que zero"];
        if (!command.metas[i].prazo) errors[`metas[${i}].prazo`] = ["Prazo é obrigatório"];
      }
    }

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
