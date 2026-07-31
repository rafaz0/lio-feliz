import { useCallback, useState } from "react";
import { useSyncMutation } from "./use-sync-mutation";
import type { SincronizacaoRealizadaDto } from "@/presentation/shared/types/application-layer";

export interface SyncStatusResult {
  lastSyncAt: string | null;
  isSyncing: boolean;
  hasError: boolean;
  lastResult: SincronizacaoRealizadaDto | null;
  triggerSync: () => Promise<void>;
}

export function useSyncStatus(usuarioId: string): SyncStatusResult {
  const { mutateAsync, isPending } = useSyncMutation();
  const [lastResult, setLastResult] = useState<SincronizacaoRealizadaDto | null>(null);
  const [hasError, setHasError] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);

  const triggerSync = useCallback(async () => {
    try {
      setHasError(false);
      const result = await mutateAsync({
        usuarioId,
        fonte: "manual",
      });
      setLastResult(result);
      setLastSyncAt(new Date().toISOString());
    } catch {
      setHasError(true);
    }
  }, [usuarioId, mutateAsync]);

  return {
    lastSyncAt,
    isSyncing: isPending,
    hasError,
    lastResult,
    triggerSync,
  };
}
