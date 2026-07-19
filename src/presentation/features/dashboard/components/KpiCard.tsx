import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/presentation/shared/utils";
import type { KpiCardViewModel } from "../types/dashboard.view-model";

interface KpiCardProps {
  kpi: KpiCardViewModel;
}

export function KpiCard({ kpi }: KpiCardProps) {
  return (
    <Card data-testid="kpi-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            "text-2xl font-semibold tabular-nums",
            kpi.trend === "up" && "text-emerald-500",
            kpi.trend === "down" && "text-rose-500",
          )}
        >
          {kpi.value}
        </p>
        {kpi.hint ? <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p> : null}
      </CardContent>
    </Card>
  );
}
