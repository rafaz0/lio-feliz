import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface ModuleBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ModuleBreadcrumb({ items }: ModuleBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:gap-2">
        <li>
          <Link to="/" className="transition hover:text-foreground" aria-label="Início">
            <Home className="size-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5 sm:gap-2">
            <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="transition hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
