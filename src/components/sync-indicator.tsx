import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyncIndicatorProps {
  onSync: () => Promise<void>;
  lastSync?: string | null;
  isSyncing?: boolean;
  hasError?: boolean;
  className?: string;
}

export function SyncIndicator({
  onSync,
  lastSync,
  isSyncing = false,
  hasError = false,
  className,
}: SyncIndicatorProps) {
  const [syncing, setSyncing] = useState(false);

  const isActive = isSyncing || syncing;

  async function handleSync() {
    if (isActive) return;
    setSyncing(true);
    try {
      await onSync();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
      {hasError ? (
        <AlertCircle className="size-3.5 text-destructive" aria-hidden="true" />
      ) : lastSync ? (
        <CheckCircle2 className="size-3.5 text-positive" aria-hidden="true" />
      ) : null}
      <span>
        {lastSync
          ? `Sinc. ${new Date(lastSync).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
          : "Sem sincronização"}
      </span>
      <button
        onClick={handleSync}
        disabled={isActive}
        aria-label="Sincronizar dados"
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 transition hover:bg-secondary disabled:opacity-50"
      >
        <RefreshCw className={cn("size-3", isActive && "animate-spin")} />
        <span>{isActive ? "Sincronizando..." : "Sincronizar"}</span>
      </button>
    </div>
  );
}
