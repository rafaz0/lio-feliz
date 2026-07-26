import { cn } from "@/presentation/shared/utils/cn";
import { TIME_RANGE_OPTIONS } from "./types";
import type { TimeRangeId } from "./types";

interface TimeRangeSelectorProps {
  selected: TimeRangeId;
  onSelect: (id: TimeRangeId) => void;
  disabled?: boolean;
  className?: string;
}

export function TimeRangeSelector({
  selected,
  onSelect,
  disabled = false,
  className,
}: TimeRangeSelectorProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5 rounded-lg bg-muted p-0.5", className)}
      role="radiogroup"
      aria-label="Selecionar período"
    >
      {TIME_RANGE_OPTIONS.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            aria-label={`Período ${opt.label}`}
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium tabular-nums transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
