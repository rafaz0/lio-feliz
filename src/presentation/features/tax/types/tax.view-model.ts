import type {
  RelatorioFiscalDto,
  PosicaoFiscalDto,
  GanhoCapitalDto,
} from "@/presentation/shared/types/application-layer";

export interface TaxEntryViewModel {
  readonly ticker: string;
  readonly tipo: string;
  readonly valorVenda: number;
  readonly valorCompra: number;
  readonly ganho: number;
}

export interface TaxReportViewModel {
  readonly ano: number;
  readonly posicao31Dez: TaxEntryViewModel[];
  readonly dividendosAno: number;
  readonly jcpAno: number;
  readonly ganhoCapital: TaxEntryViewModel[];
  readonly prejuizoCompensar: number;
}

export interface TaxSummaryViewModel {
  readonly ano: number;
  readonly totalDividendos: number;
  readonly totalJcp: number;
  readonly totalGanhoCapital: number;
  readonly prejuizoCompensar: number;
  readonly quantidadePosicoes: number;
}

export type TaxFilterTipo = "TODOS" | "POSICAO" | "PROVENTOS" | "GANHO_CAPITAL";

export interface TaxFiltersViewModel {
  readonly ano: number;
  readonly tipo: TaxFilterTipo;
}

export function toTaxEntryViewModel(posicao: PosicaoFiscalDto): TaxEntryViewModel {
  return {
    ticker: posicao.ticker,
    tipo: "POSICAO",
    valorVenda: posicao.valorTotal,
    valorCompra: 0,
    ganho: 0,
  };
}

export function toGanhoCapitalViewModel(ganho: GanhoCapitalDto): TaxEntryViewModel {
  return {
    ticker: ganho.ticker,
    tipo: ganho.tipo,
    valorVenda: ganho.valorVenda,
    valorCompra: ganho.valorCompra,
    ganho: ganho.ganho,
  };
}

export function toTaxReportViewModel(dto: RelatorioFiscalDto): TaxReportViewModel {
  return {
    ano: dto.ano,
    posicao31Dez: dto.posicao31Dez.map(toTaxEntryViewModel),
    dividendosAno: dto.dividendosAno,
    jcpAno: dto.jcpAno,
    ganhoCapital: dto.ganhoCapital.map(toGanhoCapitalViewModel),
    prejuizoCompensar: dto.prejuizoCompensar,
  };
}

export function toTaxSummaryViewModel(report: TaxReportViewModel): TaxSummaryViewModel {
  const totalGanhoCapital = report.ganhoCapital.reduce((sum, g) => sum + g.ganho, 0);
  return {
    ano: report.ano,
    totalDividendos: report.dividendosAno,
    totalJcp: report.jcpAno,
    totalGanhoCapital,
    prejuizoCompensar: report.prejuizoCompensar,
    quantidadePosicoes: report.posicao31Dez.length,
  };
}

export function filterTaxEntries(
  report: TaxReportViewModel,
  filtros: TaxFiltersViewModel,
): TaxEntryViewModel[] {
  if (filtros.tipo === "POSICAO") {
    return report.posicao31Dez;
  }
  if (filtros.tipo === "PROVENTOS") {
    return [];
  }
  if (filtros.tipo === "GANHO_CAPITAL") {
    return report.ganhoCapital;
  }
  return [...report.posicao31Dez, ...report.ganhoCapital];
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
