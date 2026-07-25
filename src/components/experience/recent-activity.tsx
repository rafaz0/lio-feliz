import { cn } from "@/lib/utils";

export interface RecentActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps {
  title?: string;
  items: RecentActivityItem[];
  maxItems?: number;
  className?: string;
}

export function RecentActivity({ title, items, maxItems = 10, className }: RecentActivityProps) {
  if (items.length === 0) return null;

  const displayed = items.slice(0, maxItems);

  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {displayed.map((item) => (
          <li key={item.id} className="flex items-start gap-3 px-4 py-3">
            {item.icon && <div className="mt-0.5 shrink-0">{item.icon}</div>}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              {item.description && (
                <p className="truncate text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground">{item.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
