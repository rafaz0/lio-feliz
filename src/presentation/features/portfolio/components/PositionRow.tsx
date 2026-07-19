import { cn } from "@/presentation/shared/utils";
import type { PositionViewModel } from "../types/portfolio.view-model";
import { AllocationBadge } from "./AllocationBadge";

interface PositionRowProps {
  position: PositionViewModel;
  onSelect?: (classe: string) => void;
  isSelected?: boolean;
}

export function PositionRow({ position, onSelect, isSelected }: PositionRowProps) {
  return (
    <tr
      data-testid="position-row"
      className={cn(
        "cursor-pointer border-b transition-colors hover:bg-muted/40",
        isSelected && "bg-muted/60",
      )}
      onClick={() => onSelect?.(position.classe)}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(position.classe);
        }
      }}
    >
      <td className="p-3">
        <AllocationBadge allocation={position} />
      </td>
      <td className="p-3 text-right tabular-nums">{position.valor}</td>
      <td className="p-3 text-right tabular-nums">{position.percentual.toFixed(1)}%</td>
    </tr>
  );
}
