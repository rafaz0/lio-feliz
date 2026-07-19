import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { PatrimonioDto } from "@/application/dtos";
import type { PosicaoDetalhadaDto } from "@/application/dtos/posicao";

export interface FakePortfolioDispatcherOptions {
  patrimonio?: PatrimonioDto | null;
  posicoes?: Record<string, PosicaoDetalhadaDto>;
  patrimonioError?: ApplicationError;
}

export class FakePortfolioDispatcher implements IDispatcher {
  public patrimonioCalls = 0;
  public posicaoCalls = 0;
  private readonly options: FakePortfolioDispatcherOptions;

  constructor(options: FakePortfolioDispatcherOptions = {}) {
    this.options = options;
  }

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakePortfolioDispatcher não suporta comandos nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    switch (query.type) {
      case "ObterPatrimonioQuery": {
        this.patrimonioCalls++;
        if (this.options.patrimonioError) return this.options.patrimonioError as ApplicationError;
        return (this.options.patrimonio ?? null) as TDto;
      }
      case "ConsultarPosicaoQuery": {
        this.posicaoCalls++;
        const ativoId = (query as { ativoId: string }).ativoId;
        const posicao = this.options.posicoes?.[ativoId] ?? null;
        return posicao as TDto;
      }
      default:
        throw new Error(`FakePortfolioDispatcher: query não suportada ${query.type}`);
    }
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
