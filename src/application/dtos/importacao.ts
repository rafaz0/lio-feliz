export interface ImportJobDto {
  readonly id: string;
  readonly fileName: string;
  readonly fileSize: number;
  readonly format: string;
  readonly source: string;
  readonly status: string;
  readonly totalRecords: number;
  readonly processedRecords: number;
  readonly errorRecords: number;
  readonly createdAt: string;
  readonly completedAt?: string;
}

export interface ImportacaoRealizadaDto {
  readonly totalOperacoes: number;
  readonly operacoesImportadas: number;
  readonly operacoesRejeitadas: number;
  readonly erros: { linha: number; tipo: string; mensagem: string }[];
  readonly importJobId: string;
}

export interface ExportJobDto {
  readonly id: string;
  readonly templateId: string;
  readonly formato: string;
  readonly status: string;
  readonly fileName: string;
  readonly fileUrl?: string;
  readonly createdAt: string;
  readonly completedAt?: string;
}

export interface HistoricoImportacaoDto {
  readonly jobs: ImportJobDto[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}

export interface ModelosExportacaoDto {
  readonly modelos: { id: string; nome: string; descricao: string; formato: string }[];
}
