import { AlertTriangle, Info, Sparkles, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { InsightViewModel, InsightSeverity } from "../types/intelligence.types";
import { SEVERITY_CONFIG } from "../types/intelligence.types";

const SEVERITY_ICONS: Record<InsightSeverity, typeof Info> = {
  info: Info,
  attention: AlertTriangle,
  highlight: Sparkles,
};

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
} as const;

const TREND_COLORS = {
  up: "text-positive",
  down: "text-negative",
  neutral: "text-muted-foreground",
} as const;

interface InsightCardProps {
  insight: InsightViewModel;
}

export function InsightCard({ insight }: InsightCardProps) {
  const SeverityIcon = SEVERITY_ICONS[insight.severity];
  const config = SEVERITY_CONFIG[insight.severity];
  const TrendIcon = insight.trend ? TREND_ICONS[insight.trend] : null;

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 ${config.borderColor} ${config.bgColor}`}
      data-testid={`insight-card-${insight.id}`}
      role="region"
      aria-label={`Insight: ${insight.title}`}
    >
      <SeverityIcon className={`mt-0.5 size-5 shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-sm font-medium text-foreground">{insight.title}</h4>
          <div className="flex items-center gap-2 shrink-0">
            {TrendIcon && (
              <TrendIcon className={`size-4 ${TREND_COLORS[insight.trend!]}`} aria-hidden="true" />
            )}
            {insight.value && (
              <span className="tabular text-sm font-semibold text-foreground">{insight.value}</span>
            )}
          </div>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{insight.description}</p>
        {insight.secondaryValue && (
          <p className="mt-1 text-xs text-muted-foreground/70">{insight.secondaryValue}</p>
        )}
      </div>
    </div>
  );
}
