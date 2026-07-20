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
import { RebalancingService } from "@/core/domain/rebalancing/rebalancing-service";
import { normalisePercentages } from "@/core/domain/rebalancing/allocation-target";

export class CalcularRebalanceamentoService implements IApplicationService<
  CalcularRebalanceamentoQuery,
  RebalanceamentoDto
> {
  private readonly domainService = new RebalancingService();

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

    const classesMap = new Map<string, number>();
    for (const p of positions) {
      classesMap.set(p.classe, (classesMap.get(p.classe) ?? 0) + p.valorTotal);
    }
    const valorTotal = Array.from(classesMap.values()).reduce((sum, v) => sum + v, 0);

    const alocacaoAtual: AlocacaoDto[] = Array.from(classesMap.entries()).map(
      ([classe, valor]) => ({
        classe,
        valor,
        percentual: valorTotal > 0 ? parseFloat(((valor / valorTotal) * 100).toFixed(2)) : 0,
      }),
    );

    const estrategia = await this.configRepo.ObterEstrategia(query.portfolioId);

    if (!estrategia || Object.keys(estrategia.percentuais).length === 0) {
      return { alocacaoAtual, alocacaoDesejada: [], diferencas: [], sugestaoAportes: [] };
    }

    const normalised = normalisePercentages(estrategia.percentuais);
    const alocacaoDesejada: AlocacaoDto[] = Object.entries(normalised).map(
      ([classe, percentual]) => ({
        classe,
        valor: 0,
        percentual,
      }),
    );

    const targetPercentages = normalised;

    try {
      const proposal = this.domainService.generateProposal(
        alocacaoAtual.map((a) => ({
          className: a.classe,
          percentage: a.percentual,
          value: a.valor,
        })),
        targetPercentages,
        estrategia.toleranciaRebalanceamento ?? 5,
        query.valorAporte,
      );

      const diferencas: DiferencaAlocacaoDto[] = proposal.differences.map((d) => ({
        classe: d.className,
        percentualAtual: d.currentPercentage,
        percentualDesejado: d.targetPercentage,
        diferenca: d.difference,
      }));

      const sugestaoAportes: SugestaoAporteDto[] = proposal.suggestions
        .filter((s) => s.action === "APORTE" || s.action === "MANTER")
        .map((s) => ({ classe: s.className, valorSugerido: s.suggestedValue }));

      return { alocacaoAtual, alocacaoDesejada, diferencas, sugestaoAportes };
    } catch {
      const diferencas: DiferencaAlocacaoDto[] = alocacaoDesejada.map((desejada) => {
        const atual = alocacaoAtual.find((a) => a.classe === desejada.classe);
        const percentualAtual = atual?.percentual ?? 0;
        return {
          classe: desejada.classe,
          percentualAtual,
          percentualDesejado: desejada.percentual,
          diferenca: parseFloat((percentualAtual - desejada.percentual).toFixed(2)),
        };
      });

      const sugestaoAportes: SugestaoAporteDto[] = diferencas
        .filter((d) => d.diferenca < 0)
        .map((d) => ({ classe: d.classe, valorSugerido: 0 }));

      return { alocacaoAtual, alocacaoDesejada, diferencas, sugestaoAportes };
    }
  }
}
