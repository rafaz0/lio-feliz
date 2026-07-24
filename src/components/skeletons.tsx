import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <Skeleton className="mb-3 h-5 w-2/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="mb-2 h-4 w-full" />
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <Skeleton className="mb-3 h-5 w-1/3" />
      <Skeleton className="h-64 w-full rounded-md" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-4 border-b border-border bg-surface-2 px-4 py-2.5">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-t border-border px-4 py-3">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage({ sections = 3 }: { sections?: number }) {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mb-6 h-4 w-72" />
      {Array.from({ length: sections }).map((_, i) => (
        <SkeletonChart key={i} />
      ))}
    </div>
  );
}
