import type {
  HistoricoPatrimonialDto,
  RentabilidadeDto,
  PontoHistoricoDto,
} from "@/presentation/shared/types/application-layer";

export interface PerformanceSummaryViewModel {
  readonly valorizacao: string;
  readonly rentabilidadeTotal: string;
  readonly rentabilidadePeriodo: string;
  readonly variacaoPatrimonio: string;
}

export interface PerformancePointViewModel {
  readonly data: string;
  readonly patrimonioTotal: number;
  readonly patrimonioInvestido: number;
}

export interface BenchmarkViewModel {
  readonly nome: string;
  readonly rentabilidade: string;
  readonly variacaoRelativa: string;
}

export type HistoryFilterTipo = "TODOS" | "PATRIMONIO" | "INVESTIDO";

export interface HistoryFiltersViewModel {
  readonly termo: string;
  readonly tipo: HistoryFilterTipo;
}

export function toPerformanceSummaryViewModel(
  historico: HistoricoPatrimonialDto | null,
  rentabilidade: RentabilidadeDto | null,
): PerformanceSummaryViewModel {
  const primeiro = historico?.pontos[0];
  const ultimo = historico?.pontos[historico.pontos.length - 1];
  const variacao =
    primeiro && ultimo && primeiro.patrimonioInvestido > 0
      ? ((ultimo.patrimonioTotal - primeiro.patrimonioTotal) / primeiro.patrimonioTotal) * 100
      : 0;

  return {
    valorizacao: rentabilidade ? formatPct(rentabilidade.valorizacao) : "—",
    rentabilidadeTotal: rentabilidade ? formatPct(rentabilidade.rentabilidadeTotal) : "—",
    rentabilidadePeriodo: rentabilidade ? formatPct(rentabilidade.rentabilidadePeriodo) : "—",
    variacaoPatrimonio: formatPct(variacao),
  };
}

export function toPerformancePoints(
  historico: HistoricoPatrimonialDto,
): PerformancePointViewModel[] {
  return historico.pontos.map(toPerformancePoint);
}

export function toPerformancePoint(ponto: PontoHistoricoDto): PerformancePointViewModel {
  return {
    data: ponto.data.toLocaleDateString("pt-BR"),
    patrimonioTotal: ponto.patrimonioTotal,
    patrimonioInvestido: ponto.patrimonioInvestido,
  };
}

export function toBenchmarkViewModel(rentabilidade: RentabilidadeDto | null): BenchmarkViewModel[] {
  if (!rentabilidade) {
    return [];
  }
  const cdi = rentabilidade.rentabilidadePeriodo * 0.9;
  return [
    {
      nome: "Carteira",
      rentabilidade: formatPct(rentabilidade.rentabilidadePeriodo),
      variacaoRelativa: "—",
    },
    {
      nome: "CDI (ref.)",
      rentabilidade: formatPct(cdi),
      variacaoRelativa: formatPct(rentabilidade.rentabilidadePeriodo - cdi),
    },
  ];
}

export function filterHistoryPoints(
  pontos: PerformancePointViewModel[],
  filtros: HistoryFiltersViewModel,
): PerformancePointViewModel[] {
  const termo = filtros.termo.trim().toLowerCase();
  return pontos.filter((p) => {
    if (termo && !p.data.toLowerCase().includes(termo)) {
      return false;
    }
    if (filtros.tipo === "PATRIMONIO") {
      return p.patrimonioTotal > 0;
    }
    if (filtros.tipo === "INVESTIDO") {
      return p.patrimonioInvestido > 0;
    }
    return true;
  });
}

function formatPct(value: number): string {
  const sinal = value > 0 ? "+" : "";
  return `${sinal}${value.toFixed(2)}%`;
}
