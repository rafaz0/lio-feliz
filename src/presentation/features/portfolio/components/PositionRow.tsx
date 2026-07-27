import { Info, Minus } from "lucide-react";
import { cn } from "@/presentation/shared/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { PositionViewModel } from "../types/portfolio.view-model";
import { AllocationBadge } from "./AllocationBadge";

interface PositionRowProps {
  position: PositionViewModel;
  onSelect?: (classe: string) => void;
  isSelected?: boolean;
  idealPct?: number;
}

export function PositionRow({ position, onSelect, isSelected, idealPct = 0 }: PositionRowProps) {
  const delta = position.percentual - idealPct;

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
      <td className="p-3 text-right tabular-nums text-muted-foreground">
        {idealPct > 0 ? `${idealPct.toFixed(1)}%` : "—"}
      </td>
      <td className="p-3 text-right">
        {idealPct > 0 ? (
          <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <span className="tabular-nums">
              {delta > 0 ? "+" : ""}
              {delta.toFixed(1)}%
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center">
                    <Info className="size-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-xs leading-relaxed">
                  Diferença entre o % atual e a distribuição igualitária sugerida (não personalizável).
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
    </tr>
  );
}
