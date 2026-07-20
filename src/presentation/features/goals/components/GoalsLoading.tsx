export function GoalsLoading() {
  return (
    <div data-testid="goals-loading" className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="flex gap-4">
        <div className="h-24 flex-1 animate-pulse rounded-xl bg-muted" />
        <div className="h-24 flex-1 animate-pulse rounded-xl bg-muted" />
        <div className="h-24 flex-1 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
      <div className="h-20 animate-pulse rounded-xl bg-muted" />
      <div className="h-20 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
