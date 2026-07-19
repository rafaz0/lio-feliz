import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";

export type OperationTipo = "BUY" | "SELL" | "DIVIDEND" | "JCP";

export interface OperationViewModel {
  readonly id: string;
  readonly tipo: OperationTipo;
  readonly tipoLabel: string;
  readonly ativoId: string;
  readonly quantidade: string;
  readonly valor: string;
  readonly data: string;
  readonly status: string;
}

export interface OperationFiltersViewModel {
  readonly termo: string;
  readonly tipo: OperationTipo | "TODOS";
}

const TIPO_LABELS: Record<OperationTipo, string> = {
  BUY: "Compra",
  SELL: "Venda",
  DIVIDEND: "Dividendo",
  JCP: "JCP",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatQty(value: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 }).format(value);
}

function formatData(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function tipoToLabel(tipo: string): string {
  return TIPO_LABELS[tipo as OperationTipo] ?? tipo;
}

export function toOperationViewModel(dto: OperacaoRegistradaDto): OperationViewModel {
  return {
    id: dto.operacaoId,
    tipo: dto.tipo as OperationTipo,
    tipoLabel: tipoToLabel(dto.tipo),
    ativoId: dto.ativoId,
    quantidade: formatQty(dto.quantidade),
    valor: formatCurrency(dto.valor),
    data: formatData(dto.data),
    status: dto.status,
  };
}

export function toOperationViewModels(dtos: OperacaoRegistradaDto[]): OperationViewModel[] {
  return dtos.map(toOperationViewModel);
}

export function filterOperations(
  operations: OperationViewModel[],
  filtros: OperationFiltersViewModel,
): OperationViewModel[] {
  const termo = filtros.termo.trim().toLowerCase();
  return operations.filter((op) => {
    const matchTipo = filtros.tipo === "TODOS" || op.tipo === filtros.tipo;
    const matchTermo = termo
      ? op.ativoId.toLowerCase().includes(termo) || op.tipoLabel.toLowerCase().includes(termo)
      : true;
    return matchTipo && matchTermo;
  });
}
