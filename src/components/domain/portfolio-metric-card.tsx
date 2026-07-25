import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MetricTrend = "up" | "down" | "neutral";

export interface PortfolioMetricCardProps {
  label: string;
  value: string;
  trend?: MetricTrend;
  hint?: string;
  icon?: ReactNode;
  className?: string;
  secondaryValue?: string;
}

const TREND_COLORS: Record<MetricTrend, string> = {
  up: "text-emerald-500",
  down: "text-rose-500",
  neutral: "text-foreground",
};

export function PortfolioMetricCard({
  label,
  value,
  trend,
  hint,
  icon,
  className,
  secondaryValue,
}: PortfolioMetricCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          {icon}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("text-2xl font-semibold tabular-nums", trend && TREND_COLORS[trend])}>
          {value}
        </p>
        {secondaryValue && <p className="mt-0.5 text-xs text-muted-foreground">{secondaryValue}</p>}
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
