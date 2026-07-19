export function SyncEmpty() {
  return (
    <div
      data-testid="sync-empty"
      role="status"
      className="rounded border border-dashed p-6 text-center"
    >
      <p className="text-sm text-muted-foreground">Nenhuma sincronização realizada ainda.</p>
    </div>
  );
}
