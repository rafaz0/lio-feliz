import type { IntegrationConfigDto, SyncLogDto } from "@/application/dtos/integracao";

export interface IntegrationConfigViewModel {
  readonly id: string;
  readonly provider: string;
  readonly name: string;
  readonly authType: string;
  readonly status: string;
  readonly lastSyncAt?: string;
  readonly errorMessage?: string;
  readonly createdAt: string;
  readonly statusColor: string;
}

export interface SyncLogViewModel {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly recordsProcessed: number;
  readonly errors: string[];
  readonly message?: string;
}

export function toIntegrationViewModel(dto: IntegrationConfigDto): IntegrationConfigViewModel {
  const statusColor =
    dto.status === "ACTIVE" ? "text-green-600" :
    dto.status === "ERROR" ? "text-red-600" :
    dto.status === "INACTIVE" ? "text-gray-400" :
    "text-yellow-600";
  return { ...dto, statusColor };
}

export function toIntegrationViewModels(dtos: IntegrationConfigDto[]): IntegrationConfigViewModel[] {
  return dtos.map(toIntegrationViewModel);
}
