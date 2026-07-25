import type { IFinanceIntegrationService } from "./ifinance-integration-service";
import type { SyncOperationEvent, SyncResult } from "@/core/domain/finance";

export class NullFinanceIntegrationService implements IFinanceIntegrationService {
  readonly isEnabled = false;

  async onOperationRegistered(_event: SyncOperationEvent): Promise<SyncResult> {
    return { success: true, operationId: _event.operationId, message: "Integração desabilitada" };
  }
}
