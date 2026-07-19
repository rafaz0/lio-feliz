import { Skeleton } from "@/components/ui/skeleton";

export function OperationLoading() {
  return (
    <div data-testid="operation-loading" className="grid gap-4">
      <Skeleton className="h-72 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}
