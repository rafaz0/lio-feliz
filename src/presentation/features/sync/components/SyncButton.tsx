interface SyncButtonProps {
  isPending: boolean;
  onSync: () => void;
  disabled?: boolean;
}

export function SyncButton({ isPending, onSync, disabled }: SyncButtonProps) {
  return (
    <button
      type="button"
      data-testid="sync-submit"
      onClick={onSync}
      disabled={isPending || disabled}
      aria-busy={isPending}
      className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
    >
      {isPending ? "Sincronizando…" : "Sincronizar agora"}
    </button>
  );
}
