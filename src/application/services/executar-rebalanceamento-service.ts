import type { ExecutarRebalanceamentoCommand } from "@/application/commands/executar-rebalanceamento";
import type { IApplicationService } from "@/application/application-service";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { PortfolioId } from "@/core/domain";

export interface ExecutarRebalanceamentoResult {
  readonly acoesProcessadas: number;
  readonly sucesso: boolean;
  readonly mensagem: string;
}

export class ExecutarRebalanceamentoService implements IApplicationService<
  ExecutarRebalanceamentoCommand,
  ExecutarRebalanceamentoResult
> {
  constructor(
    private readonly portfolioRepository: IPortfolioRepository,
    private readonly eventPublisher: IDomainEventPublisher,
  ) {}

  async Execute(
    command: ExecutarRebalanceamentoCommand,
  ): Promise<ExecutarRebalanceamentoResult | ApplicationError> {
    if (!command.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!command.acoes || command.acoes.length === 0) {
      return new ValidationError("VALID_ERROR", "Nenhuma ação de rebalanceamento informada");
    }

    for (const acao of command.acoes) {
      if (acao.valor <= 0) {
        return new ValidationError(
          "VALID_ERROR",
          `Valor inválido para ${acao.classe}: ${acao.valor}`,
        );
      }
    }

    const portfolio = await this.portfolioRepository.ObterPorId(
      PortfolioId.create(command.portfolioId),
    );
    if (!portfolio) {
      return new ValidationError("NOT_FOUND", "Carteira não encontrada");
    }

    return {
      acoesProcessadas: command.acoes.length,
      sucesso: true,
      mensagem: `Rebalanceamento concluído: ${command.acoes.length} ação(ões) processada(s).`,
    };
  }
}
