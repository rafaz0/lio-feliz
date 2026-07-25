import type { SyncOperationEvent, SyncResult } from "@/core/domain/finance";

export interface IFinanceIntegrationService {
  readonly isEnabled: boolean;
  onOperationRegistered(event: SyncOperationEvent): Promise<SyncResult>;
}
