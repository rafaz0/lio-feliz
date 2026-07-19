export function ReportsLoading() {
  return (
    <div data-testid="reports-loading" className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-8 w-full animate-pulse rounded bg-muted" />
      <div className="h-24 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
