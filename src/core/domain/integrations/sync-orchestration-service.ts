import { SyncLog } from "./sync-log";
import type { SyncType, SyncStatus } from "./sync-log";
import { SyncInProgressError } from "./errors";

export class SyncOrchestrationService {
  private activeSyncs: Map<string, boolean> = new Map();

  canStartSync(integrationId: string): true | SyncInProgressError {
    if (this.activeSyncs.get(integrationId)) {
      return new SyncInProgressError(integrationId);
    }
    this.activeSyncs.set(integrationId, true);
    return true;
  }

  finishSync(integrationId: string): void {
    this.activeSyncs.delete(integrationId);
  }

  calculateSyncStatus(logs: SyncLog[]): { lastSync: Date | null; status: SyncStatus; totalErrors: number } {
    if (logs.length === 0) {
      return { lastSync: null, status: "SUCCESS", totalErrors: 0 };
    }

    const sorted = [...logs].sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
    const latest = sorted[0];

    return {
      lastSync: latest.completedAt ?? latest.startedAt,
      status: latest.status,
      totalErrors: sorted.reduce((sum, log) => sum + log.errors.length, 0),
    };
  }

  static createLog(props: {
    integrationId: string;
    type: SyncType;
  }): SyncLog {
    return SyncLog.create(props);
  }
}
