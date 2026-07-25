import type { ReactNode } from "react";

interface ModuleHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function ModuleHeader({ title, description, action }: ModuleHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
