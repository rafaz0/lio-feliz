export function TaxLoading() {
  return (
    <div data-testid="tax-loading" className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-48 animate-pulse rounded-xl bg-muted" />
      <div className="h-32 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
