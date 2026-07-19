import type { DadosExportadosDto } from "@/presentation/shared/types/application-layer";

export type ReportFormato = "json" | "csv";

export interface ReportCatalogItem {
  readonly id: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly formatos: ReportFormato[];
}

export interface ReportViewModel {
  readonly id: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly formatos: ReportFormato[];
}

export interface ExportResultViewModel {
  readonly formato: string;
  readonly conteudo: string;
  readonly nomeArquivo: string;
  readonly tamanho: number;
}

export const REPORTS_CATALOG: ReportCatalogItem[] = [
  {
    id: "carteira-completa",
    titulo: "Carteira completa",
    descricao: "Exporta o patrimônio consolidado e todas as posições da carteira.",
    formatos: ["json", "csv"],
  },
];

export function toReportViewModel(item: ReportCatalogItem): ReportViewModel {
  return {
    id: item.id,
    titulo: item.titulo,
    descricao: item.descricao,
    formatos: item.formatos,
  };
}

export function toReportViewModels(items: ReportCatalogItem[]): ReportViewModel[] {
  return items.map(toReportViewModel);
}

export function toExportResultViewModel(dto: DadosExportadosDto): ExportResultViewModel {
  return {
    formato: dto.formato,
    conteudo: dto.conteudo,
    nomeArquivo: dto.nomeArquivo,
    tamanho: dto.conteudo.length,
  };
}
