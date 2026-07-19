import type {
  SincronizacaoRealizadaDto,
  SincronizacaoErroDto,
} from "@/presentation/shared/types/application-layer";

export interface SyncErrorViewModel {
  readonly fonte: string;
  readonly linha: number;
  readonly tipo: string;
  readonly mensagem: string;
}

export interface SyncResultViewModel {
  readonly fonte: string;
  readonly dataSincronizacao: string;
  readonly totalProcessado: number;
  readonly totalNovo: number;
  readonly totalIgnorado: number;
  readonly erros: SyncErrorViewModel[];
  readonly temErros: boolean;
}

const FONTES_DISPONIVEIS = ["b3-csv", "yahoo", "coingecko", "exchange-rate"] as const;

export type SyncFonte = (typeof FONTES_DISPONIVEIS)[number];

export const SYNC_FONTES: SyncFonte[] = [...FONTES_DISPONIVEIS];

const FONTE_LABELS: Record<SyncFonte, string> = {
  "b3-csv": "B3 (CSV)",
  yahoo: "Yahoo Finance",
  coingecko: "CoinGecko",
  "exchange-rate": "Exchange Rate",
};

export function fonteToLabel(fonte: string): string {
  return FONTE_LABELS[fonte as SyncFonte] ?? fonte;
}

function formatData(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function toSyncErrorViewModel(dto: SincronizacaoErroDto): SyncErrorViewModel {
  return {
    fonte: dto.fonte,
    linha: dto.linha,
    tipo: dto.tipo,
    mensagem: dto.mensagem,
  };
}

export function toSyncResultViewModel(dto: SincronizacaoRealizadaDto): SyncResultViewModel {
  return {
    fonte: dto.fonte,
    dataSincronizacao: formatData(dto.dataSincronizacao),
    totalProcessado: dto.totalProcessado,
    totalNovo: dto.totalNovo,
    totalIgnorado: dto.totalIgnorado,
    erros: dto.erros.map(toSyncErrorViewModel),
    temErros: dto.erros.length > 0,
  };
}
