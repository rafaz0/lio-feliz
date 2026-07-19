import type { PatrimonioDto, AlocacaoDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto, PontoHistoricoDto } from "@/application/dtos/historico";

export interface KpiCardViewModel {
  readonly label: string;
  readonly value: string;
  readonly hint: string | null;
  readonly trend: "up" | "down" | "neutral";
}

export interface AlocacaoItemViewModel {
  readonly classe: string;
  readonly valor: string;
  readonly percentual: number;
  readonly fill: string;
}

export interface EvolucaoPontoViewModel {
  readonly data: string;
  readonly patrimonioTotal: number;
  readonly patrimonioInvestido: number;
}

export interface DashboardViewModel {
  readonly patrimonioTotal: string;
  readonly patrimonioInvestido: string;
  readonly saldoDisponivel: string;
  readonly evolucaoMensal: string;
  readonly evolucaoMensalTrend: "up" | "down" | "neutral";
  readonly moeda: string;
  readonly dataReferencia: string;
  readonly kpis: KpiCardViewModel[];
  readonly alocacao: AlocacaoItemViewModel[];
  readonly evolucao: EvolucaoPontoViewModel[];
}

const ALLOCATION_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

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

function toTrend(value: number): "up" | "down" | "neutral" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "neutral";
}

function formatReferencia(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatPontoData(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" }).format(date);
}

export function toKpiCardsViewModel(patrimonio: PatrimonioDto): KpiCardViewModel[] {
  return [
    {
      label: "Patrimônio Total",
      value: formatCurrency(patrimonio.patrimonioTotal),
      hint: "Soma de todos os ativos",
      trend: "neutral",
    },
    {
      label: "Investido",
      value: formatCurrency(patrimonio.patrimonioInvestido),
      hint: "Capital aplicado",
      trend: "neutral",
    },
    {
      label: "Disponível",
      value: formatCurrency(patrimonio.saldoDisponivel),
      hint: "Saldo livre",
      trend: "neutral",
    },
    {
      label: "Evolução Mensal",
      value: formatPct(patrimonio.evolucaoMensal),
      hint: null,
      trend: toTrend(patrimonio.evolucaoMensal),
    },
  ];
}

export function toAlocacaoViewModel(alocacao: AlocacaoDto[]): AlocacaoItemViewModel[] {
  return alocacao.map((item, index) => ({
    classe: item.classe,
    valor: formatCurrency(item.valor),
    percentual: item.percentual,
    fill: ALLOCATION_COLORS[index % ALLOCATION_COLORS.length],
  }));
}

export function toEvolucaoViewModel(historico: HistoricoPatrimonialDto): EvolucaoPontoViewModel[] {
  return historico.pontos.map((ponto: PontoHistoricoDto) => ({
    data: formatPontoData(ponto.data),
    patrimonioTotal: ponto.patrimonioTotal,
    patrimonioInvestido: ponto.patrimonioInvestido,
  }));
}

export function toDashboardViewModel(
  patrimonio: PatrimonioDto,
  historico: HistoricoPatrimonialDto,
): DashboardViewModel {
  return {
    patrimonioTotal: formatCurrency(patrimonio.patrimonioTotal),
    patrimonioInvestido: formatCurrency(patrimonio.patrimonioInvestido),
    saldoDisponivel: formatCurrency(patrimonio.saldoDisponivel),
    evolucaoMensal: formatPct(patrimonio.evolucaoMensal),
    evolucaoMensalTrend: toTrend(patrimonio.evolucaoMensal),
    moeda: patrimonio.moeda,
    dataReferencia: formatReferencia(patrimonio.dataReferencia),
    kpis: toKpiCardsViewModel(patrimonio),
    alocacao: toAlocacaoViewModel(patrimonio.alocacao),
    evolucao: toEvolucaoViewModel(historico),
  };
}
