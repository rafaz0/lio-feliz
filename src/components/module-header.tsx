import type { ReactNode } from "react";

interface ModuleHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function ModuleHeader({ title, description, action }: ModuleHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
