import type { GerenciarAssinaturaCommand } from "@/application/commands/gerenciar-assinatura";
import type { AssinaturaAtualizadaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { INotificationPort } from "@/application/ports/notification-port";
import { NotFoundError } from "@/application/errors/application-error";
import { ValidationError } from "@/application/errors/application-error";
import { AuthorizationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

const ACOES_VALIDAS: readonly string[] = ["ativar", "cancelar", "alterar"];

export class GerenciarAssinaturaService implements IApplicationService<
  GerenciarAssinaturaCommand,
  AssinaturaAtualizadaDto
> {
  constructor(
    private readonly subscriptionRepo: ISubscriptionRepository,
    private readonly notificationPort: INotificationPort,
  ) {}

  async Execute(
    command: GerenciarAssinaturaCommand,
  ): Promise<AssinaturaAtualizadaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const assinaturaAtual = await this.subscriptionRepo.ObterPlanoAtivo(command.usuarioId);

    const planosDisponiveis = await this.subscriptionRepo.ListarPlanosDisponiveis();
    if (command.plano && !planosDisponiveis.some((p) => p.planoId === command.plano)) {
      return new NotFoundError("Plano", command.plano, "PLANO_NOT_FOUND");
    }

    if (!assinaturaAtual && command.acao !== "ativar") {
      return new AuthorizationError(
        "SEM_ASSINATURA",
        "Usuário não possui assinatura ativa para executar esta operação",
      );
    }

    const plano = command.plano ?? assinaturaAtual?.plano ?? "gratuito";
    const planos = await this.subscriptionRepo.ListarPlanosDisponiveis();
    const planoInfo = planos.find((p) => p.planoId === plano);

    const novaAssinatura = {
      usuarioId: command.usuarioId,
      plano,
      dataAtivacao: new Date(),
      dataExpiracao: command.acao === "cancelar" ? new Date() : calcularExpiracao(plano),
      recursosLiberados: planoInfo?.recursos ?? [],
    };

    await this.subscriptionRepo.Salvar(novaAssinatura);

    await this.notificationPort.Notificar(
      command.usuarioId,
      "Assinatura Atualizada",
      `Sua assinatura foi ${command.acao === "ativar" ? "ativada" : command.acao === "cancelar" ? "cancelada" : "alterada"} para o plano ${plano}.`,
    );

    return {
      usuarioId: command.usuarioId,
      plano: novaAssinatura.plano,
      dataAtivacao: novaAssinatura.dataAtivacao,
      dataExpiracao: novaAssinatura.dataExpiracao,
      recursosLiberados: novaAssinatura.recursosLiberados,
    };
  }

  private validar(command: GerenciarAssinaturaCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.usuarioId) errors.usuarioId = ["Campo obrigatório"];
    if (!command.acao) errors.acao = ["Campo obrigatório"];
    else if (!ACOES_VALIDAS.includes(command.acao))
      errors.acao = [`Ação inválida: ${command.acao}. Válidas: ${ACOES_VALIDAS.join(", ")}`];
    if ((command.acao === "ativar" || command.acao === "alterar") && !command.plano)
      errors.plano = ["Plano é obrigatório para ativação/ alteração"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}

function calcularExpiracao(plano: string): Date | null {
  if (plano === "gratuito") return null;
  const expiracao = new Date();
  expiracao.setMonth(expiracao.getMonth() + 1);
  return expiracao;
}
