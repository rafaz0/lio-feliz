import { useCallback, useRef, useState } from "react";
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
  const lastSyncAtRef = useRef<string | null>(null);

  const triggerSync = useCallback(async () => {
    try {
      setHasError(false);
      const result = await mutateAsync({
        usuarioId,
        fonte: "manual",
      });
      setLastResult(result);
      lastSyncAtRef.current = new Date().toISOString();
    } catch {
      setHasError(true);
    }
  }, [usuarioId, mutateAsync]);

  return {
    lastSyncAt: lastSyncAtRef.current,
    isSyncing: isPending,
    hasError,
    lastResult,
    triggerSync,
  };
}
