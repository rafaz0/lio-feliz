import type { CalcularRebalanceamentoQuery } from "@/application/queries/calcular-rebalanceamento";
import type {
  RebalanceamentoDto,
  DiferencaAlocacaoDto,
  SugestaoAporteDto,
} from "@/application/dtos/rebalanceamento";
import type { AlocacaoDto } from "@/application/dtos/patrimonio";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class CalcularRebalanceamentoService implements IApplicationService<
  CalcularRebalanceamentoQuery,
  RebalanceamentoDto
> {
  constructor(
    private readonly projectionRepo: IProjectionRepository,
    private readonly configRepo: IConfigurationRepository,
  ) {}

  async Execute(
    query: CalcularRebalanceamentoQuery,
  ): Promise<RebalanceamentoDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const positions = await this.projectionRepo.ObterPosicoes(query.portfolioId);

    const agrupado = new Map<string, number>();
    for (const p of positions) {
      agrupado.set(p.classe, (agrupado.get(p.classe) ?? 0) + p.valorTotal);
    }
    const valorTotal = Array.from(agrupado.values()).reduce((sum, v) => sum + v, 0);
    const alocacaoAtual: AlocacaoDto[] = Array.from(agrupado.entries()).map(([classe, valor]) => ({
      classe,
      valor,
      percentual: valorTotal > 0 ? (valor / valorTotal) * 100 : 0,
    }));

    let estrategia = await this.configRepo.ObterEstrategia(query.portfolioId);

    const alocacaoDesejada: AlocacaoDto[] = estrategia
      ? Object.entries(estrategia.percentuais).map(([classe, percentual]) => ({
          classe,
          valor: 0,
          percentual,
        }))
      : [];

    const diferencas: DiferencaAlocacaoDto[] = alocacaoDesejada.map((desejada) => {
      const atual = alocacaoAtual.find((a) => a.classe === desejada.classe);
      const percentualAtual = atual?.percentual ?? 0;
      return {
        classe: desejada.classe,
        percentualAtual,
        percentualDesejado: desejada.percentual,
        diferenca: percentualAtual - desejada.percentual,
      };
    });

    const sugestaoAportes: SugestaoAporteDto[] = diferencas
      .filter((d) => d.diferenca < 0)
      .map((d) => ({
        classe: d.classe,
        valorSugerido: 0,
      }));

    return { alocacaoAtual, alocacaoDesejada, diferencas, sugestaoAportes };
  }
}
