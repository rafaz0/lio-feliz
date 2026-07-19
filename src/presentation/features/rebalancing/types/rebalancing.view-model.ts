import type {
  RebalanceamentoDto,
  AlocacaoDto,
  DiferencaAlocacaoDto,
  SugestaoAporteDto,
} from "@/presentation/shared/types/application-layer";

export interface AllocationViewModel {
  readonly classe: string;
  readonly valor: number;
  readonly percentual: number;
}

export interface AllocationDiffViewModel {
  readonly classe: string;
  readonly percentualAtual: number;
  readonly percentualDesejado: number;
  readonly diferenca: number;
}

export interface SuggestedContributionViewModel {
  readonly classe: string;
  readonly valorSugerido: number;
}

export type RebalancingFilterTipo = "TODOS" | "DESVALANCE" | "EQUILIBRADO";

export interface RebalancingFiltersViewModel {
  readonly tipo: RebalancingFilterTipo;
}

export function toAllocationViewModel(alocacao: AlocacaoDto): AllocationViewModel {
  return {
    classe: alocacao.classe,
    valor: alocacao.valor,
    percentual: alocacao.percentual,
  };
}

export function toAllocationViewModels(alocacoes: AlocacaoDto[]): AllocationViewModel[] {
  return alocacoes.map(toAllocationViewModel);
}

export function toAllocationDiffViewModel(
  diferenca: DiferencaAlocacaoDto,
): AllocationDiffViewModel {
  return {
    classe: diferenca.classe,
    percentualAtual: diferenca.percentualAtual,
    percentualDesejado: diferenca.percentualDesejado,
    diferenca: diferenca.diferenca,
  };
}

export function toAllocationDiffViewModels(
  diferencas: DiferencaAlocacaoDto[],
): AllocationDiffViewModel[] {
  return diferencas.map(toAllocationDiffViewModel);
}

export function toSuggestedContributionViewModel(
  sugestao: SugestaoAporteDto,
): SuggestedContributionViewModel {
  return {
    classe: sugestao.classe,
    valorSugerido: sugestao.valorSugerido,
  };
}

export function toSuggestedContributionViewModels(
  sugestoes: SugestaoAporteDto[],
): SuggestedContributionViewModel[] {
  return sugestoes.map(toSuggestedContributionViewModel);
}

export function toRebalancingViewModel(dto: RebalanceamentoDto) {
  return {
    alocacaoAtual: toAllocationViewModels(dto.alocacaoAtual),
    alocacaoDesejada: toAllocationViewModels(dto.alocacaoDesejada),
    diferencas: toAllocationDiffViewModels(dto.diferencas),
    sugestoes: toSuggestedContributionViewModels(dto.sugestaoAportes),
  };
}

export function filterRebalancingDiffs(
  diferencas: AllocationDiffViewModel[],
  filtros: RebalancingFiltersViewModel,
): AllocationDiffViewModel[] {
  if (filtros.tipo === "DESVALANCE") {
    return diferencas.filter((d) => Math.abs(d.diferenca) > 0.01);
  }
  if (filtros.tipo === "EQUILIBRADO") {
    return diferencas.filter((d) => Math.abs(d.diferenca) <= 0.01);
  }
  return diferencas;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
