import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioLoading() {
  return (
    <div data-testid="portfolio-loading" className="grid gap-4">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
