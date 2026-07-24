import type { ReactNode } from "react";
import type { InsightCategory } from "../types/intelligence.types";

interface InsightSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  category?: InsightCategory;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function InsightSection({
  title,
  description,
  icon,
  children,
  isEmpty,
  emptyMessage,
}: InsightSectionProps) {
  return (
    <section className="space-y-3" role="region" aria-label={title}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="space-y-2">
        {isEmpty ? (
          <p className="py-2 text-xs text-muted-foreground/60">
            {emptyMessage ?? "Nenhum insight disponível no momento."}
          </p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
