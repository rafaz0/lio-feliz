import { cn } from "@/lib/utils";
import { formatPct } from "@/lib/format";

interface Props {
  value: number;
  className?: string;
  showSign?: boolean;
}

export function DeltaPct({ value, className, showSign = true }: Props) {
  const isUp = value >= 0;
  return (
    <span
      className={cn(
        "tabular font-medium",
        isUp ? "text-positive" : "text-negative",
        className,
      )}
    >
      {showSign ? formatPct(value) : `${value.toFixed(2)}%`}
    </span>
  );
}
