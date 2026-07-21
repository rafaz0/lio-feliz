export interface IntegrationConfigDto {
  readonly id: string;
  readonly provider: string;
  readonly name: string;
  readonly authType: string;
  readonly status: string;
  readonly lastSyncAt?: string;
  readonly errorMessage?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SyncLogDto {
  readonly id: string;
  readonly integrationId: string;
  readonly type: string;
  readonly status: string;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly recordsProcessed: number;
  readonly errors: string[];
  readonly message?: string;
}

export interface IntegracaoConfiguradaDto {
  readonly id: string;
  readonly provider: string;
  readonly name: string;
  readonly status: string;
}

export interface SyncResultDto {
  readonly syncLogId: string;
  readonly status: string;
  readonly recordsProcessed: number;
  readonly errors: string[];
}

export interface IntegracoesListDto {
  readonly integrations: IntegrationConfigDto[];
}

export interface SyncStatusDto {
  readonly integrationId: string;
  readonly lastSync: string | null;
  readonly status: string;
  readonly totalErrors: number;
  readonly logs: SyncLogDto[];
}
