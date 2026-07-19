import type { ProventosDto, ProventoDto } from "@/presentation/shared/types/application-layer";

export type DividendTipo = "DIVIDENDO" | "JCP" | "TODOS";

export interface DividendFiltersViewModel {
  readonly termo: string;
  readonly tipo: DividendTipo;
  readonly ano: string;
}

export interface DividendViewModel {
  readonly id: string;
  readonly ativoId: string;
  readonly ticker: string;
  readonly tipo: string;
  readonly tipoLabel: string;
  readonly valor: string;
  readonly valorNumerico: number;
  readonly dataPagamento: string;
  readonly dataBase: string;
}

export interface DividendsSummaryViewModel {
  readonly totalPeriodo: string;
  readonly totalAcumulado: string;
  readonly quantidade: number;
}

export function tipoToLabel(tipo: string): string {
  switch (tipo) {
    case "DIVIDENDO":
      return "Dividendo";
    case "JCP":
      return "JCP";
    default:
      return tipo;
  }
}

export function toDividendViewModel(dto: ProventoDto): DividendViewModel {
  return {
    id: `${dto.ativoId}-${dto.dataPagamento.toISOString()}-${dto.tipo}`,
    ativoId: dto.ativoId,
    ticker: dto.ticker,
    tipo: dto.tipo,
    tipoLabel: tipoToLabel(dto.tipo),
    valor: formatBRL(dto.valor),
    valorNumerico: dto.valor,
    dataPagamento: formatDate(dto.dataPagamento),
    dataBase: formatDate(dto.dataBase),
  };
}

export function toDividendViewModels(dto: ProventosDto): DividendViewModel[] {
  return dto.proventos.map(toDividendViewModel);
}

export function toDividendsSummaryViewModel(dto: ProventosDto): DividendsSummaryViewModel {
  return {
    totalPeriodo: formatBRL(dto.totalPeriodo),
    totalAcumulado: formatBRL(dto.totalAcumulado),
    quantidade: dto.proventos.length,
  };
}

export function filterDividends(
  dividends: DividendViewModel[],
  filtros: DividendFiltersViewModel,
): DividendViewModel[] {
  const termo = filtros.termo.trim().toLowerCase();
  return dividends.filter((d) => {
    const matchTermo = termo === "" || d.ticker.toLowerCase().includes(termo);
    const matchTipo = filtros.tipo === "TODOS" || d.tipo === filtros.tipo;
    return matchTermo && matchTipo;
  });
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}
