import type { PatrimonioDto, AlocacaoDto } from "@/application/dtos";
import type { PosicaoDetalhadaDto, RentabilidadeDto } from "@/application/dtos/posicao";

const ALLOCATION_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export type AllocationTrend = "up" | "down" | "neutral";

export interface AllocationViewModel {
  readonly classe: string;
  readonly valor: string;
  readonly percentual: number;
  readonly fill: string;
}

export interface PortfolioSummaryViewModel {
  readonly patrimonioTotal: string;
  readonly patrimonioInvestido: string;
  readonly saldoDisponivel: string;
  readonly evolucaoMensal: string;
  readonly evolucaoMensalTrend: AllocationTrend;
  readonly moeda: string;
  readonly dataReferencia: string;
  readonly totalAtivos: number;
  readonly alocacao: AllocationViewModel[];
}

export interface PositionViewModel {
  readonly classe: string;
  readonly valor: string;
  readonly percentual: number;
  readonly fill: string;
}

export interface AssetViewModel {
  readonly ticker: string;
  readonly nome: string;
  readonly classe: string;
  readonly quantidade: string;
  readonly precoMedio: string;
  readonly valorTotal: string;
  readonly valorizacao: string;
  readonly rentabilidadeTotal: string;
  readonly rentabilidadePeriodo: string;
  readonly positions: PositionViewModel[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatPct(value: number): string {
  const signal = value > 0 ? "+" : "";
  return `${signal}${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}%`;
}

function formatQty(value: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 }).format(value);
}

function toTrend(value: number): AllocationTrend {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "neutral";
}

function formatReferencia(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function toAllocationViewModel(alocacao: AlocacaoDto[]): AllocationViewModel[] {
  return alocacao.map((item, index) => ({
    classe: item.classe,
    valor: formatCurrency(item.valor),
    percentual: item.percentual,
    fill: ALLOCATION_COLORS[index % ALLOCATION_COLORS.length],
  }));
}

export function toPortfolioSummaryViewModel(patrimonio: PatrimonioDto): PortfolioSummaryViewModel {
  return {
    patrimonioTotal: formatCurrency(patrimonio.patrimonioTotal),
    patrimonioInvestido: formatCurrency(patrimonio.patrimonioInvestido),
    saldoDisponivel: formatCurrency(patrimonio.saldoDisponivel),
    evolucaoMensal: formatPct(patrimonio.evolucaoMensal),
    evolucaoMensalTrend: toTrend(patrimonio.evolucaoMensal),
    moeda: patrimonio.moeda,
    dataReferencia: formatReferencia(patrimonio.dataReferencia),
    totalAtivos: patrimonio.alocacao.length,
    alocacao: toAllocationViewModel(patrimonio.alocacao),
  };
}

function toPositionViewModel(alocacao: AlocacaoDto, index: number): PositionViewModel {
  return {
    classe: alocacao.classe,
    valor: formatCurrency(alocacao.valor),
    percentual: alocacao.percentual,
    fill: ALLOCATION_COLORS[index % ALLOCATION_COLORS.length],
  };
}

export function toAssetViewModel(posicao: PosicaoDetalhadaDto): AssetViewModel {
  const rentabilidade: RentabilidadeDto = posicao.rentabilidade;
  return {
    ticker: posicao.ticker,
    nome: posicao.nome,
    classe: posicao.classe,
    quantidade: formatQty(posicao.quantidade),
    precoMedio: formatCurrency(posicao.precoMedio),
    valorTotal: formatCurrency(posicao.valorTotal),
    valorizacao: formatPct(rentabilidade.valorizacao),
    rentabilidadeTotal: formatPct(rentabilidade.rentabilidadeTotal),
    rentabilidadePeriodo: formatPct(rentabilidade.rentabilidadePeriodo),
    positions: [],
  };
}

export function toPortfolioPositionsViewModel(patrimonio: PatrimonioDto): PositionViewModel[] {
  return patrimonio.alocacao.map((item, index) => toPositionViewModel(item, index));
}
