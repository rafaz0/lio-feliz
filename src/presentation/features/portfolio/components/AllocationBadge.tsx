import { cn } from "@/presentation/shared/utils";
import type { AllocationViewModel } from "../types/portfolio.view-model";

interface AllocationBadgeProps {
  allocation: AllocationViewModel;
}

export function AllocationBadge({ allocation }: AllocationBadgeProps) {
  return (
    <span
      data-testid="allocation-badge"
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium"
    >
      <span
        className={cn("h-2 w-2 rounded-[2px]")}
        style={{ backgroundColor: allocation.fill }}
        aria-hidden="true"
      />
      {allocation.classe} ·{" "}
      {new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(allocation.percentual)}
      %
    </span>
  );
}
