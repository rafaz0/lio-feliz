import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickActionItem {
  label: string;
  to: string;
  icon: LucideIcon;
  description?: string;
}

interface QuickActionsProps {
  items: QuickActionItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const GRID_COLS = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function QuickActions({ items, columns = 4, className }: QuickActionsProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("grid gap-3", GRID_COLS[columns], className)}>
      {items.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.to}
            to={action.to}
            className="group rounded-lg border border-border bg-card p-4 transition hover:bg-secondary hover:border-foreground/20"
          >
            <Icon className="mb-2 size-5 text-muted-foreground transition group-hover:text-foreground" />
            <h3 className="text-sm font-semibold">{action.label}</h3>
            {action.description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
