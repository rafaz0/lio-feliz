import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";
import type { IApplicationService } from "@/application/application-service";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import { PortfolioId } from "@/core/domain";
import type { DomainEvent } from "@/core/domain";
import { BuyEvent } from "@/core/domain/portfolio";
import { SellEvent } from "@/core/domain/portfolio";
import { DividendEvent } from "@/core/domain/portfolio";
import { JcpEvent } from "@/core/domain/portfolio";
import { NotFoundError } from "@/application/errors/application-error";
import { ValidationError } from "@/application/errors/application-error";
import { InternalError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { convertDomainError } from "@/application/error-converter";
import type { FinancialEvent } from "@/core/domain/portfolio";

type TipoOperacaoSuportada = "BUY" | "SELL" | "DIVIDEND" | "JCP";

const TIPOS_SUPORTADOS: readonly string[] = ["BUY", "SELL", "DIVIDEND", "JCP"];

export class RegistrarOperacaoService implements IApplicationService<
  RegistrarOperacaoCommand,
  OperacaoRegistradaDto
> {
  constructor(
    private readonly portfolioRepo: IPortfolioRepository,
    private readonly eventPublisher: IDomainEventPublisher,
  ) {}

  async Execute(
    command: RegistrarOperacaoCommand,
  ): Promise<OperacaoRegistradaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const correlationId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    const portfolioId = PortfolioId.create(command.portfolioId);
    const portfolio = await this.portfolioRepo.ObterPorId(portfolioId);
    if (!portfolio) {
      return new NotFoundError("Portfolio", command.portfolioId, "PORTFOLIO_NOT_FOUND");
    }

    const event = criarEventoFinanceiro(
      command.tipo as TipoOperacaoSuportada,
      command.portfolioId,
      correlationId,
      command.ativoId,
      command.quantidade,
      command.valor,
    );

    const applyResult = portfolio.applyEvent(event);
    if (applyResult.isFailure) {
      const { error } = convertDomainError(applyResult.error!, correlationId);
      return error;
    }

    await this.portfolioRepo.Salvar(portfolio);

    await this.eventPublisher.PublicarVarios([event as unknown as DomainEvent]);

    return {
      operacaoId: event.eventId,
      tipo: command.tipo,
      ativoId: command.ativoId,
      quantidade: command.quantidade,
      valor: command.valor,
      data: command.data,
      status: "CONFIRMED",
    };
  }

  private validar(command: RegistrarOperacaoCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.tipo) errors.tipo = ["Campo obrigatório"];
    else if (!TIPOS_SUPORTADOS.includes(command.tipo))
      errors.tipo = [
        `Tipo não suportado: ${command.tipo}. Tipos válidos: ${TIPOS_SUPORTADOS.join(", ")}`,
      ];
    if (!command.ativoId) errors.ativoId = ["Campo obrigatório"];
    if (command.quantidade == null || command.quantidade <= 0)
      errors.quantidade = ["Deve ser maior que zero"];
    if (command.valor == null || command.valor <= 0) errors.valor = ["Deve ser maior que zero"];
    if (!command.data) errors.data = ["Campo obrigatório"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}

function criarEventoFinanceiro(
  tipo: TipoOperacaoSuportada,
  portfolioId: string,
  correlationId: string,
  ativoId: string,
  quantidade: number,
  valorTotal: number,
): FinancialEvent {
  const unitValue = quantidade > 0 ? valorTotal / quantidade : 0;

  switch (tipo) {
    case "BUY":
      return new BuyEvent(portfolioId, correlationId, ativoId, quantidade, unitValue);
    case "SELL":
      return new SellEvent(portfolioId, correlationId, ativoId, quantidade, unitValue);
    case "DIVIDEND":
      return new DividendEvent(portfolioId, correlationId, ativoId, quantidade, unitValue);
    case "JCP":
      return new JcpEvent(portfolioId, correlationId, ativoId, quantidade, unitValue);
  }
}
