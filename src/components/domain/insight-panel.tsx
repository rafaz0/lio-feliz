import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface InsightPanelProps {
  title?: string;
  children: ReactNode;
}

export function InsightPanel({ title = "Insights", children }: InsightPanelProps) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
        {title}
      </h3>
      <div className="grid gap-2 md:grid-cols-2">{children}</div>
    </div>
  );
}
