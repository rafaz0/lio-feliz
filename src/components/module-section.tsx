import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModuleSectionProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ModuleSection({
  title,
  description,
  action,
  children,
  className,
  id,
}: ModuleSectionProps) {
  return (
    <section id={id} className={cn("space-y-3", className)} aria-label={title}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3">
          <div>
            {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
