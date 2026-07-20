interface GoalProgressProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const HEIGHT = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

export function GoalProgress({
  percentage,
  size = "md",
  showLabel = true,
}: GoalProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const barColor =
    clamped >= 100
      ? "bg-emerald-500"
      : clamped >= 75
        ? "bg-sky-500"
        : clamped >= 50
          ? "bg-amber-500"
          : "bg-muted-foreground/30";

  return (
    <div data-testid="goal-progress" className="space-y-1">
      {showLabel ? (
        <div className="flex justify-between text-xs tabular-nums">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium">{clamped.toFixed(1)}%</span>
        </div>
      ) : null}
      <div
        className={`w-full overflow-hidden rounded-full bg-muted ${HEIGHT[size]}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${HEIGHT[size]} ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
