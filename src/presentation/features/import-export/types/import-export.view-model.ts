import type { ImportJobDto, HistoricoImportacaoDto, ModelosExportacaoDto } from "@/application/dtos/importacao";

export interface ImportJobViewModel {
  readonly id: string;
  readonly fileName: string;
  readonly fileSize: string;
  readonly format: string;
  readonly source: string;
  readonly status: string;
  readonly totalRecords: number;
  readonly processedRecords: number;
  readonly errorRecords: number;
  readonly createdAt: string;
  readonly completedAt?: string;
  readonly progressPercent: number;
}

export interface ModeloExportacaoViewModel {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly formato: string;
}

export function toImportJobViewModel(dto: ImportJobDto): ImportJobViewModel {
  const progress = dto.totalRecords > 0 ? Math.round((dto.processedRecords / dto.totalRecords) * 100) : 0;
  return {
    id: dto.id,
    fileName: dto.fileName,
    fileSize: formatFileSize(dto.fileSize),
    format: dto.format,
    source: dto.source,
    status: dto.status,
    totalRecords: dto.totalRecords,
    processedRecords: dto.processedRecords,
    errorRecords: dto.errorRecords,
    createdAt: dto.createdAt,
    completedAt: dto.completedAt,
    progressPercent: progress,
  };
}

export function toImportJobViewModels(dtos: ImportJobDto[]): ImportJobViewModel[] {
  return dtos.map(toImportJobViewModel);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
