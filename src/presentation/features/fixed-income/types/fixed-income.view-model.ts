import type {
  RendaFixaDto,
  CronogramaPagamentosDto,
  CronogramaItemDto,
} from "@/application/dtos/renda-fixa";

export interface RendaFixaViewModel {
  readonly id: string;
  readonly ticker: string;
  readonly name: string;
  readonly institution: string;
  readonly productType: string;
  readonly productTypeLabel: string;
  readonly nominalValue: string;
  readonly rate: string;
  readonly rateType: string;
  readonly issueDate: string;
  readonly maturityDate: string;
  readonly projectedValue: string;
  readonly totalReturnPercent: number;
  readonly totalJuros: string;
  readonly totalAmortizacao: string;
}

export interface CronogramaItemViewModel {
  readonly assetId: string;
  readonly ticker: string;
  readonly date: string;
  readonly tipo: "JUROS" | "AMORTIZACAO";
  readonly tipoLabel: string;
  readonly valor: string;
}

export interface CronogramaViewModel {
  readonly items: CronogramaItemViewModel[];
  readonly totalJuros: string;
  readonly totalAmortizacao: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(date));
}

const PRODUCT_TYPE_LABELS: Record<string, string> = {
  TESOURO_DIRETO: "Tesouro Direto",
  CDB: "CDB",
  LCI: "LCI",
  LCA: "LCA",
  PREFIXADO: "Prefixado",
  POS_FIXADO: "Pós-fixado",
};

export function productTypeToLabel(type: string): string {
  return PRODUCT_TYPE_LABELS[type] ?? type;
}

export function toRendaFixaViewModel(dto: RendaFixaDto): RendaFixaViewModel {
  return {
    id: dto.id,
    ticker: dto.ticker,
    name: dto.name,
    institution: dto.institution,
    productType: dto.productType,
    productTypeLabel: productTypeToLabel(dto.productType),
    nominalValue: formatCurrency(dto.nominalValue),
    rate: `${dto.rate.toFixed(2)}%`,
    rateType: dto.rateType,
    issueDate: formatDate(dto.issueDate),
    maturityDate: formatDate(dto.maturityDate),
    projectedValue: formatCurrency(dto.projectedValue),
    totalReturnPercent: dto.totalReturnPercent,
    totalJuros: formatCurrency(dto.totalJuros),
    totalAmortizacao: formatCurrency(dto.totalAmortizacao),
  };
}

export function toRendaFixaViewModels(dtos: RendaFixaDto[]): RendaFixaViewModel[] {
  return dtos.map(toRendaFixaViewModel);
}

function toCronogramaItemViewModel(dto: CronogramaItemDto): CronogramaItemViewModel {
  return {
    assetId: dto.assetId,
    ticker: dto.ticker,
    date: formatDate(dto.date),
    tipo: dto.tipo,
    tipoLabel: dto.tipo === "JUROS" ? "Juros" : "Amortização",
    valor: formatCurrency(dto.valor),
  };
}

export function toCronogramaViewModel(dto: CronogramaPagamentosDto): CronogramaViewModel {
  return {
    items: dto.items.map(toCronogramaItemViewModel),
    totalJuros: formatCurrency(dto.totalJuros),
    totalAmortizacao: formatCurrency(dto.totalAmortizacao),
  };
}
