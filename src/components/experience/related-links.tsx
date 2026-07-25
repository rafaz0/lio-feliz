import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RelatedLinkItem {
  label: string;
  to: string;
  description?: string;
}

interface RelatedLinksProps {
  title?: string;
  items: RelatedLinkItem[];
  className?: string;
}

export function RelatedLinks({ title, items, className }: RelatedLinksProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition hover:bg-secondary"
            >
              <div>
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
