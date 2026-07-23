import type { ExportTemplateDto, ExportJobDto } from "@/application/dtos/exportacao-avancada";

export interface ExportTemplateViewModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly format: string;
  readonly version: string;
  readonly isBuiltIn: boolean;
}

export interface ExportJobViewModel {
  readonly id: string;
  readonly templateId: string;
  readonly status: string;
  readonly statusLabel: string;
  readonly checksum?: string;
  readonly sizeBytes?: number;
  readonly requestedAt: string;
  readonly hasFile: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PROCESSING: "Processando",
  COMPLETED: "Concluido",
  FAILED: "Falhou",
};

export function toExportTemplateViewModel(dto: ExportTemplateDto): ExportTemplateViewModel {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    format: dto.format,
    version: dto.version,
    isBuiltIn: dto.isBuiltIn,
  };
}

export function toExportTemplateViewModels(dtos: ExportTemplateDto[]): ExportTemplateViewModel[] {
  return dtos.map(toExportTemplateViewModel);
}

export function toExportJobViewModel(dto: ExportJobDto): ExportJobViewModel {
  return {
    id: dto.id,
    templateId: dto.templateId,
    status: dto.status,
    statusLabel: STATUS_LABELS[dto.status] ?? dto.status,
    checksum: dto.checksum,
    sizeBytes: dto.sizeBytes,
    requestedAt: new Date(dto.requestedAt).toLocaleDateString("pt-BR"),
    hasFile: !!dto.fileUrl,
  };
}

export function toExportJobViewModels(dtos: ExportJobDto[]): ExportJobViewModel[] {
  return dtos.map(toExportJobViewModel);
}
