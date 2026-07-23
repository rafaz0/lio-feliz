import type { CriarComparacaoCommand } from "@/application/commands/criar-comparacao";
import type { ComparacaoDto } from "@/application/dtos/comparacao";
import type { IApplicationService } from "@/application/application-service";
import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError, InternalError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import {
  ComparisonSet,
  ComparisonSetId,
  ComparisonEntry,
  ComparisonEntryId,
  ComparisonAggregator,
} from "@/core/domain/comparison";

export class CriarComparacaoService implements IApplicationService<
  CriarComparacaoCommand,
  ComparacaoDto
> {
  private readonly aggregator = new ComparisonAggregator();

  constructor(
    private readonly comparisonRepo: IComparisonRepository,
    private readonly projectionRepo: IProjectionRepository,
  ) {}

  async Execute(command: CriarComparacaoCommand): Promise<ComparacaoDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const setId = ComparisonSetId.generate();
    const entries = command.entries.map((e, i) =>
      ComparisonEntry.create({
        id: ComparisonEntryId.generate(),
        comparisonSetId: setId.value,
        assetTicker: e.assetTicker,
        assetType: e.assetType,
        weight: e.weight,
      }),
    );

    const comparisonSet = ComparisonSet.create({
      id: setId,
      name: command.name,
      entries,
      scope: command.scope,
      userId: command.userId,
      createdAt: new Date(),
    });

    await this.comparisonRepo.saveComparisonSet(comparisonSet);

    try {
      const projections = await this.loadProjections(command.entries.map((e) => e.assetTicker));
      const result = this.aggregator.aggregate(comparisonSet, projections);

      if (result.isSuccess && result.value) {
        await this.comparisonRepo.saveScorecard(result.value);
      }
    } catch (err) {
      return new InternalError(
        "AGGREGATION_FAILED",
        err instanceof Error ? err.message : "Falha na agregacao",
      );
    }

    return {
      id: comparisonSet.id.value,
      name: comparisonSet.name,
      entries: comparisonSet.entries.map((e) => ({
        assetTicker: e.assetTicker,
        assetType: e.assetType,
        weight: e.weight,
      })),
      scope: comparisonSet.scope,
      userId: comparisonSet.userId,
      createdAt: comparisonSet.createdAt.toISOString(),
    };
  }

  private async loadProjections(
    tickers: string[],
  ): Promise<Array<{ assetTicker: string; monthlyReturns: number[]; dividendYield12m: number }>> {
    const results: Array<{
      assetTicker: string;
      monthlyReturns: number[];
      dividendYield12m: number;
    }> = [];

    for (const ticker of tickers) {
      try {
        const projection = await this.projectionRepo.obterSerieMensal(ticker);
        results.push({
          assetTicker: ticker,
          monthlyReturns: projection?.monthlyReturns ?? [],
          dividendYield12m: projection?.dividendYield12m ?? 0,
        });
      } catch {
        results.push({ assetTicker: ticker, monthlyReturns: [], dividendYield12m: 0 });
      }
    }

    return results;
  }

  private validar(command: CriarComparacaoCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.name) errors.name = ["Nome obrigatorio"];
    if (!command.entries || command.entries.length < 2) {
      errors.entries = ["Pelo menos 2 ativos obrigatorios"];
    }
    if (!command.userId) errors.userId = ["Usuario obrigatorio"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
